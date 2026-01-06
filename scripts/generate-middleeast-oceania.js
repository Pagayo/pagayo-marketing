import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== MIDDLE EAST =====

// 11 Arabische landen (zonder existing: ae, sa, qa, kw, bh, om)
const arabicCountries = [
  {
    code: 'jo',
    name: 'Jordan',
    currency: 'JOD',
    locale: 'ar-JO',
    shippingCarrier: 'Jordan Post',
    cities: ['Amman', 'Irbid', 'Zarqa'],
  },
  {
    code: 'lb',
    name: 'Lebanon',
    currency: 'LBP',
    locale: 'ar-LB',
    shippingCarrier: 'LibanPost',
    cities: ['Beirut', 'Tripoli', 'Sidon'],
  },
  {
    code: 'iq',
    name: 'Iraq',
    currency: 'IQD',
    locale: 'ar-IQ',
    shippingCarrier: 'Iraqi Company for Post',
    cities: ['Baghdad', 'Basra', 'Mosul'],
  },
  {
    code: 'ye',
    name: 'Yemen',
    currency: 'YER',
    locale: 'ar-YE',
    shippingCarrier: 'Yemen Post',
    cities: ['Sanaa', 'Aden', 'Taiz'],
  },
  {
    code: 'ps',
    name: 'Palestine',
    currency: 'ILS',
    locale: 'ar-PS',
    shippingCarrier: 'Palestinian Post',
    cities: ['Ramallah', 'Gaza', 'Nablus'],
  },
];

// 2 Andere talen (zonder existing: tr, il)
const middleEastOtherLanguages = [];

// ===== OCEANIA =====

// 14 Engelstalige landen (zonder existing: au, nz)
const oceaniaEnglishCountries = [
  {
    code: 'fj',
    name: 'Fiji',
    currency: 'FJD',
    locale: 'en-FJ',
    shippingCarrier: 'Post Fiji',
    cities: ['Suva', 'Lautoka', 'Nadi'],
  },
  {
    code: 'pg',
    name: 'Papua New Guinea',
    currency: 'PGK',
    locale: 'en-PG',
    shippingCarrier: 'PNG Post',
    cities: ['Port Moresby', 'Lae', 'Mount Hagen'],
  },
  {
    code: 'ws',
    name: 'Samoa',
    currency: 'WST',
    locale: 'en-WS',
    shippingCarrier: 'Samoa Post',
    cities: ['Apia', 'Vaitele', 'Faleula'],
  },
  {
    code: 'vu',
    name: 'Vanuatu',
    currency: 'VUV',
    locale: 'en-VU',
    shippingCarrier: 'Vanuatu Post',
    cities: ['Port Vila', 'Luganville', 'Lakatoro'],
  },
  {
    code: 'to',
    name: 'Tonga',
    currency: 'TOP',
    locale: 'en-TO',
    shippingCarrier: 'Tonga Post',
    cities: ['Nukuʻalofa', 'Neiafu', 'Haveluloto'],
  },
  {
    code: 'ki',
    name: 'Kiribati',
    currency: 'AUD',
    locale: 'en-KI',
    shippingCarrier: 'Kiribati Post',
    cities: ['Tarawa', 'Betio', 'Bikenibeu'],
  },
  {
    code: 'mh',
    name: 'Marshall Islands',
    currency: 'USD',
    locale: 'en-MH',
    shippingCarrier: 'Marshall Islands Postal Service',
    cities: ['Majuro', 'Ebeye', 'Arno'],
  },
  {
    code: 'fm',
    name: 'Micronesia',
    currency: 'USD',
    locale: 'en-FM',
    shippingCarrier: 'FSM Postal Services',
    cities: ['Palikir', 'Weno', 'Kolonia'],
  },
  {
    code: 'pw',
    name: 'Palau',
    currency: 'USD',
    locale: 'en-PW',
    shippingCarrier: 'Palau Postal Service',
    cities: ['Ngerulmud', 'Koror', 'Melekeok'],
  },
  {
    code: 'nr',
    name: 'Nauru',
    currency: 'AUD',
    locale: 'en-NR',
    shippingCarrier: 'Nauru Post',
    cities: ['Yaren', 'Denigomodu', 'Aiwo'],
  },
  {
    code: 'sb',
    name: 'Solomon Islands',
    currency: 'SBD',
    locale: 'en-SB',
    shippingCarrier: 'Solomon Islands Postal Corporation',
    cities: ['Honiara', 'Gizo', 'Auki'],
  },
  {
    code: 'tv',
    name: 'Tuvalu',
    currency: 'AUD',
    locale: 'en-TV',
    shippingCarrier: 'Tuvalu Post',
    cities: ['Funafuti', 'Vaiaku', 'Alapi'],
  },
];

