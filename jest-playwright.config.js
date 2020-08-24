module.exports = {
  launchOptions: {
    headless: true,
    args: ["--no-sandbox"],
  },
  contextOptions: {
    ignoreHTTPSErrors: true,
    viewport: {
      width: 1900,
      height: 1080,
    },
  },
  browsers: ["chromium"],
  devices: [],
};
