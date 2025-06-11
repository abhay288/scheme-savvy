
const axios = require('axios');
require('dotenv').config();

const fromNumber = process.env.TWILIO_FROM_NUMBER;
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

module.exports = async (user) => {
  const toNumber = user.phone; // e.g., '+91XXXXXXXXXX'
  const body = `Hi ${user.name}, reminder: Apply for ${user.selectedScheme} before ${user.schemeDeadline}.`;

  const data = new URLSearchParams({
    To: toNumber,
    From: fromNumber,
    Body: body
  });

  try {
    const response = await axios.post(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      data,
      {
        auth: {
          username: accountSid,
          password: authToken
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    return { success: true, sid: response.data.sid };
  } catch (error) {
    console.error('Twilio Error:', error.message);
    return { success: false, error: error.message };
  }
};
