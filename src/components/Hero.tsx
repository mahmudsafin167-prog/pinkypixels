import React from 'react';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0 z-0 bg-black">
                {/* Animated background blobs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]"></div>

                {/* Logo Background */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-50 hero-mask"
                    style={{
                        backgroundImage: "url('/guild_logo.jpg')"
                    }}
                ></div>

                {/* Final Seamless Overlay - Requested Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f0c19]/20 to-[#0f0c19] z-10 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent 60%, #0f0c19 100%)" }}></div>

                {/* CSS Particles */}
                <div className="particles-container z-10">
                    <div className="particle" style={{ left: '10%', width: '4px', height: '4px', animationDuration: '7s', animationDelay: '0s' }}></div>
                    <div className="particle" style={{ left: '20%', width: '6px', height: '6px', animationDuration: '12s', animationDelay: '2s', background: 'rgba(147, 51, 234, 0.4)' }}></div>
                    <div className="particle" style={{ left: '30%', width: '3px', height: '3px', animationDuration: '8s', animationDelay: '4s' }}></div>
                    <div className="particle" style={{ left: '40%', width: '5px', height: '5px', animationDuration: '15s', animationDelay: '1s', background: 'rgba(6, 182, 212, 0.4)' }}></div>
                    <div className="particle" style={{ left: '50%', width: '4px', height: '4px', animationDuration: '9s', animationDelay: '3s' }}></div>
                    <div className="particle" style={{ left: '60%', width: '7px', height: '7px', animationDuration: '14s', animationDelay: '5s' }}></div>
                    <div className="particle" style={{ left: '70%', width: '3px', height: '3px', animationDuration: '11s', animationDelay: '2s', background: 'rgba(255, 255, 255, 0.3)' }}></div>
                    <div className="particle" style={{ left: '80%', width: '5px', height: '5px', animationDuration: '13s', animationDelay: '0s' }}></div>
                    <div className="particle" style={{ left: '90%', width: '4px', height: '4px', animationDuration: '10s', animationDelay: '4s' }}></div>
                </div>
            </div>

            <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center justify-center pt-10 md:pt-20">
                {/* 1. RECRUITING BADGE */}
                <div
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-primary/30 backdrop-blur-md mb-8 md:mb-12 scale-90 md:scale-100 shadow-glow-sm"
                    data-aos="fade-down"
                >
                    <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e] animate-pulse"></span>
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-white">Recruiting Now</span>
                </div>

                {/* 2. SPLIT TITLE - RESPONSIVE SCALING */}
                <h1
                    className="flex flex-col items-center mb-8 md:mb-10 select-none px-4"
                    data-aos="zoom-in"
                >
                    <span className="text-5xl sm:text-7xl md:text-9xl font-display font-black leading-none tracking-tight animated-text-gradient uppercase drop-shadow-[0_0_30px_rgba(255,0,127,0.3)]">
                        PINKY
                    </span>
                    <span className="text-5xl sm:text-7xl md:text-9xl font-display font-black leading-none tracking-tight animated-text-gradient uppercase drop-shadow-[0_0_30px_rgba(255,0,127,0.3)]" style={{ animationDelay: '0.2s' }}>
                        PIXELS
                    </span>
                </h1>

                {/* 3. DESCRIPTION - RESPONSIVE TEXT */}
                <p
                    className="text-sm md:text-xl text-white/70 max-w-2xl font-medium leading-relaxed mb-12 md:mb-16 px-4"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    The ultimate all-girls <span className="text-white font-black italic">Garena Free Fire</span> guild. <br className="hidden md:block" />
                    Where sisterhood meets competitive dominance.
                </p>

                {/* 4. BUTTONS - OPTIMIZED TOUCH TARGETS */}
                <div
                    className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-[280px] sm:max-w-xl md:max-w-2xl"
                    data-aos="fade-up"
                    data-aos-delay="400"
                >
                    <Link
                        href="/#join"
                        className="w-full sm:flex-1 bg-primary hover:bg-primary-dark text-white px-8 py-5 md:py-6 rounded-2xl text-lg md:text-xl font-black transition-all flex items-center justify-center gap-3 shadow-glow hover:scale-[1.02] active:scale-95 italic skew-x-[-5deg] tracking-widest"
                    >
                        <span className="material-symbols-outlined text-2xl md:text-3xl">sports_esports</span>
                        JOIN GUILD
                    </Link>

                    <Link
                        href="/members"
                        className="w-full sm:flex-1 gaming-card-light text-white px-8 py-5 md:py-6 rounded-2xl text-lg md:text-xl font-black transition-all border border-white/20 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 italic skew-x-[-5deg] tracking-widest"
                    >
                        <span className="material-symbols-outlined text-2xl md:text-3xl">group</span>
                        VIEW MEMBERS
                    </Link>
                </div>
            </div>
        </section>
    );
}
