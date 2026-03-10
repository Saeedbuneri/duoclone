const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:5173/settings');
    await page.getByRole('button', { name: 'LOG OUT' }).click().catch(() => { });

    await page.goto('http://localhost:5173');
    await page.getByRole('button', { name: 'GET STARTED' }).click();
    console.log("Onboarding started");
    await page.waitForSelector('.lang-card');
    const cards = await page.$$('.lang-card');
    for (const card of cards) {
        const text = await card.innerText();
        if (text.includes('French')) {
            await card.click();
            console.log("French selected");
            break;
        }
    }

    await page.getByRole('button', { name: 'CONTINUE' }).click();

    for (let i = 0; i < 4; i++) {
        await page.waitForSelector('.option-card');
        const opts = await page.$$('.option-card');
        await opts[0].click();
        await page.getByRole('button', { name: 'CONTINUE' }).click();
    }

    await page.waitForTimeout(2000); // Wait for transition
    const titleText = await page.locator('.section-header h3').first().innerText();
    const state = await page.evaluate(() => localStorage.getItem('duolingo_db_v2'));
    console.log("H3 Header text:", titleText);
    console.log("DB State:", state);
    await browser.close();
})();
