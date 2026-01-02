# Generative AI with Node.js, LangChain, TypeScript & Open AI & Google Gemini

This repository contains my learning and practice code while studying **Generative AI with Node.js and TypeScript**.
The implementation uses **Google Gemini API** **OpenAI**, inspired by Stacky Patel Generative AI course.

---

## 📚 Lecture 01 – Introduction & Setup

### 🔧 What You'll Learn in This Lecture:

✅ How to get and use your **Google Gemini API key**  
✅ Understanding **Google Gemini services and models**  
✅ Setting up a **Node.js project with TypeScript**  
✅ Installing and using the **Google Generative AI (Gemini) Node.js SDK**  
✅ Best practices for organising a **Generative AI project**

---

## 📚 Lecture 02 – Gemini Chat Application (CLI Based)

### 🔧 What You'll Learn in This Lecture:

✅ Setting up **Google Gemini client** using Node.js  
✅ Loading environment variables securely with **dotenv**  
✅ Understanding **Gemini models** (`gemini-flash-latest`)  
✅ Using **system instructions** to control AI behaviour  
✅ Creating a **chat-based conversation** using Gemini  
✅ Taking real-time user input from terminal  
✅ Handling errors and graceful exit in a GenAI app

---

## 📚 Lecture 03 – Tool Calling with Gemini (Weather Fetch App)

### 🔧 What You'll Learn in This Lecture:

✅ Understanding **Tool Calling (Function Calling)** in Generative AI  
✅ How Gemini decides **when to call a tool** vs when to respond normally  
✅ Defining **custom tools / functions** for Gemini  
✅ Implementing a **Weather Fetch Tool**  
✅ Passing structured parameters (e.g. city name) from AI to function  
✅ Executing real-world logic (API or mock data) from tool calls  
✅ Returning tool results back to Gemini  
✅ Complete flow: **User → AI → Tool → AI → Final Response**

### 🛠️ What We Built:

- A CLI-based AI application where:
  - User asks questions like _"What is the weather in Delhi?"_
  - Gemini automatically triggers a **weather tool**
  - The tool fetches weather data
  - Gemini formats the data into a **human-friendly answer**

This lecture explains how **LLMs interact with external systems**, which is a **core concept for production-level GenAI apps**.

---

## 📚 Lecture 04 – Multimodal AI with DALL·E & Whisper

### 🔧 What You'll Learn in This Lecture:

✅ Understanding **Multimodal AI** (Text, Image, Audio)  
✅ Using **DALL·E** for **Text-to-Image generation**  
✅ Using **Whisper** for **Text-to-Speech (Voice generation)**  
✅ Handling **binary outputs** (images & audio files) in Node.js  
✅ Saving generated images and audio locally  
✅ Managing TypeScript types and error handling  
✅ Building real-world GenAI utilities using Node.js

### 🛠️ What We Built:

#### 🎨 Text to Image (DALL·E)

- User provides a text prompt
- AI generates an image based on the prompt
- Image is saved locally (e.g. `.png` file)

#### 🔊 Text to Voice (Whisper / TTS)

- User provides text input
- AI converts text into **natural-sounding speech**
- Audio file is generated and stored (e.g. `.mp3` / `.wav`)

This lecture demonstrates how GenAI goes **beyond chat**, enabling:

- Image generation
- Voice generation
- Creative & production-ready AI workflows

---

## 📚 Lecture 05 – Vector Embeddings & Similarity Search

### 🔧 What You'll Learn in This Lecture:

✅ What are **Vector Embeddings** and why they are important in GenAI  
✅ Converting text into **numerical vector representations**  
✅ Understanding **semantic meaning** through embeddings  
✅ What is **Cosine Similarity** and how it works  
✅ What is **Dot Product Similarity**  
✅ Difference between **Cosine Similarity vs Dot Similarity**  
✅ Measuring similarity between two pieces of text

### 🧠 Key Concepts Explained:

- **Vector Embeddings**

  - Text is converted into high-dimensional vectors
  - Similar meanings → vectors closer to each other

- **Cosine Similarity**

  - Measures the **angle** between two vectors
  - Focuses on direction, not magnitude
  - Value ranges between `-1` and `1`
  - Commonly used in semantic search

- **Dot Product Similarity**
  - Measures similarity based on vector multiplication
  - Depends on both **direction and magnitude**
  - Faster but less normalized than cosine similarity

