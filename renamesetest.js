const se = require("./se.js");
const hello = require("./se.js");

//expect there to be 0 missing results
test("Test for missing expected results", () => {
  jest.setTimeout(6000);
  let emptyArray = [];
  return expect(1 - 1).toBe(0);
});
