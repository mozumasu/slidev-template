const {
  setupBrowser,
  setupLogging,
  checkThemeComponents,
  checkPageStructure,
  navigateWithRetry,
  takeScreenshot,
  checkVueApp,
  getPerformanceMetrics,
  cleanup
} = require('./playwright-helpers');

/**
 * Test Slidev theme with refactored utilities
 */
(async () => {
  let browser, page;
  
  try {
    // Setup browser
    const setup = await setupBrowser({ headless: true });
    browser = setup.browser;
    page = setup.page;
    
    // Setup logging
    const { consoleMessages, pageErrors } = setupLogging(page);
    
    // Navigate to the site
    console.log('Navigating to http://localhost:3030...');
    await navigateWithRetry(page, 'http://localhost:3030');
    
    // Take screenshot
    await takeScreenshot(page, 'theme-test-refactored.png');
    
    // Check theme components
    console.log('\n📦 Checking theme components...');
    const components = await checkThemeComponents(page);
    console.log('Ocean container found:', components.oceanBackground);
    console.log('Theme indicator found:', components.themeIndicator);
    console.log('Water canvas found:', components.waterCanvas);
    console.log('Global bottom component rendered:', components.globalBottom);
    
    // Check page structure
    console.log('\n🏗️ Checking page structure...');
    const structure = await checkPageStructure(page);
    console.log('Has slidev-layout class:', structure.hasSlidevLayout);
    console.log('Has ocean elements:', structure.hasOceanElements);
    console.log('Has theme elements:', structure.hasThemeElements);
    
    // Check Vue app
    console.log('\n⚡ Checking Vue app...');
    const vueApp = await checkVueApp(page);
    console.log('Vue app found:', vueApp.hasApp);
    if (vueApp.hasApp && vueApp.components.length > 0) {
      console.log('Registered components:', vueApp.components.slice(0, 5).join(', '), '...');
    }
    
    // Get performance metrics
    console.log('\n📊 Performance metrics:');
    const metrics = await getPerformanceMetrics(page);
    console.log('DOM Content Loaded:', metrics.domContentLoaded, 'ms');
    console.log('Load Complete:', metrics.loadComplete, 'ms');
    console.log('DOM Interactive:', metrics.domInteractive, 'ms');
    
    // Print console messages if any
    if (consoleMessages.length > 0) {
      console.log('\n📝 Console messages:');
      consoleMessages.slice(0, 5).forEach(msg => {
        console.log(`[${msg.type}] ${msg.text}`);
      });
    }
    
    // Print errors if any
    if (pageErrors.length > 0) {
      console.log('\n❌ Page errors:');
      pageErrors.forEach(error => console.log(error));
    }
    
    // Test result summary
    console.log('\n✅ Test Summary:');
    const allComponentsFound = 
      components.oceanBackground && 
      components.themeIndicator && 
      components.waterCanvas && 
      components.globalBottom;
    
    console.log('Theme components:', allComponentsFound ? '✅ All found' : '❌ Some missing');
    console.log('Page structure:', structure.hasSlidevLayout ? '✅ Valid' : '❌ Invalid');
    console.log('Vue app:', vueApp.hasApp ? '✅ Loaded' : '❌ Not loaded');
    
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  } finally {
    await cleanup(browser);
  }
})();