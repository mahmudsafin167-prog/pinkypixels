"use client";
import React from 'react';

export default function LoadingSpinner({ fullScreen = true }: { fullScreen?: boolean }) {
    const spinnerContent = (
        <div className="relative w-20 h-20 flex items-center justify-center">
            {/* Outer glowing ring */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-purple-500 animate-spin shadow-[0_0_15px_rgba(255,0,127,0.5)]"></div>
            
            {/* Inner pulsing ring */}
            <div className="absolute inset-2 rounded-full border-4 border-white/10 border-b-white animate-[spin_1.5s_linear_infinite_reverse]"></div>
            
            {/* Center dot */}
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_10px_#ff007f]"></div>
            
            {/* Loading text below */}
            <div className="absolute -bottom-8 whitespace-nowrap text-xs font-black tracking-widest uppercase text-white/50 animate-pulse">
                INITIALIZING...
            </div>
        </div>
    );

    if (!fullScreen) return spinnerContent;

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-dark relative z-50">
            {spinnerContent}
        </div>
    );
}
