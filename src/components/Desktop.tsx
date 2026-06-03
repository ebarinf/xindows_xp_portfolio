"use client";
import { useEffect } from "react";
import DesktopIcon from "../components/DesktopIcon";
import Taskbar from "../components/Taskbar";
import Window from "../components/Window";
import { useLanguage } from "../context/LanguageContext";
import Contact from "./Contact";
import About from "./About";
import Projects from "./Projects";
import Clippy from "./Clippy"
import { useWindowStore } from "../store/windowStore";

interface DesktopProps {
    onLogOff: () => void;
}

export default function Desktop({ onLogOff }: DesktopProps) {
    const openWindows = useWindowStore((s) => s.openWindows);
    const minimizedWindows = useWindowStore((s) => s.minimizedWindows);
    const activeWindow = useWindowStore((s) => s.activeWindow);
    const isClippyOpen = useWindowStore((s) => s.isClippyOpen);
    const { openWindow, closeWindow, minimizeWindow, focusWindow, setClippyOpen } = useWindowStore();
    const { t, language } = useLanguage();
    
    const DESKTOP_ICONS = [
        { id: 'about', label: t.desktop.about, icon: '/icons/info.ico' },
        { id: 'projects', label: t.desktop.projects, icon: '/icons/folder.ico' },
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

    return (
        <div className="relative h-dvh w-screen overflow-hidden bg-[url('/wallpaper_mobile.png')] md:bg-[url('/wallpaper.png')] bg-cover bg-center bg-no-repeat font-sans">
        
        {/* Desktop Icons */}
        <div className="absolute inset-0 p-2 flex flex-col flex-wrap content-start gap-1 pb-[30px] z-0">
            {DESKTOP_ICONS.map((item) => (
                <DesktopIcon 
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    onClick={() => item.id === 'clippy' ? setClippyOpen(true) : openWindow(item.id)}
                />
            ))}
        </div>

        {/* --- RENDER OPEN WINDOWS --- */}

        {openWindows.includes('resume') && (
            <Window 
                title={`${t.desktop.resume} - Adobe Reader`}
                icon="/icons/PDF.ico" 
                onClose={() => closeWindow('resume')}
                onMinimize={() => minimizeWindow('resume')}
                isHidden={minimizedWindows.includes('resume')}
                isActive={activeWindow === 'resume'}
                onFocus={() => focusWindow('resume')}
            >
            <iframe 
                src={language === 'es' ? "/resume_es.pdf" : "/resume_en.pdf"}
                className="w-full h-full border-none"
                title="Resume PDF"
            />
            </Window>
        )}

        {openWindows.includes('contact') && (
            <Window 
                title={`${t.desktop.contact}`}
                icon="/icons/msn.ico" 
                onClose={() => closeWindow('contact')}
                onMinimize={() => minimizeWindow('contact')}
                isHidden={minimizedWindows.includes('contact')}
                isActive={activeWindow === 'contact'}
                onFocus={() => focusWindow('contact')}
            >
                <Contact/>
            </Window>
        )}

        {openWindows.includes('about') && (
            <Window 
                title={`${t.desktop.about}`}
                icon="/icons/info.ico" 
                onClose={() => closeWindow('about')}
                onMinimize={() => minimizeWindow('about')}
                isHidden={minimizedWindows.includes('about')}
                isActive={activeWindow === 'about'}
                onFocus={() => focusWindow('about')}
            >
                <About/>
            </Window>
        )}

        {openWindows.includes('projects') && (
            <Window 
                title={`${t.desktop.projects}`}
                icon="/icons/folder.ico" 
                onClose={() => closeWindow('projects')}
                onMinimize={() => minimizeWindow('projects')}
                isHidden={minimizedWindows.includes('projects')}
                isActive={activeWindow === 'projects'}
                onFocus={() => focusWindow('projects')}
            >
                <Projects onOpenClippy={() => setClippyOpen(true)}/>
            </Window>
        )}

        {isClippyOpen && (
            <Clippy onClose={() => setClippyOpen(false)} />
        )}

        <Taskbar 
            onLogOff={onLogOff}
        />
        </div>
    );
}