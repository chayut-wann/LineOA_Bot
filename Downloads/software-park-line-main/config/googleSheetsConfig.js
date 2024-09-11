const { google } = require("googleapis");
require("dotenv").config();

const auth = new google.auth.GoogleAuth({
  keyFile: "software-park-th-f3c22ea9bb3b.json", // Replace with the path to your service account key file
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

module.exports = {
  sheets,
  SPREADSHEET_ID: "1lsGPJnDUXGNbYl7RmmPMvEbOBADESwq5oTlsYwQLqMo",
  SHEET_NAME_DATETIME: "datetime",
  SHEET_NAME_CHATDATA: "chatData_raw",
  SHEET_NAME_ROOMDATA: "RoomData",
  SHEET_NAME_TOOLDATA: "Tooldata",
  SHEET_NAME_SPACEDATA: "SpaceRoom",
};
