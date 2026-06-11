import { initContactForm } from '../contact-form';

const INTENT_MAP: Record<string, string> = {
  proposal: 'Cohort Proposal Request',
  demo: 'Sponsor Demo',
  coverage: 'Country Coverage Question',
};

const select = document.getElementById('subject') as HTMLSelectElement | null;
const params = new URLSearchParams(window.location.search);
const intent = params.get('intent') ?? '';
const mapped = INTENT_MAP[intent];

if (select && mapped) {
  for (const opt of Array.from(select.options)) {
    if (opt.value === mapped) {
      opt.selected = true;
      break;
    }
  }
}

initContactForm({
  formId: 'ic-form',
  submitBtnId: 'submit-btn',
  successId: 'ic-success',
  errorId: 'ic-error',
  submitLabel: 'Send message',
  labelSelector: '.ic-submit-label',
  spinnerSelector: '.ic-submit-spinner',
});
