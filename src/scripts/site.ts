import { initNavCountryLabel } from './nav-country';

function initNav(): void {
  const nav = document.getElementById('nav');
  const navToggle = nav?.querySelector<HTMLButtonElement>('.nav-toggle');
  const navLinks = nav?.querySelector<HTMLElement>('.nav-links');

  const closeNavMenu = (): void => {
    if (!nav || !navToggle) return;
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  if (navToggle && nav && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeNavMenu);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        closeNavMenu();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeNavMenu();
      }
    });
  }

  const updateNavScrolled = (): void => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
  };

  updateNavScrolled();
  window.addEventListener('scroll', updateNavScrolled, { passive: true });
}

function initFadeIn(): void {
  const faders = document.querySelectorAll('.fade-in');
  if (faders.length === 0) return;

  const appearOnScroll = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' },
  );

  faders.forEach((fader) => appearOnScroll.observe(fader));
}

initNav();
initFadeIn();
initNavCountryLabel();
