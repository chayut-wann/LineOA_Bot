const axios = require("axios"); // เรียกใช้ axios เพื่อทำ HTTP requests

const { appenddatetimeToSheet } = require("../chatdata"); // เรียกใช้ฟังก์ชัน appenddatetimeToSheet จากไฟล์ chatdata
const { formatDate, formatTime } = require("../Tools/dateFormatter"); // เรียกใช้ formatDate และ formatTime จากไฟล์ dateFormatter

const {
  // เรียกใช้ฟังก์ชันตอบกลับผู้ใช้
  replyQP,
  reply_qproom,
  replyReserve,
  replyCrcourseAndQuickReply,
  replyContactAndQuickReply,
  askForName,
  askForTel,
  askForEmail,
  askForPerson,
  askForDate,
  askForDay,
  askForSnack,
  askForLunch,
  summarizeReserveCom,
  askForBusiness,
  askForSpace,
  askForDateSpace,
  summarizeReserveSpace,
  askForTool,
  askForNumTool,
  askForDateTool,
  summarizeReserveTool,
} = require("./replyController"); // เรียกใช้ฟังก์ชันต่าง ๆ จากไฟล์ replyController

const {
  saveReserveSpaceToDatabase,
  saveReserveToolToDatabase,
  saveReserveRoomToDatabase,
} = require("../chatdata"); // เรียกใช้ฟังก์ชันบันทึกข้อมูลการจองลงในฐานข้อมูลจากไฟล์ chatdata

const userReserveRoom = {}; // อ็อบเจ็กต์ที่ใช้เก็บข้อมูลการจองห้อง
const userReserveSpace = {}; // อ็อบเจ็กต์ที่ใช้เก็บข้อมูลการจองพื้นที่
const userReserveTool = {}; // อ็อบเจ็กต์ที่ใช้เก็บข้อมูลการจองอุปกรณ์เครื่องมือ

