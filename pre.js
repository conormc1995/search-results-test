const playwright = require("playwright");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const nodemailer = require("nodemailer");
const creds = require("./client_secret.json");
let fs = require('fs');

const doc = new GoogleSpreadsheet(
  "1o0kJeili9G6hAlGf8fy3ZsM9VvEcqjYOFAqzBm3j9vM"
);


//MAIN LOOP
async function pre() {
    //get queries from Google Sheet
    let queries = await getQueries();

    //navigate to alison, iterate through each query and grab actual Courses and populate expected queries
    let actualResultsList = await getActualResults(queries);
  
    console.log(actualResultsList);
    return 0;
  }

  module.exports = pre;



  async function getQueries() {
    await doc.useServiceAccountAuth({
      client_email: creds.client_email,
      private_key: creds.private_key,
    });
  
    await doc.loadInfo(); // loads document properties and worksheets
  
    const sheet = doc.sheetsById["229574119"]; // or use doc.sheetsById[id]
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


  //Update Cells
  async function compareResults(actualCourseList) {
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
        writeCell = await sheet.getCell(x, queryIndex);
        writeCell.value = i;
      }
    }
  
    await sheet.saveUpdatedCells();
  }