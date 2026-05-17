"use client";

import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";
import { useState } from "react";

interface StartMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenApp: (id: string) => void;
    onLogOff: () => void;
}

const handleRestart = () => {
    window.location.reload(); 
};
export default function StartMenu({ isOpen, onClose, onOpenApp, onLogOff }: StartMenuProps) {
    const { t } = useLanguage();

    const [showAllPrograms, setShowAllPrograms] = useState(false);

    // --- ADD THIS ARRAY ---
    const ALL_PROGRAMS = [
        { id: 'clippy', label: 'Clippy AI', icon: '/icons/clippy.ico' },
        { id: 'resume', label: t.desktop.resume, icon: '/icons/PDF.ico' },
        { id: 'projects', label: t.desktop.projects, icon: '/icons/folder.ico' },
        { id: 'about', label: t.desktop.about, icon: '/icons/info.ico' },
        { id: 'contact', label: t.desktop.contact, icon: '/icons/msn.ico' },
        { id: 'github', label: 'GitHub', icon: '/icons/github.ico', url: "https://github.com/ebarinf" },
        { id: 'linkedin', label: 'LinkedIn', icon: '/icons/linkedin.ico', url: "https://www.linkedin.com/in/eduardo-antonio-barrientos-díaz/" }
    ];

    if (!isOpen) return null;

    return (
        <div 
        className="absolute bottom-full left-0 mb-px w-full md:w-[380px] h-auto bg-white rounded-t-lg shadow-[2px_2px_10px_rgba(0,0,0,0.5)] flex flex-col z-50 border border-[#0A246A]"
        >
        {/* --- HEADER --- */}
        <div className="bg-linear-to-r from-[#1868CE] to-[#2470DA] h-14 flex items-center px-2 shadow-sm border-b border-white/50 rounded-t-lg overflow-hidden">
            <div className="w-10 h-10 rounded border-2 border-white/80 overflow-hidden shadow-sm bg-yellow-200 shrink-0 flex items-center justify-center">
                <Image src="/icons/msn.ico" alt="User" width={32} height={32} />
            </div>
            <span className="text-white font-bold text-lg ml-2 drop-shadow-md">
                {t.login.title}
            </span>
        </div>

        {/* --- TWO-COLUMN BODY --- */}
        <div className="flex flex-row h-[350px]">
            
            {/* Left Column (White - Apps) */}
            <div className="w-1/2 bg-white flex flex-col text-black">
            {/* Main Apps */}
            <div className="flex-1">
                <div 
                    className="flex items-center gap-2 p-2 hover:bg-[#2F71CD] hover:text-white cursor-pointer group"
                    onClick={() => { onOpenApp('clippy'); onClose(); }}
                >
                    <Image src="/icons/clippy.ico" alt="Clippy ai" width={30} height={30} />
                    <span className="text-xs group-hover:text-white">Clippy AI</span>
                </div>
                
                {/* Divider */}
                <div className="h-px bg-linear-to-r from-transparent via-gray-300 to-transparent my-1" />
                
                {/* Pinned App */}
                <div 
                    className="flex items-center gap-2 p-2 hover:bg-[#2F71CD] hover:text-white cursor-pointer group"
                    onClick={() => { onOpenApp('resume'); onClose(); }}
                >
                    <Image src="/icons/PDF.ico" alt="Resume" width={30} height={30} />
                    <span className="text-xs group-hover:text-white">{t.desktop.resume}</span>
                </div>
            </div>

                {/* All Programs */}
                <div 
                    className="relative h-10 border-t border-gray-200 flex items-center justify-center hover:bg-[#2F71CD] hover:text-white cursor-pointer group mt-auto"
                    onMouseEnter={() => setShowAllPrograms(true)}
                    onMouseLeave={() => setShowAllPrograms(false)}
                    onClick={() => setShowAllPrograms(!showAllPrograms)} // Backup for mobile taps
                >
                    <span className="font-bold text-xs">{t.startMenu.programs}</span>
                    <span className="ml-2 text-[#3A801D] group-hover:text-white font-black">▶</span>

                    {/* THE CASCADING SUB-MENU */}
                    {showAllPrograms && (
                        <div className="absolute left-full bottom-0 w-[200px] bg-white border border-[#afafaf] shadow-[2px_2px_10px_rgba(0,0,0,0.5)] z-50 flex flex-col py-1 cursor-default">
                            
                            {/* The classic Windows XP left-side stripe */}
                            <div className="w-0.5 absolute left-0 top-0 bottom-0 bg-[#296dbb] border-r border-[#A4CBBF] z-0" />
                            
                            {/* The Programs List */}
                            {ALL_PROGRAMS.map(prog => (
                                <div 
                                    key={prog.id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (prog.url) {
                                            window.open(prog.url, '_blank');
                                        } else {
                                            onOpenApp(prog.id);
                                        }
                                        onClose();
                                    }}
                                    className="flex items-center gap-2 px-2 py-[6px] hover:bg-[#2F71CD] hover:text-white cursor-pointer relative z-10 group/item"
                                >
                                    <Image src={prog.icon} alt={prog.label} width={20} height={20} className="w-5 h-5 shrink-0" />
                                    <span className="text-xs text-black group-hover/item:text-white truncate">
                                        {prog.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Right Column (Light Blue - System Folders) */}
            <div className="w-1/2 bg-[#D3E5FA] border-l border-[#A4CBBF] flex flex-col">
                <div onClick={() => { onOpenApp('about'); onClose(); }} className="flex items-center gap-2 p-2 hover:bg-[#2F71CD] hover:text-white cursor-pointer group">
                    <Image src="/icons/info.ico" alt="About" width={24} height={24} />
                    <span className="font-bold text-xs text-[#00136B] group-hover:text-white">{t.desktop.about}</span>
                </div>
                <div onClick={() => { onOpenApp('projects'); onClose(); }} className="flex items-center gap-2 p-2 hover:bg-[#2F71CD] hover:text-white cursor-pointer group">
                    <Image src="/icons/folder.ico" alt="Projects" width={24} height={24} />
                    <span className="font-bold text-xs text-[#00136B] group-hover:text-white">{t.desktop.projects}</span>
                </div>
                
                <div className="h-px bg-linear-to-r from-transparent via-[#86B3E6] to-transparent my-1" />
                
                <div onClick={() => { onOpenApp('contact'); onClose(); }} className="flex items-center gap-2 p-2 hover:bg-[#2F71CD] hover:text-white cursor-pointer group">
                    <Image src="/icons/msn.ico" alt="Contact" width={24} height={24} />
                    <span className="text-xs text-[#00136B] group-hover:text-white">{t.desktop.contact}</span>
                </div>
            </div>
        </div>

        {/* --- FOOTER --- */}
        <div className="bg-linear-to-r from-[#1868CE] to-[#2470DA] h-10 flex items-center justify-end px-4 gap-4">
            <div 
            onClick={onLogOff}
            className="flex items-center gap-1 cursor-pointer group">
                <Image src="/icons/session.ico" alt="Log Off" width={36} height={36} className="group-hover:brightness-125" />
                <span className="text-white text-xs group-hover:underline">{t.startMenu.logOff}</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer group" onClick={handleRestart}>
                <Image src="/icons/poweroff.ico" alt="Turn Off" width={23} height={23} className="group-hover:brightness-125"/>
                <span className="text-white text-xs group-hover:underline">{t.startMenu.turnOff}</span>
            </div>
        </div>

        </div>
    );
}