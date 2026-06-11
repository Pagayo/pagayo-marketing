import { initContactForm } from '../contact-form';

initContactForm({
  formId: 'contact-form',
  submitBtnId: 'submit-btn',
  successId: 'ct-success',
  errorId: 'ct-error',
  submitLabel: 'Send message',
  labelSelector: '.ct-submit-label',
  spinnerSelector: '.ct-submit-spinner',
});
