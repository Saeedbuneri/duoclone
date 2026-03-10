import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto('https://www.duolingo.com/', { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(e => console.log('goto err', e.message));

    // wait for footer
    await page.waitForTimeout(5000);

    const footerContent = await page.evaluate(() => {
        const sections = [];
        document.querySelectorAll('footer > div.XoXbJ > div > div').forEach((column) => {
            let title = '';
            const titleEl = column.querySelector('h3, h2, h4, [class*="title"], [class*="heading"]');
            if (titleEl) title = titleEl.innerText;

            const links = [];
            column.querySelectorAll('ul > li > a').forEach(a => {
                links.push({ text: a.innerText, href: a.getAttribute('href') });
            });

            if (title || links.length > 0) {
                sections.push({ title, links });
            }
        });

        // Fallback if the specific classes above change
        if (sections.length === 0) {
            document.querySelectorAll('footer ul').forEach((ul) => {
                let headingNode = ul.closest('div')?.querySelector('h3, h2, h4, span[class*="heading"], div[class*="title"]');
                let title = headingNode ? headingNode.textContent : 'Section';
                let links = Array.from(ul.querySelectorAll('a')).map(a => ({ text: a.textContent, href: a.href }));
                if (links.length > 0) {
                    sections.push({ title, links });
                }
            });
        }

        return sections;
    });

    fs.writeFileSync('footer_data.json', JSON.stringify(footerContent, null, 2));
    await browser.close();
})();
