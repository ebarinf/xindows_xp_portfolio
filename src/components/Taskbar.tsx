"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useWindowStore } from "../store/windowStore";
// 1. Import the new Start Menu
import StartMenu from "./StartMenu"; 

interface TaskbarProps {
    onLogOff: () => void;
}

export default function Taskbar({ onLogOff }: TaskbarProps) {
    const [time, setTime] = useState<string>("");
    const [isStartOpen, setIsStartOpen] = useState(false);
    const { t } = useLanguage();
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const openWindows = useWindowStore((s) => s.openWindows);
    const minimizedWindows = useWindowStore((s) => s.minimizedWindows);
    const activeWindow = useWindowStore((s) => s.activeWindow);
    const { openWindow, toggleTab } = useWindowStore();

    const APP_REFERENCES = [
        { id: 'resume', label: t.desktop.resume, icon: '/icons/PDF.ico' },
        { id: 'contact', label: t.desktop.contact, icon: '/icons/msn.ico' },
        { id: 'about', label: t.desktop.about, icon: '/icons/info.ico' },
        { id: 'projects', label: t.desktop.projects, icon: '/icons/folder.ico' },
    ];

    const activeTaskbarWindows = openWindows.map(windowId => {
        const ref = APP_REFERENCES.find(a => a.id === windowId);
        if (!ref) return null;
        return { ...ref, isMinimized: minimizedWindows.includes(windowId) };
    }).filter(Boolean);

    useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        if (!isStartOpen) return;
        const target = event.target as Node;
        if (menuRef.current?.contains(target) || buttonRef.current?.contains(target)) {
            return;
        }
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
        <div className="absolute bottom-0 left-0 w-full flex select-none z-50 bg-[#1240b9] pb-[env(safe-area-inset-bottom)]">
        
            <div ref={menuRef}>
                <StartMenu 
                    isOpen={isStartOpen} 
                    onClose={() => setIsStartOpen(false)}
                    onLogOff={onLogOff}
                />
            </div>

            <button 
                ref={buttonRef}
                onClick={() => setIsStartOpen(!isStartOpen)}
                className={`h-[30px] flex items-center justify-center gap-1 px-3 pr-4 bg-linear-to-b from-[#3c8939] via-[#4db047] to-[#2a7326] rounded-r-[10px] border-t border-t-[#8ae87f] shadow-[inset_0_0_2px_rgba(255,255,255,0.4),3px_0_4px_rgba(0,0,0,0.3)] hover:brightness-110 active:brightness-90 transition-all z-20 ${isStartOpen ? 'brightness-90 inset-shadow-inner' : ''}`}
            >
                <Image src="/icons/windows_xp_classic.ico" alt="Start" width={18} height={18} className="drop-shadow-md" />
                <span 
                className="text-white font-bold italic text-[17px] tracking-wider pr-1" 
                style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                >
                {t.taskbar.start}
                </span>
            </button>

            {/* MAIN TASKBAR BACKGROUND & TABS */}
            <div className="flex-1 h-[30px] bg-linear-to-b from-[#245edc] via-[#3f7cf3] to-[#1240b9] pb-px border-t border-t-[#91a6f3] flex items-center px-2 z-10 -ml-2 gap-1 overflow-x-auto">
                {activeTaskbarWindows.map((win: any) => {
                    const isTabActive = activeWindow === win.id && !win.isMinimized;
                    
                    return (
                    <div 
                        key={win.id}
                        onClick={() => toggleTab(win.id)}
                        className={`flex items-center gap-1 px-2 h-[26px] w-[150px] shrink-0 rounded-sm cursor-default select-none text-white text-xs border border-[#1A3B8B] transition-all
                        ${isTabActive 
                            ? 'bg-linear-to-b from-[#1C4199] to-[#132C66] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5)] font-normal' 
                            : 'bg-linear-to-b from-[#3A6EE0] to-[#2857C4] shadow-[inset_1px_1px_1px_rgba(255,255,255,0.3)] hover:brightness-110 font-normal'
                        }`}
                    >
                        <Image src={win.icon} alt={win.label} width={14} height={14} className="drop-shadow-sm hrink-0" />
                        <span className="truncate">{win.label}</span>
                    </div>
                    );
                })}
            </div>

            {/* SYSTEM TRAY */}
            <div className="h-[30px] flex items-center px-4 bg-linear-to-b from-[#0f5fc8] via-[#158de4] to-[#0e55b5] border-l border-[#0a357f] border-t border-t-[#78c0ed] shadow-[inset_1px_0px_0px_#4eb6f3] text-white text-xs z-10">
                <span className="cursor-default drop-shadow-sm">{time}</span>
            </div>
        
        </div>
    );
}