const express = require("express"); // เรียกใช้ express framework
const bodyParser = require("body-parser"); // เรียกใช้ body-parser สำหรับ parse HTTP request body
require("dotenv").config(); // เรียกใช้ dotenv สำหรับการตั้งค่า environment variables
const moment = require("moment-timezone");

const {
  handleMessageEvent,
  handlePostbackEvent,
} = require("./controllers/webhookController"); // นำเข้า handleMessageEvent และ handlePostbackEvent จาก webhookController
const { saveChatToDatabase } = require("./chatdata"); // นำเข้า saveChatToDatabase จาก chatdata
const { getUserProfile } = require("./helpers/lineProfile"); // นำเข้า getUserProfile จาก lineProfile
const { loading } = require("./helpers/loading");

const app = express(); // สร้าง instance ของ express
const port = process.env.PORT || 8000; // กำหนด port สำหรับรัน server, ใช้ 8000 ถ้าไม่มีการตั้งค่าใน environment variables

app.use(bodyParser.urlencoded({ extended: false })); // ใช้ body-parser สำหรับ urlencoded form data
app.use(bodyParser.json()); // ใช้ body-parser สำหรับ JSON data

app.post("/webhook", async (req, res) => {
  try {
    console.log("Incoming request body:", JSON.stringify(req.body, null, 2)); // Log ค่าของ request body ที่เข้ามา

    if (!req.body.events || !req.body.events.length) {
      console.warn("Received request with no events data");
      // ตอบกลับด้วยสถานะ 200 ถ้าไม่มี events data ใน request
      return res.status(200).send({ message: "No events data received" });
    }

    const event = req.body.events[0]; // ดึง event แรกจาก request body
    const userId = event.source && event.source.userId; // ดึง userId จาก event source
    const messageText = event.message && event.message.text; // ดึงข้อความจาก event message
    const postbackData = event.postback && event.postback.data; // ดึงข้อมูลการกด rich menu

    //const timestamp = new Date().toLocaleString();
    const timestamp = moment()
      .tz("Asia/Bangkok")
      .format("DD-MM-YYYY , HH:mm:ss");

    const replyToken = event.replyToken; // ดึง replyToken จาก event

    if (!userId || !replyToken) {
      throw new Error("Invalid request: missing userId or replyToken"); // ถ้าไม่มี userId หรือ replyToken ให้ throw error
    }

    // Fetch user profile
    const userProfile = await getUserProfile(userId); // ดึงข้อมูลโปรไฟล์ของผู้ใช้
    const displayName = userProfile.displayName; // ดึงชื่อผู้ใช้จากโปรไฟล์

    // บันทึกข้อมูลการสนทนาในฐานข้อมูล
    saveChatToDatabase(userId, displayName, timestamp, messageText, postbackData);

    //await loading(userId);

    // เข้าสู่ function เงื่อนไข
    /*if (event.type === "message" && messageText) {
      await handleMessageEvent(
        messageText,
        replyToken,
        userId,
        displayName,
        timestamp
      ); // เรียก handleMessageEvent ถ้า event type เป็น message
      console.log("handlingMessageEvent is complete."); // log เมื่อ handleMessageEvent เสร็จสิ้น
    } else if (
      event.type === "postback" &&
      event.postback &&
      event.postback.data
    ) {
      await handlePostbackEvent(event); // เรียก handlePostbackEvent ถ้า event type เป็น postback
    } else {
      throw new Error("Invalid event type or missing event data"); // throw error ถ้า event type ไม่ถูกต้อง
    }*/

    res.sendStatus(200); // ตอบกลับด้วยสถานะ 200 OK เพื่อยืนยันว่า request ถูกประมวลผลแล้ว
  } catch (error) {
    console.error(error.message); // log ข้อผิดพลาด
    res.status(500).send({ error: error.message }); // ตอบกลับด้วยสถานะ 500 และส่งข้อผิดพลาดกลับไป
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // log เมื่อ server เริ่มทำงาน
});
