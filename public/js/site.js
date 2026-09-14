const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

toggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
});

const contactDialog = document.querySelector('.unified-contact-dialog');
const contactBackdrop = document.querySelector('.unified-contact-backdrop');
const contactClose = document.querySelector('.unified-contact-close');
const contactForm = document.querySelector('.unified-contact-form');
const contactStatus = document.querySelector('.unified-contact-status');
const contactContext = document.querySelector('.unified-contact-context');
const contactInterest = document.querySelector('input[name="interest"]');
const contactStartedAt = document.querySelector('input[name="started_at"]');
const contactTopicInputs = [...document.querySelectorAll('input[name="topic"]')];
const contactTopicFieldset = document.querySelector('.unified-contact-topic');
const contactChange = document.querySelector('.unified-contact-change');
const contactDetails = document.querySelector('.unified-contact-details');
const contactDetailsControls = [...document.querySelectorAll('.unified-contact-details input, .unified-contact-details textarea, .unified-contact-details select, .unified-contact-details button')];
const contactCollaboration = document.querySelector('.unified-contact-collaboration');
const contactCollaborationSelect = document.querySelector('#unified-contact-collaboration-area');
const contactMessageLabel = document.querySelector('.unified-contact-message-label');
const contactMessage = document.querySelector('#unified-contact-message');
const contactTurnstileContainer = document.querySelector('.unified-contact-turnstile');
const contactOpeners = [...document.querySelectorAll('.js-contact-open')];
const isLocalPreview = location.hostname === '127.0.0.1' || location.hostname === 'localhost';
const productionTurnstileSiteKey = contactForm?.dataset.turnstileSiteKey || '';
const localTurnstileSiteKey = '1x00000000000000000000AA';
let contactReturnTarget = null;
let contactTurnstileWidgetId = null;
let contactTurnstileReadyPromise = null;

const contactRouteAliases = {
  advisory: 'engagement',
  leadership: 'role',
  general: 'other',
};

const contactRoutes = {
  engagement: {
    guidance: 'Share enough context for me to assess whether an advisory engagement could be useful. If there appears to be a good fit, I will suggest a short introductory call.',
    label: 'Decision or challenge',
    placeholder: 'Briefly describe the decision, initiative or programme and where you would value independent input.',
  },
  role: {
    guidance: 'Share the role, organisation and expected scope of responsibility. I will follow up if the opportunity appears relevant.',
    label: 'Role or opportunity',
    placeholder: 'Briefly describe the role, its scope and why you think there could be a fit.',
  },
  collaboration: {
    guidance: 'Choose the relevant area, then describe the collaboration or proposal you have in mind.',
    label: 'Collaboration idea',
    placeholder: 'Briefly describe the proposed collaboration, the people involved and the intended outcome.',
  },
  other: {
    guidance: 'Briefly explain the reason for getting in touch and what you would like to explore.',
    label: 'Message',
    placeholder: 'Briefly describe what you would like to discuss.',
  },
};

const loadContactTurnstile = () => {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (contactTurnstileReadyPromise) return contactTurnstileReadyPromise;

  contactTurnstileReadyPromise = new Promise((resolve, reject) => {
    const callbackName = 'alejandroContactTurnstileReady';
    window[callbackName] = () => resolve(window.turnstile);
    const script = document.createElement('script');
    script.src = `https://challenges.cloudflare.com/turnstile/v0/api.js?onload=${callbackName}&render=explicit`;
    script.async = true;
    script.defer = true;
    script.onerror = () => reject(new Error('Turnstile failed to load'));
    document.head.append(script);
  });

  return contactTurnstileReadyPromise;
};

const prepareContactTurnstile = async () => {
  if (!contactTurnstileContainer || contactTurnstileWidgetId !== null) return;
  try {
    const turnstile = await loadContactTurnstile();
    contactTurnstileWidgetId = turnstile.render(contactTurnstileContainer, {
      sitekey: isLocalPreview ? localTurnstileSiteKey : productionTurnstileSiteKey,
      action: 'contact',
      appearance: 'interaction-only',
      theme: 'light',
    });
  } catch {
    contactStatus.textContent = 'Spam protection could not load. Please try again or use the direct email link below.';
  }
};

const setContactSelection = (topic, interest) => {
  const normalizedTopic = contactRouteAliases[topic] || topic;
  const route = contactRoutes[normalizedTopic] || null;

  contactTopicInputs.forEach((input) => {
    input.checked = Boolean(route) && input.value === normalizedTopic;
    const option = input.closest('label');
    if (option) option.hidden = Boolean(route) && input.value !== normalizedTopic;
  });

  if (contactInterest) contactInterest.value = interest || '';
  contactTopicFieldset?.classList.toggle('is-selected', Boolean(route));
  if (contactChange) contactChange.hidden = !route;
  if (contactDetails) contactDetails.hidden = !route;
  contactDetailsControls.forEach((control) => {
    control.disabled = !route;
  });

  const isCollaboration = normalizedTopic === 'collaboration';
  if (contactCollaboration) contactCollaboration.hidden = !isCollaboration;
  if (contactCollaborationSelect) {
    contactCollaborationSelect.disabled = !isCollaboration;
    contactCollaborationSelect.required = isCollaboration;
    if (!isCollaboration) contactCollaborationSelect.value = '';
  }

  if (contactContext) {
    const prefix = interest ? `${interest}. ` : '';
    contactContext.textContent = route ? `${prefix}${route.guidance}` : '';
  }
  if (contactMessageLabel) contactMessageLabel.textContent = route?.label || 'Message';
  if (contactMessage) contactMessage.placeholder = route?.placeholder || 'Briefly describe what you would like to discuss.';
  if (route) prepareContactTurnstile();
};

setContactSelection('', '');

const openContact = ({ topic = '', interest = '', returnTarget = null } = {}) => {
  if (!contactDialog || !contactBackdrop) return;
  contactReturnTarget = returnTarget;
  setContactSelection(topic, interest);
  if (contactStartedAt) contactStartedAt.value = String(Date.now());
  contactStatus.textContent = '';
  contactDialog.hidden = false;
  contactBackdrop.hidden = false;
  document.body.classList.add('contact-dialog-open');
  contactOpeners.forEach((opener) => opener.setAttribute('aria-expanded', 'true'));
  window.setTimeout(() => {
    contactDialog.scrollTop = 0;
    contactClose?.focus();
  }, 0);
};

const closeContact = () => {
  if (!contactDialog || !contactBackdrop) return;
  contactDialog.hidden = true;
  contactBackdrop.hidden = true;
  document.body.classList.remove('contact-dialog-open');
  contactOpeners.forEach((opener) => opener.setAttribute('aria-expanded', 'false'));
  contactReturnTarget?.focus?.();
  contactReturnTarget = null;
};

contactOpeners.forEach((opener) => {
  opener.addEventListener('click', (event) => {
    event.preventDefault();
    openContact({
      topic: opener.dataset.contactTopic || '',
      interest: opener.dataset.contactInterest || '',
      returnTarget: opener,
    });
  });
});

contactTopicInputs.forEach((input) => {
  input.addEventListener('change', () => setContactSelection(input.value, ''));
});

contactChange?.addEventListener('click', () => {
  setContactSelection('', '');
  contactDialog.scrollTop = 0;
  contactTopicInputs[0]?.focus();
});

contactClose?.addEventListener('click', closeContact);
contactBackdrop?.addEventListener('click', closeContact);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && contactDialog && !contactDialog.hidden) closeContact();
});

contactForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  contactStatus.textContent = '';

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  if (isLocalPreview) {
    contactStatus.textContent = 'Local preview only. Your message was not sent.';
    return;
  }

  const endpoint = contactForm.dataset.contactEndpoint;
  if (!endpoint) {
    contactStatus.textContent = 'Message delivery is temporarily unavailable. Please use the direct email link below.';
    return;
  }

  const turnstileToken = window.turnstile && contactTurnstileWidgetId !== null
    ? window.turnstile.getResponse(contactTurnstileWidgetId)
    : '';
  if (!turnstileToken) {
    contactStatus.textContent = 'Please complete the spam-protection check and try again.';
    return;
  }

  const submitButton = contactForm.querySelector('button[type="submit"]');
  const payload = Object.fromEntries(new FormData(contactForm).entries());
  payload.turnstileToken = turnstileToken;
  submitButton.disabled = true;
  contactStatus.textContent = 'Sending…';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.ok) throw new Error('Delivery failed');
    contactForm.reset();
    setContactSelection('', '');
    if (contactStartedAt) contactStartedAt.value = String(Date.now());
    contactStatus.textContent = 'Thank you. Your enquiry has been sent.';
    if (window.turnstile && contactTurnstileWidgetId !== null) window.turnstile.reset(contactTurnstileWidgetId);
  } catch {
    contactStatus.textContent = 'The enquiry could not be sent. Please use the direct email link below.';
    if (window.turnstile && contactTurnstileWidgetId !== null) window.turnstile.reset(contactTurnstileWidgetId);
  } finally {
    submitButton.disabled = false;
  }
});

const contactParams = new URLSearchParams(window.location.search);
const requestedTopic = contactParams.get('topic');
const requestedInterest = contactParams.get('interest') || '';
const validRequestedTopic = ['engagement', 'role', 'collaboration', 'other', 'general', 'advisory', 'leadership'].includes(requestedTopic) ? requestedTopic : '';

if (window.location.pathname.replace(/\/+$/, '') === '/contact' || validRequestedTopic) {
  openContact({ topic: validRequestedTopic, interest: requestedInterest });
}
