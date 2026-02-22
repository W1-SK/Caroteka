import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();


async function importSpells(filePath: string) {
  console.log(`[SPELLS] Čtu soubor: ${filePath}`);
  if (!fs.existsSync(filePath)) return console.error(`[SPELLS] Nenalezeno: ${filePath}`);

  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const spells = jsonData.spell || [];
  console.log(`[SPELLS] Nalezeno ${spells.length} kouzel. Importuji...`);

  let count = 0;
  for (const s of spells) {
    try {
      await prisma.spell.upsert({
        where: { name_source: { name: s.name, source: s.source } },
        update: { level: s.level, school: s.school || 'Unknown', data: s },
        create: { name: s.name, source: s.source, level: s.level, school: s.school || 'Unknown', data: s },
      });
      count++;
    } catch (e) { console.error(`Chyba u kouzla: ${s.name}`); }
  }
  console.log(`[SPELLS] Hotovo: ${count} kouzel.`);
}


async function importMonsters(filePath: string) {
  console.log(`[MONSTERS] Čtu soubor: ${filePath}`);
  if (!fs.existsSync(filePath)) return console.error(`[MONSTERS] Nenalezeno: ${filePath}`);

  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const monsters = jsonData.monster || [];
  console.log(`[MONSTERS] Nalezeno ${monsters.length} monster. Importuji...`);

  let count = 0;
  for (const m of monsters) {
    const crValue = typeof m.cr === 'string' ? m.cr : (m.cr?.cr || null);
    const typeValue = typeof m.type === 'string' ? m.type : (m.type?.type || null);

    try {
      await prisma.monster.upsert({
        where: { name_source: { name: m.name, source: m.source } },
        update: { cr: crValue, type: typeValue, data: m },
        create: { name: m.name, source: m.source, cr: crValue, type: typeValue, data: m },
      });
      count++;
    } catch (e) { console.error(`Chyba u monstra: ${m.name}`); }
  }
  console.log(`[MONSTERS] Hotovo: ${count} monster.`);
}


async function importItems(filePath: string) {
  console.log(`[ITEMS] Čtu soubor: ${filePath}`);
  if (!fs.existsSync(filePath)) return console.error(`[ITEMS] Nenalezeno: ${filePath}`);

  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const items = jsonData.item || [];
  console.log(`[ITEMS] Nalezeno ${items.length} předmětů. Importuji...`);

  let count = 0;
  for (const i of items) {
    try {
      await prisma.item.upsert({
        where: { name_source: { name: i.name, source: i.source } },
        update: { type: i.type || null, rarity: i.rarity || 'None', data: i },
        create: { name: i.name, source: i.source, type: i.type || null, rarity: i.rarity || 'None', data: i },
      });
      count++;
    } catch (e) { console.error(`Chyba u předmětu: ${i.name}`); }
  }
  console.log(`[ITEMS] Hotovo: ${count} předmětů.`);
}


async function importClasses(dirPath: string) {
  console.log(`[CLASSES] Prohledávám složku: ${dirPath}`);
  if (!fs.existsSync(dirPath)) return console.error(`[CLASSES] Složka nenalezena: ${dirPath}`);

  const files = fs.readdirSync(dirPath).filter(f => f.startsWith('class-') && f.endsWith('.json'));
  console.log(`[CLASSES] Nalezeno ${files.length} souborů. Importuji...`);

  let count = 0;
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const classes = jsonData.class || [];
    
    for (const c of classes) {
      try {
        await prisma.class.upsert({
          where: { name_source: { name: c.name, source: c.source } },
          update: { data: c },
          create: { name: c.name, source: c.source, data: c },
        });
        count++;
      } catch (e) { console.error(`Chyba u třídy: ${c.name}`); }
    }
  }
  console.log(`[CLASSES] Hotovo: ${count} tříd.`);
}


async function main() {
  console.log('🚀 ZAČÍNÁM MASIVNÍ IMPORT DAT DO DATABÁZE...\n');

 
  const dataDir = path.resolve(__dirname, '../../data');

  const spellsPhbPath = path.join(dataDir, 'spells', 'spells-phb.json');
  const monsterMmPath = path.join(dataDir, 'bestiary', 'bestiary-mm.json');
  const itemsPath = path.join(dataDir, 'items.json');
  const classesDir = path.join(dataDir, 'class');

 
  await importSpells(spellsPhbPath);
  console.log('-----------------------------------');
  await importMonsters(monsterMmPath);
  console.log('-----------------------------------');
  await importItems(itemsPath);
  console.log('-----------------------------------');
  await importClasses(classesDir);

  console.log('\n✅ VŠECHNA DATA BYLA ÚSPĚŠNĚ NAIMPORTOVÁNA!');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });