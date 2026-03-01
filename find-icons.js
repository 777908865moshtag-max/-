import https from 'https';

const brokenIcons = [
  'envelope', 'brochure', 'notebook', 'id-card', 'stamp', 'story', 'wallpaper', 'website', 'ad', 'banner', 'boxes', 'pouch', 'sticker', 'label', 'wrapping-paper', 'paper-cup', 'bottle', 'can', 'tote-bag', 'gift-bag', 'scrubs', 'safety-vest', 'uniform', 'keychain', 'mug', 'coaster', 'mouse-pad', 'wristband', 'lanyard', 'power-bank', 'pop-socket', 'wall', '3d-model', 'glass', 'backdrop', 'roll-up-banner', 'kiosk', 'neon-sign', 'reception', 'signboard', 'take-away-food', 'napkin', 'name-tag', 'cosmetic-jar', 'adhesive-tape', 'printer', 'plotter', 'magic-wand', 'aspect-ratio'
];

const alternatives = {
  'envelope': ['new-post', 'mail', 'message'],
  'brochure': ['magazine', 'news', 'book'],
  'notebook': ['journal', 'binder', 'diary'],
  'id-card': ['badge', 'name-tag', 'contact-card'],
  'stamp': ['rubber-stamp', 'approval', 'seal'],
  'story': ['instagram-story', 'video-call', 'mobile'],
  'wallpaper': ['image', 'picture', 'monitor'],
  'website': ['domain', 'internet', 'web'],
  'ad': ['advertising', 'megaphone', 'commercial'],
  'banner': ['flag', 'pennant', 'billboard'],
  'boxes': ['package', 'cardboard-box', 'shipping'],
  'pouch': ['purse', 'bag', 'sack'],
  'sticker': ['price-tag', 'discount', 'sale'],
  'label': ['tag-window', 'price-tag', 'barcode'],
  'wrapping-paper': ['gift', 'present', 'paper-roll'],
  'paper-cup': ['coffee-to-go', 'cup', 'drink'],
  'bottle': ['water-bottle', 'wine-bottle', 'milk-bottle'],
  'can': ['soda-can', 'tin-can', 'beer-can'],
  'tote-bag': ['shopping-bag', 'bag', 'handbag'],
  'gift-bag': ['shopping-bag', 'gift', 'present'],
  'scrubs': ['doctor', 'nurse', 'hospital'],
  'safety-vest': ['worker', 'construction', 'jacket'],
  'uniform': ['police-badge', 'shirt', 'clothes'],
  'keychain': ['key', 'keys', 'car-key'],
  'mug': ['coffee-cup', 'tea-cup', 'cup'],
  'coaster': ['cd', 'record', 'plate'],
  'mouse-pad': ['mouse', 'computer-mouse', 'mac-mouse'],
  'wristband': ['bracelet', 'watch', 'smartwatch'],
  'lanyard': ['badge', 'id-card', 'necklace'],
  'power-bank': ['battery', 'charging-battery', 'power'],
  'pop-socket': ['phone', 'smartphone', 'mobile-phone'],
  'wall': ['brick-wall', 'fence', 'barrier'],
  '3d-model': ['cube', '3d', 'box'],
  'glass': ['wine-glass', 'water-glass', 'cocktail'],
  'backdrop': ['curtain', 'stage', 'theater'],
  'roll-up-banner': ['presentation', 'easel', 'whiteboard'],
  'kiosk': ['shop', 'store', 'market'],
  'neon-sign': ['sign', 'billboard', 'light'],
  'reception': ['desk', 'front-desk', 'office'],
  'signboard': ['sign', 'billboard', 'board'],
  'take-away-food': ['take-away', 'food', 'hamburger'],
  'napkin': ['tissue', 'paper', 'towel'],
  'name-tag': ['badge', 'id-card', 'contact-card'],
  'cosmetic-jar': ['cream', 'lotion', 'makeup'],
  'adhesive-tape': ['tape', 'duct-tape', 'scotch-tape'],
  'printer': ['print', 'fax', 'scanner'],
  'plotter': ['printer', 'print', 'fax'],
  'magic-wand': ['magic', 'wizard', 'fairy'],
  'aspect-ratio': ['resize', 'crop', 'expand']
};

async function checkUrl(url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            resolve({ url, status: res.statusCode });
        }).on('error', () => {
            resolve({ url, status: 500 });
        });
    });
}

async function main() {
    const replacements = {};
    for (const icon of brokenIcons) {
        const alts = alternatives[icon] || [];
        let found = false;
        for (const alt of alts) {
            const url = `https://img.icons8.com/color/96/${alt}.png`;
            const res = await checkUrl(url);
            if (res.status === 200) {
                replacements[icon] = alt;
                found = true;
                break;
            }
        }
        if (!found) {
            replacements[icon] = 'image'; // fallback
        }
    }
    console.log(JSON.stringify(replacements, null, 2));
}

main();
