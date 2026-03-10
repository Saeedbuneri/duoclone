const { chromium } = require('playwright');

(async () => {
    console.log("Starting App Tests...");
    const browser = await chromium.launch();

    for (let testNum = 1; testNum <= 5; testNum++) {
        console.log(`\n--- Running Test Flow ${testNum} ---`);
        const page = await browser.newPage();
        const errors = [];

        // Listen for console errors
        page.on('console', msg => {
            if (msg.type() === 'error') {
                errors.push(msg.text());
                console.error(`[Browser Error]: ${msg.text()}`);
            }
        });

        page.on('pageerror', exception => {
            errors.push(exception.message);
            console.error(`[Page Exception]: ${exception.message}`);
        });

        try {
            // Task 1: Go to landing page and get started
            await page.goto('http://localhost:5173');

            // Randomly test different pages
            if (testNum === 1) {
                // Test Onboarding again with a different language
                await page.goto('http://localhost:5173');
                await page.getByRole('button', { name: 'GET STARTED' }).click().catch(() => console.log("Get started failed"));
                await page.waitForSelector('.lang-card', { timeout: 3000 }).catch(() => null);
                const cards = await page.$$('.lang-card');
                if (cards.length > 0) {
                    await cards[1].click();
                    await page.getByRole('button', { name: 'CONTINUE' }).click().catch(() => null);
                    for (let i = 0; i < 4; i++) {
                        const opts = await page.$$('.option-card');
                        if (opts.length > 0) await opts[0].click();
                        await page.getByRole('button', { name: 'CONTINUE' }).click().catch(() => null);
                    }
                }
            } else if (testNum === 2) {
                // Test static info pages
                await page.goto('http://localhost:5173/about');
                await page.goto('http://localhost:5173/terms');
            } else if (testNum === 3) {
                // Test Modals
                await page.goto('http://localhost:5173/learn');
                await page.evaluate(() => {
                    // Try to trigger global modals
                    if (window.showModal) {
                        window.showModal('streak-modal');
                        window.showModal('hearts-modal');
                        window.showModal('flag-modal');
                    }
                });
                await page.waitForTimeout(1000);
            } else if (testNum === 4) {
                // Test sidebar navigation
                await page.goto('http://localhost:5173/learn');
                const links = ['/letters', '/leaderboard', '/quests', '/shop', '/profile'];
                for (const link of links) {
                    await page.evaluate((l) => window.__router.navigate(l), link);
                    await page.waitForTimeout(500);
                }
            } else if (testNum === 5) {
                // Test a mock lesson logic
                await page.goto('http://localhost:5173/lesson');
                await page.waitForTimeout(1000);
                // click around in lesson
                const options = await page.$$('.lesson-option');
                if (options.length > 0) await options[0].click();

                const checkBtn = await page.$('#check-btn');
                if (checkBtn) await checkBtn.click();
            }

            console.log(`Test ${testNum} completed.`);
            if (errors.length > 0) {
                console.log(`Found ${errors.length} errors in test ${testNum}:`, errors);
            }
        } catch (e) {
            console.error(`Test ${testNum} crashed:`, e.message);
        } finally {
            await page.close();
        }
    }
    await browser.close();
    console.log("\nFinished all 5 tests.");
})();
