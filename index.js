const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('🤖 AI Bot is running!');
});

app.post('/webhook', async (req, res) => {
  const message = req.body.message || "";
  
  if (message.startsWith("/ask")) {
    const query = message.replace("/ask", "").trim();
    const reply = await askPoe(query);
    res.json({ reply });
  } else {
    res.json({ reply: "❌ কমান্ড বুঝতে পারি নাই। `/ask` দিয়ে প্রশ্ন করুন।" });
  }
});

async function askPoe(prompt) {
  try {
    const response = await axios.post('https://api.poe.com/v1/sendMessage', {
      prompt,
      bot: "capybara",
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.POE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.text || "⚠️ উত্তর পাওয়া যায়নি।";
  } catch (error) {
    return "❌ AI উত্তর দিতে ব্যর্থ।";
  }
}

app.listen(port, () => {
  console.log(`✅ Bot running at http://localhost:${port}`);
});
