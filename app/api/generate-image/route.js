// route.js
import { GoogleGenerativeAI } from "@google/generative-ai";
// import { storage } from "../../firebase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";

// Predefined prompt for image generation
const predefinedPrompt = "A futuristic cityscape with flying cars and vibrant neon lights";

export async function POST(req) {
  try {
    const genAI = new GoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    // Generate the image
    const response = await genAI.generateImage({
      model: "gemini-pro",
      prompt: predefinedPrompt,
    });

    const imageData = response.response.artifacts[0].base64;

    // Define a reference to where the image will be stored
    const imageRef = ref(storage, `generated-images/${Date.now()}.png`);

    // Upload the base64 image to Firebase Storage
    await uploadString(imageRef, imageData, "base64");

    // Get the public URL of the uploaded image
    const downloadURL = await getDownloadURL(imageRef);

    return new Response(
      JSON.stringify({ imageUrl: downloadURL }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error generating or uploading image:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate or upload image" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function GET(req) {
  return new Response(
    JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    }
  );
}
