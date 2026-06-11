type ContactFormOptions = {
  formId: string;
  submitBtnId: string;
  successId: string;
  errorId: string;
  submitLabel: string;
  labelSelector: string;
  spinnerSelector: string;
};

export function initContactForm(options: ContactFormOptions): void {
  const form = document.getElementById(options.formId) as HTMLFormElement | null;
  const submitBtn = document.getElementById(options.submitBtnId) as HTMLButtonElement | null;
  const submitLabel = submitBtn?.querySelector<HTMLElement>(options.labelSelector);
  const submitSpinner = submitBtn?.querySelector<HTMLElement>(options.spinnerSelector);
  const successEl = document.getElementById(options.successId) as HTMLElement | null;
  const errorEl = document.getElementById(options.errorId) as HTMLElement | null;

  if (!form || !submitBtn || !submitLabel || !submitSpinner || !successEl || !errorEl) {
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    successEl.hidden = true;
    errorEl.hidden = true;

    submitBtn.disabled = true;
    submitLabel.textContent = 'Sending…';
    submitSpinner.hidden = false;

    const data: Record<string, string> = {};
    new FormData(form).forEach((value, key) => {
      data[key] = value.toString();
    });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = (await response.json()) as { success: boolean };

      if (result.success) {
        form.reset();
        successEl.hidden = false;
        successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        errorEl.hidden = false;
      }
    } catch {
      errorEl.hidden = false;
    } finally {
      submitBtn.disabled = false;
      submitLabel.textContent = options.submitLabel;
      submitSpinner.hidden = true;
    }
  });
}
