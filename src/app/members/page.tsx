"use client";
import React, { useEffect, useState } from 'react';
import SpecialLeaderCard from '@/components/SpecialLeaderCard';
import MemberCard from '@/components/MemberCard';
import AOSInit from '@/components/AOSInit';
import { db } from '@/lib/firebase/config';
import { collection, query, getDocs, orderBy, where, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '@/lib/contexts/AuthContext';

export default function MembersPage() {
    const [firestoreMembers, setFirestoreMembers] = useState<any[]>([]);
    const [loadingMembers, setLoadingMembers] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                // Fetch ONLY approved members
                const q = query(
                    collection(db, "users"),
                    where("status", "==", "approved")
                );
                const querySnapshot = await getDocs(q);
                let membersData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...(doc.data() as any)
                }));

                // Filter out the permanent Special Leader (ROSE 4H) if she exists in Firestore
                // to avoid duplication in the grid.
                membersData = membersData.filter((m: any) => m.name !== 'ROSE 4H' && m.gameUid !== '2134890795');

                // Sort in memory to avoid missing users without joinDate
                membersData.sort((a: any, b: any) => {
                    const dateA = a.joinDate?.seconds || 0;
                    const dateB = b.joinDate?.seconds || 0;
                    return dateB - dateA;
                });

                setFirestoreMembers(membersData);
            } catch (error) {
                console.error("Error fetching members:", error);
            } finally {
                setLoadingMembers(false);
            }
        };

        fetchMembers();
    }, []);

    const handleDeleteMember = async (memberId: string) => {
        if (!window.confirm("Are you sure you want to delete this member? This action cannot be undone.")) return;

        try {
            await deleteDoc(doc(db, "users", memberId));
            setFirestoreMembers(prev => prev.filter(m => m.id !== memberId));
        } catch (error) {
            console.error("Error deleting member:", error);
            alert("Failed to delete member. Please try again.");
        }
    };

    return (
        <main className="flex-grow pt-32 pb-20 px-2 md:px-8 bg-background-dark min-h-screen">
            <AOSInit />
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-8 md:mb-16" data-aos="fade-down">
                    <h1 className="text-3xl md:text-6xl font-bold mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-purple-500 animate-gradient pb-2">
                        Meet Our Guild Members
                    </h1>
                    <p className="text-base md:text-xl text-white/60 max-w-2xl mx-auto px-4">
                        The talented and fierce sisters who make our community strong.
                    </p>
                </div>

                {/* Members Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 pb-10">
                    {/* 1. PERMANENT SPECIAL LEADER CARD */}
                    <SpecialLeaderCard />

                    {/* 2. DYNAMIC MEMBERS */}
                    {loadingMembers ? (
                        <div className="col-span-2 lg:col-span-4 flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        firestoreMembers.map((member, index) => (
                            <MemberCard
                                key={member.id}
                                member={member}
                                index={index + 1} // +1 because Leader is index 0
                                isCurrentUser={user?.uid === member.uid}
                                onDelete={handleDeleteMember}
                            />
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}
