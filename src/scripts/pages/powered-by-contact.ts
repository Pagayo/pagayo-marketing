const select = document.getElementById('pbc-intent') as HTMLSelectElement | null;
const params = new URLSearchParams(window.location.search);
const intent = params.get('intent') ?? '';

if (select && intent) {
  for (const opt of Array.from(select.options)) {
    if (opt.value === intent) {
      opt.selected = true;
      break;
    }
  }
}
