"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { SplashScreen } from "@/components/SplashScreen";

const MenuApp = dynamic(() => import("@/components/MenuApp"), {
  ssr: false,
});

export default function GuestMenuPage() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <div className={showSplash ? "opacity-0 h-0 overflow-hidden" : "opacity-100 transition-opacity duration-1000"}>
        <MenuApp />
      </div>
    </>
  );
}
