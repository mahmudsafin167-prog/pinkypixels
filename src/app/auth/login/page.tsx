"use client";
import React, { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '@/lib/firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!auth) {
            setError('Firebase is not configured. Please check your .env.local file.');
            return;
        }
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/profile');
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleGoogleLogin = async () => {
        if (!auth || !db) {
            setError('Firebase is not configured. Please check your .env.local file.');
            return;
        }
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Initialize user document if it doesn't exist
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    uid: user.uid,
                    name: user.displayName || 'Unnamed Player',
                    email: user.email,
                    photoUrl: user.photoURL || '',
                    role: "Member",
                    status: "pending",
                    joinDate: new Date()
                });
            }

            router.push('/profile');
        } catch (err: any) {
            setError(err.message);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-dark px-4 py-20 relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px]"></div>

            <div className="w-full max-w-md gaming-card p-8 md:p-10 rounded-[2.5rem] relative z-10">
                <div className="text-center mb-8 md:mb-10">
                    <h2 className="text-3xl md:text-4xl font-display font-black italic skew-x-[-10deg] tracking-tight animated-text-gradient uppercase mb-2">
                        LOGIN
                    </h2>
                    <p className="text-white/50 text-xs font-bold tracking-[0.3em] uppercase">Enter the Lobby</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-xs font-bold p-3 rounded-xl mb-6 text-center animate-pulse">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
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
                        START SESSION
                    </button>
                </form>

                <div className="mt-8 flex flex-col gap-6">
                    <div className="relative flex items-center justify-center">
                        <div className="absolute border-t border-white/5 w-full"></div>
                        <span className="relative bg-[#1a0b1d] px-4 text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">Deployment</span>
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl transition-all border border-white/10 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 group"
                    >
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <span className="tracking-widest text-sm uppercase">Google Auth</span>
                    </button>
                </div>

                <p className="text-center mt-10 text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">
                    New recruit? <Link href="/auth/signup" className="text-primary hover:text-white transition-colors underline underline-offset-4">Join Roster</Link>
                </p>
            </div>
        </div>
    );
}
