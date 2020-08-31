module.exports = {
  launchOptions: {
    headless: true,
    args: ["--no-sandbox"],
  },
  contextOptions: {
    ignoreHTTPSErrors: true,
    viewport: {
      width: 1600,
      height: 1000,
    },
  },
  browsers: ["firefox"],
  devices: [],
};
