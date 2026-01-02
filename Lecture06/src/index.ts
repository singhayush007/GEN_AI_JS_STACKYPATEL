import OpenAI from "openai";
import { ChromaClient } from "chromadb";
import "dotenv/config";
import { chatMessages } from "./messages.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const chroma = new ChromaClient();

async function main() {
  // 1️⃣ Create / get collection
  const collection = await chroma.getOrCreateCollection({
    name: "chat_messages",
  });

  // 2️⃣ Store chat messages as embeddings
  for (const msg of chatMessages) {
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: msg.content,
    });

    await collection.add({
      ids: [msg.id],
      embeddings: [embeddingResponse.data[0].embedding],
      documents: [msg.content],
      metadatas: [{ role: msg.role }],
    });
  }

  console.log("✅ Chat messages stored in vector DB");

  // 3️⃣ User query
  const query = "What is a vector database?";

  const queryEmbedding = (
    await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: query,
    })
  ).data[0].embedding;

  // 4️⃣ Search similar messages
  const results = await collection.query({
    queryEmbeddings: [queryEmbedding],
    nResults: 2,
  });

  console.log(`\n🔍 Query: ${query}\n`);
  console.log("📌 Similar Chat Messages:\n");

  results.documents?.[0]?.forEach((doc, i) => {
    console.log(`${i + 1}. ${doc}`);
  });
}

main();
