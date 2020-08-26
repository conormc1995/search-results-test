module.exports = {
  launchOptions: {
    headless: true,
    args: ["--no-sandbox"],
  },
  contextOptions: {
    ignoreHTTPSErrors: true,
    viewport: {
      width: 1920,
      height: 1080,
    },
  },
  browsers: ["firefox"],
  devices: [],
};
