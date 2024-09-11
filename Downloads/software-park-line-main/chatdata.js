const {
  sheets,
  SPREADSHEET_ID,
  SHEET_NAME_CHATDATA,
  SHEET_NAME_DATETIME,
  SHEET_NAME_ROOMDATA,
  SHEET_NAME_TOOLDATA,
  SHEET_NAME_SPACEDATA,
} = require("./config/googleSheetsConfig");

// function set การเก็บข้อมูลลง googlesheet

const appenddatetimeToSheet = async (data) => {
  const request = {
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME_DATETIME}!A1`, // Specify the range
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    resource: { values: [data] },
  };

  try {
    const response = await sheets.spreadsheets.values.append(request);
    console.log("Data added to Google Sheet successfully:", response.data);
  } catch (err) {
    console.error("Error adding data to Google Sheet:", err);
  }
};

const appenddataToSheet = async (data) => {
  const request = {
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME_CHATDATA}!A1`, // Specify the range
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    resource: { values: [data] },
  };

  try {
    const response = await sheets.spreadsheets.values.append(request);
    console.log("Data added to Google Sheet successfully:", response.data);
  } catch (err) {
    console.error("Error adding data to Google Sheet:", err);
  }
};

const appenddataRoomToSheet = async (data) => {
  const request = {
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME_ROOMDATA}!A1`, // Specify the range
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    resource: { values: [data] },
  };

  try {
    const response = await sheets.spreadsheets.values.append(request);
    console.log("Data added to Google Sheet successfully:", response.data);
  } catch (err) {
    console.error("Error adding data to Google Sheet:", err);
  }
};

const appenddataSpaceToSheet = async (data) => {
  const request = {
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME_SPACEDATA}!A1`, // Specify the range
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    resource: { values: [data] },
  };

  try {
    const response = await sheets.spreadsheets.values.append(request);
    console.log("Data added to Google Sheet successfully:", response.data);
  } catch (err) {
    console.error("Error adding data to Google Sheet:", err);
  }
};

const appenddataToolToSheet = async (data) => {
  const request = {
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME_TOOLDATA}!A1`, // Specify the range
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    resource: { values: [data] },
  };

  try {
    const response = await sheets.spreadsheets.values.append(request);
    console.log("Data added to Google Sheet successfully:", response.data);
  } catch (err) {
    console.error("Error adding data to Google Sheet:", err);
  }
};

//------------------------------------------------------------------------------------

// Function to save chat data to Google Sheets
async function saveChatToDatabase(userId, displayName, timestamp, messageText, postbackData) {
  const data = [userId, displayName, timestamp, messageText, postbackData || ""]; // เพิ่ม postbackData เข้าไปในข้อมูลที่จัดเก็บ
  await appenddataToSheet(data); // Append the data to the Google Sheet
}

// Function to save ห้องต่างๆ data to Google Sheets
async function saveReserveRoomToDatabase(
  userId,
  displayName,
  userReserveRoom,
  timestampRoom,
  messageText,
  postbackData
) {
  const data = [
    userId,
    displayName,
    userReserveRoom.room || "N/A",
    userReserveRoom.name || "N/A",
    userReserveRoom.tel || "N/A",
    userReserveRoom.email || "N/A",
    userReserveRoom.person || "N/A",
    userReserveRoom.date || "N/A",
    userReserveRoom.day || "N/A",
    userReserveRoom.snack || "N/A",
    userReserveRoom.lunch || "N/A",
    timestampRoom,
  ]; // Prepare the data เรียงหัวตารางใน google sheet
  await appenddataRoomToSheet(data); // Append the data to the Google Sheet
}

// Function to save พื้นที่ data to Google Sheets
async function saveReserveSpaceToDatabase(
  userId,
  displayName,
  userReserveSpace,
  timestampSpace
) {
  const data = [
    userId,
    displayName,
    userReserveSpace.room || "N/A",
    userReserveSpace.name || "N/A",
    userReserveSpace.tel || "N/A",
    userReserveSpace.email || "N/A",
    userReserveSpace.business || "N/A",
    userReserveSpace.space || "N/A",
    userReserveSpace.datespace || "N/A",
    timestampSpace,
  ]; // Prepare the data
  await appenddataSpaceToSheet(data); // Append the data to the Google Sheet
}

// Function to save tool data to Google Sheets
async function saveReserveToolToDatabase(
  userId,
  displayName,
  userReserveTool,
  timestampTool
) {
  const data = [
    userId,
    displayName,
    userReserveTool.room || "N/A",
    userReserveTool.name || "N/A",
    userReserveTool.tel || "N/A",
    userReserveTool.email || "N/A",
    userReserveTool.tool || "N/A",
    userReserveTool.numtool || "N/A",
    userReserveTool.datetool || "N/A",
    timestampTool,
  ]; // Prepare the data
  await appenddataToolToSheet(data); // Append the data to the Google Sheet
}

// ส่งออกฟังชั่นที่การนำไปใช้ต่อที่อื่่น
module.exports = {
  appenddataToSheet,
  appenddatetimeToSheet,
  saveChatToDatabase,
  saveReserveSpaceToDatabase,
  saveReserveToolToDatabase,
  saveReserveRoomToDatabase,
};
