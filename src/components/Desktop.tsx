"use client";
import { useEffect, useState } from "react";
import DesktopIcon from "../components/DesktopIcon";
import Taskbar from "../components/Taskbar";
import Window from "../components/Window";
import { useLanguage } from "../context/LanguageContext";

export default function Desktop() {
    const [openWindows, setOpenWindows] = useState<string[]>([]);
    const { t } = useLanguage();
    
    const DESKTOP_ICONS = [
        { id: 'about', label: t.desktop.about, icon: '/icons/info.ico' },
        { id: 'projects', label: t.desktop.projects, icon: '/icons/iexplorer.ico' },
        { id: 'resume', label: t.desktop.resume, icon: '/icons/PDF.ico' },
        { id: 'contact', label: t.desktop.contact, icon: '/icons/msn.ico' },
    ];

    useEffect(() => {
        const startupAudio = new Audio('/sounds/startup.mp3');
        startupAudio.play().catch((error) => {
            console.log("Audio autoplay blocked by browser:", error);
        });
    }, []);

    const handleIconClick = (id: string) => {
        if (!openWindows.includes(id)) {
        setOpenWindows([...openWindows, id]);
        }
    };

    const handleCloseWindow = (id: string) => {
        setOpenWindows(openWindows.filter(windowId => windowId !== id));
    };

    return (
        <div className="relative h-dvh w-screen overflow-hidden bg-[url('/wallpaper_mobile.png')] md:bg-[url('/wallpaper.png')] bg-cover bg-center bg-no-repeat font-sans">
        
        {/* Desktop Icons */}
        <div className="absolute inset-0 p-2 flex flex-col flex-wrap content-start gap-1 pb-[30px] z-0">
            {DESKTOP_ICONS.map((item) => (
                <DesktopIcon 
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    onClick={() => handleIconClick(item.id)}
                />
            ))}
        </div>

        {/* --- RENDER OPEN WINDOWS --- */}

        {openWindows.includes('resume') && (
            <Window 
                title={`${t.desktop.resume} - Adobe Reader`}
                icon="/icons/PDF.ico" 
                onClose={() => handleCloseWindow('resume')}
            >
            <iframe 
                src="/resume.pdf" 
                className="w-full h-full border-none"
                title="Resume PDF"
            />
            </Window>
        )}

        <Taskbar />
        </div>
    );
}