const { chromium } = require('playwright');

/**
 * Playwright test utilities for Slidev theme testing
 */

/**
 * Setup browser and page with default options
 * @param {Object} options - Browser options
 * @returns {Promise<{browser, page, context}>}
 */
async function setupBrowser(options = {}) {
  const defaultOptions = {
    headless: true,
    viewport: { width: 1920, height: 1080 },
    ...options
  };

  const browser = await chromium.launch({ headless: defaultOptions.headless });
  const context = await browser.newContext({
    viewport: defaultOptions.viewport
  });
  const page = await context.newPage();

  return { browser, page, context };
}

/**
 * Setup console and error logging
 * @param {Page} page - Playwright page object
 * @returns {{consoleMessages: Array, pageErrors: Array}}
 */
function setupLogging(page) {
  const consoleMessages = [];
  const pageErrors = [];

  page.on('console', msg => {
    consoleMessages.push({
      type: msg.type(),
      text: msg.text()
    });
  });

  page.on('pageerror', error => {
    pageErrors.push(error.message);
  });

  return { consoleMessages, pageErrors };
}

/**
 * Check if theme components are present
 * @param {Page} page - Playwright page object
 * @returns {Promise<Object>} Component status
 */
async function checkThemeComponents(page) {
  const oceanBackground = await page.locator('.ocean-container').count();
  const themeIndicator = await page.locator('.theme-indicator').count();
  const waterCanvas = await page.locator('.water-canvas').count();
  
  const globalBottom = await page.evaluate(() => {
    return document.querySelector('div[data-v-global-bottom]') !== null ||
           document.querySelector('[class*="ocean"]') !== null;
  });

  return {
    oceanBackground: oceanBackground > 0,
    themeIndicator: themeIndicator > 0,
    waterCanvas: waterCanvas > 0,
    globalBottom
  };
}

/**
 * Check page structure
 * @param {Page} page - Playwright page object
 * @returns {Promise<Object>} Structure status
 */
async function checkPageStructure(page) {
  const bodyContent = await page.locator('body').innerHTML();
  
  return {
    hasSlidevLayout: bodyContent.includes('slidev-layout'),
    hasOceanElements: bodyContent.includes('ocean'),
    hasThemeElements: bodyContent.includes('theme')
  };
}

/**
 * Navigate to URL with retry
 * @param {Page} page - Playwright page object
 * @param {string} url - URL to navigate to
 * @param {number} maxRetries - Maximum number of retries
 * @returns {Promise<boolean>} Success status
 */
async function navigateWithRetry(page, url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      return true;
    } catch (error) {
      console.log(`Attempt ${i + 1} failed:`, error.message);
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  return false;
}

/**
 * Take screenshot with options
 * @param {Page} page - Playwright page object
 * @param {string} path - File path for screenshot
 * @param {Object} options - Screenshot options
 */
async function takeScreenshot(page, path, options = {}) {
  const defaultOptions = {
    fullPage: true,
    ...options
  };
  
  await page.screenshot({ path, ...defaultOptions });
  console.log(`Screenshot saved as ${path}`);
}

/**
 * Check Vue app status
 * @param {Page} page - Playwright page object
 * @returns {Promise<Object>} Vue app information
 */
async function checkVueApp(page) {
  return await page.evaluate(() => {
    const app = document.querySelector('#app')?.__vue_app__;
    if (app) {
      const components = app._instance?.appContext?.components;
      return {
        hasApp: true,
        components: components ? Object.keys(components) : []
      };
    }
    return { hasApp: false, components: [] };
  });
}

/**
 * Get performance metrics
 * @param {Page} page - Playwright page object
 * @returns {Promise<Object>} Performance metrics
 */
async function getPerformanceMetrics(page) {
  return await page.evaluate(() => {
    const perfData = window.performance.getEntriesByType('navigation')[0];
    return {
      domContentLoaded: perfData?.domContentLoadedEventEnd - perfData?.domContentLoadedEventStart,
      loadComplete: perfData?.loadEventEnd - perfData?.loadEventStart,
      domInteractive: perfData?.domInteractive,
      transferSize: perfData?.transferSize
    };
  });
}

/**
 * Clean up browser resources
 * @param {Browser} browser - Playwright browser object
 */
async function cleanup(browser) {
  if (browser) {
    await browser.close();
  }
}

module.exports = {
  setupBrowser,
  setupLogging,
  checkThemeComponents,
  checkPageStructure,
  navigateWithRetry,
  takeScreenshot,
  checkVueApp,
  getPerformanceMetrics,
  cleanup
};