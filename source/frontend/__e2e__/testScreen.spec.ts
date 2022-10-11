import { test } from '@playwright/test';
const buttons = ['connect', 'create', 'join', 'camera', 'screen', 'subscribe', 'leave'];


test('should click everything', async ({ page }) => {
	// go to screen
	await page.goto('/screen');

    //await page.click(`_react=Button[className='connect']`);
    for (const b of buttons){
        // click all the buttons
        await page.click(`_react=Button[className='${b}']`)
    }
});