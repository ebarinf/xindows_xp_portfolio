"use client";

import Image from "next/image";
import { useState } from "react";
// import { useLanguage } from "../context/LanguageContext"; // Uncomment when ready to translate!

export default function Contact() {
    const [formData, setFormData] = useState({ from: "", subject: "", message: "" });
    // const { t } = useLanguage();

    return (
        <div className="flex flex-col h-full bg-[#ECE9D8] font-sans select-none">
        
        {/* --- MENU BAR --- */}
        <div className="flex gap-4 px-2 py-1 text-xs text-black border-b border-white shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
            <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">File</span>
            <span className="text-gray-400 px-1 cursor-default">Edit</span>
            <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">View</span>
            <span className="text-gray-400 px-1 cursor-default">Tools</span>
            <span className="text-gray-400 px-1 cursor-default">Help</span>
        </div>

        {/* --- TOOLBAR --- */}
        <div className="flex items-center gap-4 px-2 py-2 border-b border-white shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
            <button className="flex items-center gap-1 hover:border-gray-400 border border-transparent p-1 rounded transition-all active:bg-gray-200">
            <Image src="/icons/msn.ico" alt="Send" width={24} height={24} />
            <span className="text-xs text-gray-600">Send Message</span>
            </button>
            
            <div className="w-[1px] h-8 bg-gray-400 shadow-[1px_0_0_white]" /> {/* Divider */}

            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:border-gray-400 border border-transparent p-1 rounded transition-all active:bg-gray-200">
            {/* Assuming you have a linkedin icon, or replace with another icon */}
            <div className="w-6 h-6 bg-[#0077B5] text-white font-bold text-xs flex items-center justify-center rounded-sm">in</div>
            <span className="text-xs text-gray-600">LinkedIn</span>
            </a>
        </div>

        {/* --- FORM AREA --- */}
        <div className="flex flex-col flex-1 p-2 gap-2 overflow-y-auto">
            
            {/* TO Field (Disabled) */}
            <div className="flex items-center">
            <span className="w-16 text-right pr-2 text-xs text-gray-600">To:</span>
            <div className="flex-1 bg-[#F0F0F0] px-2 py-1 text-xs text-black border-t-gray-500 border-l-gray-500 border-b-white border-r-white border-[1px] shadow-[inset_1px_1px_0_rgba(0,0,0,0.2)]">
                Eduardo &lt;your.email@example.com&gt;
            </div>
            </div>

            {/* FROM Field */}
            <div className="flex items-center">
            <span className="w-16 text-right pr-2 text-xs text-gray-600">From:</span>
            <input 
                type="email"
                placeholder="Your email address"
                value={formData.from}
                onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                className="flex-1 bg-white px-2 py-1 text-xs text-black border-t-gray-500 border-l-gray-500 border-b-white border-r-white border-[1px] shadow-[inset_1px_1px_0_rgba(0,0,0,0.2)] focus:outline-none focus:bg-blue-50"
            />
            </div>

            {/* SUBJECT Field */}
            <div className="flex items-center">
            <span className="w-16 text-right pr-2 text-xs text-gray-600">Subject:</span>
            <input 
                type="text"
                placeholder="Subject of your message"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="flex-1 bg-white px-2 py-1 text-xs text-black border-t-gray-500 border-l-gray-500 border-b-white border-r-white border-[1px] shadow-[inset_1px_1px_0_rgba(0,0,0,0.2)] focus:outline-none focus:bg-blue-50"
            />
            </div>

            {/* MESSAGE AREA */}
            <textarea 
            placeholder="Write your message here..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="flex-1 mt-2 bg-white p-2 text-xs text-black border-t-gray-500 border-l-gray-500 border-b-white border-r-white border-[2px] shadow-[inset_1px_1px_0_rgba(0,0,0,0.2)] resize-none focus:outline-none focus:bg-blue-50"
            />

        </div>

        {/* --- STATUS BAR --- */}
        <div className="h-6 bg-[#ECE9D8] border-t border-gray-400 shadow-[inset_0_1px_0_white] flex items-center px-2">
            <span className="text-[10px] text-gray-600">Compose a message to Eduardo</span>
        </div>

        </div>
    );
}