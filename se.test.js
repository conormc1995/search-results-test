const checkExpectedResultsArePresent = require("./se");

//expect there to be 0 missing results
test("Test for missing expected results", async () => {
  expect(checkExpectedResultsArePresent).toEqual([]);
});
