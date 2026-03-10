import { chromium } from 'playwright';
import fs from 'fs';
import axios from 'axios';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const pagesToScrape = [
    { name: 'info', url: 'https://www.duolingo.com/info' },
    { name: 'approach', url: 'https://www.duolingo.com/approach' },
    { name: 'efficacy', url: 'https://www.duolingo.com/efficacy' },
    { name: 'careers', url: 'https://careers.duolingo.com/' },
    { name: 'blog', url: 'https://blog.duolingo.com/' },
    { name: 'store', url: 'https://store.duolingo.com/' },
    { name: 'investors', url: 'https://investors.duolingo.com/' },
    { name: 'terms', url: 'https://www.duolingo.com/terms' },
    { name: 'privacy', url: 'https://www.duolingo.com/privacy' }
  ];

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/css,*/*;q=0.1',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://www.duolingo.com/'
  };

  for (const p of pagesToScrape) {
    console.log('Scraping', p.name);
    try {
      await page.goto(p.url, { waitUntil: 'load', timeout: 60000 });
      await page.waitForTimeout(5000);

      const data = await page.evaluate(async () => {
        const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(l => l.href);
        const styles = Array.from(document.querySelectorAll('style')).map(s => s.innerHTML);
        return {
          html: document.body.innerHTML,
          links: links,
          inlineStyles: styles
        };
      });

      let fullCss = data.inlineStyles.join('\n');
      for (const link of data.links) {
        try {
          console.log('Fetching CSS from', link);
          const resp = await axios.get(link, { headers });
          fullCss += `\n/* From ${link} */\n` + resp.data;
        } catch (e) {
          console.log(`Failed to fetch link ${link}: ${e.message}`);
        }
      }

      fs.writeFileSync(`duo_${p.name}_main.html`, data.html);
      fs.writeFileSync(`duo_${p.name}_full_styles.css`, fullCss);
      console.log(`Saved ${p.name}`);
    } catch (e) {
      console.log(`Error on ${p.name}: ${e.message}`);
    }
  }

  await browser.close();
  console.log('Done scraping.');
})();
