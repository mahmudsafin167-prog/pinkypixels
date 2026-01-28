import React from 'react';

export default function Stats() {
    return (
        <section className="relative -mt-24 z-20 px-4 py-12 bg-[#0f0c19]">
            <div className="max-w-6xl mx-auto glass-panel rounded-2xl p-8 shadow-2xl border border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Stat 1 */}
                    <div className="flex items-center gap-4 border-r border-white/10 last:border-0 pr-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-3xl">swords</span>
                        </div>
                        <div>
                            <p className="text-sm text-white/60 font-medium uppercase">Game</p>
                            <p className="text-xl font-bold text-white">Free Fire</p>
                        </div>
                    </div>
                    {/* Stat 2 */}
                    <div className="flex items-center gap-4 border-r border-white/10 last:border-0 pr-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-3xl">fingerprint</span>
                        </div>
                        <div>
                            <p className="text-sm text-white/60 font-medium uppercase">Guild ID</p>
                            <p className="text-xl font-bold text-white font-mono">3055641363</p>
                        </div>
                    </div>
                    {/* Stat 3 */}
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-3xl">military_tech</span>
                        </div>
                        <div>
                            <p className="text-sm text-white/60 font-medium uppercase">Current Level</p>
                            <p className="text-xl font-bold text-white">Level 6</p>
                        </div>
                    </div>
                </div>
                {/* Progress Bar */}
                <div className="border-t border-white/10 pt-6">
                    <div className="flex justify-between items-end mb-2">
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-primary tracking-widest uppercase mb-1">Pushing Rank</span>
                            <span className="text-white font-bold">Road to Level 7</span>
                        </div>
                        <span className="text-primary font-bold text-xl">85%</span>
                    </div>
                    <div className="h-4 w-full bg-surface-dark rounded-full overflow-hidden border border-white/5">
                        <div className="h-full bg-gradient-to-r from-purple-600 to-primary w-[85%] rounded-full shadow-[0_0_15px_rgba(244,37,140,0.6)] relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite] skew-x-12"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
