"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase/config';
import { collection, query, where, getDocs, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import Link from 'next/link';
import AOSInit from '@/components/AOSInit';

export default function AdminPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [pendingUsers, setPendingUsers] = useState<any[]>([]);
    const [recruitmentApps, setRecruitmentApps] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'users' | 'recruitment'>('recruitment');

    const ADMIN_EMAIL = 'navilatayeba09@gmail.com';

    useEffect(() => {
        if (!loading) {
            if (!user || user.email !== ADMIN_EMAIL) {
                router.push('/');
                return;
            }

            // Listen to Pending Users
            const qUsers = query(collection(db, "users"));
            const unsubUsers = onSnapshot(qUsers, (snapshot) => {
                const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPendingUsers(users.filter((u: any) => u.status !== 'approved'));
            });

            // Listen to Recruitment Applications
            const qApps = query(collection(db, "applications"));
            const unsubApps = onSnapshot(qApps, (snapshot) => {
                const apps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                // Sort in memory to avoid index requirements
                apps.sort((a: any, b: any) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
                setRecruitmentApps(apps);
                setIsLoading(false);
            }, (error) => {
                console.error("Firestore error:", error);
                setIsLoading(false);
            });

            return () => {
                unsubUsers();
                unsubApps();
            };
        }
    }, [user, loading, router]);

    const handleApproveUser = async (userId: string) => {
        setActionLoading(userId);
        try {
            await setDoc(doc(db, "users", userId), { status: 'approved' }, { merge: true });
        } catch (error) {
            console.error("Error approving user:", error);
            alert("Failed to approve user.");
        } finally {
            setActionLoading(null);
        }
    };

    const handleApproveRecruitment = async (app: any) => {
        setActionLoading(app.id);
        try {
            // 1. Create member in users collection (for roster)
            const newUserRef = doc(collection(db, "users"));
            await setDoc(newUserRef, {
                uid: newUserRef.id,
                name: app.name,
                gameUid: app.gameUid,
                role: app.role || 'All Rounder',
                status: 'approved',
                joinDate: app.createdAt || new Date(),
                age: app.age || 'N/A',
                contact: app.contact || 'N/A'
            });

            // 2. Delete from applications
            await deleteDoc(doc(db, "applications", app.id));
        } catch (error) {
            console.error("Error approving recruitment:", error);
            alert("Failed to approve application.");
        } finally {
            setActionLoading(null);
        }
    };

    const handleRejectRecruitment = async (appId: string) => {
        if (!window.confirm("Reject this application?")) return;
        setActionLoading(appId);
        try {
            await deleteDoc(doc(db, "applications", appId));
        } catch (error) {
            console.error("Error rejecting recruitment:", error);
        } finally {
            setActionLoading(null);
        }
    };

    const handlePurge = async () => {
        if (!window.confirm("CRITICAL: This will delete ALL applications and ALL pending card requests. Continue?")) return;
        setIsLoading(true);
        try {
            // Delete all applications
            const appsSnap = await getDocs(collection(db, "applications"));
            const appDeletePromises = appsSnap.docs.map(d => deleteDoc(doc(db, "applications", d.id)));

            // Delete all pending users
            const usersSnap = await getDocs(query(collection(db, "users"), where("status", "==", "pending")));
            const userDeletePromises = usersSnap.docs.map(d => deleteDoc(doc(db, "users", d.id)));

            await Promise.all([...appDeletePromises, ...userDeletePromises]);
            alert("Database purged successfully!");
        } catch (error) {
            console.error("Purge failed:", error);
            alert("Failed to purge database.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        setActionLoading(userId);
        try {
            await deleteDoc(doc(db, "users", userId));
        } catch (error) {
            console.error("Error deleting user:", error);
        } finally {
            setActionLoading(null);
        }
    };

    if (loading || !user || user.email !== ADMIN_EMAIL) {
        return <div className="min-h-screen flex items-center justify-center text-white bg-background-dark">Verifying Admin Access...</div>;
    }

    return (
        <main className="min-h-screen bg-background-dark pt-32 pb-20 px-4 md:px-8">
            <AOSInit />
            <div className="max-w-6xl mx-auto">
                {/* HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6" data-aos="fade-down">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-display font-black italic skew-x-[-10deg] text-white tracking-tighter uppercase drop-shadow-[0_0_20px_rgba(255,0,127,0.3)]">
                            Admin <span className="text-primary">Nexus</span>
                        </h1>
                        <p className="text-white/40 font-mono text-xs mt-2 uppercase tracking-[0.3em]">Command Center v2.0</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3 w-full md:w-auto">
                        <button
                            onClick={handlePurge}
                            className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/30 text-[9px] font-black px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all tracking-widest italic skew-x-[-10deg]"
                        >
                            <span className="material-symbols-outlined text-sm">delete_sweep</span>
                            PURGE TEST DATA
                        </button>
                        <Link href="/profile" className="hud-button text-[10px] font-black tracking-[0.2em] text-white px-6 py-3 rounded-xl flex items-center gap-2 italic skew-x-[-10deg]">
                            <span className="material-symbols-outlined text-sm">arrow_back</span> EXIT CONSOLE
                        </Link>
                    </div>
                </div>

                {/* TABS */}
                <div className="flex gap-4 mb-8 border-b border-white/10 pb-4 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('recruitment')}
                        className={`px-6 py-3 rounded-xl font-black text-[10px] tracking-[0.2em] uppercase transition-all flex items-center gap-2 ${activeTab === 'recruitment' ? 'bg-primary text-white shadow-glow' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                    >
                        <span className="material-symbols-outlined text-sm">group_add</span>
                        Recruit Leads ({recruitmentApps.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`px-6 py-3 rounded-xl font-black text-[10px] tracking-[0.2em] uppercase transition-all flex items-center gap-2 ${activeTab === 'users' ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                    >
                        <span className="material-symbols-outlined text-sm">badge</span>
                        Card Requests ({pendingUsers.length})
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : activeTab === 'recruitment' ? (
                    /* RECRUITMENT SECTION */
                    <div className="space-y-4">
                        {recruitmentApps.length === 0 ? (
                            <div className="bg-white/5 rounded-3xl p-16 text-center border border-white/5">
                                <span className="material-symbols-outlined text-6xl text-white/10 mb-4 scale-150">inbox</span>
                                <h3 className="text-xl font-bold text-white/30 uppercase tracking-widest">No New Leads</h3>
                            </div>
                        ) : (
                            recruitmentApps.map((app) => (
                                <div key={app.id} className="gaming-card rounded-2xl md:rounded-[1.5rem] p-5 md:p-6 border border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 group hover:translate-x-1 transition-all duration-300">
                                    <div className="flex items-center gap-6 flex-1 w-full md:w-auto">
                                        <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30 shadow-inner group-hover:shadow-glow transition-all">
                                            <span className="material-symbols-outlined text-2xl font-black">forum</span>
                                        </div>
                                        <div className="flex-1 min-w-0 text-left">
                                            <h3 className="text-xl font-display font-black text-white tracking-widest uppercase italic skew-x-[-5deg] truncate group-hover:text-primary transition-colors">{app.name}</h3>
                                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 font-mono text-[10px] text-white/50 uppercase">
                                                <span className="text-primary font-bold">UID: {app.gameUid}</span>
                                                <span className="bg-white/5 px-2 rounded">ROLE: {app.role || 'Player'}</span>
                                                <span className="bg-white/5 px-2 rounded">AGE: {app.age || '—'}</span>
                                            </div>
                                            <p className="text-[10px] text-white/20 mt-2 uppercase tracking-tighter flex items-center gap-2">
                                                <span className="material-symbols-outlined text-[12px]">contact_mail</span>
                                                {app.contact}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 w-full md:w-auto">
                                        <button
                                            onClick={() => handleRejectRecruitment(app.id)}
                                            disabled={actionLoading === app.id}
                                            className="bg-primary/10 hover:bg-primary/30 text-primary border border-primary/20 px-6 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase italic skew-x-[-10deg] flex-1 md:flex-none transition-all"
                                        >
                                            {actionLoading === app.id ? '...' : 'DONE/CONTACTED'}
                                        </button>
                                        <button
                                            onClick={() => handleRejectRecruitment(app.id)}
                                            disabled={actionLoading === app.id}
                                            className="bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-500 border border-white/10 px-6 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase italic skew-x-[-10deg] flex-1 md:flex-none transition-all"
                                        >
                                            DISCARD
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                ) : (
                    /* AUTH REQUESTS SECTION */
                    <div className="space-y-4">
                        {pendingUsers.length === 0 ? (
                            <div className="bg-white/5 rounded-3xl p-16 text-center border border-white/5">
                                <span className="material-symbols-outlined text-6xl text-white/10 mb-4">check_circle</span>
                                <h3 className="text-xl font-bold text-white/30 uppercase tracking-widest">No Card Requests</h3>
                            </div>
                        ) : (
                            pendingUsers.map((pUser) => (
                                <div key={pUser.id} className="gaming-card rounded-2xl md:rounded-[1.5rem] p-5 md:p-6 border border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 group">
                                    <div className="flex items-center gap-5 w-full md:w-auto">
                                        <div className="relative">
                                            <div className="w-16 h-16 rounded-full border-2 border-primary/50 overflow-hidden bg-black/40 shadow-glow group-hover:scale-110 transition-transform duration-500">
                                                <img
                                                    src={pUser.photoUrl || `https://api.dicebear.com/9.x/avataaars/svg?seed=${pUser.uid}`}
                                                    alt={pUser.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-purple-500 rounded-full border-2 border-black"></div>
                                        </div>
                                        <div className="text-left">
                                            <h3 className="text-xl font-display font-black text-white italic skew-x-[-5deg] tracking-widest uppercase group-hover:text-primary transition-colors">{pUser.name}</h3>
                                            <p className="text-primary font-mono text-[10px] mt-1 font-bold">UID: {pUser.gameUid || 'NOT SET'}</p>
                                            <p className="text-white/20 text-[9px] mt-1 truncate max-w-[150px]">{pUser.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 w-full md:w-auto">
                                        <button
                                            onClick={() => handleApproveUser(pUser.id)}
                                            disabled={actionLoading === pUser.id}
                                            className="hud-button text-white font-black px-6 py-3 rounded-xl text-[10px] tracking-widest uppercase italic skew-x-[-10deg] flex-1 md:flex-none shadow-glow px-8"
                                        >
                                            {actionLoading === pUser.id ? '...' : (
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-sm font-bold">verified</span> APPROVE CARD
                                                </div>
                                            )}
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUser(pUser.id)}
                                            disabled={actionLoading === pUser.id}
                                            className="bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-500 px-6 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase italic skew-x-[-10deg] flex-1 md:flex-none border border-white/5 transition-all"
                                        >
                                            DELETE USER
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}
