const axios = require("axios");

async function getUserProfile(userId) {
  try {
    const response = await axios.get(
      `https://api.line.me/v2/bot/profile/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw new Error("Failed to fetch user profile");
  }
}

module.exports = {
  getUserProfile,
  // other exports...
};
