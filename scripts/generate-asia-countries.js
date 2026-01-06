import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 10 Engelstalige landen (zonder existing: in, sg, ph, my, hk)
const englishCountries = [
  {
    code: 'pk',
    name: 'Pakistan',
    currency: 'PKR',
    locale: 'en-PK',
    shippingCarrier: 'Pakistan Post',
    cities: ['Karachi', 'Lahore', 'Islamabad'],
  },
  {
    code: 'lk',
    name: 'Sri Lanka',
    currency: 'LKR',
    locale: 'en-LK',
    shippingCarrier: 'Sri Lanka Post',
    cities: ['Colombo', 'Kandy', 'Galle'],
  },
  {
    code: 'bd',
    name: 'Bangladesh',
    currency: 'BDT',
    locale: 'bn-BD',
    shippingCarrier: 'Bangladesh Post',
    cities: ['Dhaka', 'Chittagong', 'Khulna'],
  },
  {
    code: 'bn',
    name: 'Brunei',
    currency: 'BND',
    locale: 'ms-BN',
    shippingCarrier: 'Brunei Postal Services',
    cities: ['Bandar Seri Begawan', 'Kuala Belait', 'Seria'],
  },
  {
    code: 'mv',
    name: 'Maldives',
    currency: 'MVR',
    locale: 'en-MV',
    shippingCarrier: 'Maldives Post',
    cities: ['Malé', 'Addu City', 'Fuvahmulah'],
  },
];

