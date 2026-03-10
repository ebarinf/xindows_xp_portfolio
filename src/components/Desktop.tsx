"use client";
import DesktopIcon from "../components/DesktopIcon";
import Taskbar from "../components/Taskbar";

const DESKTOP_ICONS = [
    { id: 'about', label: 'About Me', icon: '/icons/info.ico' },
    { id: 'projects', label: 'My Projects', icon: '/icons/iexplorer.ico' },
    { id: 'resume', label: 'My Resume', icon: '/icons/file.svg' }, // Update extension if you have a specific resume icon
    { id: 'contact', label: 'Contact Me', icon: '/icons/msn.ico' },
    ];

    export default function Desktop() {
    const handleIconClick = (id: string) => {
        console.log(`Clicked ${id} - Window opening logic will go here`);
    };

    return (
        <div className="bg-[url('/wallpaper.png')] bg-cover bg-center h-screen w-screen">

        <div className="absolute inset-0 p-2 flex flex-col flex-wrap content-start gap-1 pb-[30px]">
            {DESKTOP_ICONS.map((item) => (
            <DesktopIcon 
                key={item.id}
                icon={item.icon}
                label={item.label}
                onClick={() => handleIconClick(item.id)}
            />
            ))}
        </div>

        <Taskbar />
        </div>
    );
}