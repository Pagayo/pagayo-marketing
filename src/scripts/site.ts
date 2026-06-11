import { initNavCountryLabel } from './nav-country';

const NAV_MOBILE_BREAKPOINT = 768;
const MEGA_CLOSE_DELAY_MS = 300;

function isNavMobile(): boolean {
  return window.innerWidth <= NAV_MOBILE_BREAKPOINT;
}

function initNavOrganizationsMega(
  nav: HTMLElement,
  navToggle: HTMLButtonElement | null | undefined,
  closeNavMenu: () => void,
): void {
  const trigger = nav.querySelector<HTMLButtonElement>('[data-nav-mega-trigger]');
  const panel = nav.querySelector<HTMLElement>('[data-nav-mega-panel]');

  if (!trigger || !panel) return;

  let closeTimer: ReturnType<typeof setTimeout> | undefined;

  const clearCloseTimer = (): void => {
    if (closeTimer !== undefined) {
      clearTimeout(closeTimer);
      closeTimer = undefined;
    }
  };

  const setMegaOpen = (open: boolean): void => {
    nav.classList.toggle('nav-orgs-open', open);
    trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    panel.setAttribute('aria-hidden', open ? 'false' : 'true');
  };

  const openMega = (): void => {
    clearCloseTimer();
    setMegaOpen(true);
  };

  const closeMega = (): void => {
    clearCloseTimer();
    setMegaOpen(false);
  };

  const scheduleClose = (): void => {
    clearCloseTimer();
    closeTimer = setTimeout(closeMega, MEGA_CLOSE_DELAY_MS);
  };

  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (isNavMobile()) {
      if (!nav.classList.contains('open')) {
        nav.classList.add('open');
        navToggle?.setAttribute('aria-expanded', 'true');
      }
      setMegaOpen(!nav.classList.contains('nav-orgs-open'));
      return;
    }

    setMegaOpen(!nav.classList.contains('nav-orgs-open'));
  });

  trigger.addEventListener('mouseenter', () => {
    if (!isNavMobile()) openMega();
  });

  // Close only when the mouse leaves the entire <nav> element
  // (panel is a DOM child of nav, so moving from trigger → gap → cards
  // never triggers nav mouseleave)
  nav.addEventListener('mouseleave', () => {
    if (!isNavMobile()) scheduleClose();
  });

  nav.addEventListener('mouseenter', () => {
    if (!isNavMobile()) clearCloseTimer();
  });

  panel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeMega();
      closeNavMenu();
    });
  });

  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target as Node)) {
      closeMega();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMega();
    }
  });

  window.addEventListener('resize', () => {
    if (!isNavMobile()) {
      closeMega();
    }
  });
}

function initNav(): void {
  const nav = document.getElementById('nav');
  const navToggle = nav?.querySelector<HTMLButtonElement>('.nav-toggle');
  const navLinks = nav?.querySelector<HTMLElement>('.nav-links');

  const closeNavMenu = (): void => {
    if (!nav || !navToggle) return;
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  if (nav) {
    initNavOrganizationsMega(nav, navToggle, closeNavMenu);
  }

  if (navToggle && nav && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (!isOpen) {
        nav.classList.remove('nav-orgs-open');
        nav.querySelector('[data-nav-mega-trigger]')?.setAttribute('aria-expanded', 'false');
        nav.querySelector('[data-nav-mega-panel]')?.setAttribute('aria-hidden', 'true');
      }
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeNavMenu);
    });

    window.addEventListener('resize', () => {
      if (!isNavMobile()) {
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
