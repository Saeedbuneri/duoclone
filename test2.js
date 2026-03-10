import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    let logs = '';
    page.on('console', msg => { logs += 'CONSOLE: ' + msg.text() + '\n'; });
    page.on('pageerror', err => { logs += 'ERROR: ' + err.message + '\n'; });

    await page.goto('http://localhost:5173/lesson', { waitUntil: 'load' });
    await page.waitForTimeout(1000);

    logs += 'URL: ' + page.url() + '\n';
    logs += 'HTML: ' + await page.innerHTML('body').catch(e => e.message) + '\n';

    fs.writeFileSync('test_output.txt', logs);
    await browser.close();
})();
