const puppeteer = require('puppeteer');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
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
  
  // Find katex errors
  const errors = await page.$$eval('.katex-error', els => els.map(el => ({
    title: el.getAttribute('title'),
    text: el.innerText
  })));
  
  console.log("Found errors:", errors.length);
  errors.forEach((err, i) => {
    console.log(`Error ${i+1}:`);
    console.log(`  Title: ${err.title}`);
    console.log(`  Text: ${err.text.substring(0, 50)}...`);
  });
  
  await browser.close();
})();
