import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import path from "path";

import { ChatOpenAI } from "@langchain/openai";
import { OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { PromptTemplate } from "@langchain/core/prompts";
import { Chroma } from "@langchain/community/vectorstores/chroma";

// -------------------------------
// 1️⃣ Load Document
// -------------------------------
const filePath = path.join(process.cwd(), "data", "docs.txt");
const rawText = fs.readFileSync(filePath, "utf-8");

// -------------------------------
// 2️⃣ Chunk the Document
// -------------------------------
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 200,
  chunkOverlap: 40,
});

const docs = await splitter.createDocuments([rawText]);

// -------------------------------
// 3️⃣ Create Embeddings + Vector Store
// -------------------------------
const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

const vectorStore = await Chroma.fromDocuments(
  docs,
  embeddings,
  {
    collectionName: "lecture08-rag",
  }
);

// -------------------------------
// 4️⃣ Retriever (Similarity Search)
// -------------------------------
const retriever = vectorStore.asRetriever({
  k: 2,
});

// -------------------------------
// 5️⃣ Prompt Template (RAG Prompt)
// -------------------------------
const ragPrompt = new PromptTemplate({
  inputVariables: ["context", "question"],
  template: `
You are a helpful assistant.
Answer the question ONLY using the context below.
If the answer is not in the context, say "I don't know".

Context:
{context}

Question:
{question}
`,
});

// -------------------------------
// 6️⃣ LLM
// -------------------------------
const model = new ChatOpenAI({
  modelName: "gpt-4o-mini",
  temperature: 0,
});

// -------------------------------
// 7️⃣ Ask Question
// -------------------------------
async function askQuestion(question: string) {
  // Retrieve relevant chunks
  const relevantDocs = await retriever.invoke(question);

  const context = relevantDocs
    .map((doc) => doc.pageContent)
    .join("\n\n");

  const prompt = await ragPrompt.format({
    context,
    question,
  });

  const response = await model.invoke([
    { role: "user", content: prompt },
  ]);

  console.log("\n❓ Question:", question);
  console.log("\n📚 Retrieved Context:\n", context);
  console.log("\n🤖 Answer:\n", response.content);
}

// -------------------------------
// 8️⃣ Run App
// -------------------------------
await askQuestion("What is RAG?");
await askQuestion("What is LangChain used for?");
await askQuestion("Who invented Java?");
