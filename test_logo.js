import fs from 'fs';

const dataStr = fs.readFileSync('duo_body_imgs.json', 'utf8');
const data = JSON.parse(dataStr);
const logos = data.filter(i => typeof i === 'string' && (i.includes('wordmark') || i.includes('viewBox="0 0 128 42"')));
console.log('logos:', logos.length);
if (logos.length > 0) fs.writeFileSync('logo.txt', logos[0]);
