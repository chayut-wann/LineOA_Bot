const axios = require("axios");
const fs = require("fs");

const loadTemplate = (fileName) => {
  try {
    const template = fs.readFileSync(`./templates/${fileName}`, "utf8");
    return JSON.parse(template);
  } catch (err) {
    console.error(`Error reading ${fileName} template:`, err);
    return null;
  }
};

//-----------------------------------------------------------------------------------------

const replyQP = async (reply_qp) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.access_token,
  };

  const body = JSON.stringify({
    replyToken: reply_qp,
    messages: [
      {
        type: "text",
        text: "เลือกสิ่งที่ท่านต้องการติดต่อด้านล่าง",
        quickReply: loadTemplate("quick_reply.json"),
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

const reply_qproom = async (reply_qp) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.access_token,
  };

  const body = JSON.stringify({
    replyToken: reply_qp,
    messages: [
      {
        type: "text",
        text: "เลือกสิ่งที่ท่านต้องการติดต่อด้านล่าง",
        quickReply: loadTemplate("qp_room.json"),
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

// -----------------------------------------------------------------------------------------

const replyReserve = async (replyToken) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.access_token,
  };

  const body = JSON.stringify({
    replyToken: replyToken,
    messages: [
      {
        type: "flex",
        altText: "รับข้อมูลข่าวสารใหม่ได้แล้ว!",
        contents: loadTemplate("flx_reserve.json"),
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

const replyCrcourseAndQuickReply = async (replyToken) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.access_token,
  };

  const body = JSON.stringify({
    replyToken: replyToken,
    messages: [
      {
        type: "flex",
        altText: "รับข้อมูลข่าวสารใหม่ได้แล้ว!",
        contents: loadTemplate("cr_course.json"),
      },
      {
        type: "text",
        text: "Select Menu Sir!",
        quickReply: loadTemplate("qp_course.json"),
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

const replyContactAndQuickReply = async (replyToken) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.access_token,
  };

  const body = JSON.stringify({
    replyToken: replyToken,
    messages: [
      {
        type: "flex",
        altText: "รับข้อมูลข่าวสารใหม่ได้แล้ว!",
        contents: loadTemplate("flx_contact.json"),
      },
      {
        type: "text",
        text: "โทรติดต่อสอบถามได้เลย !",
        quickReply: loadTemplate("qp_contact.json"),
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
    console.error("Error sending message:", error.response.data);
  }
};

//-----------------------------------------------------------------------------------------

const askForName = async (replyToken) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.access_token,
  };

  const body = JSON.stringify({
    replyToken: replyToken,
    messages: [
      {
        type: "flex",
        altText: "รับข้อมูลข่าวสารใหม่ได้แล้ว!",
        contents: loadTemplate("ask_name.json"),
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
    console.error("Error sending message:", error.response.data);
  }
};

const askForTel = async (replyToken) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.access_token,
  };

  const body = JSON.stringify({
    replyToken: replyToken,
    messages: [
      {
        type: "flex",
        altText: "รับข้อมูลข่าวสารใหม่ได้แล้ว!",
        contents: loadTemplate("ask_tel.json"),
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
    console.error("Error sending message:", error.response.data);
  }
};

const askForEmail = async (replyToken) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.access_token,
  };

  const body = JSON.stringify({
    replyToken: replyToken,
    messages: [
      {
        type: "flex",
        altText: "รับข้อมูลข่าวสารใหม่ได้แล้ว!",
        contents: loadTemplate("ask_email.json"),
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
    console.error("Error sending message:", error.response.data);
  }
};

const askForPerson = async (replyToken) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.access_token,
  };

  const body = JSON.stringify({
    replyToken: replyToken,
    messages: [
      {
        type: "flex",
        altText: "รับข้อมูลข่าวสารใหม่ได้แล้ว!",
        contents: loadTemplate("ask_numperson.json"),
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
    console.error("Error sending message:", error.response.data);
  }
};

const askForDate = async (replyToken) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.access_token,
  };

  const body = JSON.stringify({
    replyToken: replyToken,
    messages: [
      {
        type: "flex",
        altText: "รับข้อมูลข่าวสารใหม่ได้แล้ว!",
        contents: loadTemplate("ask_date.json"),
      },
      /*{
        type: "text",
        text: "เลือกวันที่ต้องการ !",
        quickReply: loadTemplate("qp_ask_date.json"),
      },*/
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
    console.error("Error sending message:", error.response.data);
  }
};

const askForSnack = async (replyToken) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.access_token,
  };

  const body = JSON.stringify({
    replyToken: replyToken,
    messages: [
      {
        type: "flex",
        altText: "รับข้อมูลข่าวสารใหม่ได้แล้ว!",
        contents: loadTemplate("ask_snack.json"),
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
    console.error("Error sending message:", error.response.data);
  }
};

const askForLunch = async (replyToken) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.access_token,
  };

  const body = JSON.stringify({
    replyToken: replyToken,
    messages: [
      {
        type: "flex",
        altText: "รับข้อมูลข่าวสารใหม่ได้แล้ว!",
        contents: loadTemplate("ask_lunch.json"),
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
    console.error("Error sending message:", error.response.data);
  }
};

const askForDay = async (replyToken) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.access_token,
  };

  const body = JSON.stringify({
    replyToken: replyToken,
    messages: [
      {
        type: "flex",
        altText: "รับข้อมูลข่าวสารใหม่ได้แล้ว!",
        contents: loadTemplate("ask_day.json"),
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
    console.error("Error sending message:", error.response.data);
  }
};

const summarizeReserveCom = async (replyToken, reservationData) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.access_token,
  };

  const body = JSON.stringify({
    replyToken: replyToken,
    messages: [
      {
        type: "flex",
        altText: "Summary of your reservation",
        contents: {
          type: "bubble",
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "สรุปการจอง",
                weight: "bold",
                size: "xl",
              },
              {
                type: "box",
                layout: "baseline",
                margin: "md",
                contents: [
                  {
                    type: "text",
                    text: "ประเภท:",
                    flex: 1,
                  },
                  {
                    type: "text",
                    text: reservationData.room,
                    flex: 2,
                    align: "end",
                  },
                ],
              },
              {
                type: "box",
                layout: "baseline",
                margin: "md",
                contents: [
                  {
                    type: "text",
                    text: "ชื่อ:",
                    flex: 1,
                  },
                  {
                    type: "text",
                    text: reservationData.name,
                    flex: 2,
                    align: "end",
                  },
                ],
              },
              {
                type: "box",
                layout: "baseline",
                margin: "md",
                contents: [
                  {
                    type: "text",
                    text: "อีเมล์:",
                    flex: 1,
                  },
                  {
                    type: "text",
                    text: reservationData.email,
                    flex: 2,
                    align: "end",
                  },
                ],
              },
              {
                type: "box",
                layout: "baseline",
                margin: "md",
                contents: [
                  {
                    type: "text",
                    text: "เบอร์โทร:",
                    flex: 1,
                  },
                  {
                    type: "text",
                    text: reservationData.tel,
                    flex: 2,
                    align: "end",
                  },
                ],
              },
              {
                type: "box",
                layout: "baseline",
                margin: "md",
                contents: [
                  {
                    type: "text",
                    text: "วันที่:",
                    flex: 1,
                  },
                  {
                    type: "text",
                    text: reservationData.date,
                    flex: 2,
                    align: "end",
                  },
                ],
              },
              {
                type: "box",
                layout: "baseline",
                margin: "md",
                contents: [
                  {
                    type: "text",
                    text: "เวลา:",
                    flex: 1,
                  },
                  {
                    type: "text",
                    text: reservationData.day,
                    flex: 2,
                    align: "end",
                  },
                ],
              },
              {
                type: "box",
                layout: "baseline",
                margin: "md",
                contents: [
                  {
                    type: "text",
                    text: "Lunch:",
                    flex: 1,
                  },
                  {
                    type: "text",
                    text: reservationData.lunch,
                    flex: 2,
                    align: "end",
                  },
                ],
              },
              {
                type: "box",
                layout: "baseline",
                margin: "md",
                contents: [
                  {
                    type: "text",
                    text: "Break:",
                    flex: 1,
                  },
                  {
                    type: "text",
                    text: reservationData.snack,
                    flex: 2,
                    align: "end",
                  },
                ],
              },
            ],
          },
        },
      },
      {
        type: "text",
        text: "เลือกบริการถัดไปได้เลย",
        quickReply: loadTemplate("quick_reply.json"), // Load menu quick reply template
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

const askForBusiness = async (replyToken) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.access_token,
  };

  const body = JSON.stringify({
    replyToken: replyToken,
    messages: [
      {
        type: "flex",
        altText: "รับข้อมูลข่าวสารใหม่ได้แล้ว!",
        contents: loadTemplate("ask_business.json"),
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
    console.error("Error sending message:", error.response.data);
  }
};

const askForSpace = async (replyToken) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.access_token,
  };

  const body = JSON.stringify({
    replyToken: replyToken,
    messages: [
      {
        type: "flex",
        altText: "รับข้อมูลข่าวสารใหม่ได้แล้ว!",
        contents: loadTemplate("ask_space.json"),
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
    console.error("Error sending message:", error.response.data);
  }
};

const askForDateSpace = async (replyToken) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.access_token,
  };

  const body = JSON.stringify({
    replyToken: replyToken,
    messages: [
      {
        type: "flex",
        altText: "รับข้อมูลข่าวสารใหม่ได้แล้ว!",
        contents: loadTemplate("ask_date.json"),
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
    console.error("Error sending message:", error.response.data);
  }
};

const summarizeReserveSpace = async (replyToken, reservationData) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.access_token,
  };

  const body = JSON.stringify({
    replyToken: replyToken,
    messages: [
      {
        type: "flex",
        altText: "Summary of your reservation",
        contents: {
          type: "bubble",
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "สรุปการจอง",
                weight: "bold",
                size: "xl",
              },
              {
                type: "box",
                layout: "baseline",
                margin: "md",
                contents: [
                  {
                    type: "text",
                    text: "ประเภท:",
                    flex: 1,
                  },
                  {
                    type: "text",
                    text: reservationData.room,
                    flex: 2,
                    align: "end",
                  },
                ],
              },
              {
                type: "box",
                layout: "baseline",
                margin: "md",
                contents: [
                  {
                    type: "text",
                    text: "ชื่อ:",
                    flex: 1,
                  },
                  {
                    type: "text",
                    text: reservationData.name,
                    flex: 2,
                    align: "end",
                  },
                ],
              },
              {
                type: "box",
                layout: "baseline",
                margin: "md",
                contents: [
                  {
                    type: "text",
                    text: "เบอร์โทร:",
                    flex: 1,
                  },
                  {
                    type: "text",
                    text: reservationData.tel,
                    flex: 2,
                    align: "end",
                  },
                ],
              },
              {
                type: "box",
                layout: "baseline",
                margin: "md",
                contents: [
                  {
                    type: "text",
                    text: "อีเมล์:",
                    flex: 1,
                  },
                  {
                    type: "text",
                    text: reservationData.email,
                    flex: 2,
                    align: "end",
                  },
                ],
              },
              {
                type: "box",
                layout: "baseline",
                margin: "md",
                contents: [
                  {
                    type: "text",
                    text: "ประเภทธุรกิจ:",
                    flex: 1,
                  },
                  {
                    type: "text",
                    text: reservationData.business,
                    flex: 2,
                    align: "end",
                  },
                ],
              },
              {
                type: "box",
                layout: "baseline",
                margin: "md",
                contents: [
                  {
                    type: "text",
                    text: "ขนาดพื้นที่:",
                    flex: 1,
                  },
                  {
                    type: "text",
                    text: reservationData.space,
                    flex: 2,
                    align: "end",
                  },
                ],
              },
              {
                type: "box",
                layout: "baseline",
                margin: "md",
                contents: [
                  {
                    type: "text",
                    text: "วันที่:",
                    flex: 1,
                  },
                  {
                    type: "text",
                    text: reservationData.datespace,
                    flex: 2,
                    align: "end",
                  },
                ],
              },
            ],
          },
        },
      },
      {
        type: "text",
        text: "เลือกบริการถัดไปได้เลย",
        quickReply: loadTemplate("quick_reply.json"), // Load menu quick reply template
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

const askForTool = async (replyToken) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.access_token,
  };

  const body = JSON.stringify({
    replyToken: replyToken,
    messages: [
      {
        type: "flex",
        altText: "รับข้อมูลข่าวสารใหม่ได้แล้ว!",
        contents: loadTemplate("ask_tool.json"),
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
    console.error("Error sending message:", error.response.data);
  }
};

const askForNumTool = async (replyToken) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.access_token,
  };

  const body = JSON.stringify({
    replyToken: replyToken,
    messages: [
      {
        type: "flex",
        altText: "รับข้อมูลข่าวสารใหม่ได้แล้ว!",
        contents: loadTemplate("ask_numtool.json"),
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
    console.error("Error sending message:", error.response.data);
  }
};

const askForDateTool = async (replyToken) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.access_token,
  };

  const body = JSON.stringify({
    replyToken: replyToken,
    messages: [
      {
        type: "flex",
        altText: "รับข้อมูลข่าวสารใหม่ได้แล้ว!",
        contents: loadTemplate("ask_date.json"),
      },
      /*{
        type: "text",
        text: "เลือกวันที่ต้องการ !",
        quickReply: loadTemplate("qp_ask_date.json"),
      },*/
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
    console.error("Error sending message:", error.response.data);
  }
};

const summarizeReserveTool = async (replyToken, reservationData) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.access_token,
  };

  const body = JSON.stringify({
    replyToken: replyToken,
    messages: [
      {
        type: "flex",
        altText: "Summary of your reservation",
        contents: {
          type: "bubble",
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "สรุปการจอง",
                weight: "bold",
                size: "xl",
              },
              {
                type: "box",
                layout: "baseline",
                margin: "md",
                contents: [
                  {
                    type: "text",
                    text: "ประเภท:",
                    flex: 1,
                  },
                  {
                    type: "text",
                    text: reservationData.room,
                    flex: 2,
                    align: "end",
                  },
                ],
              },
              {
                type: "box",
                layout: "baseline",
                margin: "md",
                contents: [
                  {
                    type: "text",
                    text: "ชื่อ:",
                    flex: 1,
                  },
                  {
                    type: "text",
                    text: reservationData.name,
                    flex: 2,
                    align: "end",
                  },
                ],
              },
              {
                type: "box",
                layout: "baseline",
                margin: "md",
                contents: [
                  {
                    type: "text",
                    text: "เบอร์โทร:",
                    flex: 1,
                  },
                  {
                    type: "text",
                    text: reservationData.tel,
                    flex: 2,
                    align: "end",
                  },
                ],
              },
              {
                type: "box",
                layout: "baseline",
                margin: "md",
                contents: [
                  {
                    type: "text",
                    text: "อีเมล์:",
                    flex: 1,
                  },
                  {
                    type: "text",
                    text: reservationData.email,
                    flex: 2,
                    align: "end",
                  },
                ],
              },
              {
                type: "box",
                layout: "baseline",
                margin: "md",
                contents: [
                  {
                    type: "text",
                    text: "ชื่ออุปกรณ์:",
                    flex: 1,
                  },
                  {
                    type: "text",
                    text: reservationData.tool,
                    flex: 2,
                    align: "end",
                  },
                ],
              },
              {
                type: "box",
                layout: "baseline",
                margin: "md",
                contents: [
                  {
                    type: "text",
                    text: "จำนวน:",
                    flex: 1,
                  },
                  {
                    type: "text",
                    text: reservationData.numtool,
                    flex: 2,
                    align: "end",
                  },
                ],
              },
              {
                type: "box",
                layout: "baseline",
                margin: "md",
                contents: [
                  {
                    type: "text",
                    text: "วันที่:",
                    flex: 1,
                  },
                  {
                    type: "text",
                    text: reservationData.datetool,
                    flex: 2,
                    align: "end",
                  },
                ],
              },
            ],
          },
        },
      },
      {
        type: "text",
        text: "เลือกบริการถัดไปได้เลย",
        quickReply: loadTemplate("quick_reply.json"), // Load menu quick reply template
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

//-----------------------------------------------------------------------------------------

// add more reply export
module.exports = {
  replyQP,
  replyReserve,
  replyCrcourseAndQuickReply,
  replyContactAndQuickReply,
  reply_qproom,
  // Reply for
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
};
