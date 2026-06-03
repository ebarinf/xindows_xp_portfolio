"use client";
import { create } from "zustand";

interface WindowStore {
    openWindows: string[];
    minimizedWindows: string[];
    activeWindow: string | null;
    isClippyOpen: boolean;
    openWindow: (id: string) => void;
    closeWindow: (id: string) => void;
    minimizeWindow: (id: string) => void;
    focusWindow: (id: string) => void;
    toggleTab: (id: string) => void;
    setClippyOpen: (open: boolean) => void;
}

export const useWindowStore = create<WindowStore>((set) => ({
    openWindows: [],
    minimizedWindows: [],
    activeWindow: null,
    isClippyOpen: false,
    openWindow: (id) =>
        set((state) => {
            if (state.openWindows.includes(id)) {
                if (state.minimizedWindows.includes(id)) {
                    return {
                        minimizedWindows: state.minimizedWindows.filter((w) => w !== id),
                        activeWindow: id,
                    };
                }
                return { activeWindow: id };
            }
            return {
                openWindows: [...state.openWindows, id],
                activeWindow: id,
            };
        }),
    closeWindow: (id) =>
        set((state) => {
            const newOpen = state.openWindows.filter((w) => w !== id);
            const newMinimized = state.minimizedWindows.filter((w) => w !== id);
            let active = state.activeWindow;
            if (active === id) {
                const available = newOpen.filter((w) => !newMinimized.includes(w));
                active = available.length > 0 ? available[available.length - 1] : null;
            }
            return {
                openWindows: newOpen,
                minimizedWindows: newMinimized,
                activeWindow: active,
            };
        }),
    minimizeWindow: (id) =>
        set((state) => ({
            minimizedWindows: state.minimizedWindows.includes(id)
                ? state.minimizedWindows
                : [...state.minimizedWindows, id],
            activeWindow: state.activeWindow === id ? null : state.activeWindow,
        })),
    focusWindow: (id) => set({ activeWindow: id }),
    toggleTab: (id) =>
        set((state) => {
            if (state.minimizedWindows.includes(id)) {
                return {
                    minimizedWindows: state.minimizedWindows.filter((w) => w !== id),
                    activeWindow: id,
                };
            }
            if (state.activeWindow === id) {
                return {
                    minimizedWindows: [...state.minimizedWindows, id],
                    activeWindow: null,
                };
            }
            return { activeWindow: id };
        }),
    setClippyOpen: (open) => set({ isClippyOpen: open }),
}));
