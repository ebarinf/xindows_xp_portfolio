"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext"; // Uncomment when ready to translate

interface Message {
    sender: 'clippy' | 'user';
    text: string;
}

export default function Clippy({ onClose }: { onClose: () => void }) {
    const { language, t } = useLanguage();
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'clippy', text: t.clippy.greeting }
    ]);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;
        
        const userText = input;
        const currentHistory = [...messages]; // Save history before adding the new message
        
        // 1. Add user message to UI immediately
        setMessages(prev => [...prev, { sender: 'user', text: userText }]);
        setInput("");
        setIsLoading(true);

        try {
            // 2. Call our new Gemini API
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    message: userText, 
                    history: currentHistory,
                    language: language
                }),
            });

            const data = await response.json();

            // 3. Add Clippy's response to UI
            if (response.ok) {
                setMessages(prev => [...prev, { sender: 'clippy', text: data.text }]);
            } else {
                setMessages(prev => [...prev, { sender: 'clippy', text: t.clippy.error }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { sender: 'clippy', text: t.clippy.error }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-16 right-4 md:right-12 flex flex-col items-end z-[999] w-64 drop-shadow-xl font-sans select-none">
        
        {/* --- SPEECH BUBBLE --- */}
        <div className="relative bg-[#FFFFE1] border border-black rounded-[8px] p-3 w-full mb-4 shadow-[2px_2px_5px_rgba(0,0,0,0.2)] text-sm text-black">
            
            {/* Red Close Button */}
            <button 
            onClick={onClose} 
            className="absolute top-1 right-2 text-[#E81123] font-bold text-base hover:text-red-800 leading-none"
            aria-label="Close"
            >
            ×
            </button>

            {/* Chat History Area */}
            <div className="h-40 overflow-y-auto mb-2 pr-1 flex flex-col gap-3 mt-4">
            {messages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <span className={`inline-block rounded-[4px] px-2 py-1 max-w-[90%] break-words ${msg.sender === 'user' ? 'bg-[#316AC5] text-white' : 'text-black'}`}>
                    {msg.text}
                </span>
                </div>
            ))}
            <div ref={messagesEndRef} />
            </div>

            {/* Divider Line */}
            <div className="h-[1px] bg-[#C0C0C0] w-full mb-2" />

            {/* Input Area (Replaces Cancel Button) */}
            <div className="flex gap-1 items-center">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={isLoading ? t.clippy.typing : t.clippy.placeholder} // <-- Localized!
                    disabled={isLoading}
                    className="flex-1 border border-[#7F9DB9] px-1 py-[2px] text-xs focus:outline-none focus:border-[#316AC5] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)] disabled:bg-gray-200 disabled:text-gray-500"
                />
                <button 
                    onClick={handleSend} 
                    disabled={isLoading} // <-- Updated
                    className={`flex-shrink-0 ml-1 transition-transform ${isLoading ? 'text-gray-400' : 'text-[#00A2E8] hover:text-[#0054E3] active:scale-95'}`} // <-- Updated
                ></button>
            </div>

            <div className="absolute -bottom-[16px] left-[20%] w-0 h-0 border-l-[8px] border-l-transparent border-t-[16px] border-t-black border-r-[8px] border-r-transparent">
            <div className="absolute -left-[7px] -top-[17px] w-0 h-0 border-l-[7px] border-l-transparent border-t-[15px] border-t-[#FFFFE1] border-r-[7px] border-r-transparent"></div>
            </div>
        </div>

        {/* --- CLIPPY CHARACTER --- */}
        <div className="pr-12 pointer-events-none">
            <Image 
            src="/icons/clippy.gif" 
            alt="Clippy" 
            width={200} 
            height={200} 
            className="drop-shadow-md"
            unoptimized
            />
        </div>

        </div>
    );
}