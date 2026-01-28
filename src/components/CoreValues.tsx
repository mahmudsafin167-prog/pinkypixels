import React from 'react';

export default function CoreValues() {
    return (
        <section className="py-20 px-4 bg-surface-dark/30">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Core Values</h2>
                    <p className="text-white/60 max-w-2xl mx-auto">The pillars that make Pinky Pixels more than just a guild tag.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                    {/* Unity */}
                    <div data-aos="zoom-in" data-aos-delay="100" className="bg-card-dark p-4 md:p-8 rounded-2xl border border-primary/20 hover:border-primary/50 transition-colors group shadow-glow-sm md:shadow-none">
                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white mb-4 md:mb-6 shadow-lg group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-xl md:text-3xl">handshake</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Unity</h3>
                        <p className="text-white/60 text-sm leading-relaxed">We move as one. No member is left behind in the zone or in life.</p>
                    </div>
                    {/* Loyalty */}
                    <div data-aos="zoom-in" data-aos-delay="200" className="bg-card-dark p-4 md:p-8 rounded-2xl border border-primary/20 hover:border-primary/50 transition-colors group shadow-glow-sm md:shadow-none">
                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-red-500 to-primary flex items-center justify-center text-white mb-4 md:mb-6 shadow-lg group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-xl md:text-3xl">favorite</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Loyalty</h3>
                        <p className="text-white/60 text-sm leading-relaxed">Commitment to the tag. We wear our guild name with absolute pride.</p>
                    </div>
                    {/* Respect */}
                    <div data-aos="zoom-in" data-aos-delay="300" className="bg-card-dark p-4 md:p-8 rounded-2xl border border-primary/20 hover:border-primary/50 transition-colors group shadow-glow-sm md:shadow-none">
                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white mb-4 md:mb-6 shadow-lg group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-xl md:text-3xl">diamond</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Respect</h3>
                        <p className="text-white/60 text-sm leading-relaxed">Zero toxicity policy. We respect our teammates and our opponents.</p>
                    </div>
                    {/* Positivity */}
                    <div data-aos="zoom-in" data-aos-delay="400" className="bg-card-dark p-4 md:p-8 rounded-2xl border border-primary/20 hover:border-primary/50 transition-colors group shadow-glow-sm md:shadow-none">
                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white mb-4 md:mb-6 shadow-lg group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-xl md:text-3xl">sunny</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Positivity</h3>
                        <p className="text-white/60 text-sm leading-relaxed">Good vibes only. We lift each other up after every match.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
