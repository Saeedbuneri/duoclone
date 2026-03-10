import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
   const browser = await chromium.launch();
   const page = await browser.newPage();

   await page.goto('https://www.duolingo.com/', { waitUntil: 'load', timeout: 30000 }).catch(e => console.log('err', e));
   await page.waitForTimeout(3000);

   const footerData = await page.evaluate(() => {
      let data = {};
      const links = document.querySelectorAll('a');
      const socials = [];
      for (let l of links) {
         if (l.href.includes('twitter.com') || l.href.includes('facebook.com') || l.href.includes('instagram.com') || l.href.includes('youtube.com') || l.href.includes('tiktok.com')) {
            socials.push({ href: l.href, svg: l.innerHTML });
         }
      }
      data.socials = socials;

      const svgs = document.querySelectorAll('svg');
      const possibleLogos = Array.from(svgs).filter(s => s.outerHTML.includes('wordmark') || s.getAttribute('viewBox') == '0 0 128 42' || s.outerHTML.includes('duolingo'));
      data.logo = possibleLogos.length > 0 ? possibleLogos[0].outerHTML : '';

      return data;
   });

   fs.writeFileSync('footer_assets.json', JSON.stringify(footerData, null, 2));
   await browser.close();
})();
