"use client";

import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";

interface StartMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenApp: (id: string) => void;
}

export default function StartMenu({ isOpen, onClose, onOpenApp }: StartMenuProps) {
    const { t } = useLanguage();

    if (!isOpen) return null;

    return (
        // The menu sits exactly above the 30px taskbar, and respects the mobile safe area
        <div 
        className="absolute bottom-full left-0 mb-px w-full md:w-[380px] h-auto bg-white rounded-t-lg shadow-[2px_2px_10px_rgba(0,0,0,0.5)] flex flex-col z-50 overflow-hidden border border-[#0A246A]"
        >
        {/* --- HEADER --- */}
        <div className="bg-linear-to-r from-[#1868CE] to-[#2470DA] h-14 flex items-center px-2 shadow-sm border-b border-white/50">
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
            <div className="w-1/2 bg-white flex flex-col p-1 text-black">
            {/* Main Apps */}
            <div className="flex-1">
                <div className="flex items-center gap-2 p-2 hover:bg-[#2F71CD] hover:text-white cursor-pointer group">
                <Image src="/icons/iexplorer.ico" alt="Internet" width={30} height={30} />
                <div className="flex flex-col">
                    <span className="font-bold text-xs group-hover:text-white">Internet</span>
                    <span className="text-gray-500 text-[10px] group-hover:text-white/80">Internet Explorer</span>
                </div>
                </div>
                <div className="flex items-center gap-2 p-2 hover:bg-[#2F71CD] hover:text-white cursor-pointer group">
                <Image src="/icons/msn.ico" alt="Email" width={30} height={30} />
                <div className="flex flex-col">
                    <span className="font-bold text-xs group-hover:text-white">E-mail</span>
                    <span className="text-gray-500 text-[10px] group-hover:text-white/80">Outlook Express</span>
                </div>
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
                <div className="h-8 border-t border-gray-200 flex items-center justify-center hover:bg-[#2F71CD] hover:text-white cursor-pointer group mt-auto">
                    <span className="font-bold text-xs">{t.startMenu.programs}</span>
                    <span className="ml-2 text-[#3A801D] group-hover:text-white font-black">▶</span>
                </div>
            </div>

            {/* Right Column (Light Blue - System Folders) */}
            <div className="w-1/2 bg-[#D3E5FA] border-l border-[#A4CBBF] p-1 flex flex-col">
                <div onClick={() => { onOpenApp('about'); onClose(); }} className="flex items-center gap-2 p-2 hover:bg-[#2F71CD] hover:text-white cursor-pointer group">
                    <Image src="/icons/info.ico" alt="About" width={24} height={24} />
                    <span className="font-bold text-xs text-[#00136B] group-hover:text-white">{t.desktop.about}</span>
                </div>
                <div onClick={() => { onOpenApp('projects'); onClose(); }} className="flex items-center gap-2 p-2 hover:bg-[#2F71CD] hover:text-white cursor-pointer group">
                    <Image src="/icons/iexplorer.ico" alt="Projects" width={24} height={24} />
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
            <div className="flex items-center gap-1 cursor-pointer group">
            <Image src="/icons/poweroff.ico" alt="Log Off" width={20} height={20} className="group-hover:brightness-125" />
            <span className="text-white text-xs group-hover:underline">{t.startMenu.logOff}</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer group" onClick={onClose}>
            <div className="bg-[#E25439] p-0.5 rounded border Sborder-white/50 group-hover:brightness-110">
                <Image src="/icons/poweroff.ico" alt="Turn Off" width={16} height={16} />
            </div>
            <span className="text-white text-xs group-hover:underline">{t.startMenu.turnOff}</span>
            </div>
        </div>

        </div>
    );
}