// 21 Andere talen (zonder existing: jp, kr, th, vn, id, cn)
const otherLanguageCountries = [
  // Mandarijn
  {
    code: 'tw',
    name: 'Taiwan',
    currency: 'TWD',
    locale: 'zh-TW',
    language: 'zh',
    shippingCarrier: 'Chunghwa Post',
    cities: ['Taipei', 'Kaohsiung', 'Taichung'],
    nav: { features: '功能', pricing: '價格', blog: '部落格', contact: '聯絡我們' },
    footer: {
      features: '功能',
      pricing: '價格',
      about: '關於我們',
      blog: '部落格',
      contact: '聯絡我們',
      privacy: '隱私政策',
      terms: '條款',
      copyright: '版權所有',
    },
  },
  {
    code: 'mo',
    name: 'Macao',
    currency: 'MOP',
    locale: 'zh-MO',
    language: 'zh',
    shippingCarrier: 'Macao Post',
    cities: ['Macao', 'Taipa', 'Coloane'],
    nav: { features: '功能', pricing: '價格', blog: '部落格', contact: '聯絡我們' },
    footer: {
      features: '功能',
      pricing: '價格',
      about: '關於我們',
      blog: '部落格',
      contact: '聯絡我們',
      privacy: '隱私政策',
      terms: '條款',
      copyright: '版權所有',
    },
  },
  // Khmer
  {
    code: 'kh',
    name: 'Cambodia',
    currency: 'KHR',
    locale: 'km-KH',
    language: 'km',
    shippingCarrier: 'Cambodia Post',
    cities: ['Phnom Penh', 'Siem Reap', 'Battambang'],
    nav: { features: 'លក្ខណៈពិសេស', pricing: 'តម្លៃ', blog: 'ប្លុក', contact: 'ទំនាក់ទំនង' },
    footer: {
      features: 'លក្ខណៈពិសេស',
      pricing: 'តម្លៃ',
      about: 'អំពីយើង',
      blog: 'ប្លុក',
      contact: 'ទំនាក់ទំនង',
      privacy: 'គោលការណ៍ភាពឯកជន',
      terms: 'លក្ខខណ្ឌ',
      copyright: 'រក្សាសិទ្ធិ',
    },
  },
  // Lao
  {
    code: 'la',
    name: 'Laos',
    currency: 'LAK',
    locale: 'lo-LA',
    language: 'lo',
    shippingCarrier: 'Lao Post',
    cities: ['Vientiane', 'Luang Prabang', 'Pakse'],
    nav: { features: 'ຄຸນສົມບັດ', pricing: 'ລາຄາ', blog: 'ບລັອກ', contact: 'ຕິດຕໍ່' },
    footer: {
      features: 'ຄຸນສົມບັດ',
      pricing: 'ລາຄາ',
      about: 'ກ່ຽວກັບພວກເຮົາ',
      blog: 'ບລັອກ',
      contact: 'ຕິດຕໍ່',
      privacy: 'ນະໂຍບາຍຄວາມເປັນສ່ວນຕົວ',
      terms: 'ເງື່ອນໄຂ',
      copyright: 'ລິຂະສິດ',
    },
  },
  // Mongolian
  {
    code: 'mn',
    name: 'Mongolia',
    currency: 'MNT',
    locale: 'mn-MN',
    language: 'mn',
    shippingCarrier: 'Mongol Post',
    cities: ['Ulaanbaatar', 'Erdenet', 'Darkhan'],
    nav: { features: 'Онцлог', pricing: 'Үнэ', blog: 'Блог', contact: 'Холбоо барих' },
    footer: {
      features: 'Онцлог',
      pricing: 'Үнэ',
      about: 'Бидний тухай',
      blog: 'Блог',
      contact: 'Холбоо барих',
      privacy: 'Нууцлалын бодлого',
      terms: 'Нөхцөл',
      copyright: 'Зохиогчийн эрх',
    },
  },
  // Nepali
  {
    code: 'np',
    name: 'Nepal',
    currency: 'NPR',
    locale: 'ne-NP',
    language: 'ne',
    shippingCarrier: 'Nepal Postal Service',
    cities: ['Kathmandu', 'Pokhara', 'Lalitpur'],
    nav: { features: 'विशेषताहरू', pricing: 'मूल्य', blog: 'ब्लग', contact: 'सम्पर्क' },
    footer: {
      features: 'विशेषताहरू',
      pricing: 'मूल्य',
      about: 'हाम्रो बारेमा',
      blog: 'ब्लग',
      contact: 'सम्पर्क',
      privacy: 'गोपनीयता नीति',
      terms: 'सर्तहरू',
      copyright: 'प्रतिलिपि अधिकार',
    },
  },
  // Dari/Pashto (Afghanistan - using English for now due to complexity)
  {
    code: 'af',
    name: 'Afghanistan',
    currency: 'AFN',
    locale: 'fa-AF',
    language: 'fa',
    shippingCarrier: 'Afghan Post',
    cities: ['Kabul', 'Herat', 'Kandahar'],
    nav: { features: 'ویژگی‌ها', pricing: 'قیمت', blog: 'وبلاگ', contact: 'تماس' },
    footer: {
      features: 'ویژگی‌ها',
      pricing: 'قیمت',
      about: 'درباره ما',
      blog: 'وبلاگ',
      contact: 'تماس',
      privacy: 'سیاست حفظ حریم خصوصی',
      terms: 'شرایط',
      copyright: 'حق نشر',
    },
  },
  // Dzongkha (Bhutan)
  {
    code: 'bt',
    name: 'Bhutan',
    currency: 'BTN',
    locale: 'dz-BT',
    language: 'dz',
    shippingCarrier: 'Bhutan Post',
    cities: ['Thimphu', 'Phuentsholing', 'Punakha'],
    nav: { features: 'ཁྱད་ཆོས།', pricing: 'གོང་ཚད།', blog: 'བློག།', contact: 'འབྲེལ་གཏུག' },
    footer: {
      features: 'ཁྱད་ཆོས།',
      pricing: 'གོང་ཚད།',
      about: 'ང་ཚོའི་སྐོར།',
      blog: 'བློག།',
      contact: 'འབྲེལ་གཏུག',
      privacy: 'གསང་དོན།',
      terms: 'ཆ་རྐྱེན།',
      copyright: 'འདྲ་བཤུས་ཐོབ་ཐང་།',
    },
  },
  // Kazakh
  {
    code: 'kz',
    name: 'Kazakhstan',
    currency: 'KZT',
    locale: 'kk-KZ',
    language: 'kk',
    shippingCarrier: 'Kazpost',
    cities: ['Almaty', 'Astana', 'Shymkent'],
    nav: { features: 'Мүмкіндіктер', pricing: 'Баға', blog: 'Блог', contact: 'Байланыс' },
    footer: {
      features: 'Мүмкіндіктер',
      pricing: 'Баға',
      about: 'Біз туралы',
      blog: 'Блог',
      contact: 'Байланыс',
      privacy: 'Құпиялық саясаты',
      terms: 'Шарттар',
      copyright: 'Авторлық құқық',
    },
  },
  // Kyrgyz
  {
    code: 'kg',
    name: 'Kyrgyzstan',
    currency: 'KGS',
    locale: 'ky-KG',
    language: 'ky',
    shippingCarrier: 'Kyrgyz Post',
    cities: ['Bishkek', 'Osh', 'Jalal-Abad'],
    nav: { features: 'Мүмкүнчүлүктөр', pricing: 'Баа', blog: 'Блог', contact: 'Байланыш' },
    footer: {
      features: 'Мүмкүнчүлүктөр',
      pricing: 'Баа',
      about: 'Биз жөнүндө',
      blog: 'Блог',
      contact: 'Байланыш',
      privacy: 'Купуялык саясаты',
      terms: 'Шарттар',
      copyright: 'Автордук укук',
    },
  },
  // Uzbek
  {
    code: 'uz',
    name: 'Uzbekistan',
    currency: 'UZS',
    locale: 'uz-UZ',
    language: 'uz',
    shippingCarrier: 'Uzbekistan Post',
    cities: ['Tashkent', 'Samarkand', 'Bukhara'],
    nav: { features: 'Xususiyatlar', pricing: 'Narx', blog: 'Blog', contact: 'Aloqa' },
    footer: {
      features: 'Xususiyatlar',
      pricing: 'Narx',
      about: 'Biz haqimizda',
      blog: 'Blog',
      contact: 'Aloqa',
      privacy: 'Maxfiylik siyosati',
      terms: 'Shartlar',
      copyright: 'Mualliflik huquqi',
    },
  },
  // Tajik
  {
    code: 'tj',
    name: 'Tajikistan',
    currency: 'TJS',
    locale: 'tg-TJ',
    language: 'tg',
    shippingCarrier: 'Tajik Post',
    cities: ['Dushanbe', 'Khujand', 'Kulob'],
    nav: { features: 'Хусусиятҳо', pricing: 'Нарх', blog: 'Блог', contact: 'Тамос' },
    footer: {
      features: 'Хусусиятҳо',
      pricing: 'Нарх',
      about: 'Дар бораи мо',
      blog: 'Блог',
      contact: 'Тамос',
      privacy: 'Сиёсати махфият',
      terms: 'Шартҳо',
      copyright: 'Ҳуқуқи муаллиф',
    },
  },
  // Tetum (East Timor)
  {
    code: 'tl',
    name: 'Timor-Leste',
    currency: 'USD',
    locale: 'tet-TL',
    language: 'tet',
    shippingCarrier: 'CTT Timor Post',
    cities: ['Dili', 'Baucau', 'Maliana'],
    nav: { features: 'Karaterístika', pricing: 'Presu', blog: 'Blog', contact: 'Kontaktu' },
    footer: {
      features: 'Karaterístika',
      pricing: 'Presu',
      about: 'Kona-ba ami',
      blog: 'Blog',
      contact: 'Kontaktu',
      privacy: 'Polítika Privasidade',
      terms: 'Termus',
      copyright: 'Direitus Autór',
    },
  },
  // Turkmen
  {
    code: 'tm',
    name: 'Turkmenistan',
    currency: 'TMT',
    locale: 'tk-TM',
    language: 'tk',
    shippingCarrier: 'Turkmenpost',
    cities: ['Ashgabat', 'Turkmenabat', 'Dashoguz'],
    nav: { features: 'Aýratynlyklar', pricing: 'Bahasy', blog: 'Blog', contact: 'Habarlaşmak' },
    footer: {
      features: 'Aýratynlyklar',
      pricing: 'Bahasy',
      about: 'Biz barada',
      blog: 'Blog',
      contact: 'Habarlaşmak',
      privacy: 'Gizlinlik syýasaty',
      terms: 'Şertler',
      copyright: 'Awtorlyk hukugy',
    },
  },
  // Armenian
  {
    code: 'am',
    name: 'Armenia',
    currency: 'AMD',
    locale: 'hy-AM',
    language: 'hy',
    shippingCarrier: 'HayPost',
    cities: ['Yerevan', 'Gyumri', 'Vanadzor'],
    nav: { features: 'Հատկություններ', pricing: 'Գնորոշում', blog: 'Բլոգ', contact: 'Կապ' },
    footer: {
      features: 'Հատկություններ',
      pricing: 'Գնորոշում',
      about: 'Մեր մասին',
      blog: 'Բլոգ',
      contact: 'Կապ',
      privacy: 'Գաղտնիության քաղաքականություն',
      terms: 'Պայմաններ',
      copyright: 'Հեղինակային իրավունք',
    },
  },
  // Azerbaijani
  {
    code: 'az',
    name: 'Azerbaijan',
    currency: 'AZN',
    locale: 'az-AZ',
    language: 'az',
    shippingCarrier: 'Azerpost',
    cities: ['Baku', 'Ganja', 'Sumqayit'],
    nav: { features: 'Xüsusiyyətlər', pricing: 'Qiymət', blog: 'Bloq', contact: 'Əlaqə' },
    footer: {
      features: 'Xüsusiyyətlər',
      pricing: 'Qiymət',
      about: 'Haqqımızda',
      blog: 'Bloq',
      contact: 'Əlaqə',
      privacy: 'Məxfilik siyasəti',
      terms: 'Şərtlər',
      copyright: 'Müəllif hüququ',
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
    region: 'as',
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

// Generate other language countries
otherLanguageCountries.forEach((country) => {
  const config = {
    code: country.code,
    name: country.name,
    region: 'as',
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
      providers: ['Stripe'],
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

console.log(`✅ Total: ${count} Asia countries created`);
