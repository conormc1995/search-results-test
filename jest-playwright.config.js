module.exports = {
  launchOptions: {
    headless: false,
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
