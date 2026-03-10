"use client";

import { useState } from "react";
import WindowsXPLoader from "../components/WindowsXPLoader";
import LoginScreen from "../components/LoginScreen"; // We will create this next!
import Desktop from "@/components/Desktop";

type SystemState = "boot" | "login" | "desktop";

export default function Home() {
  const [systemState, setSystemState] = useState<SystemState>("boot");

  const handleBootComplete = () => {
    setSystemState("login");
  };

  const handleLogin = () => {
    setSystemState("desktop");
  };

  return (
    <main className="h-screen w-screen overflow-hidden bg-black font-sans">
      {systemState === "boot" && (
        <WindowsXPLoader onComplete={handleBootComplete} />
      )}

      {systemState === "login" && (
        <LoginScreen onLogin={handleLogin} />
      )}

      {systemState === "desktop" && (
        <Desktop/>
      )}
    </main>
  );
}