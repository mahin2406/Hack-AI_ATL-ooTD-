// /app/api/generate-image/route.js
import { Configuration, OpenAIApi } from "openai";

const predefinedPrompt = "New fashion clothes images"; // Change as needed

// Initialize OpenAI API
const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Ensure this key is correctly set in your .env file
  })
);

export async function POST(req) {
  try {
    // Call DALL·E 3 image generation
    const response = await openai.createImage({
      prompt: predefinedPrompt,
      n: 1, // Number of images to generate
      size: "512x512", // Image size: 256x256, 512x512, or 1024x1024
      response_format: "url", // Response format: "url" or "b64_json"
    });

    const imageUrl = response.data.data[0].url; // Extract image URL

    // Send back the image URL in the response
    return new Response(
      JSON.stringify({ imageUrl }), 
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error generating image:", error.message);
    return new Response(
      JSON.stringify({ error: "Failed to generate image" }), 
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function GET(req) {
  return new Response(
    JSON.stringify({ error: "Method not allowed" }), 
    {
      status: 405,
      headers: { "Content-Type": "application/json" },
    }
  );
}
