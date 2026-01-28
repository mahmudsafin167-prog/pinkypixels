import React from 'react';

export default function Activities() {
    return (
        <section className="py-20 px-4" id="activities">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-4 text-center md:text-left">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-display font-black italic skew-x-[-10deg] tracking-tight text-white mb-2 text-glow">
                            GUILD ACTIVITIES
                        </h2>
                        <p className="text-white/40 text-xs font-bold tracking-[0.3em] uppercase ml-1">Current Operations</p>
                    </div>
                    <button className="text-primary font-black hover:text-white transition-all flex items-center gap-2 group tracking-widest text-xs uppercase italic skew-x-[-10deg]">
                        SEE ENTIRE LOG <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                </div>
                <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4 gap-4 md:grid md:grid-cols-3 md:gap-6 md:mx-0 md:px-0 pb-4 md:pb-0 after:content-[''] after:w-4 after:flex-none md:after:content-none">
                    {/* Card 1 */}
                    <div data-aos="fade-up" data-aos-delay="100" className="w-[85vw] md:w-auto flex-none snap-center group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-glow-sm hover:shadow-glow transition-all">
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-primary/20 to-primary/5 z-10 opacity-90"></div>
                        <img
                            alt="Competitive Scrims"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            src="/activity_scrims.png"
                        />
                        <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                            <div className="bg-primary/90 text-white text-xs font-bold px-2 py-1 rounded w-fit mb-2">WEEKLY</div>
                            <h3 className="text-xl font-bold text-white mb-1">Competitive Scrims</h3>
                            <p className="text-white/70 text-sm">Every Friday & saturday night wars.</p>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div data-aos="fade-up" data-aos-delay="200" className="w-[85vw] md:w-auto flex-none snap-center group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-glow-sm hover:shadow-glow transition-all">
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-primary/20 to-primary/5 z-10 opacity-90"></div>
                        <img
                            alt="Rank Push Squads"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            src="/activity_rank.jpg"
                        />
                        <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                            <div className="bg-purple-600/90 text-white text-xs font-bold px-2 py-1 rounded w-fit mb-2">COMPETITIVE</div>
                            <h3 className="text-xl font-bold text-white mb-1">Rank Push Squads</h3>
                            <p className="text-white/70 text-sm">Dedicated teams for pushing Grandmaster.</p>
                        </div>
                    </div>
                    {/* Card 3 */}
                    <div data-aos="fade-up" data-aos-delay="300" className="w-[85vw] md:w-auto flex-none snap-center group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-glow-sm hover:shadow-glow transition-all">
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-primary/20 to-primary/5 z-10 opacity-90"></div>
                        <img
                            alt="Community Meetups"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            src="/activity_meetup.jpg"
                        />
                        <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                            <div className="bg-blue-500/90 text-white text-xs font-bold px-2 py-1 rounded w-fit mb-2">SOCIAL</div>
                            <h3 className="text-xl font-bold text-white mb-1">Community Meetups</h3>
                            <p className="text-white/70 text-sm">Online events and hangouts.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
