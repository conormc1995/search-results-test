const playwright = require("playwright");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const creds = require("./client_secret.json");

const doc = new GoogleSpreadsheet(
  "1o0kJeili9G6hAlGf8fy3ZsM9VvEcqjYOFAqzBm3j9vM"
);

let numberOfQueries = 50;

async function clearSheet() {
  await doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key: creds.private_key,
  });

  await doc.loadInfo(); // loads document properties and worksheets
  const sheet = doc.sheetsByIndex[1];
  let activeCells = "A1:AZ40";
  await sheet.loadCells(activeCells);

  for (let row = 0; row <= numberOfQueries; row++) {
    for (let col = 1; col < 36; col++) {
      const workCell = await sheet.getCell(row, col);
      await workCell.clearAllFormatting();
    }
  }

  await sheet.saveUpdatedCells();
  await sheet.clear();
}

clearSheet();
