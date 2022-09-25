import { test, expect } from '@playwright/test';

test('should send a chat message', async ({ page }) => {
	// go to index
	await page.goto('http://localhost:3000/');

	// find the chat button
	await page.click('id=nav-open-chat');

	// find the chat input
	const messageContent = "Hello World";

	await page.fill('_react=ChatCompose >> textarea', messageContent);
	await page.click('_react=ChatCompose >> _react=Button');

	// find the chat message
	const message = await page.textContent(`_react=ChatDisplay >> _react=ChatMessage[message.body=\"${messageContent}\"] >> div >> p`);

	// assert the message is correct
	expect(message).toBe(messageContent);
});