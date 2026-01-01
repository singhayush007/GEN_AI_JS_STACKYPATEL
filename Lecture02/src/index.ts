const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const promptSync = require("prompt-sync");

dotenv.config();

console.log("API KEY LOADED:", !!process.env.GEMINI_API_KEY);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-flash-latest",
  systemInstruction: "You are a helpful assistant.",
});

const chat = model.startChat({ history: [] });

const input = promptSync({ sigint: true });

async function run() {
  console.log("Chat started (type 'exit' to quit)");

  while (true) {
    const userInput = input("You: ");

    if (userInput.toLowerCase() === "exit") {
      console.log("Exiting chat...");
      break;
    }

    try {
      const result = await chat.sendMessage(userInput);
      const response = result.response.text();
      console.log("Assistant:", response);
    } catch (err) {
      console.error("Gemini error:", err);
    }
  }
}

run();

