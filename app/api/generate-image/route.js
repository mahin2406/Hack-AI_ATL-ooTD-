import OpenAI from 'openai';

const predefinedPrompt = "Generate a high-resolution image (512x512) featuring a diverse group of realistic models showcasing daily fashion trends. The scene should depict a mix of casual, business, and evening outfits in an urban environment, such as a bustling city street or a stylish café. Focus on capturing sharp and clear facial expressions and features of the models, ensuring that they represent a range of sizes, ethnicities, and gender identities. Emphasize vibrant colors and textures in the clothing, paying attention to accessories, layering, and current fashion trends. Use natural lighting to enhance the clarity of the image and highlight the intricate details of the outfits.";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const response = await openai.images.generate({
      prompt: predefinedPrompt,
      n: 1,
      size: "512x512",
    });

    const imageUrl = response.data[0].url;

    return new Response(JSON.stringify({ imageUrl }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return new Response(JSON.stringify({ error: "Failed to generate image" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
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
