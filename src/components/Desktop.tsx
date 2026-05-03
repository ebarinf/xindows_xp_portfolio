"use client";
import { useEffect, useState } from "react";
import DesktopIcon from "../components/DesktopIcon";
import Taskbar from "../components/Taskbar";
import Window from "../components/Window";
import { useLanguage } from "../context/LanguageContext";
import Contact from "./Contact";
import About from "./About";
import Projects from "./Projects";
import Clippy from "./Clippy"

export default function Desktop() {
    const [openWindows, setOpenWindows] = useState<string[]>([]);
    const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);
    const [activeWindow, setActiveWindow] = useState<string | null>(null);
    const { t } = useLanguage();
    const [isClippyOpen, setIsClippyOpen] = useState(false);
    
    const DESKTOP_ICONS = [
        { id: 'about', label: t.desktop.about, icon: '/icons/info.ico' },
        { id: 'projects', label: t.desktop.projects, icon: '/icons/iexplorer.ico' },
        { id: 'resume', label: t.desktop.resume, icon: '/icons/PDF.ico' },
        { id: 'contact', label: t.desktop.contact, icon: '/icons/msn.ico' },
        { id: 'clippy', label: 'Clippy AI', icon: '/icons/clippy.ico' },
    ];

    useEffect(() => {
        const startupAudio = new Audio('/sounds/startup.mp3');
        startupAudio.play().catch((error) => {
            console.log("Audio autoplay blocked by browser:", error);
        });
    }, []);

    const handleIconClick = (id: string) => {
        if (id === 'clippy') {
            setIsClippyOpen(true);
            return;
        }

        if (!openWindows.includes(id)) {
            setOpenWindows([...openWindows, id]);
        } else if (minimizedWindows.includes(id)) {
            setMinimizedWindows(minimizedWindows.filter(windowId => windowId !== id));
        }
        setActiveWindow(id); // Bring to front
    };

    const handleCloseWindow = (id: string) => {
        const newOpen = openWindows.filter(windowId => windowId !== id);
        setOpenWindows(newOpen);
        setMinimizedWindows(minimizedWindows.filter(windowId => windowId !== id));
        
        if (activeWindow === id) {
            const available = newOpen.filter(w => !minimizedWindows.includes(w));
            setActiveWindow(available.length > 0 ? available[available.length - 1] : null);
        }
    };

    const handleMinimizeWindow = (id: string) => {
        if (!minimizedWindows.includes(id)) {
            setMinimizedWindows([...minimizedWindows, id]);
        }
        if (activeWindow === id) setActiveWindow(null);
    };

    const handleTaskbarTabClick = (id: string) => {
        if (minimizedWindows.includes(id)) {
            setMinimizedWindows(minimizedWindows.filter(windowId => windowId !== id));
            setActiveWindow(id);
        } else {
            if (activeWindow === id) {
                setMinimizedWindows([...minimizedWindows, id]);
                setActiveWindow(null);
            } else {
                setActiveWindow(id);
            }
        }
    };

    const activeTaskbarWindows = openWindows.map(windowId => {
        const iconData = DESKTOP_ICONS.find(icon => icon.id === windowId)!;
        
        return {
            ...iconData,
            isMinimized: minimizedWindows.includes(windowId)
        };
    });

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
                onMinimize={() => handleMinimizeWindow('resume')}
                isHidden={minimizedWindows.includes('resume')}
                isActive={activeWindow === 'resume'}
                onFocus={() => setActiveWindow('resume')}
            >
            <iframe 
                src="/resume.pdf" 
                className="w-full h-full border-none"
                title="Resume PDF"
            />
            </Window>
        )}

        {openWindows.includes('contact') && (
            <Window 
                title={`${t.desktop.contact}`}
                icon="/icons/msn.ico" 
                onClose={() => handleCloseWindow('contact')}
                onMinimize={() => handleMinimizeWindow('contact')}
                isHidden={minimizedWindows.includes('contact')}
                isActive={activeWindow === 'contact'}
                onFocus={() => setActiveWindow('contact')}
            >
                <Contact/>
            </Window>
        )}

        {openWindows.includes('about') && (
            <Window 
                title={`${t.desktop.about}`}
                icon="/icons/info.ico" 
                onClose={() => handleCloseWindow('about')}
                onMinimize={() => handleMinimizeWindow('about')}
                isHidden={minimizedWindows.includes('about')}
                isActive={activeWindow === 'about'}
                onFocus={() => setActiveWindow('about')}
            >
                <About/>
            </Window>
        )}

        {openWindows.includes('projects') && (
            <Window 
                title={`${t.desktop.projects}`}
                icon="/icons/iexplorer.ico" 
                onClose={() => handleCloseWindow('projects')}
                onMinimize={() => handleMinimizeWindow('projects')}
                isHidden={minimizedWindows.includes('projects')}
                isActive={activeWindow === 'projects'}
                onFocus={() => setActiveWindow('projects')}
            >
                <Projects onOpenClippy={() => setIsClippyOpen(true)}/>
            </Window>
        )}

        {isClippyOpen && (
            <Clippy onClose={() => setIsClippyOpen(false)} />
        )}

        <Taskbar 
            onOpenApp={handleIconClick} 
            activeWindows={activeTaskbarWindows}
            onTabClick={handleTaskbarTabClick}
            activeWindowId={activeWindow}
        />
        </div>
    );
}