import OpenAI from "openai";
import "dotenv/config";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateImage() {
  const result = await openai.images.generate({
    model: "gpt-image-1",
    prompt: "a cute cat sitting on a sofa",
    size: "1024x1024",
  });

  console.log("Image URL:");
  console.log(result.data?.[0]?.url);
}

generateImage();
