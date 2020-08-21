const playwright = require("playwright");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const nodemailer = require("nodemailer");
const creds = require("./client_secret.json");

const doc = new GoogleSpreadsheet(
  "1o0kJeili9G6hAlGf8fy3ZsM9VvEcqjYOFAqzBm3j9vM"
);

//E-mail
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "conormcloughlin64@gmail.com",
    pass: "galway13",
  },
});

var mailOptions = {
  from: "conormcloughlin64@gmail.com",
  to: "cmcloughlin@alison.com",
  subject: "Sending Email using Node.js",
  text: "That was easy!",
};

//Globals
let numberOfQueries = 50;
let numberOfIdealResults = 20;
let activeCells = "A1:AZ40";

//MAIN LOOP
async function se() {
  //get queries from Google Sheet
  let queries = await getQueries();
  //get ideal Courses from Google Sheet
  let idealResultsList = await getIdealResults();
  //navigate to alison, iterate through each query and grab actual Courses
  let actualResultsList = await getActualResults(queries);

  console.log(actualResultsList);
  //compare contents of array and output results to separate Google Sheet
  compareResults(idealResultsList, actualResultsList);
  let missingResultsOmitted = checkMissingResults(
    idealResultsList,
    actualResultsList,
    queries
  );
  //return missingResultsOmitted;
  return 0;
}

function hello() {
  return 0;
}

module.exports = hello;
module.exports = se;

async function getActualResults(queries) {
  const browser = await playwright["chromium"].launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const context = await browser.newContext();
  const page = await context.newPage();
  let actualCourseListMulti = [];

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
      if (attr != "") {
        actualCourseList.push(attr);
      } else {
        actualCourseList.push("TEMP");
      }
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

  return queryList;
}

async function getIdealResults() {
  await doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key: creds.private_key,
  });

  await doc.loadInfo(); // loads document properties and worksheets

  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
  console.log("Getting Ideal Results...");

  //start logic

  let idealResults = [];
  let idealResultsMulti = [];
  var queryIndex2;
  var i;

  await sheet.loadCells(activeCells);

  //iterate through each query
  for (queryIndex2 = 0; queryIndex2 < numberOfQueries; queryIndex2++) {
    //fill idealResults array
    for (i = 1; i < numberOfIdealResults + 1; i++) {
      const courseNameCell = await sheet.getCell(i, queryIndex2);
      if (courseNameCell.value != 0) {
        idealResults.push(courseNameCell.value);
      }
    }

    idealResultsMulti.push(idealResults);
    idealResults = [];
  }
  return idealResultsMulti;
}

//Checks actualCourseList against idealCourseList outputs results to Google Sheet
//iterates through each query
//iterates through each item in actual course list related to that query
//checks if item is in ideal course list
//unexpected courses in actual course list are flagged red
async function compareResults(idealCourseList, actualCourseList) {
  let queryIndex;

  await doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key: creds.private_key,
  });

  await doc.loadInfo(); // loads document properties and worksheets

  const sheet = doc.sheetsByIndex[1];
  await sheet.loadCells(activeCells);
  let writeCell = sheet.getCell(0, 0);

  for (queryIndex = 0; queryIndex < numberOfQueries; queryIndex++) {
    for (i of actualCourseList[queryIndex]) {
      //Check if actual course is in list of expect results
      if (idealCourseList[queryIndex].includes(i)) {
        let x = actualCourseList[queryIndex].indexOf(i);
        x = x + 1;

        writeCell = await sheet.getCell(x, queryIndex);
        writeCell.clearAllFormatting();
        writeCell.value = i;
        //Check if actual course is in same position
        if (idealCourseList[queryIndex][x - 1] != i) {
          writeCell.backgroundColor = writeCell.backgroundColor = {
            red: 1,
            green: 0.8,
            blue: 0.6,
            alpha: 0.3,
          };
        }
      } else {
        let x = actualCourseList[queryIndex].indexOf(i);
        x = x + 1;
        writeCell = await sheet.getCell(x, queryIndex);
        writeCell.clearAllFormatting();

        writeCell.backgroundColor = {
          red: 1,
          green: 0.3,
          blue: 0.3,
          alpha: 0.3,
        };
        writeCell.value = i;
      }
    }
  }

  await sheet.saveUpdatedCells();
}

async function checkMissingResults(idealCourseList, actualCourseList, queries) {
  let queryIndex;
  let updatedQueries = [];

  await doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key: creds.private_key,
  });

  await doc.loadInfo(); // loads document properties and worksheets

  const sheet = doc.sheetsByIndex[2];
  await sheet.loadCells(activeCells);
  let writeCell = sheet.getCell(0, 0);

  for (queryIndex = 0; queryIndex < numberOfQueries; queryIndex++) {
    //add headings to sheet

    for (let i of idealCourseList[queryIndex]) {
      let rowNumber = 1;
      if (i != null) {
        if (actualCourseList[queryIndex].includes(i)) {
          console.log("included");
        } else {
          writeCell = sheet.getCell(rowNumber, queryIndex);

          writeCell.value = i;

          rowNumber += 1;

          console.log(i);
          //remove query
          updatedQueries.push(queries[queryIndex]);
        }
      }
    }
  }

  await sheet.saveUpdatedCells();

  //remove duplicates
  let updatedQueriesArray = Array.from(new Set(updatedQueries));
  return updatedQueriesArray;
}

se();
