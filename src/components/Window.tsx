"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface WindowProps {
    title: string;
    icon: string;
    onClose: () => void;
    children: React.ReactNode;
    initialX?: number;
    initialY?: number;
    onMinimize?: () => void;
    isHidden?: boolean;
    isActive?: boolean;
    onFocus?: () => void;
    }

export default function Window({ 
    title, 
    icon, 
    onClose, 
    children, 
    initialX = 0,
    initialY = 50,
    onMinimize,
    isHidden,
    isActive,
    onFocus
    }: WindowProps) {
    
    const [position, setPosition] = useState(() => {
        if (typeof window !== "undefined") {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            if (screenWidth > 768) {
                const centerX = screenWidth * 0.2;
                const centerY = screenHeight * 0.1;
                return { x: centerX, y: centerY };
            }
        }
        return { x: initialX, y: initialY };
    });
    const [isDragging, setIsDragging] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    
    const dragRef = useRef({ startX: 0, startY: 0, startPosX: 0, startPosY: 0 });

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.button !== 0) return;
        
        setIsDragging(true);
        dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startPosX: position.x,
        startPosY: position.y,
        };
    };

    useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
        if (!isDragging) return;

        const dx = e.clientX - dragRef.current.startX;
        const dy = e.clientY - dragRef.current.startY;

        setPosition({
            x: dragRef.current.startPosX + dx,
            y: dragRef.current.startPosY + dy,
        });       
    };

    const handlePointerUp = () => {
        setIsDragging(false);
    };

    // Only attach global listeners if we are actively dragging
    if (isDragging) {
        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerUp);
    }

    // Cleanup listeners when component unmounts or dragging stops
    return () => {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
        };
    }, [isDragging]);

    return (
        <div 
        onPointerDownCapture={onFocus}
        className={`absolute bg-[#ECE9D8] border-[3px] border-[#0054E3] rounded-t-lg shadow-2xl flex flex-col overflow-hidden ${isActive ? 'z-50' : 'z-40'} ${isHidden ? 'hidden' : ''} ${isMaximized ? 'w-full h-[calc(100%-30px)] !left-0 !top-0 rounded-none' : 'w-full md:w-[60%] h-[80%]'}`}
        style={isMaximized ? {} : { 
            left: `${position.x}px`, 
            top: `${position.y}px`,
            userSelect: isDragging ? 'none' : 'auto' 
        }}
        >
        
        {/* --- TITLE BAR (The Drag Handle) --- */}
        <div 
            onPointerDown={handlePointerDown}
            className={`bg-linear-to-r from-[#0058E6] via-[#3A93FF] to-[#0058E6] h-8 flex justify-between items-center px-1 select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        >
            
            {/* Window Title & Icon */}
            <div className="flex items-center gap-1 text-white font-bold text-sm drop-shadow-md pl-1 pointer-events-none">
            <Image src={icon} alt="icon" width={16} height={16} />
            <span className="tracking-wide">{title}</span>
            </div>

            {/* Window Controls */}
            <div className="flex gap-[2px]">
                {/* Minimize Button */}
                <button 
                    onPointerDown={(e) => e.stopPropagation()} 
                    onClick={onMinimize} 
                    className="w-[22px] h-[22px] flex items-center justify-center hover:brightness-110 active:brightness-90 transition-all cursor-default overflow-hidden rounded-[3px]"
                    aria-label="Minimize"
                >
                    <Image src="/icons/minimize.ico" alt="Minimize" width={22} height={22} unoptimized />
                </button>
                
                {/* Maximize / Restore Button */}
                <button 
                    onPointerDown={(e) => e.stopPropagation()} 
                    onClick={() => setIsMaximized(!isMaximized)} 
                    className="w-[22px] h-[22px] flex items-center justify-center hover:brightness-110 active:brightness-90 transition-all cursor-default overflow-hidden rounded-[3px]"
                    aria-label="Maximize"
                >
                    <Image src={isMaximized ? "/icons/restore.ico" : "/icons/maximize.ico"} alt={isMaximized ? "Restore" : "Maximize"} width={22} height={22} unoptimized />
                </button>
                
                {/* Close Button */}
                <button 
                    onPointerDown={(e) => e.stopPropagation()} 
                    onClick={onClose} 
                    className="w-[22px] h-[22px] flex items-center justify-center hover:brightness-110 active:brightness-90 transition-all cursor-default overflow-hidden rounded-[3px]"
                    aria-label="Close"
                >
                    <Image src="/icons/close.ico" alt="Close" width={22} height={22} unoptimized />
                </button>
            </div>
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="flex-1 bg-white border-t border-[#0054E3] overflow-hidden relative">
            
            {/* THE IFRAME SHIELD: Prevents the PDF viewer from swallowing mouse events during drag */}
            {isDragging && <div className="absolute inset-0 z-50 cursor-grabbing" />}
            
            {children}
        </div>
        
        </div>
    );
}