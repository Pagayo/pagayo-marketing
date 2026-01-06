#!/usr/bin/env node

/**
 * Script om "Internationaal" sectie toe te voegen aan alle country configs
 * Deze sectie moet als 5e sectie in footer.sections[] staan
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const countriesDir = path.join(__dirname, '../src/data/countries');

const internationalSection = {
  title: "Internationaal",
  links: [
    { label: "Afrika", path: "/africa" },
    { label: "Azië", path: "/asia" },
    { label: "Europa", path: "/europe" },
    { label: "Americas", path: "/americas" },
    { label: "Oceanië", path: "/oceania" },
    { label: "Midden-Oosten", path: "/middle-east" }
  ]
};

// Lees alle country files
const files = fs.readdirSync(countriesDir).filter(f => f.endsWith('.json'));

console.log(`🔍 Gevonden: ${files.length} country files`);

let updated = 0;
let skipped = 0;
let errors = 0;

files.forEach(file => {
  const filePath = path.join(countriesDir, file);
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(content);
    
    // Check of er een footer.sections array is
    if (!data.footer || !Array.isArray(data.footer.sections)) {
      console.log(`⚠️  ${file}: Geen footer.sections gevonden`);
      skipped++;
      return;
    }
    
    // Check of "Internationaal" sectie al bestaat
    const hasInternational = data.footer.sections.some(s => s.title === "Internationaal");
    
    if (hasInternational) {
      // Verwijder bestaande sectie
      data.footer.sections = data.footer.sections.filter(s => s.title !== "Internationaal");
    }
    
    // Voeg toe als 5e sectie (index 4)
    // Als er minder dan 4 secties zijn, voeg toe aan het einde
    const insertIndex = Math.min(4, data.footer.sections.length);
    data.footer.sections.splice(insertIndex, 0, internationalSection);
    
    // Schrijf terug met mooie formatting
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
    
    updated++;
    console.log(`✅ ${file}: Internationaal sectie toegevoegd op positie ${insertIndex + 1}`);
    
  } catch (err) {
    console.error(`❌ ${file}: ${err.message}`);
    errors++;
  }
});

console.log('\n📊 RESULTAAT:');
console.log(`   ✅ Bijgewerkt: ${updated}`);
console.log(`   ⚠️  Overgeslagen: ${skipped}`);
console.log(`   ❌ Fouten: ${errors}`);
console.log(`   📁 Totaal: ${files.length}`);