const handleMessageEvent = async (
  userMessage,
  replyToken,
  userId,
  displayName
) => {
  // กำหนดค่าเริ่มต้นให้กับอ็อบเจ็กต์การจองหากยังไม่มีข้อมูล
  if (
    !userReserveRoom[userId] ||
    !userReserveSpace[userId] ||
    !userReserveTool[userId]
  ) {
    userReserveRoom[userId] = {};
    userReserveSpace[userId] = {};
    userReserveTool[userId] = {};
  }

  switch (
    userReserveRoom[userId].state ||
    userReserveSpace[userId].state ||
    userReserveTool[userId].state ||
    userMessage
  ) {
    // ตรวจสอบสถานะและประเภทของข้อความที่ผู้ใช้ส่งมา
    // หากผู้ใช้เลือกหนึ่งในประเภทห้องที่ต้องการจอง
    case "ห้องอบรมคอมพิวเตอร์":
    case "ห้องอบรมสัมมนา":
    case "ห้องประชุม":
    case "เช่าพื้นที่ทำกิจกรรม":
      userReserveRoom[userId].room = userMessage; // เก็บข้อมูลห้องที่ผู้ใช้เลือก
      userReserveRoom[userId].state = "askForName"; // กำหนดสถานะการถามชื่อ
      await askForName(replyToken); // ถามชื่อผู้ใช้
      break;

    case "askForName":
      userReserveRoom[userId].name = userMessage; // เก็บข้อมูลชื่อที่ผู้ใช้ใส่
      console.log("---- Received name from user: ", userMessage, "----"); // แสดงข้อมูล ชื่อ ที่ผู้ใช้พิมพ์มา
      userReserveRoom[userId].state = "askForTel"; // กำหนดสถานะการถามเบอร์โทร
      await askForTel(replyToken); // ถามเบอร์โทรผู้ใช้
      break;

    case "askForTel":
      userReserveRoom[userId].tel = userMessage; // เก็บข้อมูลเบอร์โทรที่ผู้ใช้ใส่
      console.log("---- Received name tel user: ", userMessage, "----"); // แสดงข้อมูล เบอร์โทร ที่ผู้ใช้พิมพ์มา
      userReserveRoom[userId].state = "askForEmail"; // กำหนดสถานะการถามอีเมล
      await askForEmail(replyToken); // ถามอีเมลผู้ใช้
      break;

    case "askForEmail":
      userReserveRoom[userId].email = userMessage; // เก็บข้อมูลอีเมลที่ผู้ใช้ใส่
      console.log("---- Received name email user: ", userMessage, "----"); // แสดงข้อมูล Email ที่ผู้ใช้พิมพ์มา
      userReserveRoom[userId].state = "askForPerson"; // กำหนดสถานะการถามจำนวนคน
      await askForPerson(replyToken); // ถามจำนวนคนผู้ใช้
      break;

    case "askForPerson":
      userReserveRoom[userId].person = userMessage; // เก็บข้อมูลจำนวนคนที่ผู้ใช้ใส่
      console.log("---- Received name person user: ", userMessage, "----"); // แสดงข้อมูลจำนวนคนที่ผู้ใช้พิมพ์มา
      userReserveRoom[userId].state = "askForDate"; // กำหนดสถานะการถามวันที่
      await askForDate(replyToken); // ถามวันที่ผู้ใช้ต้องการจอง
      break;

    case "askForDate":
      userReserveRoom[userId].date = userMessage; // เก็บข้อมูลวันที่ผู้ใช้ต้องการจอง
      userReserveRoom[userId].state = "askForDay"; // กำหนดสถานะการถามครึ่งวันหรือเต็มวัน
      await askForDay(replyToken); // ถามครึ่งวันหรือเต็มวันที่ผู้ใช้ต้องการจอง
      break;

    case "askForDay":
      userReserveRoom[userId].day = userMessage; // เก็บข้อมูลวันที่ผู้ใช้ต้องการจอง
      userReserveRoom[userId].state = "askForSnack"; // กำหนดสถานะการถามของว่าง
      await askForSnack(replyToken); // ถามอาหารว่างที่ผู้ใช้ต้องการจอง
      break;

    case "askForSnack":
      userReserveRoom[userId].snack = userMessage; // เก็บข้อมูลอาหารว่างผู้ใช้ต้องการจอง
      userReserveRoom[userId].state = "askForLunch"; // กำหนดสถานะการถามของว่าง
      await askForLunch(replyToken); // ถามอาหารกลางวันที่ผู้ใช้ต้องการจอง
      break;

    case "askForLunch":
      userReserveRoom[userId].lunch = userMessage; // เก็บข้อมูลอาหารกลางวันที่ผู้ใช้ต้องการจอง
      userReserveRoom[userId].state = null; // Clear state after completion
      await summarizeReserveCom(replyToken, userReserveRoom[userId]); // แสดงสรุปข้อมูลการจอง
      const timestampRoom = moment()
        .tz("Asia/Bangkok")
        .format("DD-MM-YYYY , HH:mm:ss");
      // เรียกใช้ฟังชั่นการเก็บข้อมูล
      await saveReserveRoomToDatabase(
        userId,
        displayName,
        userReserveRoom[userId],
        timestampRoom
      );
      break;

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    case "เช่าพื้นที่สำนักงาน":
      userReserveSpace[userId].room = userMessage;
      userReserveSpace[userId].state = "askForNameSpace";
      await askForName(replyToken);
      break;

    case "askForNameSpace":
      userReserveSpace[userId].name = userMessage;
      console.log("---- Received name from user: ", userMessage, "----"); // แสดงข้อมูล ชื่อ ที่ผู้ใช้พิมพ์มา
      userReserveSpace[userId].state = "askForTelSpace";
      await askForTel(replyToken);
      break;

    case "askForTelSpace":
      userReserveSpace[userId].tel = userMessage;
      console.log("---- Received name tel user: ", userMessage, "----"); // แสดงข้อมูล เบอร์โทร ที่ผู้ใช้พิมพ์มา
      userReserveSpace[userId].state = "askForEmailSpace";
      await askForEmail(replyToken);
      break;

    case "askForEmailSpace":
      userReserveSpace[userId].email = userMessage;
      console.log("---- Received name email user: ", userMessage, "----"); // แสดงข้อมูล Email ที่ผู้ใช้พิมพ์มา
      userReserveSpace[userId].state = "askForBusiness";
      await askForBusiness(replyToken);
      break;

    case "askForBusiness":
      userReserveSpace[userId].business = userMessage;
      userReserveSpace[userId].state = "askForSpace";
      await askForSpace(replyToken);
      break;

    case "askForSpace":
      userReserveSpace[userId].space = userMessage;
      userReserveSpace[userId].state = "askForDateSpace";
      await askForDateSpace(replyToken);
      break;

    case "askForDateSpace":
      userReserveSpace[userId].datespace = userMessage;
      userReserveSpace[userId].state = null; // Clear state after completion
      await summarizeReserveSpace(replyToken, userReserveSpace[userId]);
      const timestampSpace = moment()
        .tz("Asia/Bangkok")
        .format("DD-MM-YYYY , HH:mm:ss");
      await saveReserveSpaceToDatabase(
        userId,
        displayName,
        userReserveSpace[userId],
        timestampSpace
      );
      break;

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    case "อุปกรณ์เครื่องมือ":
      userReserveTool[userId].room = userMessage;
      userReserveTool[userId].state = "askForNameTool";
      await askForName(replyToken);
      break;

    case "askForNameTool":
      userReserveTool[userId].name = userMessage;
      console.log("---- Received name from user: ", userMessage, "----"); // แสดงข้อมูล ชื่อ ที่ผู้ใช้พิมพ์มา
      userReserveTool[userId].state = "askForTelTool";
      await askForTel(replyToken);
      break;

    case "askForTelTool":
      userReserveTool[userId].tel = userMessage;
      console.log("---- Received name tel user: ", userMessage, "----"); // แสดงข้อมูล เบอร์โทร ที่ผู้ใช้พิมพ์มา
      userReserveTool[userId].state = "askForEmailTool";
      await askForEmail(replyToken);
      break;

    case "askForEmailTool":
      userReserveTool[userId].email = userMessage;
      console.log("---- Received name email user: ", userMessage, "----"); // แสดงข้อมูล Email ที่ผู้ใช้พิมพ์มา
      userReserveTool[userId].state = "askForTool";
      await askForTool(replyToken);
      break;

    case "askForTool":
      userReserveTool[userId].tool = userMessage;
      userReserveTool[userId].state = "askForNumTool";
      await askForNumTool(replyToken);
      break;

    case "askForNumTool":
      userReserveTool[userId].numtool = userMessage;
      userReserveTool[userId].state = "askForDateTool";
      await askForDateTool(replyToken);
      const event = event.postback.data;
      handlePostbackEvent(event);
      break;

    case "askForDateTool":
      userReserveTool[userId].datetool = userMessage;
      userReserveTool[userId].state = null; // Clear state after completion
      await summarizeReserveTool(replyToken, userReserveTool[userId]);
      const timestampTool = moment()
        .tz("Asia/Bangkok")
        .format("DD-MM-YYYY , HH:mm:ss");
      await saveReserveToolToDatabase(
        userId,
        displayName,
        userReserveTool[userId],
        timestampTool
      );
      break;

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // หากเป็น "contactus" จะเรียกฟังก์ชัน replyContactAndQuickReply ให้ตอบกลับผู้ใช้
    case "contactus":
      await replyContactAndQuickReply(replyToken);
      break;
    // หากเป็น "service" จะเรียกฟังก์ชัน reply_qproom ให้ตอบกลับผู้ใช้
    case "service":
      await reply_qproom(replyToken, userId);
      break;
    // หากเป็น "reserve" จะเรียกฟังก์ชัน replyReserve ให้ตอบกลับผู้ใช้
    case "reserve":
      await replyReserve(replyToken, userId);
      break;
    // หากเป็น "course" จะเรียกฟังก์ชัน replyCrcourseAndQuickReply ให้ตอบกลับผู้ใช้
    case "course":
      await replyCrcourseAndQuickReply(replyToken);
      break;
    default:
      // Reset user data if received an unexpected message
      if (
        userReserveRoom[userId] ||
        userReserveSpace[userId] ||
        userReserveTool[userId]
      ) {
        delete userReserveRoom[userId];
        delete userReserveSpace[userId];
        delete userReserveTool[userId];
      }
      await replyQP(replyToken);
      break;
  }
};

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ฟังก์ชันจัดการกับ postback event (จัดการกับ event เบื้องหลัง ไว้เพื่อพัฒนาต่อ)
const handlePostbackEvent = async (event) => {
  if (!event || !event.postback || !event.postback.data) {
    console.error("Invalid postback event: missing data");
    return;
  }

  const data = event.postback.data;
  //const replyToken = event.replyToken;
  const userId = event.source.userId;

  // จัดการ postback ของ datetime picker สำหรับ Date Tool
  if (data === "action=selectDateTool") {
    if (event.postback.params && event.postback.params.date) {
      const date = event.postback.params.date;
      userReserveTool[userId].datetool = date;
      // เพิ่ม logic เพิ่มเติมที่นี่ถ้าต้องการ
    } else {
      console.error("Missing date in postback params");
    }
  } else {
    console.error("Unhandled postback data: ", data);
  }
};

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// function การทำงานของ datetime picker เพื่อพัฒนาต่อ
const handleDateTimePickerPostback = async (event) => {
  const datetime = event.postback.params.datetime;
  const userId = event.source.userId;

  // Add datetime and userId to Google Sheet
  await appenddatetimeToSheet([datetime, userId]);

  // Reply to user
  const replyToken = event.replyToken;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.access_token}`,
  };

  const formattedDate = formatDate(new Date(datetime));
  const formattedTime = formatTime(new Date(datetime));

  const body = JSON.stringify({
    replyToken: replyToken,
    messages: [
      {
        type: "text",
        text: `You selected date: \n${formattedDate} \nTIME: ${formattedTime}`,
      },
    ],
  });

  try {
    const response = await axios.post(
      "https://api.line.me/v2/bot/message/reply",
      body,
      { headers }
    );
    console.log("Message sent successfully, status =", response.status);
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ส่งออกฟังชั่นที่การนำไปใช้ต่อที่อื่่น
module.exports = {
  handleMessageEvent,
  handleDateTimePickerPostback,
  handlePostbackEvent,
};
