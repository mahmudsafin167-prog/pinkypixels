import React from 'react';
import Link from 'next/link';

export default function About() {
    return (
        <section className="py-20 px-4 relative overflow-hidden bg-[#0f0c19]" id="about">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="relative order-2 lg:order-1">
                    <div className="absolute inset-0 bg-primary rounded-2xl rotate-3 opacity-20 blur-sm"></div>
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-glow rotate-3 group transition-transform hover:scale-[1.02]">
                        <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent opacity-60 z-10"></div>
                        <img
                            alt="Pinky Pixels Guild Screenshot"
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                            src="/guild_screenshot.jpg"
                        />
                        <div className="absolute bottom-4 left-0 right-0 text-center md:text-left md:bottom-6 md:left-6 md:right-auto z-20">
                            <p className="text-white text-sm font-medium">Join 50+ Active Members</p>
                        </div>
                    </div>
                </div>
                <div className="order-1 lg:order-2 text-center md:text-left">
                    <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold mb-6">
                        ABOUT US
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        Sisterhood in <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Battle</span>
                    </h2>
                    <p className="text-lg text-white/70 mb-6 leading-relaxed">
                        Gaming spaces can be tough, but Pinky Pixels is different. We are a sanctuary for female gamers who want to compete at a high level without the toxicity.
                    </p>
                    <p className="text-lg text-white/70 mb-8 leading-relaxed">
                        Founded in 2023, we focus on building genuine friendships, improving our skills together, and dominating the lobby with style and coordination.
                    </p>
                    <div className="flex gap-4 justify-center md:justify-start">
                        <div className="flex flex-col gap-1">
                            <span className="text-3xl font-bold text-primary">100%</span>
                            <span className="text-sm text-white/50">Female Roster</span>
                        </div>
                        <div className="w-px bg-white/10 mx-4"></div>
                        <div className="flex flex-col gap-1">
                            <span className="text-3xl font-bold text-primary">24/7</span>
                            <span className="text-sm text-white/50">Messenger Group</span>
                        </div>
                    </div>
                    <div className="mt-8 flex justify-center md:justify-start">
                        <Link href="/members" className="inline-flex items-center gap-2 text-primary font-bold hover:text-white transition-colors group">
                            <span>View All Members</span>
                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