// 2 Franse gebieden
const oceaniaOtherLanguages = [
  {
    code: 'pf',
    name: 'French Polynesia',
    currency: 'XPF',
    locale: 'fr-PF',
    language: 'fr',
    shippingCarrier: 'OPT Polynésie',
    cities: ['Papeete', 'Faaa', 'Punaauia'],
    nav: { features: 'Fonctionnalités', pricing: 'Tarifs', blog: 'Blog', contact: 'Contact' },
    footer: {
      features: 'Fonctionnalités',
      pricing: 'Tarifs',
      about: 'À propos',
      blog: 'Blog',
      contact: 'Contact',
      privacy: 'Confidentialité',
      terms: 'Conditions',
      copyright: 'Tous droits réservés',
    },
  },
  {
    code: 'nc',
    name: 'New Caledonia',
    currency: 'XPF',
    locale: 'fr-NC',
    language: 'fr',
    shippingCarrier: 'OPT Nouvelle-Calédonie',
    cities: ['Nouméa', 'Dumbéa', 'Mont-Dore'],
    nav: { features: 'Fonctionnalités', pricing: 'Tarifs', blog: 'Blog', contact: 'Contact' },
    footer: {
      features: 'Fonctionnalités',
      pricing: 'Tarifs',
      about: 'À propos',
      blog: 'Blog',
      contact: 'Contact',
      privacy: 'Confidentialité',
      terms: 'Conditions',
      copyright: 'Tous droits réservés',
    },
  },
];

const outputDir = path.join(__dirname, '..', 'src', 'data', 'countries');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

let count = 0;

// ===== MIDDLE EAST - Arabic countries =====
arabicCountries.forEach((country) => {
  const config = {
    code: country.code,
    name: country.name,
    region: 'me',
    currency: country.currency,
    locale: country.locale,
    language: 'ar',
    direction: 'rtl',
    nav: {
      features: 'الميزات',
      pricing: 'التسعير',
      blog: 'المدونة',
      contact: 'اتصل',
    },
    footer: {
      sections: [
        {
          title: 'المنتج',
          links: [
            { label: 'الميزات', path: '/features' },
            { label: 'التسعير', path: '/pricing' },
            { label: 'الأمان', path: '/security' },
          ],
        },
        {
          title: 'الشركة',
          links: [
            { label: 'عن الشركة', path: '/about' },
            { label: 'المدونة', path: '/blog' },
            { label: 'الوظائف', path: '/careers' },
          ],
        },
        {
          title: 'الدعم',
          links: [
            { label: 'مركز المساعدة', path: '/help' },
            { label: 'اتصل', path: '/contact' },
            { label: 'الحالة', path: '/status' },
          ],
        },
        {
          title: 'قانوني',
          links: [
            { label: 'الخصوصية', path: '/privacy' },
            { label: 'الشروط', path: '/terms' },
            { label: 'ملفات تعريف الارتباط', path: '/cookies' },
          ],
        },
      ],
      tagline: `التجارة الإلكترونية المبسطة لـ${country.name}`,
      copyright: '© {year} Pagayo. جميع الحقوق محفوظة.',
    },
    meta: {
      title: `Pagayo ${country.name} - منصة التجارة الإلكترونية`,
      description: `منصة تجارة إلكترونية احترافية لـ${country.name}. مدفوعات وشحن ودعم محلي.`,
    },
    payment: {
      providers: ['Stripe'],
      localMethods: [],
    },
    shipping: {
      carriers: [country.shippingCarrier, 'DHL', 'Aramex'],
      cities: country.cities,
    },
    accounting: {
      software: ['QuickBooks', 'Xero'],
    },
  };

  const filePath = path.join(outputDir, `${country.code}.json`);
  fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
  count++;
});

