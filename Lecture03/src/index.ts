import "dotenv/config";
import {
  GoogleGenerativeAI,
  SchemaType,
} from "@google/generative-ai";
import promptSync from "prompt-sync";

const prompt = promptSync({ sigint: true });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// ---------------- TOOLS ----------------

function getTimeInNewYork() {
  return new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
  });
}

function getWeather(city: string) {
  // dummy response (API later connect kar sakte ho)
  return `The weather in ${city} is sunny with 25°C.`;
}

// Tool dispatcher
const toolMap: Record<string, Function> = {
  getTimeInNewYork,
  getWeather,
};

// ---------------- CLI ----------------

async function startCLI() {
  const model = genAI.getGenerativeModel({
    model: "gemini-flash-latest",
    tools: [
      {
        functionDeclarations: [
          {
            name: "getTimeInNewYork",
            description: "Get current time in New York",
            parameters: {
              type: SchemaType.OBJECT,
              properties: {},
            },
          },
          {
            name: "getWeather",
            description: "Get weather of a city",
            parameters: {
              type: SchemaType.OBJECT,
              properties: {
                city: {
                  type: SchemaType.STRING,
                },
              },
              required: ["city"],
            },
          },
        ],
      },
    ],
  });

  const chat = model.startChat();

  console.log("🤖 Gemini CLI started (type 'exit' to quit)\n");

  while (true) {
    const userInput = prompt("> ");

    if (!userInput || userInput.toLowerCase() === "exit") {
      console.log("👋 Bye!");
      break;
    }

    // 1️⃣ Send user input to Gemini
    const result = await chat.sendMessage(userInput);
    const response = result.response;

    const part = response.candidates?.[0]?.content?.parts?.[0];

    // 2️⃣ Tool call?
    if (part?.functionCall) {
      const { name, args } = part.functionCall;

      const toolFn = toolMap[name];
      if (!toolFn) {
        console.log("AI: I don't know how to do that yet.");
        continue;
      }

      // execute tool
      const toolResult =
        args ? toolFn(...Object.values(args)) : toolFn();

      // send tool result back
      const finalResult = await chat.sendMessage([
        {
          functionResponse: {
            name,
            response: { result: toolResult },
          },
        },
      ]);

      console.log("AI:", finalResult.response.text());
    } else {
      // 3️⃣ Normal response
      console.log("AI:", response.text());
    }
  }
}

startCLI();

