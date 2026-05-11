"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Start fade out after 2 seconds
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2000);

    // Complete splash screen after 2.5 seconds (gives time for fade animation)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-700",
        isFadingOut ? "opacity-0" : "opacity-100"
      )}
    >
      <div className="relative w-66 h-35 md:w-[500px] md:h-[500px] animate-in fade-in zoom-in duration-1000 ">
        <Image
          src="/images/logo.png"
          alt="Antaraal Resort & Spa Splash"
          fill
          className="object-contain rounded-[5%]"
          priority
        />
      </div>

      <div className="absolute bottom-16 flex flex-col items-center gap-3 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
        <div className="flex gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );

}
