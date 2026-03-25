"use client";

import React, { createContext, useContext, useState } from "react";
import { en, Dictionary } from "../dictionaries/en";
import { es } from "../dictionaries/es";

// 1. Define what our Context looks like
interface LanguageContextType {
    language: "en" | "es";
    setLanguage: (lang: "en" | "es") => void;
    t: Dictionary; // 't' stands for translation, it will hold the active dictionary
}

// 2. Create the Context (with default English values)
const LanguageContext = createContext<LanguageContextType>({
    language: "en",
    setLanguage: () => {},
    t: en,
});

// 3. Create the Provider Wrapper
export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<"en" | "es">("en");

    // Automatically switch the active dictionary based on the state
    const t = language === "en" ? en : es;

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
        {children}
        </LanguageContext.Provider>
    );
}

// 4. Create a custom hook to make using it super easy in your components
export function useLanguage() {
    return useContext(LanguageContext);
}