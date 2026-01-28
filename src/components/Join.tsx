"use client";
import React, { useState } from 'react';
import { db } from '@/lib/firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Join() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        gameUid: '',
        age: '',
        role: 'All Rounder',
        contact: ''
    });

    const handleCopy = () => {
        navigator.clipboard.writeText("3055641363");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        if (submitSuccess) setSubmitSuccess(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await addDoc(collection(db, "applications"), {
                ...formData,
                status: 'pending',
                createdAt: serverTimestamp()
            });
            setSubmitSuccess(true);
            setFormData({ name: '', gameUid: '', age: '', role: 'All Rounder', contact: '' });
            setTimeout(() => {
                setIsModalOpen(false);
                setSubmitSuccess(false);
            }, 3000);
        } catch (error) {
            console.error("Error submitting application:", error);
            alert("Failed to submit application. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-20 px-4" id="join">
            {/* ... (keep previous section content identical) */}
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
                                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-400 text-lg">check_circle</span> Level 50+ in Free Fire</li>
                                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-400 text-lg">check_circle</span> KD Ratio 2.0+ preferred</li>
                                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-400 text-lg">check_circle</span> Mic on for Squad games</li>
                                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-400 text-lg">check_circle</span> Must change name within 7 days</li>
                                </ul>
                            </div>
                            <div className="bg-background-dark/50 p-6 rounded-xl border border-white/5">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                                        <span className="material-symbols-outlined">chat</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-1">Interview</h4>
                                        <p className="text-white/60 text-sm">Fill the form or Message us on Facebook to introduce yourself and play a trial match.</p>
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
                        <button
                            onClick={toggleModal}
                            className="bg-primary hover:bg-primary-dark text-white text-lg font-bold py-4 px-12 rounded-xl shadow-glow hover:shadow-lg hover:scale-105 transition-all w-full md:w-auto"
                        >
                            Join Pinky Pixels
                        </button>
                        <p className="mt-4 text-white/40 text-sm">Applications reviewed within 24 hours.</p>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-all duration-300">
                    <div className="relative w-full max-w-lg transform transition-all duration-300">
                        <div className="relative bg-[#2d1a24]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2"></div>

                            <div className="relative z-10">
                                <button onClick={toggleModal} className="absolute -top-2 -right-2 text-white/50 hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-2xl">close</span>
                                </button>

                                {submitSuccess ? (
                                    <div className="text-center py-10 animate-fade-in">
                                        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow">
                                            <span className="material-symbols-outlined text-5xl">check_circle</span>
                                        </div>
                                        <h2 className="text-3xl font-bold text-white mb-2">Application Received!</h2>
                                        <p className="text-white/60 leading-relaxed">Our leaders will review your combat details for an interview. <br /><span className="text-primary font-bold">Important:</span> To get your official Member Card, please register an account on the site.</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="text-center mb-8">
                                            <h2 className="text-3xl font-bold text-white mb-2 italic skew-x-[-10deg]">RECRUITMENT LEAD</h2>
                                            <p className="text-white/60 text-sm">Submit details for a trial match & interview.</p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">IGN</label>
                                                    <input
                                                        type="text" required placeholder="Pixel Izumi"
                                                        value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-sm"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Free Fire UID</label>
                                                    <input
                                                        type="text" required placeholder="305564..."
                                                        value={formData.gameUid} onChange={(e) => setFormData({ ...formData, gameUid: e.target.value })}
                                                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white font-mono focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-sm"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Age</label>
                                                    <input
                                                        type="number" required min="13"
                                                        value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-primary/50 transition-all text-sm"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Primary Role</label>
                                                    <select
                                                        value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                                        className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-primary/50 transition-all text-sm appearance-none cursor-pointer"
                                                    >
                                                        <option>All Rounder</option>
                                                        <option>Sniper</option>
                                                        <option>Rusher</option>
                                                        <option>Support</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Contact Info (FB/Discord)</label>
                                                <input
                                                    type="text" required placeholder="Facebook link or Discord ID"
                                                    value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-primary/50 transition-all text-sm"
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full hud-button text-white font-black py-4 rounded-xl shadow-glow transition-all flex items-center justify-center gap-2 mt-4 uppercase italic skew-x-[-10deg] tracking-widest disabled:opacity-50"
                                            >
                                                {isSubmitting ? <><div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"></div> SENDING...</> : <><span>SUBMIT APPLICATION</span> <span className="material-symbols-outlined">send</span></>}
                                            </button>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
