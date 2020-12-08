const playwright = require("playwright");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const nodemailer = require("nodemailer");
const creds = require("./client_secret.json");
let fs = require('fs').promises;

const doc = new GoogleSpreadsheet(
  "1o0kJeili9G6hAlGf8fy3ZsM9VvEcqjYOFAqzBm3j9vM"
);


//Globals
let numberOfQueries = 50;
let numberOfIdealResults = 20;
let activeCells = "A1:AZ40";
let dayIndex = 0;
let queryIndex = 0;

//MAIN LOOP
async function se() {
  //get queries from Google Sheet
  let queries = await getQueries();

  //navigate to alison, iterate through each query and grab actual Courses
  let actualResultsList = await getActualResults(queries);

  //Grab history of results from file
  let fileContents = await saveResults(actualResultsList);


  //Check actualResults against monthly history
  let numberOfFlags = await checkMonthlyAverage(actualResultsList, fileContents);

  //return any flagging outliers
  return numberOfFlags;
}

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


async function saveResults(actualResultsList){
  let fileContents = await fs.readFile('./result-history1.json', 'utf-8', function(err, data) {

  });
/*
  var parse_obj = JSON.parse(data);
        parse_obj['courseHistory'].push(["two"]);
        
        //writeToFile(parse_obj);
        let globalarray = Object.values(parse_obj);
        

        //console.log(nameValue);
        
        return parse_obj;
    });

    //result = Object.values(result);
    result = JSON.parse(result);
    result = Object.values(result);
    result = result[0];
    console.log(result[0]);
  */
  
  
  function writeToFile(coursesComplete){
  
    fs.writeFile("./result-history1.json", JSON.stringify(coursesComplete), function(err) {
      if(err) {
            console.log(err);
      } 
      else {
        console.log("Output");
      }
    }); 
  
  }
  
  fileContents = JSON.parse(fileContents);
  fileContents['courseHistory'].push(actualResultsList);
  writeToFile(fileContents);

  fileContents = Object.values(fileContents);
  fileContents = fileContents[0];
  //return course history
  return fileContents;
  }

async function checkMonthlyAverage(actualResultsList, fileContents){
  let dayIndex = 0;
  let queryIndex = 0;

  console.log("Type");
  console.log(typeof(fileContents));
  console.log("Contents");
  console.log(fileContents[dayIndex][queryIndex]);

  await doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key: creds.private_key,
  });

  await doc.loadInfo(); // loads document properties and worksheets

  const sheet = await doc.sheetsByIndex[1];
  await sheet.loadCells(activeCells);
  let writeCell = await sheet.getCell(1, 1);
  writeCell.value = "Habibi";

  let numberOfFlags = 0;
  /* 
  
  Get our test item
  Grab x course result, from x query

  */


  for (queryIndex = 0; queryIndex < numberOfQueries; queryIndex++) {
    for (i of actualResultsList[queryIndex]) {
      console.log(i);
      


            let numberOfOccurrences = 0;
          
            

              /* 
  
              Loop through each day 
              Check test item against day and query to see if it includes test item
              If yes -> Increase counter for number of occurences
              Color sheet accordingly

              */


             for (dayIndex = 0; dayIndex < 2; dayIndex++) {

                

                let x = actualResultsList[queryIndex].indexOf(i);
                x = x + 1;
                writeCell = await sheet.getCell(x, queryIndex);
                writeCell.value = i;

                if (fileContents[dayIndex][queryIndex].includes(i)) {
                  numberOfOccurrences++;
                  if (numberOfOccurrences > 2 ){
                    if (numberOfOccurrences < 2){
                      writeCell.backgroundColor = {
                        red: 0,
                        green: 0,
                        blue: 1,
                        alpha: 1,
                      };
                      numberOfFlags++;
                    }
                    
                  }
                }

              /* 
  
              if it doesn't occur often
              flag cell with colour
              and add a flag for test

              */

                if (numberOfOccurrences < 2){
                  writeCell.backgroundColor = {
                    red: 0,
                    green: 0,
                    blue: 1,
                    alpha: 0.3,
                  };
                  numberOfFlags++;
                }

                if (numberOfOccurrences >= 2){
                  writeCell.backgroundColor = {
                    red: 0,
                    green: 1,
                    blue: 0,
                    alpha: 0.3,
                };
                
                }
              }
              console.log(numberOfOccurrences);
            }
          }


await sheet.saveUpdatedCells();
return numberOfFlags;
}
  

se()
