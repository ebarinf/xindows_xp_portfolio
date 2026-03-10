"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Taskbar() {
    const [time, setTime] = useState<string>("");

    // Simple clock logic
    useEffect(() => {
        const updateTime = () => {
        const now = new Date();
        setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute bottom-0 left-0 w-full h-[30px] flex select-none z-50">
        
        {/* Main Taskbar Background (Blue Gradient) */}
        <div className="flex-1 flex bg-gradient-to-b from-[#245EDC] via-[#3f7cf3] to-[#245EDC] border-t border-[#467FF0]">
            
            {/* Start Button */}
            <button className="h-full flex items-center justify-center gap-1 px-2 pr-4 bg-gradient-to-b from-[#3E9F4C] via-[#4CB25A] to-[#388D43] rounded-r-xl border-r border-white/30 shadow-[inset_0px_1px_2px_rgba(255,255,255,0.6)] hover:brightness-110 active:brightness-90 transition-all">
            <Image src="/icons/windows_xp_classic.ico" alt="Start" width={18} height={18} className="drop-shadow-sm" />
            <span className="text-white font-bold italic text-sm drop-shadow-md">start</span>
            </button>

            {/* Open Apps Area (Empty for now) */}
            <div className="flex-1 px-2 flex items-center gap-1">
            {/* We will map open Window tabs here later */}
            </div>
        </div>

        {/* System Tray (Light Blue/Teal Gradient) */}
        <div className="h-full flex items-center px-3 bg-gradient-to-b from-[#0C59B9] via-[#139EE9] to-[#0C59B9] border-l border-[#1042AF] text-white text-xs shadow-[inset_1px_0px_1px_rgba(255,255,255,0.3)]">
            <span className="drop-shadow-md cursor-default">{time}</span>
        </div>
        </div>
    );
}