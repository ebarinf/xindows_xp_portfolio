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
    }

export default function Window({ 
    title, 
    icon, 
    onClose, 
    children, 
    initialX = 0,
    initialY = 50
    }: WindowProps) {
    
    const [position, setPosition] = useState({ x: initialX, y: initialY });
    const [isDragging, setIsDragging] = useState(false);
    
    const dragRef = useRef({ startX: 0, startY: 0, startPosX: 0, startPosY: 0 });

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        // Only allow left-clicks to drag (button 0)
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
        className="absolute w-[100%] md:w-[60%] h-[80%] bg-[#ECE9D8] border-[3px] border-[#0054E3] rounded-t-lg shadow-2xl flex flex-col overflow-hidden z-40"
        style={{ 
            left: `${position.x}px`, 
            top: `${position.y}px`,
            // Prevent highlighting text on the page accidentally while dragging
            userSelect: isDragging ? 'none' : 'auto' 
        }}
        >
        
        {/* --- TITLE BAR (The Drag Handle) --- */}
        <div 
            onPointerDown={handlePointerDown}
            className={`bg-gradient-to-r from-[#0058E6] via-[#3A93FF] to-[#0058E6] h-8 flex justify-between items-center px-1 select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        >
            
            {/* Window Title & Icon */}
            <div className="flex items-center gap-1 text-white font-bold text-sm drop-shadow-md pl-1 pointer-events-none">
            <Image src={icon} alt="icon" width={16} height={16} />
            <span className="tracking-wide">{title}</span>
            </div>

            {/* Window Controls */}
            <div className="flex gap-[2px]">
            <button 
                // We use onPointerDown and stopPropagation so clicking 'Close' doesn't trigger a 'Drag'
                onPointerDown={(e) => e.stopPropagation()} 
                onClick={onClose} 
                className="bg-[#E81123] border border-white/40 rounded-[3px] w-[22px] h-[22px] flex items-center justify-center text-white font-bold text-xs shadow-[inset_0px_1px_1px_rgba(255,255,255,0.7)] hover:brightness-110 active:brightness-90 transition-all cursor-default"
                aria-label="Close"
            >
                ×
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