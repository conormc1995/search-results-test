const se = require("./se.js");
const hello = require("./se.js");

let queryArray = [
  "digital marketing",
  "english",
  "accounting",
  "law",
  "marketing",
  "c",
  "microsoft",
  "safety",
  "iso",
  "sales",
  "finance",
  "coronavirus",
  "data science",
  "management",
  "mental health",
  "food",
  "math",
  "health and safety",
  "logistics",
  "microsoft office",
  "html",
  "sap",
  "health",
];
//expect there to be 0 missing results
test("Test for missing expected results", async () => {
  jest.setTimeout(600000);
  let emptyArray = [];
  return expect(hello()).resolves.toBe(0);
});
