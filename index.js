import express from 'express';
import bodyParser from 'body-parser';
import OpenAI from 'openai';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors())

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/chat', async (req, res) => {
  const context = req.body.context;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: context,
      temperature: 0.1
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ reply: "Sorry, something went wrong." });
  }
});

app.listen(3005, () => {
  console.log('Server running on http://localhost:3005');
});
