import fs from 'fs';
import path from 'path';

const alternatives = {
  'instagram-story': 'mobile',
  'advertising': 'megaphone',
  'doctor': 'hospital',
  'worker': 'construction',
  'coffee-cup': 'cup',
  'cube': 'box',
  'curtain': 'stage',
  'sign': 'billboard',
  'take-away': 'hamburger',
  'tissue': 'paper',
  'cream': 'lotion',
  'tape': 'duct-tape',
  'magic': 'wizard'
};

const dir = './components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    let changed = false;
    for (const [broken, alt] of Object.entries(alternatives)) {
        const regex = new RegExp(`https://img.icons8.com/color/96/${broken}.png`, 'g');
        if (regex.test(content)) {
            content = content.replace(regex, `https://img.icons8.com/color/96/${alt}.png`);
            changed = true;
        }
    }
    if (changed) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${file}`);
    }
}
