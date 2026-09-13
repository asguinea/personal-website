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
const contactTopicInputs = [...document.querySelectorAll('input[name="topic"]')];
const contactTopicFieldset = document.querySelector('.unified-contact-topic');
const contactChange = document.querySelector('.unified-contact-change');
const contactDetails = document.querySelector('.unified-contact-details');
const contactDetailsControls = [...document.querySelectorAll('.unified-contact-details input, .unified-contact-details textarea, .unified-contact-details select, .unified-contact-details button')];
const contactCollaboration = document.querySelector('.unified-contact-collaboration');
const contactCollaborationSelect = document.querySelector('#unified-contact-collaboration-area');
const contactMessageLabel = document.querySelector('.unified-contact-message-label');
const contactMessage = document.querySelector('#unified-contact-message');
const contactOpeners = [...document.querySelectorAll('.js-contact-open')];
let contactReturnTarget = null;

const contactTopicLabels = {
  engagement: 'Advisory engagement',
  role: 'Role or leadership opportunity',
  collaboration: 'Venture or research collaboration',
  other: 'Professional enquiry',
};

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
};

setContactSelection('', '');

const openContact = ({ topic = '', interest = '', returnTarget = null } = {}) => {
  if (!contactDialog || !contactBackdrop) return;
  contactReturnTarget = returnTarget;
  setContactSelection(topic, interest);
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

  const endpoint = contactForm.dataset.contactEndpoint;
  const contactEmail = contactForm.dataset.contactEmail;
  if (!endpoint) {
    const payload = Object.fromEntries(new FormData(contactForm).entries());
    if (payload.confirmation) {
      contactForm.reset();
      setContactSelection('', '');
      contactStatus.textContent = 'Thank you. Your enquiry has been prepared.';
      return;
    }
    if (!contactEmail) {
      contactStatus.textContent = 'Email delivery is unavailable. Please use the direct email link below.';
      return;
    }

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
    const subjectParts = [contactTopicLabels[payload.topic] || 'Professional enquiry'];
    if (payload.organisation) subjectParts.push(payload.organisation);
    const bodyLines = [
      `Contact route: ${contactTopicLabels[payload.topic] || payload.topic}`,
      payload.interest ? `Area of interest: ${payload.interest}` : '',
      payload.collaboration_area ? `Collaboration area: ${collaborationLabels[payload.collaboration_area] || payload.collaboration_area}` : '',
      '',
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Role: ${payload.role}`,
      `Organisation or project: ${payload.organisation}`,
      payload.project_url ? `Website: ${payload.project_url}` : '',
      `Expected timeframe: ${timeframeLabels[payload.timeframe] || payload.timeframe}`,
      '',
      `${contactRoutes[payload.topic]?.label || 'Message'}:`,
      payload.message,
    ].filter((line, index, lines) => line || (index > 0 && lines[index - 1]));

    const mailto = `mailto:${contactEmail}?subject=${encodeURIComponent(subjectParts.join(' | '))}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
    contactStatus.textContent = 'Your email app should open with the enquiry prepared. Review it and send when ready.';
    window.location.href = mailto;
    return;
  }

  const submitButton = contactForm.querySelector('button[type="submit"]');
  const payload = Object.fromEntries(new FormData(contactForm).entries());
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
    contactStatus.textContent = 'Thank you. Your enquiry has been sent.';
  } catch {
    contactStatus.textContent = 'The enquiry could not be sent. Please use the LinkedIn link below.';
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
