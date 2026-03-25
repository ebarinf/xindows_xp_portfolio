"use client";
import Image from "next/image";

interface DesktopIconProps {
    icon: string;
    label: string;
    onClick?: () => void;
}

export default function DesktopIcon({ icon, label, onClick }: DesktopIconProps) {
    return (
        <div 
        onClick={onClick}
        className="flex flex-col items-center justify-start w-20 p-1 mb-2 cursor-pointer group"
        >
        <div className="relative w-10 h-10 mb-1 opacity-90 group-hover:opacity-100">
            <Image 
            src={icon} 
            alt={label} 
            fill 
            className="object-contain drop-shadow-md"
            />
        </div>
        <span 
            className="text-white text-xs text-center leading-tight px-1 rounded-sm group-hover:bg-[#316AC5] group-hover:bg-opacity-60"
            style={{ textShadow: "1px 1px 2px black" }}
        >
            {label}
        </span>
        </div>
    );
}