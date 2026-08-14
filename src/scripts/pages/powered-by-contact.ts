const form = document.getElementById('pbc-form') as HTMLFormElement | null;
const submitBtn = document.getElementById('pbc-submit-btn') as HTMLButtonElement | null;
const submitLabel = submitBtn?.querySelector<HTMLElement>('.pbc-submit-label');
const submitSpinner = submitBtn?.querySelector<HTMLElement>('.pbc-submit-spinner');
const successEl = document.getElementById('pbc-success') as HTMLElement | null;
const errorEl = document.getElementById('pbc-error') as HTMLElement | null;
const intentSelect = document.getElementById('pbc-intent') as HTMLSelectElement | null;

const params = new URLSearchParams(window.location.search);
const intentParam = params.get('intent') ?? '';

if (intentSelect && intentParam) {
  for (const opt of Array.from(intentSelect.options)) {
    if (opt.value === intentParam) {
      opt.selected = true;
      break;
    }
  }
}

if (!form || !submitBtn || !submitLabel || !submitSpinner || !successEl || !errorEl) {
  throw new Error('Powered by contact form elements missing');
}

const defaultSubmitLabel = submitLabel.textContent ?? 'Send enquiry →';
const sendingLabel = submitBtn.dataset.sendingLabel ?? 'Sending…';

function labelForSelect(select: HTMLSelectElement | null, value: string): string {
  if (!select || !value) return value;
  const match = Array.from(select.options).find((opt) => opt.value === value);
  return match?.textContent?.trim() ?? value;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  successEl.hidden = true;
  errorEl.hidden = true;

  submitBtn.disabled = true;
  submitLabel.textContent = sendingLabel;
  submitSpinner.hidden = false;

  const formData = new FormData(form);
  const intentValue = formData.get('intent')?.toString().trim() ?? '';
  const intentLabel = labelForSelect(intentSelect, intentValue);
  const sectorLabel = labelForSelect(
    document.getElementById('pbc-sector') as HTMLSelectElement | null,
    formData.get('sector')?.toString().trim() ?? '',
  );
  const sizeLabel = labelForSelect(
    document.getElementById('pbc-size') as HTMLSelectElement | null,
    formData.get('network_size')?.toString().trim() ?? '',
  );

  const payload: Record<string, string> = {
    form_type: 'powered-by',
    name: formData.get('name')?.toString().trim() ?? '',
    email: formData.get('email')?.toString().trim() ?? '',
    organisation: formData.get('organisation')?.toString().trim() ?? '',
    subject: intentLabel
      ? `Powered by Pagayo — ${intentLabel}`
      : 'Powered by Pagayo — Network enquiry',
    message: formData.get('message')?.toString().trim() ?? '',
    website: formData.get('website')?.toString() ?? '',
  };

  if (sectorLabel) payload.sector = sectorLabel;
  if (sizeLabel) payload.network_size = sizeLabel;
  if (intentLabel) payload.intent = intentLabel;

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
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
    submitLabel.textContent = defaultSubmitLabel;
    submitSpinner.hidden = true;
  }
});
