"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function WindowsXPLoader({ onComplete }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onComplete) {
                onComplete();
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="bg-black text-white h-dvh w-screen flex flex-col justify-center items-center gap-5 overflow-hidden">
            <div className="flex flex-col items-center md:items-start px-4">
                <div className="h-[120px] md:h-[150px] ml-0 md:ml-38 flex items-center justify-center mb-2 md:mb-0">
                    <Image
                        src="/icons/windows_xp_big.png"
                        alt="Windows XP icon"
                        width={180}
                        height={180}
                        className="w-[120px] h-[120px] md:w-[180px] md:h-[180px] object-contain"
                    />
                </div>
                <div className="font-xp flex flex-row items-end justify-center md:justify-start text-[50px] md:text-[90px] h-auto md:h-[90px] leading-none">
                    Eduardo
                    <div className="text-[#D04A28] font-xp text-[40px] md:text-[70px] ml-1 md:ml-0">
                        xp
                    </div>
                </div>

                <div className="italic font-xp text-[20px] md:text-[35px] ml-0 md:ml-4 mt-2 md:mt-0 text-center md:text-left">
                    Web Developer
                </div>
            </div>

            <div className="xp-loader relative mt-8 md:mt-4">
                <div className="bar" />
                <div className="bar" />
                <div className="bar" />
            </div>

            <style jsx>{`
                @keyframes loader {
                    0% {
                        transform: translateX(-60px);
                    }
                    100% {
                        transform: translateX(200px);
                    }
                }
            `}</style>
        </div>
    );
}
