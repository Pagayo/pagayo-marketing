import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 14 Engelstalige landen (zonder existing: us, ca)
const englishCountries = [
  {
    code: 'jm',
    name: 'Jamaica',
    currency: 'JMD',
    locale: 'en-JM',
    shippingCarrier: 'Jamaica Post',
    cities: ['Kingston', 'Montego Bay', 'Spanish Town'],
  },
  {
    code: 'tt',
    name: 'Trinidad and Tobago',
    currency: 'TTD',
    locale: 'en-TT',
    shippingCarrier: 'TTPost',
    cities: ['Port of Spain', 'San Fernando', 'Chaguanas'],
  },
  {
    code: 'bz',
    name: 'Belize',
    currency: 'BZD',
    locale: 'en-BZ',
    shippingCarrier: 'Belize Postal Service',
    cities: ['Belize City', 'San Ignacio', 'Orange Walk'],
  },
  {
    code: 'gy',
    name: 'Guyana',
    currency: 'GYD',
    locale: 'en-GY',
    shippingCarrier: 'Guyana Post Office',
    cities: ['Georgetown', 'Linden', 'New Amsterdam'],
  },
  {
    code: 'bs',
    name: 'Bahamas',
    currency: 'BSD',
    locale: 'en-BS',
    shippingCarrier: 'Bahamas Postal Service',
    cities: ['Nassau', 'Freeport', 'West End'],
  },
  {
    code: 'bb',
    name: 'Barbados',
    currency: 'BBD',
    locale: 'en-BB',
    shippingCarrier: 'Barbados Postal Service',
    cities: ['Bridgetown', 'Speightstown', 'Oistins'],
  },
  {
    code: 'gd',
    name: 'Grenada',
    currency: 'XCD',
    locale: 'en-GD',
    shippingCarrier: 'Grenada Postal Corporation',
    cities: ['St. Georges', 'Gouyave', 'Grenville'],
  },
  {
    code: 'lc',
    name: 'Saint Lucia',
    currency: 'XCD',
    locale: 'en-LC',
    shippingCarrier: 'Saint Lucia Postal Service',
    cities: ['Castries', 'Vieux Fort', 'Soufrière'],
  },
  {
    code: 'vc',
    name: 'Saint Vincent and the Grenadines',
    currency: 'XCD',
    locale: 'en-VC',
    shippingCarrier: 'SVG Postal Corporation',
    cities: ['Kingstown', 'Georgetown', 'Barrouallie'],
  },
  {
    code: 'ag',
    name: 'Antigua and Barbuda',
    currency: 'XCD',
    locale: 'en-AG',
    shippingCarrier: 'Antigua & Barbuda Postal Service',
    cities: ['St. Johns', 'All Saints', 'Liberta'],
  },
  {
    code: 'dm',
    name: 'Dominica',
    currency: 'XCD',
    locale: 'en-DM',
    shippingCarrier: 'Dominica Postal Services',
    cities: ['Roseau', 'Portsmouth', 'Marigot'],
  },
  {
    code: 'kn',
    name: 'Saint Kitts and Nevis',
    currency: 'XCD',
    locale: 'en-KN',
    shippingCarrier: 'St. Kitts & Nevis Postal Services',
    cities: ['Basseterre', 'Charlestown', 'Dieppe Bay Town'],
  },
];

// 15 Spaanstalige landen (zonder existing: mx, ar, cl, co, pe)
const spanishCountries = [
  {
    code: 'cr',
    name: 'Costa Rica',
    currency: 'CRC',
    locale: 'es-CR',
    shippingCarrier: 'Correos de Costa Rica',
    cities: ['San José', 'Alajuela', 'Cartago'],
  },
  {
    code: 'ec',
    name: 'Ecuador',
    currency: 'USD',
    locale: 'es-EC',
    shippingCarrier: 'Correos del Ecuador',
    cities: ['Quito', 'Guayaquil', 'Cuenca'],
  },
  {
    code: 'sv',
    name: 'El Salvador',
    currency: 'USD',
    locale: 'es-SV',
    shippingCarrier: 'Correos de El Salvador',
    cities: ['San Salvador', 'Santa Ana', 'San Miguel'],
  },
  {
    code: 'gt',
    name: 'Guatemala',
    currency: 'GTQ',
    locale: 'es-GT',
    shippingCarrier: 'El Correo de Guatemala',
    cities: ['Guatemala City', 'Mixco', 'Villa Nueva'],
  },
  {
    code: 'hn',
    name: 'Honduras',
    currency: 'HNL',
    locale: 'es-HN',
    shippingCarrier: 'Honducor',
    cities: ['Tegucigalpa', 'San Pedro Sula', 'Choloma'],
  },
  {
    code: 'pa',
    name: 'Panama',
    currency: 'PAB',
    locale: 'es-PA',
    shippingCarrier: 'Correos y Telégrafos',
    cities: ['Panama City', 'San Miguelito', 'Tocumen'],
  },
  {
    code: 'py',
    name: 'Paraguay',
    currency: 'PYG',
    locale: 'es-PY',
    shippingCarrier: 'Correo Paraguayo',
    cities: ['Asunción', 'Ciudad del Este', 'San Lorenzo'],
  },
  {
    code: 'uy',
    name: 'Uruguay',
    currency: 'UYU',
    locale: 'es-UY',
    shippingCarrier: 'Correo Uruguayo',
    cities: ['Montevideo', 'Salto', 'Paysandú'],
  },
  {
    code: 'bo',
    name: 'Bolivia',
    currency: 'BOB',
    locale: 'es-BO',
    shippingCarrier: 'ECOBOL',
    cities: ['La Paz', 'Santa Cruz', 'Cochabamba'],
  },
  {
    code: 'do',
    name: 'Dominican Republic',
    currency: 'DOP',
    locale: 'es-DO',
    shippingCarrier: 'INPOSDOM',
    cities: ['Santo Domingo', 'Santiago', 'La Romana'],
  },
  {
    code: 'ni',
    name: 'Nicaragua',
    currency: 'NIO',
    locale: 'es-NI',
    shippingCarrier: 'Correos de Nicaragua',
    cities: ['Managua', 'León', 'Masaya'],
  },
  {
    code: 've',
    name: 'Venezuela',
    currency: 'VES',
    locale: 'es-VE',
    shippingCarrier: 'IPOSTEL',
    cities: ['Caracas', 'Maracaibo', 'Valencia'],
  },
  {
    code: 'cu',
    name: 'Cuba',
    currency: 'CUP',
    locale: 'es-CU',
    shippingCarrier: 'Correos de Cuba',
    cities: ['Havana', 'Santiago de Cuba', 'Camagüey'],
  },
];

