"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function Join() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText("3055641363");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="py-12 md:py-20 px-4" id="join">
            <div className="max-w-4xl mx-auto">
                <div className="relative rounded-3xl overflow-hidden border border-primary/30 bg-surface-dark p-8 md:p-12 text-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl font-bold text-white mb-8">Ready to be a Pixel?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 text-left">
                            <div className="bg-background-dark/50 p-6 rounded-xl border border-white/5">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">1</div>
                                    <h3 className="text-lg font-bold text-white">Check Requirements</h3>
                                </div>
                                <ul className="space-y-3 text-white/70 text-sm">
                                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-400 text-lg">check_circle</span> Must change name within 7 days</li>
                                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-400 text-lg">check_circle</span> Achieve 2K+ Glory weekly</li>
                                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-400 text-lg">check_circle</span> Active in Messenger group</li>
                                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-400 text-lg">check_circle</span> Guild War is mandatory (No BR/CS)</li>
                                </ul>
                            </div>
                            <div className="bg-background-dark/50 p-6 rounded-xl border border-white/5">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                                        <span className="material-symbols-outlined">chat</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-1">Join the Roster</h4>
                                        <p className="text-white/60 text-sm">Create an account on our website to get your official Member Card and start your trial.</p>
                                    </div>
                                </div>
                                <div className="p-3 bg-black/30 rounded-lg flex justify-between items-center border border-white/5 mt-4">
                                    <code className="text-primary font-mono font-bold">3055641363</code>
                                    <button onClick={handleCopy} className={`text-xs flex items-center gap-1 transition-colors ${copied ? 'text-green-400 font-bold' : 'text-white/50 hover:text-white'}`}>
                                        {copied ? <><span className="material-symbols-outlined text-sm">check</span> Copied!</> : <><span className="material-symbols-outlined text-sm">content_copy</span> Copy</>}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <Link 
                            href="/auth/login"
                            className="inline-block bg-primary hover:bg-primary-dark text-white text-lg font-bold py-4 px-12 rounded-xl shadow-glow hover:shadow-lg hover:scale-105 transition-all w-full md:w-auto text-center"
                        >
                            Join Pinky Pixels
                        </Link>
                        <p className="mt-4 text-white/40 text-sm">Create your account to enter the lobby.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
