import fs from 'fs';
import path from 'path';

const alternatives = {
  'envelope': 'new-post',
  'brochure': 'magazine',
  'notebook': 'journal',
  'id-card': 'badge',
  'stamp': 'rubber-stamp',
  'story': 'instagram-story',
  'wallpaper': 'image',
  'website': 'domain',
  'ad': 'advertising',
  'banner': 'flag',
  'boxes': 'package',
  'pouch': 'purse',
  'sticker': 'price-tag',
  'label': 'price-tag',
  'wrapping-paper': 'gift',
  'paper-cup': 'coffee-to-go',
  'bottle': 'water-bottle',
  'can': 'soda-can',
  'tote-bag': 'shopping-bag',
  'gift-bag': 'shopping-bag',
  'scrubs': 'doctor',
  'safety-vest': 'worker',
  'uniform': 'shirt',
  'keychain': 'key',
  'mug': 'coffee-cup',
  'coaster': 'record',
  'mouse-pad': 'mouse',
  'wristband': 'bracelet',
  'lanyard': 'badge',
  'power-bank': 'battery',
  'pop-socket': 'smartphone',
  'wall': 'brick-wall',
  '3d-model': 'cube',
  'glass': 'wine-glass',
  'backdrop': 'curtain',
  'roll-up-banner': 'presentation',
  'kiosk': 'shop',
  'neon-sign': 'sign',
  'reception': 'desk',
  'signboard': 'sign',
  'take-away-food': 'take-away',
  'napkin': 'tissue',
  'name-tag': 'badge',
  'cosmetic-jar': 'cream',
  'adhesive-tape': 'tape',
  'printer': 'print',
  'plotter': 'print',
  'magic-wand': 'magic',
  'aspect-ratio': 'resize'
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
