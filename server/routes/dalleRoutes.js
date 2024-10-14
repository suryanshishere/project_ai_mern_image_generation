import express from "express";
import * as dotenv from "dotenv";
import { GoogleGenerativeAI } from '@google/generative-ai';
import cors from "cors";

dotenv.config();

const router = express.Router();

// Enable CORS for all routes
router.use(cors());

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

// Test GET endpoint
router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from DALL-E!" });
});

// POST endpoint to generate images
router.route("/").post(async (req, res) => {
  console.log("Request Body:", req.body); // Log the incoming request
  try {
    const { prompt } = req.body;

    // Validate prompt
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // const prompt = "Write a story about a magic backpack.";

    const result = await model.generateContent(prompt);
    // console.log(result.response.text());

    // const response = await openai.images.generate({
    //   model: "dall-e-3",
    //   prompt,
    //   n: 1,
    //   size: "1024x1024",
    // });
    // image_url = response.data[0].url;

    // const image = aiResponse.data.data[0].b64_json;
    res.status(200).json({ text: result.response.text() }); // Send the image data in the response
  } catch (error) {
    // console.error("Error occurred:", "error coming bro"); // Log the error
    const message =
      error?.response?.data?.error?.message || "Something went wrong";
    res.status(500).send(message); // Handle error response
  }
});

export default router;
