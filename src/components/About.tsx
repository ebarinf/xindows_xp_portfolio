"use client";

import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";

export default function About() {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col h-full bg-[#ECE9D8] font-sans select-none overflow-hidden">
        
        {/* --- MENU BAR --- */}
        <div className="flex gap-4 px-2 py-1 text-xs text-black border-b border-white shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
            <span className="text-gray-400 px-1 cursor-default">{t.about.file}</span>
            <span className="text-gray-400 px-1 cursor-default">{t.about.edit}</span>
            <span className="text-gray-400 px-1 cursor-default">{t.about.view}</span>
            <span className="text-gray-400 px-1 cursor-default">{t.about.tools1}</span>
            <span className="text-gray-400 px-1 cursor-default">{t.about.help}</span>
        </div>

        {/* --- TOOLBAR --- */}
        <div className="flex items-center gap-2 px-2 py-2 border-b border-white shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
            <div className="flex items-center gap-1 opacity-50 cursor-not-allowed px-2">
                <Image src="/icons/back.ico" alt="Send" width={32} height={32} />
            </div>
            <div className="flex items-center gap-1 opacity-50 cursor-not-allowed px-2">
                <Image src="/icons/forward.ico" alt="Send" width={32} height={32} />
            </div>
        </div>

        {/* --- ADDRESS BAR --- */}
        <div className="flex items-center gap-2 px-2 py-1 border-b border-[#D4D0C8] shadow-[0_1px_2px_rgba(0,0,0,0.1)] bg-[#ECE9D8]">
            <span className="text-xs text-gray-600">Address</span>
            <div className="flex-1 bg-white flex items-center px-1 border-t-gray-500 border-l-gray-500 border-b-white border-r-white border-[1px] shadow-[inset_1px_1px_0_rgba(0,0,0,0.2)]">
                <Image src="/icons/info.ico" alt="Info" width={16} height={16} className="mr-1" />
                <span className="text-xs text-black">{t.about.title}</span>
            </div>
            <button className="flex items-center gap-1 px-2 text-xs hover:border-gray-400 border border-transparent rounded transition-all">
                <div className="w-4 h-4 bg-green-600 text-white flex items-center justify-center font-bold text-[10px]">➜</div> Go
            </button>
        </div>

        {/* --- MAIN EXPLORER AREA --- */}
        <div className="flex flex-1 overflow-hidden">
            
            {/* LEFT SIDEBAR (Task Pane) */}
            <div className="w-[200px] md:w-60 shrink-0 bg-linear-to-b from-[#749AEA] to-[#5B7EDC] p-3 overflow-y-auto hidden sm:flex flex-col gap-4">
                
                {/* Box 1: Social Links */}
                <div className="bg-[#D6E0F5] rounded-tl-[3px] rounded-tr-[3px] shadow-sm flex flex-col overflow-hidden">
                    <div className="bg-linear-to-r from-[#215DC6] to-[#2566D8] text-white text-xs font-bold px-3 py-[6px] flex justify-between items-center cursor-default">
                        {t.about.socialLinks}
                        <span className="bg-white/20 rounded-full w-4 h-4 flex items-center justify-center rotate-180">^</span>
                    </div>
                    <div className="p-3 flex flex-col gap-2">
                        <a href="https://www.linkedin.com/in/eduardo-antonio-barrientos-díaz/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-[#0C327D] hover:underline hover:text-blue-800">
                            <div className="w-4 h-4 bg-[#0077B5] text-white flex items-center justify-center text-[10px] font-bold rounded-sm">in</div>
                            LinkedIn
                        </a>
                        <a href="https://github.com/ebarinf" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-[#0C327D] hover:underline hover:text-blue-800">
                            {/* Placeholder for github icon, using a dark square for now */}
                            <div className="w-4 h-4 bg-gray-800 text-white flex items-center justify-center text-[10px] font-bold rounded-full">gh</div>
                            GitHub
                        </a>
                    </div>
                </div>

                {/* Box 2: Languages & Frameworks */}
                <div className="bg-[#D6E0F5] rounded-tl-[3px] rounded-tr-[3px] shadow-sm flex flex-col overflow-hidden">
                    <div className="bg-linear-to-r from-[#215DC6] to-[#2566D8] text-white text-xs font-bold px-3 py-[6px] flex justify-between items-center cursor-default">
                        {t.about.languages}
                    </div>
                    <div className="p-3 flex flex-col gap-2 text-[11px] text-[#0C327D]">
                        <span className="flex items-center gap-2 hover:underline cursor-default"><div className="w-1 h-1 bg-blue-500 rounded-full"/> JavaScript & TypeScript</span>
                        <span className="flex items-center gap-2 hover:underline cursor-default"><div className="w-1 h-1 bg-blue-500 rounded-full"/> React & Next.js</span>
                        <span className="flex items-center gap-2 hover:underline cursor-default"><div className="w-1 h-1 bg-blue-500 rounded-full"/> Angular</span>
                        <span className="flex items-center gap-2 hover:underline cursor-default"><div className="w-1 h-1 bg-blue-500 rounded-full"/> Tailwind CSS</span>
                        <span className="flex items-center gap-2 hover:underline cursor-default"><div className="w-1 h-1 bg-blue-500 rounded-full"/> Python & Java</span>
                    </div>
                </div>

                {/* Box 3: Tools & Databases */}
                <div className="bg-[#D6E0F5] rounded-tl-[3px] rounded-tr-[3px] shadow-sm flex flex-col overflow-hidden mb-2">
                    <div className="bg-linear-to-r from-[#215DC6] to-[#2566D8] text-white text-xs font-bold px-3 py-[6px] flex justify-between items-center cursor-default">
                        {t.about.tools}
                    </div>
                    <div className="p-3 flex flex-col gap-2 text-[11px] text-[#0C327D]">
                        <span className="flex items-center gap-2 hover:underline cursor-default"><div className="w-1 h-1 bg-blue-500 rounded-full"/> Node.js & Express</span>
                        <span className="flex items-center gap-2 hover:underline cursor-default"><div className="w-1 h-1 bg-blue-500 rounded-full"/> MongoDB & SQL</span>
                        <span className="flex items-center gap-2 hover:underline cursor-default"><div className="w-1 h-1 bg-blue-500 rounded-full"/> Google Cloud (GCP)</span>
                    </div>
                </div>

            </div>

            {/* RIGHT CONTENT AREA */}
            <div className="flex-1 bg-linear-to-br from-[#5E7EEA] to-[#4A64D3] p-6 md:p-10 overflow-y-auto text-white shadow-[inset_1px_0_5px_rgba(0,0,0,0.2)]">
                <h1 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-md">
                    {t.about.title}
                </h1>
                
                <div className="flex flex-col gap-6 text-sm md:text-base leading-relaxed text-white/95 drop-shadow-sm max-w-3xl">
                    <p>{t.about.bio1}</p>
                    <p>{t.about.bio2}</p>
                </div>
            </div>

        </div>

        {/* --- STATUS BAR --- */}
        <div className="h-6 bg-[#ECE9D8] border-t border-gray-400 shadow-[inset_0_1px_0_white] flex items-center px-2">
            <span className="text-[10px] text-gray-600">{t.about.learnMore}</span>
        </div>

        </div>
    );
}