---

## 📚 Lecture 06 – Vector Databases with ChromaDB (Semantic Search)

### 🔧 What You'll Learn in This Lecture:

✅ What is a **Vector Database** and why it is needed  
✅ How vector databases store and search embeddings  
✅ Introduction to **ChromaDB**  
✅ Creating and managing **collections** in ChromaDB  
✅ Storing text data as **embeddings**  
✅ Using metadata (role, ids) with vectors  
✅ Performing **semantic similarity search**  
✅ Understanding how vector DBs power **RAG systems**

### 🧠 Key Concepts Explained:

- **Vector Database**

  - A specialized database designed to store **vector embeddings**
  - Enables fast **similarity search** instead of exact matching
  - Used in semantic search, chat history memory, and RAG pipelines

- **ChromaDB**

  - Lightweight, open-source vector database
  - Easy to use with Node.js
  - Ideal for learning and local GenAI projects

- **Semantic Search**
  - Search is based on **meaning**, not keywords
  - User query is converted into an embedding
  - Closest vectors are returned using similarity metrics

## 📚 Lecture 07 – LangChain Fundamentals (Prompts, Batching & Chunking)

### 🔧 What You'll Learn in This Lecture:

✅ Introduction to **LangChain** and why it is used  
✅ Setting up **ChatOpenAI** model with LangChain  
✅ Using **PromptTemplate** for dynamic prompts  
✅ Single LLM calls using LangChain  
✅ Batch processing multiple prompts efficiently  
✅ Handling long text using **Text Chunking**  
✅ Understanding **RecursiveCharacterTextSplitter**  
✅ Building structured and reusable LLM workflows

### 🧠 Key Concepts Explained:

- **LangChain**

  - A framework to build structured, modular GenAI applications
  - Simplifies prompt management, chaining, and LLM orchestration

- **PromptTemplate**

  - Allows dynamic prompt creation using variables
  - Helps maintain consistency and reusability in prompts

- **Batch Calls**

  - Send multiple prompts in one call
  - Improves performance and reduces overhead

- **Text Chunking**
  - Large text is split into smaller overlapping chunks
  - Prevents context length issues in LLMs

### 🛠️ What We Built:

- Created a **ChatOpenAI** model using LangChain
- Built reusable prompts using **PromptTemplate**
- Executed:
  - **Single LLM calls**
  - **Batch LLM calls**
- Processed long text using **RecursiveCharacterTextSplitter**
- Sent chunked text to the LLM and generated explanations per chunk

This lecture focuses on **prompt engineering + scalability**, forming the base for advanced GenAI systems.

---

## 📚 Lecture 08 – Retrieval Augmented Generation (RAG) with LangChain

### 🔧 What You'll Learn in This Lecture:

✅ What is **Retrieval Augmented Generation (RAG)**  
✅ Why RAG is needed over plain LLM responses  
✅ Loading and processing external documents  
✅ Chunking documents for better retrieval  
✅ Creating **Embeddings** for documents  
✅ Storing embeddings in **Chroma Vector Database**  
✅ Performing **Similarity Search** using retrievers  
✅ Combining retrieved context with LLM responses

### 🧠 Key Concepts Explained:

- **RAG (Retrieval Augmented Generation)**

  - Enhances LLMs with external knowledge
  - Prevents hallucinations
  - Answers are grounded in real documents

- **Retriever**

  - Fetches the most relevant document chunks
  - Uses vector similarity search

- **Context-Aware Prompting**
  - LLM is forced to answer using only retrieved context
  - If data is missing, model responds with `"I don't know"`

### 🛠️ What We Built:

- Loaded a text document from local storage
- Split the document into overlapping chunks
- Generated embeddings using OpenAI Embeddings
- Stored vectors in **ChromaDB**
- Retrieved top-K relevant chunks for a query
- Passed retrieved context into a **RAG Prompt Template**
- Generated accurate, grounded answers using an LLM

### 🔍 Example Queries:

- _"What is RAG?"_
- _"What is LangChain used for?"_
- _"Who invented Java?"_ (Correctly returns **"I don't know"**)

This lecture demonstrates a **production-grade GenAI pattern**, widely used in:

- AI chatbots
- Knowledge assistants
- Document Q&A systems

---
