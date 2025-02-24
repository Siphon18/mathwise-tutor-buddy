import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/sendMessage", async (req, res) => {
  const { systemMessage, userMessage } = req.body;

  if (!userMessage || (typeof userMessage === "string" && userMessage.trim() === "")) {
    return res.status(400).json({ error: "Missing or empty userMessage" });
  }

  // Construct the content for the user message.
  // If userMessage is a string, wrap it in an array with an object of type "text".
  // Otherwise, assume it's already in the expected format (an array of message parts).
  let userContent;
  if (typeof userMessage === "string") {
    userContent = [{ type: "text", text: userMessage }];
  } else {
    userContent = userMessage;
  }

  // Build the messages array.
  const messages = [];
  if (systemMessage && systemMessage.trim() !== "") {
    messages.push({
      role: "system",
      content: [{ type: "text", text: systemMessage }]
    });
  }
  messages.push({
    role: "user",
    content: userContent
  });

  const payload = {
    model: "google/gemini-2.0-flash-lite-preview-02-05:free",
    messages
  };

  console.log("Payload to OpenRouter:", JSON.stringify(payload, null, 2)); // Debug log

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      payload,
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": process.env.HTTP_REFERER || "",
          "X-Title": process.env.X_TITLE || "",
          "Content-Type": "application/json"
        }
      }
    );

    // Assuming the API response structure follows the example:
    // { choices: [ { message: { content: "Generated response" } } ] }
    const aiResponse = response.data.choices[0].message.content;
    res.json({ response: aiResponse });
  } catch (error) {
    console.error("Error calling OpenRouter API:", error.response?.data || error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
