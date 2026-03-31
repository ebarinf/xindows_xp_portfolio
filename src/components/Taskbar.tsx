"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
// 1. Import the new Start Menu
import StartMenu from "./StartMenu"; 

interface TaskbarProps {
    onOpenApp: (id: string) => void;
}
export default function Taskbar({ onOpenApp }: TaskbarProps) {
    const [time, setTime] = useState<string>("");
    // 2. Add state for the Start Menu
    const [isStartOpen, setIsStartOpen] = useState(false); 
    const { t } = useLanguage();
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        // If the menu is closed, do nothing
        if (!isStartOpen) return;
        
        const target = event.target as Node;
        
        // If the click is INSIDE the menu, or ON the start button, do nothing
        if (menuRef.current?.contains(target) || buttonRef.current?.contains(target)) {
            return;
        }
        
        // Otherwise, close the menu!
        setIsStartOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [isStartOpen]);

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
        // Note: I added 'relative' to this parent div so the absolute StartMenu positions itself relative to the taskbar!
        <div className="absolute bottom-0 left-0 w-full flex select-none z-50 bg-[#1240b9] pb-[env(safe-area-inset-bottom)]">
        
            {/* 3. Render the Start Menu */}
            <div ref={menuRef}>
                <StartMenu isOpen={isStartOpen} onClose={() => setIsStartOpen(false)} onOpenApp={onOpenApp} />
            </div>

            {/* 4. Update the Start Button to toggle the state */}
            <button 
                ref={buttonRef}
                onClick={() => setIsStartOpen(!isStartOpen)}
                className={`h-[30px] flex items-center justify-center gap-1 px-3 pr-4 bg-linear-to-b from-[#3c8939] via-[#4db047] to-[#2a7326] rounded-tr-[15px] rounded-br-[15px] border-t border-t-[#8ae87f] shadow-[inset_0_0_2px_rgba(255,255,255,0.4),3px_0_4px_rgba(0,0,0,0.3)] hover:brightness-110 active:brightness-90 transition-all z-20 ${isStartOpen ? 'brightness-90 inset-shadow-inner' : ''}`}
            >
                <Image src="/icons/windows_xp_classic.ico" alt="Start" width={18} height={18} className="drop-shadow-md" />
                <span 
                className="text-white font-bold italic text-[17px] tracking-wider pr-1" 
                style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                >
                {t.taskbar.start}
                </span>
            </button>

            {/* MAIN TASKBAR BACKGROUND */}
            <div className="flex-1 h-[30px] bg-linear-to-b from-[#245edc] via-[#3f7cf3] to-[#1240b9] border-t border-t-[#91a6f3] flex items-center px-4 z-10 -ml-3">
            </div>

            {/* SYSTEM TRAY */}
            <div className="h-[30px] flex items-center px-4 bg-linear-to-b from-[#0f5fc8] via-[#158de4] to-[#0e55b5] border-l border-[#0a357f] border-t border-t-[#78c0ed] shadow-[inset_1px_0px_0px_#4eb6f3] text-white text-xs z-10">
                <span className="cursor-default drop-shadow-sm">{time}</span>
            </div>
        
        </div>
    );
}