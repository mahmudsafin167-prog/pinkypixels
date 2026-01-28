import React from 'react';

export default function SpecialLeaderCard() {
    return (
        <div
            className="leader-glow-card rounded-[2.5rem] overflow-hidden relative flex flex-col items-center p-8 transition-all duration-500 h-auto md:h-[550px] col-span-2 lg:col-span-4 lg:w-1/3 lg:mx-auto"
            data-aos="zoom-in"
        >
            {/* ANIME PARTICLES BACKGROUND */}
            <div className="anime-particles">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="energy-spark"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 4}s`,
                            animationDuration: `${3 + Math.random() * 2}s`
                        }}
                    ></div>
                ))}
            </div>

            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2"></div>

            {/* AVATAR WITH NEON AURA & RING */}
            <div className="relative mt-4">
                <div className="neon-aura"></div>
                <div className="w-32 h-32 md:w-44 md:h-44 rounded-full glowing-ring flex items-center justify-center p-1 bg-black/40 relative z-10 overflow-hidden shadow-[0_0_30px_rgba(255,0,127,0.4)]">
                    <img
                        src="/leader_logo.jpg"
                        alt="ROSE 4H"
                        className="w-full h-full object-cover rounded-full"
                    />
                </div>
                {/* ACTIVE STATUS DOT */}
                <div className="absolute bottom-[10%] right-[10%] w-5 h-5 bg-green-500 rounded-full border-4 border-black shadow-[0_0_15px_#22c55e] z-20 animate-pulse"></div>
            </div>

            {/* LEADER BADGE */}
            <div className="mt-8 flex items-center gap-2 bg-gradient-to-r from-primary to-purple-600 px-6 py-2 rounded-full border border-white/20 shadow-[0_0_25px_rgba(255,0,127,0.5)] animate-pulse z-10">
                <span className="material-symbols-outlined text-white text-sm">workspace_premium</span>
                <span className="text-[10px] md:text-xs font-black tracking-[0.2em] text-white uppercase italic">
                    GUILD LEADER
                </span>
            </div>

            {/* NAME & UID */}
            <div className="text-center mt-6 z-10">
                <h2 className="text-3xl md:text-4xl font-display font-black text-white italic skew-x-[-5deg] tracking-tighter uppercase drop-shadow-[0_0_20px_rgba(255,0,127,0.5)] mb-2">
                    ROSE 4H
                </h2>
                <div className="inline-block px-4 py-1.5 bg-black/60 rounded-lg border border-primary/30">
                    <p className="text-primary text-xs md:text-sm font-mono font-black tracking-widest">
                        UID: 2134890795
                    </p>
                </div>
            </div>

            {/* DECORATIVE FOOTER */}
            <div className="mt-auto pt-6 flex items-center gap-2 opacity-50 z-10">
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-white/30"></div>
                <span className="text-[9px] font-black tracking-[0.3em] text-white uppercase">Sovereign Domain</span>
                <div className="w-8 h-px bg-gradient-to-l from-transparent to-white/30"></div>
            </div>
        </div>
    );
}
