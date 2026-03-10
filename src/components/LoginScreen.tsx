"use client";

import Image from "next/image";

    interface LoginScreenProps {
    onLogin: () => void;
    }

    export default function LoginScreen({ onLogin }: LoginScreenProps) {
    return (
        <div className="h-screen w-screen flex flex-col font-sans select-none overflow-hidden bg-[#5A7EDC]">
        
        <div className="h-24 bg-[#00309C] w-full shadow-md border-b-2 border-[#6384D3]" />

        <div className="flex-1 flex items-center justify-center bg-gradient-to-r from-[#3B55A5] via-[#6085E0] to-[#3B55A5] relative">

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[70%] w-[1px] bg-gradient-to-b from-transparent via-white/30 to-transparent" />

            <div className="w-[800px] flex items-center z-10">
            
            <div className="w-1/2 pr-16 text-right flex flex-col items-end">
                <Image 
                src="/icons/windows_xp_big.png" 
                alt="Windows XP Logo" 
                width={100} 
                height={100}
                className="mb-2 mr-5"
                />
                <div className="text-white text-4xl font-bold drop-shadow-md mb-6 leading-none">
                    <div className="font-xp flex flex-row text-[45px]">
                        Eduardo
                        <div className="text-[#D04A28] font-xp text-[32px]">xp</div>
                    </div>
                    <div className="text-left text-lg font-normal opacity-80">
                        Web Developer
                    </div>
                </div>

                <p className="text-white text-lg font-medium drop-shadow-md tracking-wide">
                To begin, click on your user name
                </p>
            </div>

            <div className="w-1/2 pl-16 text-left">
                <div 
                onClick={onLogin}
                className="group flex items-center gap-4 cursor-pointer p-4 rounded-xl hover:bg-[#153888]/40 transition-all active:scale-95 w-fit"
                >
                <div className="relative w-20 h-20 rounded border-[3px] border-white/60 bg-yellow-200 overflow-hidden shadow-lg group-hover:border-[#F7D866]">
                    <div className="w-full h-full flex items-center justify-center bg-[#D4E4F7]">
                        <Image 
                            src="/icons/msn.ico"
                            alt="User"
                            width={40}
                            height={40}
                        />
                    </div>
                </div>

                {/* User Name Text */}
                <div className="flex flex-col">
                    <span className="text-white text-2xl font-light group-hover:font-medium drop-shadow-md">
                    Eduardo
                    </span>
                    <span className="text-blue-100/70 text-sm group-hover:text-white/90">
                    Click to log in
                    </span>
                </div>
                </div>
            </div>

            </div>
        </div>

        <div className="h-24 bg-[#00309C] flex items-center justify-between px-12 border-t-2 border-[#6384D3]">
            <div className="flex items-center gap-3 cursor-pointer hover:bg-white/10 px-3 py-2 rounded transition-colors">
            <div className="p-1 bg-[#E25439] rounded border border-white/30 shadow-sm">
                <Image src="/icons/poweroff.ico" alt="shutdown" width={20} height={20} />
            </div>
            <span className="text-white font-medium text-lg drop-shadow-md">
                Restart Portfolio
            </span>
            </div>
            
            <div className="text-white/60 text-sm max-w-[300px] leading-tight text-right">
                Press f11 for a fullscreen experience.
            </div>
        </div>
        </div>
    );
}