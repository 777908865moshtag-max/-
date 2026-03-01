import https from 'https';
import fs from 'fs';

const fileContent = fs.readFileSync('components/BrandingStudio.tsx', 'utf-8');
const urls = [...fileContent.matchAll(/https:\/\/img\.icons8\.com\/color\/96\/[^'"]+/g)].map(m => m[0]);

const uniqueUrls = [...new Set(urls)];

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
    console.log(`Checking ${uniqueUrls.length} URLs...`);
    const results = await Promise.all(uniqueUrls.map(checkUrl));
    const broken = results.filter(r => r.status !== 200);
    console.log(`Found ${broken.length} broken URLs:`);
    broken.forEach(r => console.log(r.url));
}

main();
