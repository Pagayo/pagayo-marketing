#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const countries = {
  // Engelstalig resterende
  sl: { name: 'Sierra Leone', currency: 'SLL', locale: 'en-SL', lang: 'English' },
  lr: { name: 'Liberia', currency: 'LRD', locale: 'en-LR', lang: 'English' },
  gm: { name: 'Gambia', currency: 'GMD', locale: 'en-GM', lang: 'English' },
  ls: { name: 'Lesotho', currency: 'LSL', locale: 'en-LS', lang: 'English' },
  sz: { name: 'Eswatini', currency: 'SZL', locale: 'en-SZ', lang: 'English' },
  mw: { name: 'Malawi', currency: 'MWK', locale: 'en-MW', lang: 'English' },
  ss: { name: 'South Sudan', currency: 'SSP', locale: 'en-SS', lang: 'English' },

  // Franstalig
  sn: { name: 'Sénégal', currency: 'XOF', locale: 'fr-SN', lang: 'Français' },
  ci: { name: "Côte d'Ivoire", currency: 'XOF', locale: 'fr-CI', lang: 'Français' },
  cm: { name: 'Cameroun', currency: 'XAF', locale: 'fr-CM', lang: 'Français' },
  mg: { name: 'Madagascar', currency: 'MGA', locale: 'fr-MG', lang: 'Français' },
  ml: { name: 'Mali', currency: 'XOF', locale: 'fr-ML', lang: 'Français' },
  bf: { name: 'Burkina Faso', currency: 'XOF', locale: 'fr-BF', lang: 'Français' },
  ne: { name: 'Niger', currency: 'XOF', locale: 'fr-NE', lang: 'Français' },
  bj: { name: 'Bénin', currency: 'XOF', locale: 'fr-BJ', lang: 'Français' },
  tg: { name: 'Togo', currency: 'XOF', locale: 'fr-TG', lang: 'Français' },
  gn: { name: 'Guinée', currency: 'GNF', locale: 'fr-GN', lang: 'Français' },
  td: { name: 'Tchad', currency: 'XAF', locale: 'fr-TD', lang: 'Français' },
  cg: { name: 'Congo-Brazzaville', currency: 'XAF', locale: 'fr-CG', lang: 'Français' },
  cd: { name: 'RD Congo', currency: 'CDF', locale: 'fr-CD', lang: 'Français' },
  ga: { name: 'Gabon', currency: 'XAF', locale: 'fr-GA', lang: 'Français' },
  dj: { name: 'Djibouti', currency: 'DJF', locale: 'fr-DJ', lang: 'Français' },
  cf: { name: 'République centrafricaine', currency: 'XAF', locale: 'fr-CF', lang: 'Français' },
  bi: { name: 'Burundi', currency: 'BIF', locale: 'fr-BI', lang: 'Français' },

  // Arabisch
  eg: { name: 'مصر', currency: 'EGP', locale: 'ar-EG', lang: 'العربية', nameEn: 'Egypt' },
  ma: { name: 'المغرب', currency: 'MAD', locale: 'ar-MA', lang: 'العربية', nameEn: 'Morocco' },
  dz: { name: 'الجزائر', currency: 'DZD', locale: 'ar-DZ', lang: 'العربية', nameEn: 'Algeria' },
  tn: { name: 'تونس', currency: 'TND', locale: 'ar-TN', lang: 'العربية', nameEn: 'Tunisia' },
  ly: { name: 'ليبيا', currency: 'LYD', locale: 'ar-LY', lang: 'العربية', nameEn: 'Libya' },
  sd: { name: 'السودان', currency: 'SDG', locale: 'ar-SD', lang: 'العربية', nameEn: 'Sudan' },
  mr: {
    name: 'موريتانيا',
    currency: 'MRU',
    locale: 'ar-MR',
    lang: 'العربية',
    nameEn: 'Mauritania',
  },
  km: { name: 'جزر القمر', currency: 'KMF', locale: 'ar-KM', lang: 'العربية', nameEn: 'Comoros' },
  so: { name: 'الصومال', currency: 'SOS', locale: 'ar-SO', lang: 'العربية', nameEn: 'Somalia' },

  // Portugees
  ao: { name: 'Angola', currency: 'AOA', locale: 'pt-AO', lang: 'Português' },
  mz: { name: 'Moçambique', currency: 'MZN', locale: 'pt-MZ', lang: 'Português' },
  cv: { name: 'Cabo Verde', currency: 'CVE', locale: 'pt-CV', lang: 'Português' },
  st: { name: 'São Tomé e Príncipe', currency: 'STN', locale: 'pt-ST', lang: 'Português' },
  gw: { name: 'Guiné-Bissau', currency: 'XOF', locale: 'pt-GW', lang: 'Português' },

  // Andere talen
  et: { name: 'ኢትዮጵያ', currency: 'ETB', locale: 'am-ET', lang: 'አማርኛ', nameEn: 'Ethiopia' },
  er: { name: 'ኤርትራ', currency: 'ERN', locale: 'ti-ER', lang: 'ትግርኛ', nameEn: 'Eritrea' },
  gq: { name: 'Guinea Ecuatorial', currency: 'XAF', locale: 'es-GQ', lang: 'Español' },
};

