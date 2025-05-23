const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const POE_API_KEY = 'your-poe-api-key'; // এখানে তোমার Poe API key বসাও

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post('https://api.poe.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful bot that replies in Bangla and English.' },
        { role: 'user', content: userMessage }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${POE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const botReply = response.data.choices[0].message.content;
    res.json({ reply: botReply });

  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

app.listen(PORT, () => {
  console.log(`AI bot server is running on port ${PORT}`);
});
