const RECIPIENT = 'ale.sanchez.guinea@gmail.com';

const cleanSingleLine = (value, maximum) => (
  typeof value === 'string' ? value.replace(/\s+/g, ' ').trim().slice(0, maximum) : ''
);

const cleanMessage = (value, maximum) => (
  typeof value === 'string' ? value.replace(/\r\n/g, '\n').trim().slice(0, maximum) : ''
);

const jsonResponse = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
  },
});

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method !== 'POST' || url.pathname !== '/send') {
      return jsonResponse({ ok: false }, 404);
    }

    let submitted;
    try {
      submitted = await request.json();
    } catch {
      return jsonResponse({ ok: false }, 400);
    }

    const topicLabel = cleanSingleLine(submitted.topicLabel, 80);
    const name = cleanSingleLine(submitted.name, 100);
    const email = cleanSingleLine(submitted.email, 254).toLowerCase();
    const role = cleanSingleLine(submitted.role, 120);
    const organisation = cleanSingleLine(submitted.organisation, 160);
    const projectUrl = cleanSingleLine(submitted.projectUrl, 500);
    const interest = cleanSingleLine(submitted.interest, 160);
    const collaborationArea = cleanSingleLine(submitted.collaborationArea, 120);
    const timeframe = cleanSingleLine(submitted.timeframe, 100);
    const message = cleanMessage(submitted.message, 3_000);

    if (!topicLabel || !name || !email || !role || !organisation || !timeframe || message.length < 20) {
      return jsonResponse({ ok: false }, 400);
    }

    const messageLines = [
      'New message from alejandrosanchezguinea.com',
      '',
      `Contact route: ${topicLabel}`,
      interest ? `Area of interest: ${interest}` : '',
      collaborationArea ? `Collaboration area: ${collaborationArea}` : '',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Role: ${role}`,
      `Organisation or project: ${organisation}`,
      projectUrl ? `Website: ${projectUrl}` : '',
      `Expected timeframe: ${timeframe}`,
      '',
      'Message',
      '-------',
      message,
    ].filter((line, index, lines) => line || (index > 0 && lines[index - 1]));

    try {
      await env.EMAIL.send({
        to: RECIPIENT,
        from: { email: 'website@burritoslabs.com', name: 'Alejandro Sanchez Guinea website' },
        replyTo: { email, name },
        subject: `[Personal website] ${topicLabel} | ${organisation}`.slice(0, 200),
        text: messageLines.join('\n'),
      });
    } catch (error) {
      console.error('Contact email delivery failed.', error?.code || error?.name || 'unknown');
      return jsonResponse({ ok: false }, 502);
    }

    return jsonResponse({ ok: true });
  },
};
