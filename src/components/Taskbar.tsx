"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function Taskbar() {
    const [time, setTime] = useState<string>("");
    const{t} = useLanguage()

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
        
        {/* START BUTTON */}
        <button className="h-[30px] flex items-center justify-center gap-1 px-3 pr-4 bg-gradient-to-b from-[#3c8939] via-[#4db047] to-[#2a7326] rounded-tr-[10px] rounded-br-[10px] border-t-[1px] border-t-[#8ae87f] shadow-[inset_0_0_2px_rgba(255,255,255,0.4),3px_0_4px_rgba(0,0,0,0.3)] hover:brightness-110 active:brightness-90 transition-all z-20">
            <Image src="/icons/windows_xp_classic.ico" alt="Start" width={18} height={18} className="drop-shadow-md" />
            <span 
            className="text-white font-bold italic text-[17px] tracking-wider pr-1" 
            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
            >
            {t.taskbar.start}
            </span>
        </button>

        <div className="flex-1 h-[30px] bg-gradient-to-b from-[#245edc] via-[#3f7cf3] to-[#1240b9] border-t-[1px] border-t-[#91a6f3] flex items-center px-4 z-10 -ml-3">

        </div>

        {/* SYSTEM TRAY */}
        <div className="h-[30px] flex items-center px-4 bg-gradient-to-b from-[#0f5fc8] via-[#158de4] to-[#0e55b5] border-l border-[#0a357f] border-t-[1px] border-t-[#78c0ed] shadow-[inset_1px_0px_0px_#4eb6f3] text-white text-xs z-10">
            <span className="cursor-default drop-shadow-sm">{time}</span>
        </div>
        
        </div>
    );
}