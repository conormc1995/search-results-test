const se = require("./se.js");
jest.setTimeout(2500000);

//expect there to be 0 missing results
test("Test for uncommon results against monthly average", async () => {

  let numberOfFlags = await se();
  return expect(numberOfFlags = 0);
});
