const se = require("./se.js");

//expect there to be 0 missing results
test("Test for missing expected results", async () => {
  jest.setTimeout(500000);
  return expect(se()).resolves.toEqual([]);
});
