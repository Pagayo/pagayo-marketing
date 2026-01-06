import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const countriesDir = path.join(__dirname, '..', 'src', 'data', 'countries');
const files = fs.readdirSync(countriesDir).filter((f) => f.endsWith('.json'));

const ctaTranslations = {
  en: 'Start free',
  nl: 'Start gratis',
  de: 'Kostenlos starten',
  fr: 'Commencer gratuitement',
  es: 'Empezar gratis',
  pt: 'Começar grátis',
  ar: 'ابدأ مجاناً',
  zh: '免费开始',
  ja: '無料で始める',
  ko: '무료로 시작',
  th: 'เริ่มฟรี',
  vi: 'Bắt đầu miễn phí',
  id: 'Mulai gratis',
  km: 'ចាប់ផ្តើមឥតគិតថ្លៃ',
  lo: 'ເລີ່ມຟຣີ',
  mn: 'Үнэгүй эхлэх',
  ne: 'नि:शुल्क सुरु गर्नुहोस्',
  fa: 'شروع رایگان',
  dz: 'རང་དབང་ལེན་འགོ་འཚུགས།',
  kk: 'Тегін бастау',
  ky: 'Акысыз баштоо',
  uz: 'Bepul boshlash',
  tg: 'Ройгон оғоз кунед',
  tet: 'Hahú ba livre',
  tk: 'Mugt başla',
  hy: 'Սկսել անվճար',
  az: 'Pulsuz başla',
};

let updated = 0;

files.forEach((file) => {
  const filePath = path.join(countriesDir, file);
  const config = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Voeg cta toe aan nav als het nog niet bestaat
  if (!config.nav.cta) {
    const lang = config.language;
    config.nav.cta = ctaTranslations[lang] || 'Start free';

    fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
    updated++;
  }
});

console.log(`✅ Updated ${updated} country configs with nav.cta`);