// ===== OCEANIA - English countries =====
oceaniaEnglishCountries.forEach((country) => {
  const config = {
    code: country.code,
    name: country.name,
    region: 'oc',
    currency: country.currency,
    locale: country.locale,
    language: 'en',
    nav: {
      features: 'Features',
      pricing: 'Pricing',
      blog: 'Blog',
      contact: 'Contact',
    },
    footer: {
      sections: [
        {
          title: 'Product',
          links: [
            { label: 'Features', path: '/features' },
            { label: 'Pricing', path: '/pricing' },
            { label: 'Security', path: '/security' },
          ],
        },
        {
          title: 'Company',
          links: [
            { label: 'About', path: '/about' },
            { label: 'Blog', path: '/blog' },
            { label: 'Careers', path: '/careers' },
          ],
        },
        {
          title: 'Support',
          links: [
            { label: 'Help Center', path: '/help' },
            { label: 'Contact', path: '/contact' },
            { label: 'Status', path: '/status' },
          ],
        },
        {
          title: 'Legal',
          links: [
            { label: 'Privacy', path: '/privacy' },
            { label: 'Terms', path: '/terms' },
            { label: 'Cookies', path: '/cookies' },
          ],
        },
      ],
      tagline: 'E-commerce made simple for {country}',
      copyright: '© {year} Pagayo. All rights reserved.',
    },
    meta: {
      title: 'Pagayo {country} - E-commerce Platform',
      description:
        'Professional e-commerce platform for {country}. Localized payments, shipping, and support.',
    },
    payment: {
      providers: ['Stripe', 'PayPal'],
      localMethods: [],
    },
    shipping: {
      carriers: [country.shippingCarrier, 'DHL', 'FedEx'],
      cities: country.cities,
    },
    accounting: {
      software: ['QuickBooks', 'Xero', 'MYOB'],
    },
  };

  const filePath = path.join(outputDir, `${country.code}.json`);
  fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
  count++;
});

// ===== OCEANIA - French territories =====
oceaniaOtherLanguages.forEach((country) => {
  const config = {
    code: country.code,
    name: country.name,
    region: 'oc',
    currency: country.currency,
    locale: country.locale,
    language: country.language,
    nav: country.nav,
    footer: {
      sections: [
        {
          title: country.footer.features,
          links: [
            { label: country.footer.features, path: '/features' },
            { label: country.footer.pricing, path: '/pricing' },
          ],
        },
        {
          title: country.footer.about,
          links: [
            { label: country.footer.about, path: '/about' },
            { label: country.footer.blog, path: '/blog' },
          ],
        },
        {
          title: country.footer.contact,
          links: [{ label: country.footer.contact, path: '/contact' }],
        },
        {
          title: country.footer.privacy,
          links: [
            { label: country.footer.privacy, path: '/privacy' },
            { label: country.footer.terms, path: '/terms' },
          ],
        },
      ],
      tagline: `Plateforme e-commerce pour ${country.name}`,
      copyright: `${country.footer.copyright} {year} Pagayo`,
    },
    meta: {
      title: `Pagayo ${country.name} - Plateforme E-commerce`,
      description: `Plateforme e-commerce professionnelle pour ${country.name}. Paiements, livraison et support localisés.`,
    },
    payment: {
      providers: ['Stripe', 'PayPal'],
      localMethods: [],
    },
    shipping: {
      carriers: [country.shippingCarrier, 'DHL'],
      cities: country.cities,
    },
    accounting: {
      software: ['QuickBooks', 'Xero'],
    },
  };

  const filePath = path.join(outputDir, `${country.code}.json`);
  fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
  count++;
});

console.log(`✅ Total: ${count} countries created (5 Middle East + 14 Oceania)`);
