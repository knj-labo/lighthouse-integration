import {  describe, test } from 'vitest'
import { chromium } from 'playwright'
import { playAudit } from 'playwright-lighthouse';

describe('basic', async () => {

    test('open browser', async () => {
        const browser = await chromium.launch({
            args: ['--remote-debugging-port=9222'],
        });
        const page = await browser.newPage();
        await page.goto('https://angular.io/');

        await playAudit({
            thresholds: {
                performance: 20,
                accessibility: 50,
            },
            page: page,
            port: 9222,
        });

        await browser.close()
    });
})