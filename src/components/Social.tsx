import React from 'react';

export default function Social() {
    return (
        <section className="py-12 px-4 border-t border-white/5 bg-background-dark">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold text-white">Follow the Action</h3>
                    <p className="text-white/50 text-sm">Highlights, updates, and behind the scenes.</p>
                </div>
                <div className="flex gap-4">
                    {/* TikTok Button */}
                    <a className="h-12 px-6 rounded-lg bg-[#25F4EE]/10 hover:bg-[#25F4EE]/20 text-[#25F4EE] border border-[#25F4EE]/30 flex items-center gap-2 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(37,244,238,0.5)]" href="https://www.tiktok.com/@pinky.pixelsff?lang=en" target="_blank">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"></path>
                        </svg>
                        <span className="font-bold">TikTok</span>
                    </a>
                    {/* Facebook Button */}
                    <a className="h-12 px-6 rounded-lg bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] border border-[#1877F2]/30 flex items-center gap-2 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(24,119,242,0.5)]" href="https://www.facebook.com/profile.php?id=61580447529624" target="_blank">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                        </svg>
                        <span className="font-bold">Facebook</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
