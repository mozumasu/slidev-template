const { chromium } = require('playwright');

async function captureThemes() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Navigate to the Slidev presentation
  await page.goto('http://localhost:3030');
  await page.waitForTimeout(3000);
  
  // Natural theme (already selected from previous)
  await page.keyboard.press('w');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: '.playwright-mcp/theme-natural.png' });
  console.log('Captured natural theme');
  
  // Deep theme
  await page.keyboard.press('w');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: '.playwright-mcp/theme-deep.png' });
  console.log('Captured deep theme');
  
  await browser.close();
}

captureThemes().catch(console.error);