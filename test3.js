import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    page.on('console', msg => console.log('CONSOLE:', msg.text()));
    page.on('pageerror', err => console.log('ERROR:', err.message));

    await page.goto('http://localhost:5173/lesson', { waitUntil: 'load' });
    await page.waitForTimeout(1000);

    let i = 0;
    while (i < 5) { // Try clicking answers a few times
        const q = await page.$('.lesson-question');
        if (!q) {
            console.log('No lesson question found, maybe completed?');
            break;
        }
        console.log('Q:', await q.innerText());

        const opt = await page.$('.lesson-option');
        if (opt) {
            console.log('Clicking option 1');
            await opt.click();
        }

        const checkBtn = await page.$('#check-btn');
        if (checkBtn) {
            console.log('Clicking check');
            await checkBtn.click();
        }

        await page.waitForTimeout(500);

        const nextBtn = await page.$('button.btn-green, button.btn-blue');
        if (nextBtn) {
            let t = await nextBtn.innerText();
            if (t === 'CONTINUE') {
                console.log('Clicking continue');
                await nextBtn.click();
            }
        }

        await page.waitForTimeout(500);
        i++;
    }

    console.log('Done iterating');
    await browser.close();
})();
