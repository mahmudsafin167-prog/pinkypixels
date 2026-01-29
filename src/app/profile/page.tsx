"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { uploadImage } from '@/lib/actions/cloudinary';
import Link from 'next/link';

export default function ProfilePage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [profile, setProfile] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        gameUid: '',
        photoUrl: ''
    });

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/login');
        } else if (user && db) {
            const fetchProfile = async () => {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProfile(docSnap.data());
                    setFormData({
                        name: docSnap.data().name || '',
                        gameUid: docSnap.data().gameUid || '',
                        photoUrl: docSnap.data().photoUrl || ''
                    });
                }
            };
            fetchProfile();
        }
    }, [user, loading, router]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !db) return;

        setIsUploading(true);
        let finalPhotoUrl = formData.photoUrl;

        if (selectedFile) {
            try {
                const uploadFormData = new FormData();
                uploadFormData.append('file', selectedFile);
                const uploadedUrl = await uploadImage(uploadFormData) as string;
                if (uploadedUrl) {
                    finalPhotoUrl = uploadedUrl;
                }
            } catch (error) {
                console.error("Cloudinary upload failed:", error);
                alert("Image upload failed. Please try again.");
                setIsUploading(false);
                return;
            }
        }

        try {
            const docRef = doc(db, "users", user.uid);
            await setDoc(docRef, {
                name: formData.name,
                gameUid: formData.gameUid,
                photoUrl: finalPhotoUrl
            }, { merge: true });
            setProfile({ ...profile, name: formData.name, gameUid: formData.gameUid, photoUrl: finalPhotoUrl });
            alert("Profile updated successfully!");
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setIsUploading(false);
            setSelectedFile(null);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert("UID Copied to clipboard!");
    };

    if (loading || !user) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;

    return (
        <div className="min-h-screen bg-background-dark pt-24 md:pt-32 pb-20 px-4 md:px-8 relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[128px]"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-[128px]"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* GLASSMORPHISM CARD */}
                <div className="gaming-card rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-12 border border-primary/20 shadow-glow relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

                    <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start text-center md:text-left">
                        {/* LEFT COLUMN: AVATAR & NAME */}
                        <div className="w-full md:w-1/3 flex flex-col items-center">
                            <div className="relative w-32 h-32 md:w-40 md:h-40 group">
                                <div className="w-full h-full rounded-full border-2 border-primary/40 overflow-hidden neon-pulse shadow-[0_0_25px_rgba(255,0,127,0.4)] bg-black/40 relative z-10">
                                    <img
                                        src={profile?.photoUrl || user.photoURL || 'https://api.dicebear.com/9.x/avataaars/svg?seed=' + user.uid}
                                        alt="Profile"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                {/* ACTIVE STATUS DOT */}
                                <div className="status-dot shadow-[0_0_15px_#00ff00]"></div>
                            </div>

                            {/* GRADIENT NAME - FIXED CLIPPING */}
                            <h2 className="text-2xl md:text-4xl font-display font-black italic skew-x-[-10deg] mt-6 md:mt-8 tracking-tighter animated-text-gradient uppercase drop-shadow-[0_0_15px_rgba(255,0,127,0.4)] px-2 w-full break-words">
                                {profile?.name || user.displayName || 'Pix izumi'}
                            </h2>

                            {/* PINK PILL BADGE */}
                            <div className="mt-4 flex items-center gap-2 bg-primary/10 text-primary px-5 py-2 md:px-6 md:py-2 rounded-full border border-primary/30 shadow-[0_0_20px_rgba(255,0,127,0.2)]">
                                <span className="text-[10px] md:text-xs font-black tracking-[0.2em] uppercase flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">sports_esports</span>
                                    {profile?.role || "Member"}
                                </span>
                            </div>

                            {/* CARD STATUS INDICATOR */}
                            <div className={`mt-6 flex items-center gap-2 px-4 py-1.5 rounded-lg border font-mono text-[9px] font-black uppercase tracking-widest ${profile?.status === 'approved' ? 'bg-green-500/10 text-green-400 border-green-500/30' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30 animate-pulse'}`}>
                                <span className="material-symbols-outlined text-sm">
                                    {profile?.status === 'approved' ? 'verified_user' : 'pending'}
                                </span>
                                CARD STATUS: {profile?.status || 'PENDING'}
                            </div>

                            <p className="text-white/30 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mt-6 md:mt-8">
                                ROSTER SINCE {new Date(profile?.joinDate?.seconds * 1000 || Date.now()).getFullYear()}
                            </p>
                        </div>

                        {/* RIGHT COLUMN: INFO HUD */}
                        <div className="w-full md:w-2/3 space-y-6 md:space-y-8 mt-4 md:mt-0">
                            <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-10 border-b border-white/10 pb-6 gap-4">
                                <h3 className="text-lg md:text-xl font-display font-black text-white tracking-[0.2em] uppercase flex items-center gap-3 md:gap-4 italic skew-x-[-10deg]">
                                    <span className="w-1.5 h-6 md:h-8 bg-primary rounded-full shadow-[0_0_15px_#ff007f]"></span>
                                    QUEEN HUD
                                </h3>
                                <div className="flex flex-wrap justify-center gap-3 w-full md:w-auto">
                                    {user.email === 'navilatayeba09@gmail.com' && (
                                        <Link
                                            href="/admin-dashboard"
                                            className="hud-button text-[9px] md:text-[10px] text-white/90 font-black px-4 py-2 md:px-5 md:py-2.5 rounded-xl flex items-center gap-2 tracking-widest italic skew-x-[-10deg] flex-1 md:flex-initial justify-center"
                                        >
                                            <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
                                            ADMIN
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => setIsEditing(!isEditing)}
                                        className="hud-button text-[9px] md:text-[10px] text-white font-black px-4 py-2 md:px-5 md:py-2.5 rounded-xl flex items-center gap-2 hover:-translate-y-1 transition-transform tracking-widest italic skew-x-[-10deg] flex-1 md:flex-initial justify-center"
                                    >
                                        <span className="material-symbols-outlined text-sm">{isEditing ? 'close' : 'settings'}</span>
                                        {isEditing ? 'ABORT' : 'MODIFY'}
                                    </button>
                                </div>
                            </div>

                            {isEditing ? (
                                <form onSubmit={handleUpdate} className="space-y-5 md:space-y-6 animate-fade-in text-left">
                                    <div>
                                        <label className="flex items-center gap-2 text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-2 md:mb-3 ml-2">
                                            <span>🎮</span> In-Game Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-5 text-white focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-bold tracking-wide text-sm md:text-base"
                                            placeholder="Enter IGN..."
                                        />
                                    </div>
                                    <div>
                                        <label className="flex items-center gap-2 text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-2 md:mb-3 ml-2">
                                            <span>🆔</span> Free Fire UID
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.gameUid}
                                            onChange={(e) => setFormData({ ...formData, gameUid: e.target.value })}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-5 text-white focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-mono text-primary font-bold text-sm md:text-base"
                                            placeholder="Enter UID..."
                                        />
                                    </div>
                                    <div>
                                        <label className="flex items-center gap-2 text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-2 md:mb-3 ml-2">
                                            <span>🖼️</span> Avatar Upload
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-5 text-white focus:outline-none file:bg-primary file:border-none file:rounded-lg file:text-white file:px-4 file:py-1 file:mr-4 file:text-[9px] md:text-[10px] file:font-black file:uppercase file:cursor-pointer hover:file:bg-primary-dark transition-all text-xs"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isUploading}
                                        className={`w-full hud-button text-white font-black py-4 md:py-5 rounded-xl md:rounded-2xl transition-all shadow-glow flex items-center justify-center gap-3 md:gap-4 tracking-widest uppercase text-xs md:text-sm italic skew-x-[-10deg] ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {isUploading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 md:h-5 w-4 md:w-5 border-2 border-white/20 border-t-white"></div>
                                                UPLOADING...
                                            </>
                                        ) : (
                                            'COMMIT CHANGES'
                                        )}
                                    </button>
                                </form>
                            ) : (
                                <div className="grid gap-4 md:gap-8 text-left">
                                    {/* IGN SECTION */}
                                    <div className="group p-4 md:p-6 bg-white/5 rounded-[1.5rem] md:rounded-[2rem] border border-white/5 hover:border-primary/30 transition-all duration-500 hover:bg-primary/5">
                                        <div className="flex items-center gap-4 md:gap-5">
                                            <div className="text-2xl md:text-3xl bg-black/40 p-3 md:p-4 rounded-xl md:rounded-2xl shadow-inner group-hover:scale-110 transition-transform">🎮</div>
                                            <div className="min-w-0 flex-1">
                                                <span className="block text-white/30 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-1 ml-0.5">In-Game Name</span>
                                                <span className="text-lg md:text-2xl font-display font-black text-white group-hover:text-primary transition-colors uppercase italic skew-x-[-5deg] tracking-wider block truncate">
                                                    {profile?.name || "NOT CONFIGURED"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* UID SECTION */}
                                    <div className="group p-4 md:p-6 bg-white/5 rounded-[1.5rem] md:rounded-[2rem] border border-white/5 hover:border-primary/40 transition-all duration-500 hover:bg-primary/5 relative overflow-hidden">
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-4 md:gap-5 min-w-0 flex-1">
                                                <div className="text-2xl md:text-3xl bg-black/40 p-3 md:p-4 rounded-xl md:rounded-2xl shadow-inner group-hover:scale-110 transition-transform">🆔</div>
                                                <div className="min-w-0 flex-1">
                                                    <span className="block text-white/30 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-1 ml-0.5">Free Fire ID</span>
                                                    <span className="text-xl md:text-3xl font-mono font-black text-primary group-hover:text-white transition-colors tracking-tighter block truncate">
                                                        {profile?.gameUid || "0000000000"}
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => copyToClipboard(profile?.gameUid || '')}
                                                className="bg-white/5 hover:bg-primary/20 p-3 md:p-4 rounded-xl md:rounded-2xl text-white/60 hover:text-primary transition-all active:scale-90 border border-white/5 shadow-lg flex-shrink-0"
                                                title="Copy UID"
                                            >
                                                <span className="material-symbols-outlined font-black text-xl md:text-2xl">content_copy</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* EMAIL SECTION */}
                                    <div className="group p-4 md:p-6 bg-white/5 rounded-[1.5rem] md:rounded-[2rem] border border-white/5 transition-all duration-300">
                                        <div className="flex items-center gap-4 md:gap-5 min-w-0">
                                            <div className="text-2xl md:text-3xl bg-black/40 p-3 md:p-4 rounded-xl md:rounded-2xl shadow-inner">📧</div>
                                            <div className="min-w-0 flex-1">
                                                <span className="block text-white/30 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-1 ml-0.5">Authenticated Account</span>
                                                <span className="text-sm md:text-md font-bold text-white/70 tracking-tight block truncate">{user.email}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CLOUD STATUS INDICATOR */}
                                    <div className="mt-6 md:mt-10 pt-6 md:pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between opacity-50 gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e] animate-pulse"></div>
                                            <span className="text-[9px] md:text-[10px] font-black text-white uppercase tracking-[0.3em]">Cloud DNA Active</span>
                                        </div>
                                        <span className="text-[9px] md:text-[10px] font-mono text-white/20 font-bold uppercase tracking-widest text-center md:text-right">UUID: {user.uid.substring(0, 12)}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
