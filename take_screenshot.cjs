const puppeteer = require('puppeteer');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1366, height: 768 });
  
  // Navigate to the app
  await page.goto('http://localhost:5173/#/learn');
  
  // Wait for the page to load
  await delay(2000);
  
  // Click on the AI card
  const cards = await page.$$('.domain-card');
  for (let card of cards) {
    const text = await page.evaluate(el => el.innerText, card);
    if (text.includes('Artificial Intelligence')) {
      await card.click();
      break;
    }
  }
  
  await delay(1000);
  
  // Click on LLM from scratch
  const subtopics = await page.$$('.subtopic-item');
  for (let sub of subtopics) {
    const text = await page.evaluate(el => el.innerText, sub);
    if (text.includes('LLM from Scratch')) {
      await sub.click();
      break;
    }
  }
  
  await delay(1000);
  
  // Click Chapter 5.2
  const chapters = await page.$$('.chapter-item');
  for (let chap of chapters) {
    const text = await page.evaluate(el => el.innerText, chap);
    if (text.includes('Chapter 5.2')) {
      await chap.click();
      break;
    }
  }
  
  await delay(2000);
  
  // Scroll down a bit
  await page.evaluate(() => window.scrollBy(0, 1000));
  await delay(1000);
  
  // Take screenshot
  await page.screenshot({ path: 'c:\\Users\\Harsh\\.gemini\\antigravity-ide\\brain\\b9120213-8407-4a17-99f8-031366a577f4\\scratch\\screenshot.png' });
  
  console.log("Screenshot taken.");
  
  await browser.close();
})();
