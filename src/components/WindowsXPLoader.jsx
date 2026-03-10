"use client";

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
        <div
            style={{
                background: "black",
                color: "white",
                height: "100vh",
                width: "100vw",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
            }}
        >
            <div className="flex flex-col items-start">
                <div className="h-[150px] ml-38">
                    <img
                        src="/icons/windows_xp_big.png"
                        alt="Windows XP icon"
                        width={180}
                        height={180}
                    />
                </div>

                <div className="font-xp text-2xl flex flex-row text-[90px] h-[90px]">
                    Eduardo
                    <div className="text-[#D04A28] font-xp text-[70px]">xp</div>
                </div>
                <div className="italic font-xp text-[35px] ml-4">
                    Web Developer
                </div>
            </div>

            <div className="xp-loader relative">
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
