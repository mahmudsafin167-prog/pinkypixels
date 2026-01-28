"use client";
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/lib/firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [uid, setUid] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!auth || !db) {
            setError('Firebase is not configured. Please check your .env.local file.');
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Create user profile in Firestore with pending status
            await setDoc(doc(db, "users", userCredential.user.uid), {
                uid: userCredential.user.uid,
                name: name,
                email: email,
                gameUid: uid,
                role: "Member",
                status: "pending",
                joinDate: new Date()
            });
            router.push('/profile?new=true');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-dark px-4 py-20 relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px]"></div>

            <div className="w-full max-w-md gaming-card p-10 rounded-[2.5rem] relative z-10">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-display font-black italic skew-x-[-10deg] tracking-tight animated-text-gradient uppercase mb-2">
                        JOIN ROSTER
                    </h2>
                    <p className="text-white/50 text-xs font-bold tracking-[0.3em] uppercase">Recruitment form</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-xs font-bold p-3 rounded-xl mb-6 text-center animate-pulse">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignup} className="space-y-6">
                    <div>
                        <label className="block text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-2 ml-1">Player Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-medium"
                            placeholder="e.g. Pix Izumi"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-2 ml-1">Free Fire UID</label>
                        <input
                            type="text"
                            value={uid}
                            onChange={(e) => setUid(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-mono"
                            placeholder="e.g. 3055641363"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-2 ml-1">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-medium"
                            placeholder="queen@pinkypixels.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-2 ml-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-medium"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-black py-4 rounded-2xl transition-all shadow-glow hover:scale-[1.02] active:scale-95 tracking-widest italic skew-x-[-10deg] text-lg">
                        SUBMIT APPLICATION
                    </button>
                </form>

                <p className="text-center mt-10 text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">
                    Already on roster? <Link href="/auth/login" className="text-primary hover:text-white transition-colors underline underline-offset-4">Back into Lobby</Link>
                </p>
            </div>
        </div>
    );
}