const createConfig = (code, data) => {
  const isArabic = data.locale.startsWith('ar-');
  const isFrench = data.locale.startsWith('fr-');
  const isPortuguese = data.locale.startsWith('pt-');
  const isSpanish = data.locale.startsWith('es-');
  const isAmharic = data.locale.startsWith('am-');
  const isTigrinya = data.locale.startsWith('ti-');

  let nav, footerTitles, footerLabels;

  if (isArabic) {
    nav = { features: 'الميزات', pricing: 'التسعير', contact: 'اتصل' };
    footerTitles = {
      platform: 'المنصة',
      general: 'عام',
      company: 'الشركة',
      payments: 'المدفوعات',
      accounting: 'المحاسبة',
      shipping: 'الشحن',
      integrations: 'اتصالات API',
      featuresSection: 'الميزات',
      legal: 'قانوني',
      international: 'دولي',
    };
    footerLabels = {
      features: 'الميزات',
      pricing: 'التسعير',
      contact: 'اتصل',
      about: 'عنا',
      blog: 'المدونة',
      careers: 'وظائف',
      allFeatures: 'جميع الميزات',
      support: 'دعم العملاء',
      privacy: 'الخصوصية',
      terms: 'الشروط',
      dpa: 'اتفاقية معالجة البيانات',
    };
  } else if (isFrench) {
    nav = { features: 'Fonctionnalités', pricing: 'Tarifs', contact: 'Contact' };
    footerTitles = {
      platform: 'Plateforme',
      general: 'Général',
      company: 'Entreprise',
      payments: 'Paiements',
      accounting: 'Comptabilité',
      shipping: 'Livraison',
      integrations: 'Connexions API',
      featuresSection: 'Fonctionnalités',
      legal: 'Juridique',
      international: 'International',
    };
    footerLabels = {
      features: 'Fonctionnalités',
      pricing: 'Tarifs',
      contact: 'Contact',
      about: 'À propos',
      blog: 'Blog',
      careers: 'Carrières',
      allFeatures: 'Toutes les fonctionnalités',
      support: 'Support client',
      privacy: 'Confidentialité',
      terms: 'Conditions',
      dpa: 'Accord de traitement des données',
    };
  } else if (isPortuguese) {
    nav = { features: 'Funcionalidades', pricing: 'Preços', contact: 'Contacto' };
    footerTitles = {
      platform: 'Plataforma',
      general: 'Geral',
      company: 'Empresa',
      payments: 'Pagamentos',
      accounting: 'Contabilidade',
      shipping: 'Envios',
      integrations: 'Conexões API',
      featuresSection: 'Funcionalidades',
      legal: 'Legal',
      international: 'Internacional',
    };
    footerLabels = {
      features: 'Funcionalidades',
      pricing: 'Preços',
      contact: 'Contacto',
      about: 'Sobre nós',
      blog: 'Blog',
      careers: 'Carreiras',
      allFeatures: 'Todas as funcionalidades',
      support: 'Suporte ao cliente',
      privacy: 'Privacidade',
      terms: 'Termos',
      dpa: 'Acordo de processamento de dados',
    };
  } else if (isSpanish) {
    nav = { features: 'Características', pricing: 'Precios', contact: 'Contacto' };
    footerTitles = {
      platform: 'Plataforma',
      general: 'General',
      company: 'Empresa',
      payments: 'Pagos',
      accounting: 'Contabilidad',
      shipping: 'Envíos',
      integrations: 'Conexiones API',
      featuresSection: 'Características',
      legal: 'Legal',
      international: 'Internacional',
    };
    footerLabels = {
      features: 'Características',
      pricing: 'Precios',
      contact: 'Contacto',
      about: 'Sobre nosotros',
      blog: 'Blog',
      careers: 'Carreras',
      allFeatures: 'Todas las características',
      support: 'Soporte al cliente',
      privacy: 'Privacidad',
      terms: 'Términos',
      dpa: 'Acuerdo de procesamiento de datos',
    };
  } else {
    nav = { features: 'Features', pricing: 'Pricing', contact: 'Contact' };
    footerTitles = {
      platform: 'Platform',
      general: 'General',
      company: 'Company',
      payments: 'Payments',
      accounting: 'Accounting',
      shipping: 'Shipping',
      integrations: 'API connections',
      featuresSection: 'Features',
      legal: 'Legal',
      international: 'International',
    };
    footerLabels = {
      features: 'Features',
      pricing: 'Pricing',
      contact: 'Contact',
      about: 'About us',
      blog: 'Blog',
      careers: 'Careers',
      allFeatures: 'All features',
      support: 'Customer Support',
      privacy: 'Privacy',
      terms: 'Terms',
      dpa: 'Data Processing Agreement',
    };
  }

  return {
    code,
    region: 'af',
    name: data.name,
    locale: data.locale,
    currency: data.currency,
    language: data.lang,
    nav,
    footer: {
      platform: {
        title: footerTitles.platform,
        links: [
          { label: footerLabels.features, path: '/features' },
          { label: footerLabels.pricing, path: '/pricing' },
          { label: footerLabels.contact, path: '/contact' },
        ],
      },
      general: {
        title: footerTitles.general,
        links: [
          { label: 'Tenant encryption', path: '/tenant-encryption' },
          { label: 'Unlimited stores', path: '/unlimited-stores' },
          { label: 'Trusted by 5,000+', path: '/trusted-by' },
          { label: 'API connections', path: '/api-connections' },
          { label: 'API requests', path: '/api-request' },
        ],
      },
      company: {
        title: footerTitles.company,
        links: [
          { label: footerLabels.about, path: '/about' },
          { label: footerLabels.blog, path: '/blog' },
          { label: footerLabels.careers, path: '/careers' },
        ],
      },
      payments: {
        title: footerTitles.payments,
        links: [
          { label: 'Stripe', path: '/stripe' },
          { label: 'PayPal', path: '/paypal' },
        ],
      },
      accounting: {
        title: footerTitles.accounting,
        links: [
          { label: 'Xero', path: '/xero' },
          { label: 'QuickBooks', path: '/quickbooks' },
        ],
      },
      shipping: {
        title: footerTitles.shipping,
        links: [
          { label: 'National Post', path: '/national-post' },
          { label: 'DHL', path: '/dhl' },
          { label: 'FedEx', path: '/fedex' },
        ],
      },
      integrations: {
        title: footerTitles.integrations,
        links: [
          { label: 'Booking.com', path: '/booking-com' },
          { label: 'Facebook', path: '/facebook' },
          { label: 'Instagram', path: '/instagram' },
          { label: 'TikTok', path: '/tiktok' },
        ],
      },
      featuresSection: {
        title: footerTitles.featuresSection,
        links: [
          { label: footerLabels.allFeatures, path: '/features' },
          { label: footerLabels.support, path: '/support' },
        ],
      },
      legal: {
        title: footerTitles.legal,
        links: [
          { label: footerLabels.privacy, path: '/privacy' },
          { label: footerLabels.terms, path: '/terms' },
          { label: footerLabels.dpa, path: '/data-processing-agreement' },
        ],
      },
      international: {
        title: footerTitles.international,
        links: [
          { label: 'Africa', path: '/africa' },
          { label: 'Asia', path: '/asia' },
          { label: 'Europe', path: '/europe' },
          { label: 'Middle East', path: '/middle-east' },
          { label: 'Americas', path: '/americas' },
          { label: 'Oceania', path: '/oceania' },
        ],
      },
      copyright: '© {year} Pagayo. All rights reserved.',
    },
    meta: { tagline: 'Multi-tenant e-commerce platform for modern entrepreneurs.' },
  };
};

const outputDir = path.join(__dirname, '../src/data/countries');

let created = 0;
for (const [code, data] of Object.entries(countries)) {
  const config = createConfig(code, data);
  const filePath = path.join(outputDir, `${code}.json`);
  fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
  console.log(`✅ ${code}.json created`);
  created++;
}

console.log(`\n✅ Total: ${created} countries created`);
