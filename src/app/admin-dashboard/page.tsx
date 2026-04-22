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
    const [allMembers, setAllMembers] = useState<any[]>([]);
    const [pendingUsers, setPendingUsers] = useState<any[]>([]);
    const [recruitmentApps, setRecruitmentApps] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'users' | 'recruitment' | 'members' | 'bulkImport'>('recruitment');
    const [bulkText, setBulkText] = useState('');

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
                // Filter for Approved Members for the new tab
                const approved = users.filter((u: any) => u.status === 'approved' && u.name !== 'ROSE 4H'); // Exclude Rose from edit
                setAllMembers(approved.sort((a: any, b: any) => (a.name || '').localeCompare(b.name || '')));
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

    const handleUpdateRole = async (userId: string, newRole: string) => {
        setActionLoading(userId);
        try {
            await setDoc(doc(db, "users", userId), { role: newRole }, { merge: true });
            // alert(`Role updated to ${newRole}`); // Optional: Silent update is often better for admin tools
        } catch (error) {
            console.error("Error updating role:", error);
            alert("Failed to update role.");
        } finally {
            setActionLoading(null);
        }
    };

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

    const handleBulkImport = async () => {
        if (!bulkText.trim()) return;
        setIsLoading(true);

        const freeFireAvatars = [
            "118d193c335267a09719c42d18377853.png", "1a660469f5dd320a3c9230d80041e8ce.png",
            "2156d6b5ec48a11fee8cfff3a248a77f.png", "3809ca9651ec4b484daa726b29e4a8c0.png",
            "465a496fe5ca40e4cb748c82f7d53b53.png", "4a16d6dfce6f801fcb26533425bd7d2d.png",
            "4a6e93ce61e87c40c7d3f58ad8ffb0bd.png", "550cdc71cfa97dc3f23008188e474cbf.png",
            "68fb852b9a7c3bc8294234934a59e5f3.png", "88068baca6c3adb14238b5050747d8c0.png",
            "9477d8a9b9d1dbce6165b43ad3eaf524.png", "9c302601566bd21a15627377bf947097.png",
            "9fd2e425a0a8ccd8b8ec6aa6dcdad7dd.png", "a89bfb61f713424f88e8626915d30f23.png",
            "ac9a0b7d631852d8f4b3981035741ec8.png", "d3c8711acac05c22d3a5ac170a7a1d32.png",
            "e22a6f96a8dc618ae1dd61b488de4d71.png", "e4afb2e3debc88092492cdc71cceccbf.png",
            "e8acb0e432e8b6a22a218b7be9f6491b.png", "e9b120bb935cfe5732ffd3740d251d69.png"
        ];

        try {
            const names = bulkText
                .split(/[\n,]+/)
                .map(n => n.trim())
                .filter(n => n.length > 0);
            
            const promises = names.map(async (name) => {
                const newUserRef = doc(collection(db, "users"));
                const randomAvatar = freeFireAvatars[Math.floor(Math.random() * freeFireAvatars.length)];
                
                return setDoc(newUserRef, {
                    uid: newUserRef.id,
                    name: name,
                    gameUid: "",
                    role: "Member",
                    status: "approved",
                    isManual: true,
                    photoUrl: `/images/${randomAvatar}`,
                    joinDate: new Date()
                });
            });

            await Promise.all(promises);
            setBulkText('');
            setActiveTab('members');
            alert(`Successfully imported ${names.length} members with Free Fire avatars!`);
        } catch (error) {
            console.error("Error bulk importing:", error);
            alert("Failed to import members.");
        } finally {
            setIsLoading(false);
        }
    };

    if (loading || !user || user.email !== ADMIN_EMAIL) {
        return <div className="min-h-screen flex items-center justify-center text-white bg-background-dark">Verifying Admin Access...</div>;
    }

    const availableRoles = [
        'Guild Queen',
        'Guild Leader',
        'Co-Leader',
        'Officer',
        'Member',
        'Elite Sniper',
        'Rusher',
        'Support',
        'All Rounder'
    ];

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
                        className={`px-6 py-3 rounded-xl font-black text-[10px] tracking-[0.2em] uppercase transition-all flex items-center gap-2 flex-shrink-0 ${activeTab === 'recruitment' ? 'bg-primary text-white shadow-glow' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                    >
                        <span className="material-symbols-outlined text-sm">group_add</span>
                        Recruit Leads ({recruitmentApps.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`px-6 py-3 rounded-xl font-black text-[10px] tracking-[0.2em] uppercase transition-all flex items-center gap-2 flex-shrink-0 ${activeTab === 'users' ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                    >
                        <span className="material-symbols-outlined text-sm">badge</span>
                        Card Requests ({pendingUsers.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('members')}
                        className={`px-6 py-3 rounded-xl font-black text-[10px] tracking-[0.2em] uppercase transition-all flex items-center gap-2 flex-shrink-0 ${activeTab === 'members' ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                    >
                        <span className="material-symbols-outlined text-sm">manage_accounts</span>
                        Manage Members ({allMembers.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('bulkImport')}
                        className={`px-6 py-3 rounded-xl font-black text-[10px] tracking-[0.2em] uppercase transition-all flex items-center gap-2 flex-shrink-0 ${activeTab === 'bulkImport' ? 'bg-green-600 text-white shadow-[0_0_20px_rgba(22,163,74,0.4)]' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                    >
                        <span className="material-symbols-outlined text-sm">publish</span>
                        Bulk Import
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
                ) : activeTab === 'users' ? (
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
                ) : activeTab === 'members' ? (
                    /* MEMBERS MANAGEMENT SECTION */
                    <div className="space-y-4">
                        {allMembers.length === 0 ? (
                            <div className="bg-white/5 rounded-3xl p-16 text-center border border-white/5">
                                <span className="material-symbols-outlined text-6xl text-white/10 mb-4">groups</span>
                                <h3 className="text-xl font-bold text-white/30 uppercase tracking-widest">No Members Found</h3>
                            </div>
                        ) : (
                            allMembers.map((member) => (
                                <div key={member.id} className="gaming-card rounded-2xl md:rounded-[1.5rem] p-5 md:p-6 border border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 group hover:bg-white/5 transition-all">
                                    <div className="flex items-center gap-5 w-full md:w-auto min-w-0 flex-1">
                                        <div className="w-14 h-14 rounded-full border-2 border-white/10 overflow-hidden bg-black/40 flex-shrink-0">
                                            <img
                                                src={member.photoUrl || `https://api.dicebear.com/9.x/avataaars/svg?seed=${member.uid}`}
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="text-left min-w-0 flex-1">
                                            <h3 className="text-lg font-display font-black text-white italic skew-x-[-5deg] tracking-widest uppercase truncate">{member.name || 'Unknown'}</h3>
                                            <p className="text-white/30 text-[9px] mt-1 font-mono uppercase tracking-widest">
                                                {member.email || member.id}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 w-full md:w-auto">
                                        <div className="relative w-full md:w-48">
                                            <select
                                                value={member.role || 'Member'}
                                                onChange={(e) => handleUpdateRole(member.id, e.target.value)}
                                                disabled={actionLoading === member.id}
                                                className="w-full bg-black/40 border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg px-4 py-3 appearance-none hover:border-primary/50 focus:border-primary focus:outline-none transition-all cursor-pointer"
                                            >
                                                {availableRoles.map(role => (
                                                    <option key={role} value={role} className="bg-neutral-900 text-white py-2">
                                                        {role}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                                                <span className="material-symbols-outlined text-sm">expand_more</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleDeleteUser(member.id)}
                                            disabled={actionLoading === member.id}
                                            className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white p-3 rounded-xl border border-red-500/20 transition-all flex-shrink-0"
                                            title="Delete Member"
                                        >
                                            <span className="material-symbols-outlined text-lg">delete</span>
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                ) : activeTab === 'bulkImport' ? (
                    /* BULK IMPORT SECTION */
                    <div className="bg-white/5 rounded-3xl p-6 md:p-8 border border-white/10 animate-fade-in">
                        <div className="mb-6">
                            <h2 className="text-2xl font-display font-black text-white italic skew-x-[-5deg] tracking-widest uppercase flex items-center gap-3">
                                <span className="material-symbols-outlined text-green-500">publish</span>
                                Bulk Import Members
                            </h2>
                            <p className="text-white/50 text-xs mt-2 font-mono">
                                Paste a list of names separated by commas or new lines. Example: Riya, Sarah, Mila
                            </p>
                        </div>
                        <textarea
                            value={bulkText}
                            onChange={(e) => setBulkText(e.target.value)}
                            placeholder="Enter member names here..."
                            className="w-full h-64 bg-black/40 border border-white/20 rounded-2xl p-4 text-white font-mono text-sm focus:outline-none focus:border-green-500 transition-colors resize-none mb-6"
                        ></textarea>
                        <div className="flex justify-end">
                            <button
                                onClick={handleBulkImport}
                                disabled={isLoading || !bulkText.trim()}
                                className="bg-green-600 hover:bg-green-500 text-white font-black px-8 py-4 rounded-xl text-xs tracking-widest uppercase italic skew-x-[-10deg] shadow-[0_0_20px_rgba(22,163,74,0.4)] hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
                            >
                                {isLoading ? (
                                    <span className="material-symbols-outlined animate-spin">refresh</span>
                                ) : (
                                    <span className="material-symbols-outlined">rocket_launch</span>
                                )}
                                IMPORT {bulkText.trim() ? bulkText.split(/[\n,]+/).filter(n => n.trim().length > 0).length : 0} MEMBERS
                            </button>
                        </div>
                    </div>
                ) : null}
            </div>
        </main>
    );
}
