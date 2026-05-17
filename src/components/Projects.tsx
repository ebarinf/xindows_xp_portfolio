"use client";

import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";

export default function Projects({ onOpenClippy }: { onOpenClippy?: () => void }) {
    const { t } = useLanguage();

    const placeholderItems = [
        { id: 'clippy', label: 'Clippy AI', icon: '/icons/clippy.ico' }
    ];

    return (
        <div className="flex flex-col h-full bg-[#ECE9D8] font-sans select-none overflow-hidden">
        
        {/* --- MENU BAR --- */}
        <div className="flex gap-4 px-2 py-1 text-xs text-black border-b border-white shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
            <span className="text-gray-400 px-1 cursor-default">{t.contact.file}</span>
            <span className="text-gray-400 px-1 cursor-default">Edit</span>
            <span className="text-gray-400 px-1 cursor-default">View</span>
            <span className="text-gray-400 px-1 cursor-default">Favorites</span>
            <span className="text-gray-400 px-1 cursor-default">Tools</span>
            <span className="text-gray-400 px-1 cursor-default">Help</span>
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
                <Image src="/icons/folder.ico" alt="Folder" width={16} height={16} className="mr-1" />
                <span className="text-xs text-black">{t.projectsWindow.address}</span>
            </div>
            <button className="disabled flex items-center gap-1 px-2 text-xs border border-transparent rounded transition-all">
                <div className="w-5 h-5 bg-green-600 text-white flex items-center justify-center font-bold text-[14px]">➜</div> Go
            </button>
        </div>

        {/* --- MAIN EXPLORER AREA --- */}
        <div className="flex flex-1 overflow-hidden">
            
            {/* LEFT SIDEBAR (Standard Blue Task Pane based on image_11.png) */}
            <div className="w-[200px] md:w-60 shrink-0 bg-linear-to-b from-[#749AEA] to-[#5B7EDC] p-3 overflow-y-auto hidden sm:flex flex-col gap-4">
                
                {/* File and Folder Tasks Section (from image_11.png) */}
                <div className="bg-[#D6E0F5] rounded-tl-[3px] rounded-tr-[3px] shadow-sm flex flex-col overflow-hidden">
                    <div className="bg-linear-to-r from-[#215DC6] to-[#2566D8] text-white text-xs font-bold px-3 py-[6px] flex justify-between items-center cursor-default">
                        {t.projectsWindow.paneTasks}
                        <span className="bg-white/20 rounded-full w-4 h-4 flex items-center justify-center rotate-180">^</span>
                    </div>
                    <div className="p-3 flex flex-col gap-2 text-xs text-[#0C327D]">
                        <span className="flex items-center gap-2 opacity-60 cursor-not-allowed">
                            <Image src="/icons/new_folder.ico" alt="New Folder" width={16} height={16} className="opacity-60" />
                            {t.projectsWindow.taskNew}
                        </span>
                        <span className="flex items-center gap-2 opacity-60 cursor-not-allowed">
                            <Image src="/icons/web_folder.ico" alt="Publish" width={16} height={16} className="opacity-60" />
                            {t.projectsWindow.taskWeb}
                        </span>
                        <span className="flex items-center gap-2 opacity-60 cursor-not-allowed">
                            <Image src="/icons/share_folder.ico" alt="Share" width={16} height={16} className="opacity-60" />
                            {t.projectsWindow.taskShare}
                        </span>
                    </div>
                </div>

                {/* Other Places Section (from image_11.png) */}
                <div className="bg-[#D6E0F5] rounded-tl-[3px] rounded-tr-[3px] shadow-sm flex flex-col overflow-hidden">
                    <div className="bg-linear-to-r from-[#215DC6] to-[#2566D8] text-white text-xs font-bold px-3 py-[6px] flex justify-between items-center cursor-default">
                        {t.projectsWindow.paneOther}
                    </div>
                    <div className="p-3 flex flex-col gap-2 text-xs text-[#0C327D]">
                        <span className="flex items-center gap-2 opacity-60 cursor-not-allowed">
                            <Image src="/icons/desktop.ico" alt="Desktop" width={16} height={16} className="opacity-60" />
                            {t.projectsWindow.otherDesktop}
                        </span>
                        <span className="flex items-center gap-2 opacity-60 cursor-not-allowed">
                            <Image src="/icons/folder.ico" alt="Documents" width={16} height={16} className="opacity-60" />
                            {t.projectsWindow.otherDocs}
                        </span>
                        <span className="flex items-center gap-2 opacity-60 cursor-not-allowed">
                            <Image src="/icons/mycomputer.ico" alt="Computer" width={16} height={16} className="opacity-60" />
                            {t.projectsWindow.otherComputer}
                        </span>
                    </div>
                </div>

                {/* Details Section (from image_11.png) */}
                <div className="bg-[#D6E0F5] rounded-tl-[3px] rounded-tr-[3px] shadow-sm flex flex-col overflow-hidden mb-2">
                    <div className="bg-linear-to-r from-[#215DC6] to-[#2566D8] text-white text-xs font-bold px-3 py-[6px] flex justify-between items-center cursor-default">
                        {t.projectsWindow.paneDetails}
                    </div>
                    <div className="p-3 flex flex-col gap-1 text-[11px] text-[#0C327D]">
                        <span className="font-bold">{t.projectsWindow.title}</span>
                        <span>System Folder</span>
                    </div>
                </div>

            </div>

            {/* RIGHT CONTENT AREA - WHITE BACKGROUND FOLDER VIEW */}
            <div className="flex-1 bg-white p-4 overflow-y-auto shadow-[inset_1px_0_5px_rgba(0,0,0,0.1)]">
                
                {/* Requested: Initially mostly empty. Display placeholder folder icons as seen in image_11.png. */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-2 gap-y-6">
                    {placeholderItems.map(item => (
                        <div 
                            key={item.id} 
                            onDoubleClick={() => item.id === 'clippy' && onOpenClippy && onOpenClippy()}
                            onClick={() => item.id === 'clippy' && onOpenClippy && onOpenClippy()} 
                            className="flex flex-col items-center text-center gap-1 group opacity-80 hover:opacity-100 cursor-pointer"
                        >
                            <Image 
                                src={item.icon} 
                                alt={item.label} 
                                width={48} 
                                height={48} 
                                className="drop-shadow-sm group-active:brightness-75" 
                            />
                            <span className="text-xs text-black group-hover:bg-[#316AC5] group-hover:text-white px-1 break-words max-w-[100px]">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

        </div>

        {/* --- STATUS BAR --- */}
        <div className="h-6 bg-[#ECE9D8] border-t border-gray-400 shadow-[inset_0_1px_0_white] flex items-center px-2 justify-between">
            <span className="text-[10px] text-gray-600">
            Learn more about Eduardo&#39;s work
            </span>
            <div className="flex items-center gap-1 px-1 border-l border-gray-400 text-[10px] text-gray-600 h-full">
                <Image src="/icons/msn.ico" alt="Eduardo" width={14} height={14} />
                Eduardo <span className="text-gray-400">(Available)</span>
            </div>
        </div>

        </div>
    );
}