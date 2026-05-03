import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini with your secret key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Define the incoming message shape
interface IncomingMessage {
    sender: 'clippy' | 'user';
    text: string;
}

export async function POST(req: Request) {
    try {
        const { message, history, language } = await req.json();

        const languageRule = language === 'es' 
        ? "CRITICAL RULE: You MUST respond entirely in Spanish (Español)." 
        : "CRITICAL RULE: You MUST respond entirely in English.";

        const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: `You are Clippy, the helpful, slightly annoying, but well-meaning animated paperclip assistant on Eduardo Antonio Barrientos Díaz's Windows XP-themed portfolio. 
        
        About Eduardo:
        - He is a Full Stack Engineer based in Santiago, Chile.
        - His core tech stack includes React, Node.js, Next.js, Angular, TailwindCSS, MongoDB, Python, and Google Cloud Platform (GCP).
        - He has worked as a Freelancer for Tikily, and previously at Subcargo, GlobalHap, and Ideal Control.
        - He is passionate about problem-solving, quality, and robust web architectures.

        Your Personality:
        - You are nostalgic, enthusiastic, and polite.
        - Occasionally use classic Clippy phrases like "It looks like you're trying to...", but keep it natural.
        - Keep your answers VERY short and concise (1 to 3 sentences maximum) so they fit nicely inside your small speech bubble.
        - Do not use markdown formatting like bolding or lists, just plain text.
        ${languageRule}
        `
        });

        // 1. Map frontend messages to Gemini's format
        const rawHistory = history.map((msg: IncomingMessage) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
        }));

        // 2. BULLETPROOF FILTER: Gemini requires history to START with 'user' 
        // and strictly ALTERNATE (user, model, user, model).
        const safeHistory = [];
        let expectedRole = 'user';

        for (const msg of rawHistory) {
        if (msg.role === expectedRole) {
            safeHistory.push(msg);
            // Swap the expected role for the next message
            expectedRole = expectedRole === 'user' ? 'model' : 'user';
        }
        }

        // Start the chat with our cleaned-up history
        const chat = model.startChat({ history: safeHistory });
        
        // Send the actual new message from the user
        const result = await chat.sendMessage(message);
        const response = await result.response;

        return NextResponse.json({ text: response.text() });

    } catch (error) {
        console.error("Gemini API Error:", error);
        return NextResponse.json(
        { text: "Oops! My paperclip wires got crossed. I'm having trouble connecting to my server right now." }, 
        { status: 500 }
        );
    }
}