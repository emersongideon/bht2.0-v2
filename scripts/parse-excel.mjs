/**
 * parse-excel.mjs
 * Reads bht2_input.xlsx and generates src/app/data/bht-data.ts
 * Run with: npm run parse-data
 */

import XLSX from 'xlsx';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const EXCEL_PATH = resolve(__dirname, '../bht2_input.xlsx');
const OUTPUT_PATH = resolve(__dirname, '../src/app/data/bht-data.ts');

// ── Colour palette assigned per brand ────────────────────────────────────────
// Beauty brands keep their original colours; others get sensible defaults.
const BRAND_COLORS = {
  // Beauty
  'Rhode':          '#B86A54',
  'Summer Fridays': '#374762',
  'Glossier':       '#DAC58C',
  'Clinique':       '#ACBDA7',
  'Laneige':        '#6B241E',
  // Fashion
  'Nike':           '#111111',
  'Adidas':         '#3D405B',
  'Zara':           '#8B7355',
  'H&M':            '#CC2529',
  'Uniqlo':         '#E8372A',
  // Personal Care
  'Dove':           '#7EB5D6',
  'Nivea':          '#1B3A6B',
  'CeraVe':         '#5B8DB8',
  'Cetaphil':       '#6BAA8E',
  'The Ordinary':   '#2C2C2C',
};

// ── Parse Excel ───────────────────────────────────────────────────────────────
const wb = XLSX.readFile(EXCEL_PATH);
const sheet = wb.Sheets[wb.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(sheet);

// Unique categories (preserving order of first appearance)
const categories = [...new Set(rows.map(r => r['category_name']).filter(Boolean))];

// Brands grouped by category
const brandsByCategory = {};
for (const row of rows) {
  const cat  = row['category_name'];
  const name = row['brand_name'];
  if (!cat || !name) continue;
  if (!brandsByCategory[cat]) brandsByCategory[cat] = [];
  if (!brandsByCategory[cat].find(b => b.name === name)) {
    brandsByCategory[cat].push({
      name,
      color: BRAND_COLORS[name] ?? '#888888',
    });
  }
}

// ── Generate TypeScript file ──────────────────────────────────────────────────
const ts = `/**
 * AUTO-GENERATED — do not edit by hand.
 * Source: bht2_input.xlsx
 * Regenerate with: npm run parse-data
 */

export interface Brand {
  name: string;
  color: string;
}

export const categories: string[] = ${JSON.stringify(categories, null, 2)};

export const brandsByCategory: Record<string, Brand[]> = ${JSON.stringify(brandsByCategory, null, 2)};

/** All brands as a flat list */
export const allBrands: Brand[] = Object.values(brandsByCategory).flat();
`;

writeFileSync(OUTPUT_PATH, ts, 'utf8');
console.log(`✅  bht-data.ts written to ${OUTPUT_PATH}`);
console.log(`   Categories : ${categories.join(', ')}`);
for (const [cat, brands] of Object.entries(brandsByCategory)) {
  console.log(`   ${cat.padEnd(14)}: ${brands.map(b => b.name).join(', ')}`);
}
