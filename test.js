import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    page.on('console', msg => console.log('CONSOLE:', msg.text()));
    page.on('pageerror', err => console.log('ERROR:', err.message));
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3500); // Wait for splash
    let url = page.url();
    console.log('URL after splash:', url);
    if (url.includes('/landing')) {
        await page.waitForSelector('text=I ALREADY HAVE AN ACCOUNT');
        await page.click('text=I ALREADY HAVE AN ACCOUNT');
        await page.waitForTimeout(1000);
        url = page.url();
    }
    if (url.includes('/login')) {
        await page.fill('input[type="email"]', 'guest@example.com');
        await page.fill('input[type="password"]', 'pass');
        await page.click('button:has-text("LOG IN")');
        await page.waitForTimeout(1000);
        console.log('URL after login:', page.url());
    }
    if (!page.url().includes('/lesson')) {
        await page.goto('http://localhost:5173/lesson');
    }
    await page.waitForTimeout(1000);
    console.log('URL after goto lesson:', page.url());
    console.log('Lesson body length:', (await page.innerHTML('body').catch(() => '')).length);
    await browser.close();
})();
