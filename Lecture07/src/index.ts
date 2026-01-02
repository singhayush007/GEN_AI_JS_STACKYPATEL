import dotenv from "dotenv";
dotenv.config();

import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

// -------------------------------
// 1️⃣ Chat Model Setup
// -------------------------------
const model = new ChatOpenAI({
  modelName: "gpt-4o-mini",
  temperature: 0.7,
  maxTokens: 500,
});

// -------------------------------
// 2️⃣ Prompt Template
// -------------------------------
const explainTemplate = new PromptTemplate({
  inputVariables: ["language", "text"],
  template: `
You are a helpful assistant.
Explain the following text in {language} language.

TEXT:
{text}
`,
});

// -------------------------------
// 3️⃣ Single Call with PromptTemplate
// -------------------------------
async function singleCall() {
  const prompt = await explainTemplate.format({
    language: "simple English",
    text: "Explain the theory of relativity",
  });

  const response = await model.invoke([{ role: "user", content: prompt }]);

  console.log("\n🔹 SINGLE RESPONSE:");
  console.log(response.content);
}

// -------------------------------
// 4️⃣ Batch Call with PromptTemplate
// -------------------------------
async function batchCall() {
  const prompts = await Promise.all([
    explainTemplate.format({
      language: "English",
      text: "What is JavaScript?",
    }),
    explainTemplate.format({
      language: "English",
      text: "What is the capital of France?",
    }),
  ]);

  const responses = await model.batch(
    prompts.map((p) => [{ role: "user", content: p }])
  );

  console.log("\n🔹 BATCH RESPONSES:");
  responses.forEach((res, i) => {
    console.log(`${i + 1}. ${res.content}`);
  });
}

// -------------------------------
// 5️⃣ Chunking + PromptTemplate 🔥
// -------------------------------
async function chunkingCall() {
  const longText = `
Albert Einstein developed the theory of relativity, which changed our
understanding of space, time, and gravity. Special relativity explains
how time slows down at high speeds, while general relativity explains
how massive objects bend space-time.
`;

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 150,
    chunkOverlap: 30,
  });

  const chunks = await splitter.createDocuments([longText]);

  console.log(`\n🧩 TOTAL CHUNKS: ${chunks.length}`);

  for (let i = 0; i < chunks.length; i++) {
    const prompt = await explainTemplate.format({
      language: "Hinglish (simple)",
      text: chunks[i].pageContent,
    });

    const response = await model.invoke([{ role: "user", content: prompt }]);

    console.log(`\n🔸 CHUNK ${i + 1} RESPONSE:`);
    console.log(response.content);
  }
}

// -------------------------------
// 6️⃣ Main Runner
// -------------------------------
async function main() {
  await singleCall();
  await batchCall();
  await chunkingCall();
}

main().catch((err) => {
  console.error("❌ Error:", err);
});
