describe("Categories - Titles", () => {
  //Setup
  const { chromium, firefox } = require("playwright");
  let browser;
  let page;
  beforeAll(async () => {
    browser = await firefox.launch();
  });
  afterAll(async () => {
    await browser.close();
  });
  beforeEach(async () => {
    page = await browser.newPage();
  });
  afterEach(async () => {
    await page.close();
  });
});
