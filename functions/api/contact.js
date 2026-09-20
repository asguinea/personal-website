const MAX_BODY_BYTES = 30_000;

const topicLabels = {
  engagement: 'Advisory engagement',
  role: 'Role or leadership opportunity',
  collaboration: 'Venture or research collaboration',
  other: 'Professional inquiry',
};

const collaborationLabels = {
  eyetrustai: 'EyeTrustAI',
  'burritos-labs': 'Burrito’s Labs',
  'independent-research': 'Independent research collaboration',
};

const timeframeLabels = {
  'within-one-month': 'Within one month',
  'one-to-three-months': 'One to three months',
  'three-to-six-months': 'Three to six months',
  'later-or-exploring': 'Later or currently exploring',
};

const responseHeaders = {
  'Cache-Control': 'no-store',
  'Content-Type': 'application/json; charset=utf-8',
  'X-Content-Type-Options': 'nosniff',
};

const jsonResponse = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: responseHeaders,
});

const cleanSingleLine = (value, maximum) => (
  typeof value === 'string' ? value.replace(/\s+/g, ' ').trim().slice(0, maximum) : ''
);

const cleanMessage = (value, maximum) => (
  typeof value === 'string' ? value.replace(/\r\n/g, '\n').trim().slice(0, maximum) : ''
);

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const verifyTurnstile = async ({ token, secret, remoteIp, hostname }) => {
  if (!token || !secret) return false;

  const body = new FormData();
  body.set('secret', secret);
  body.set('response', token);
  if (remoteIp) body.set('remoteip', remoteIp);

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
  });
  if (!response.ok) return false;

  const result = await response.json();
  return Boolean(result.success && result.action === 'contact' && result.hostname === hostname);
};

export async function onRequestPost({ request, env }) {
  const requestUrl = new URL(request.url);
  if (request.headers.get('Origin') !== requestUrl.origin) {
    return jsonResponse({ ok: false }, 403);
  }

  if (!request.headers.get('Content-Type')?.toLowerCase().startsWith('application/json')) {
    return jsonResponse({ ok: false }, 415);
  }

  const declaredLength = Number(request.headers.get('Content-Length') || 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return jsonResponse({ ok: false }, 413);
  }

  let submitted;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
      return jsonResponse({ ok: false }, 413);
    }
    submitted = JSON.parse(raw);
  } catch {
    return jsonResponse({ ok: false }, 400);
  }

  if (typeof submitted !== 'object' || submitted === null || Array.isArray(submitted)) {
    return jsonResponse({ ok: false }, 400);
  }

  if (cleanSingleLine(submitted.confirmation, 200)) {
    return jsonResponse({ ok: true });
  }

  const startedAt = Number(submitted.started_at);
  const elapsed = Date.now() - startedAt;
  if (!Number.isFinite(startedAt) || elapsed < 1_200) {
    return jsonResponse({ ok: true });
  }
  if (elapsed > 21_600_000) {
    return jsonResponse({ ok: false }, 400);
  }

  const topic = cleanSingleLine(submitted.topic, 40);
  const name = cleanSingleLine(submitted.name, 100);
  const email = cleanSingleLine(submitted.email, 254).toLowerCase();
  const role = cleanSingleLine(submitted.role, 120);
  const organisation = cleanSingleLine(submitted.organisation, 160);
  const projectUrl = cleanSingleLine(submitted.project_url, 500);
  const interest = cleanSingleLine(submitted.interest, 160);
  const collaborationArea = cleanSingleLine(submitted.collaboration_area, 80);
  const timeframe = cleanSingleLine(submitted.timeframe, 80);
  const message = cleanMessage(submitted.message, 3_000);

  const validProjectUrl = !projectUrl || (() => {
    try {
      const parsed = new URL(projectUrl);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  })();

  const isValid = Boolean(
    topicLabels[topic]
    && name
    && isEmail(email)
    && role
    && organisation
    && validProjectUrl
    && timeframeLabels[timeframe]
    && message.length >= 20
    && (topic !== 'collaboration' || collaborationLabels[collaborationArea])
  );

  if (!isValid) {
    return jsonResponse({ ok: false }, 400);
  }

  const turnstileIsValid = await verifyTurnstile({
    token: cleanSingleLine(submitted.turnstileToken, 2_048),
    secret: env.TURNSTILE_SECRET_KEY,
    remoteIp: request.headers.get('CF-Connecting-IP') || '',
    hostname: requestUrl.hostname,
  });
  if (!turnstileIsValid) {
    return jsonResponse({ ok: false }, 400);
  }

  if (!env.CONTACT_MAILER) {
    console.error('Contact delivery is missing the CONTACT_MAILER service binding.');
    return jsonResponse({ ok: false }, 503);
  }

  let delivery;
  try {
    delivery = await env.CONTACT_MAILER.fetch('https://contact-mailer.internal/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topicLabel: topicLabels[topic],
        name,
        email,
        role,
        organisation,
        projectUrl,
        interest,
        collaborationArea: collaborationArea ? collaborationLabels[collaborationArea] : '',
        timeframe: timeframeLabels[timeframe],
        message,
      }),
    });
  } catch {
    console.error('The private contact mailer could not be reached.');
    return jsonResponse({ ok: false }, 502);
  }

  if (!delivery.ok) {
    console.error('The private contact mailer rejected a message.', delivery.status);
    return jsonResponse({ ok: false }, 502);
  }

  return jsonResponse({ ok: true });
}
