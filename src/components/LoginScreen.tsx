"use client";

import Image from "next/image";

interface LoginScreenProps {
    onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
    return (
        <div className="h-dvh w-screen flex flex-col font-sans select-none overflow-hidden bg-[#5A7EDC]">
        
        {/* --- TOP BAR --- */}
        <div className="h-16 md:h-24 bg-[#00309C] w-full shadow-md border-b-2 border-[#6384D3]" />

        {/* --- MIDDLE SECTION --- */}
        <div className="flex-1 flex items-center justify-center bg-gradient-to-r from-[#3B55A5] via-[#6085E0] to-[#3B55A5] relative px-4">
            
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                            w-[70%] h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent
                            md:w-[1px] md:h-[70%] md:bg-gradient-to-b" />

            <div className="w-full max-w-[800px] flex flex-col md:flex-row items-center z-10 gap-16 md:gap-0">
            
            <div className="w-full md:w-1/2 md:pr-16 text-center md:text-right flex flex-col items-center md:items-end">
                <Image 
                src="/icons/windows_xp_big.png" 
                alt="Windows XP Logo" 
                width={100} 
                height={100}
                className="w-20 h-20 md:w-[100px] md:h-[100px]"
                />
                <div className="text-white text-3xl md:text-4xl font-bold drop-shadow-md mb-2 md:mb-6 leading-none">
                Eduardo<span className="text-[#F57B26] font-normal">xp</span>
                <div className="text-left italic text-sm md:text-lg font-normal opacity-80 ml-1">
                    Web Developer
                </div>
                </div>

                <p className="hidden md:block text-white text-lg font-medium drop-shadow-md tracking-wide">
                To begin, click on your user name
                </p>
            </div>

            {/* RIGHT COLUMN: User Account */}
            <div className="w-full md:w-1/2 md:pl-16 flex justify-center md:justify-start">
                <div 
                onClick={onLogin}
                className="group flex flex-col md:flex-row items-center gap-2 md:gap-4 cursor-pointer p-4 rounded-xl hover:bg-[#153888]/40 transition-all active:scale-95 w-fit"
                >
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded border-[3px] border-white/60 bg-yellow-200 overflow-hidden shadow-lg group-hover:border-[#F7D866]">
                    <div className="w-full h-full flex items-center justify-center bg-[#D4E4F7]">
                        <Image 
                            src="/icons/msn.ico" 
                            alt="User"
                            width={40}
                            height={40}
                        />
                    </div>
                </div>

                <div className="flex flex-col text-center md:text-left">
                    <span className="text-white text-xl md:text-2xl font-light group-hover:font-medium drop-shadow-md">
                    Eduardo
                    </span>
                    <span className="text-blue-100/70 text-xs md:text-sm group-hover:text-white/90">
                    Click to log in
                    </span>
                </div>
                </div>
            </div>

            </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="h-24 md:h-24 bg-[#00309C] flex items-center justify-center md:justify-between px-6 md:px-12 border-t-2 border-[#6384D3]">
            
            <div className="md:hidden flex flex-col items-center text-center gap-2">
            <span className="text-white text-base font-medium drop-shadow-md">
                Tap on the user icon to begin
            </span>
            <span className="text-blue-200/80 text-xs max-w-[300px] leading-tight">
                This site is optimized for desktop. For the best experience, please view it on a computer.
            </span>
            </div>

            <div className="hidden md:flex items-center gap-3 cursor-pointer hover:bg-white/10 px-3 py-2 rounded transition-colors">
            <div className="rounded border border-white/30 shadow-sm">
                <Image src="/icons/poweroff.ico" alt="shutdown" width={24} height={24} />
            </div>
            <span className="text-white font-medium text-lg drop-shadow-md">
                Restart Portfolio
            </span>
            </div>
            
            <div className="hidden md:block text-white/60 text-sm max-w-[300px] leading-tight text-right">
                After you log on, the system is yours to explore. 
                Every detail has been designed with a purpose.
            </div>
        </div>

        </div>
    );
}