// function ใช้ในการจัดรูปแบบ ข้อมูล datetime
const formatDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1; // Month starts from 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatTime = (date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours)
  return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${ampm}`;
};

module.exports = { formatDate, formatTime };