// 3 Andere talen (zonder existing: br)
const otherLanguageCountries = [
  // Nederlands (Suriname)
  {
    code: 'sr',
    name: 'Suriname',
    currency: 'SRD',
    locale: 'nl-SR',
    language: 'nl',
    shippingCarrier: 'Post Suriname',
    cities: ['Paramaribo', 'Lelydorp', 'Nieuw Nickerie'],
    nav: { features: 'Functies', pricing: 'Prijzen', blog: 'Blog', contact: 'Contact' },
    footer: {
      features: 'Functies',
      pricing: 'Prijzen',
      about: 'Over ons',
      blog: 'Blog',
      contact: 'Contact',
      privacy: 'Privacy',
      terms: 'Voorwaarden',
      copyright: 'Alle rechten voorbehouden',
    },
  },
  // Frans/Creools (Haïti)
  {
    code: 'ht',
    name: 'Haiti',
    currency: 'HTG',
    locale: 'fr-HT',
    language: 'fr',
    shippingCarrier: "La Poste d'Haïti",
    cities: ['Port-au-Prince', 'Cap-Haïtien', 'Gonaïves'],
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
  // Frans (Frans-Guyana)
  {
    code: 'gf',
    name: 'French Guiana',
    currency: 'EUR',
    locale: 'fr-GF',
    language: 'fr',
    shippingCarrier: 'La Poste',
    cities: ['Cayenne', 'Saint-Laurent-du-Maroni', 'Kourou'],
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

// Generate English countries
englishCountries.forEach((country) => {
  const config = {
    code: country.code,
    name: country.name,
    region: 'am',
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
      software: ['QuickBooks', 'Xero', 'FreshBooks'],
    },
  };

  const filePath = path.join(outputDir, `${country.code}.json`);
  fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
  count++;
});

// Generate Spanish countries
spanishCountries.forEach((country) => {
  const config = {
    code: country.code,
    name: country.name,
    region: 'am',
    currency: country.currency,
    locale: country.locale,
    language: 'es',
    nav: {
      features: 'Funcionalidades',
      pricing: 'Precios',
      blog: 'Blog',
      contact: 'Contacto',
    },
    footer: {
      sections: [
        {
          title: 'Producto',
          links: [
            { label: 'Funcionalidades', path: '/features' },
            { label: 'Precios', path: '/pricing' },
            { label: 'Seguridad', path: '/security' },
          ],
        },
        {
          title: 'Empresa',
          links: [
            { label: 'Acerca de', path: '/about' },
            { label: 'Blog', path: '/blog' },
            { label: 'Carreras', path: '/careers' },
          ],
        },
        {
          title: 'Soporte',
          links: [
            { label: 'Centro de ayuda', path: '/help' },
            { label: 'Contacto', path: '/contact' },
            { label: 'Estado', path: '/status' },
          ],
        },
        {
          title: 'Legal',
          links: [
            { label: 'Privacidad', path: '/privacy' },
            { label: 'Términos', path: '/terms' },
            { label: 'Cookies', path: '/cookies' },
          ],
        },
      ],
      tagline: `Comercio electrónico simple para ${country.name}`,
      copyright: '© {year} Pagayo. Todos los derechos reservados.',
    },
    meta: {
      title: `Pagayo ${country.name} - Plataforma de Comercio Electrónico`,
      description: `Plataforma profesional de comercio electrónico para ${country.name}. Pagos, envíos y soporte localizados.`,
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
      software: ['QuickBooks', 'Xero'],
    },
  };

  const filePath = path.join(outputDir, `${country.code}.json`);
  fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
  count++;
});

// Generate other language countries
otherLanguageCountries.forEach((country) => {
  const config = {
    code: country.code,
    name: country.name,
    region: 'am',
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
      tagline: `E-commerce made simple for ${country.name}`,
      copyright: `${country.footer.copyright} {year} Pagayo`,
    },
    meta: {
      title: `Pagayo ${country.name} - E-commerce Platform`,
      description: `Professional e-commerce platform for ${country.name}. Localized payments, shipping, and support.`,
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

console.log(`✅ Total: ${count} Americas countries created`);
