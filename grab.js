const playwright = require("playwright");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const creds = require("./client_secret.json");

const doc = new GoogleSpreadsheet(
  "1o0kJeili9G6hAlGf8fy3ZsM9VvEcqjYOFAqzBm3j9vM"
);

//Globals
let numberOfQueries = 50;
let numberOfIdealResults = 20;
let activeCells = "A1:AZ55";

//MAIN LOOP
async function mainFunction() {
  //get queries from Google Sheet
  let queries = await getQueries();
  //navigate to alison, iterate through each query and grab actual Courses
  let actualResultsList = await getActualResults(queries);

  //compare contents of array and output results to separate Google Sheet
  outputResults(actualResultsList);
}

async function getActualResults(queries) {
  const browser = await playwright["chromium"].launch({
    headless: false,
  });

  const context = await browser.newContext();
  const page = await context.newPage();
  let actualCourseListMulti = [];
  console.log("Navigating to Alison.com");
  await page.goto("http://www.alison.com");

  for (let query of queries) {
    //Go to Alison and search a query
    await page.$eval("[name=query]", (el) => (el.value = ""));

    await page.type("[name=query]", query);
    await page.keyboard.press("Enter", { delay: 5000 });

    let elements = await page.$$("span.start_now_course_tile");

    var actualCourseList = [];

    for (let element of elements) {
      const attr = await page.evaluate(
        (el) => el.getAttribute("title"),
        element
      );
      actualCourseList.push(attr);
    }
    actualCourseListMulti.push(actualCourseList);
  }

  await browser.close();
  return actualCourseListMulti;
}

//FUNCTIONS

async function getQueries() {
  await doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key: creds.private_key,
  });

  await doc.loadInfo(); // loads document properties and worksheets

  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
  console.log("Get Queries...");

  let queryList = [];
  var queryIndex;
  await sheet.loadCells(activeCells);

  for (queryIndex = 0; queryIndex < numberOfQueries; queryIndex++) {
    //find query string
    var currentQueryCell = await sheet.getCell(0, queryIndex);
    queryList.push(currentQueryCell.value);
  }
  console.log("Queries Collected");
  return queryList;
}

//Checks actualCourseList against idealCourseList outputs results to Google Sheet
//iterates through each query
//iterates through each item in actual course list related to that query
//checks if item is in ideal course list
//unexpected courses in actual course list are flagged red
async function outputResults(actualCourseList) {
  let queryIndex;

  await doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key: creds.private_key,
  });

  await doc.loadInfo(); // loads document properties and worksheets

  const sheet = doc.sheetsByIndex[0];
  await sheet.loadCells(activeCells);
  let writeCell = sheet.getCell(0, 0);

  for (queryIndex = 0; queryIndex < numberOfQueries; queryIndex++) {
    for (i of actualCourseList[queryIndex]) {
      let x = actualCourseList[queryIndex].indexOf(i);
      //go down one line in Sheet, as top line is Queries
      x = x + 1;

      writeCell = await sheet.getCell(x, queryIndex);
      writeCell.value = i;
    }
  }

  await sheet.saveUpdatedCells();
}

mainFunction();
