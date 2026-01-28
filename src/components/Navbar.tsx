"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { auth } from "@/lib/firebase/config";
import { signOut } from "firebase/auth";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const { user, loading } = useAuth();

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        if (!isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    };

    return (
        <>
            <nav
                className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${isScrolled
                    ? "bg-background-dark/80 backdrop-blur-md border-white/10"
                    : "bg-transparent border-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-black text-xl shadow-glow group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-[28px]">sports_esports</span>
                            </div>
                            <span className="font-display font-black text-xl tracking-tight text-white group-hover:text-primary transition-colors uppercase">
                                PINKY PIXELS
                            </span>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-8">
                            <Link href="/" className={`${pathname === "/" ? "text-primary" : "text-white"} hover:text-primary font-medium transition-colors`}>
                                Home
                            </Link>
                            <Link href="/#about" className="text-white hover:text-primary font-medium transition-colors">
                                About
                            </Link>
                            <Link href="/#activities" className="text-white hover:text-primary font-medium transition-colors">
                                Activities
                            </Link>
                            <Link href="/members" className={`${pathname === "/members" ? "text-primary" : "text-white"} hover:text-primary font-medium transition-colors`}>
                                Members
                            </Link>

                            {!loading && (
                                user ? (
                                    <div className="flex items-center gap-4">
                                        <Link href="/profile" className="text-white hover:text-primary font-medium transition-colors flex items-center gap-1">
                                            <span className="material-symbols-outlined">account_circle</span>
                                            Profile
                                        </Link>
                                        <button onClick={handleLogout} className="text-white hover:text-red-500 font-medium transition-colors">
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <Link
                                        href="/auth/login"
                                        className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-glow hover:shadow-lg transform hover:-translate-y-0.5"
                                    >
                                        Login
                                    </Link>
                                )
                            )}
                        </div>

                        {/* Mobile Menu Button & Auth */}
                        <div className="md:hidden flex items-center gap-3">
                            {!loading && (
                                user ? (
                                    <Link
                                        href="/profile"
                                        className="w-9 h-9 rounded-full border-2 border-primary overflow-hidden shadow-glow transition-transform hover:scale-110 active:scale-95 bg-black/40 flex items-center justify-center"
                                        title="Go to Dashboard"
                                    >
                                        <img
                                            src={user.photoURL || `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.uid}`}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </Link>
                                ) : (
                                    <Link
                                        href="/auth/login"
                                        className="bg-primary hover:bg-primary-dark text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-glow active:scale-95 flex items-center gap-1 border border-white/10"
                                    >
                                        <span className="material-symbols-outlined text-sm">login</span>
                                        Login
                                    </Link>
                                )
                            )}
                            <button onClick={toggleMobileMenu} className="text-white focus:outline-none ml-1">
                                <span className="material-symbols-outlined text-3xl">{isMobileMenuOpen ? 'close' : 'menu'}</span>
                            </button>
                        </div>
                    </div>
                </div>

            </nav>
            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
                    }`}
            >
                {/* Refined FULL-SCREEN Glass Background Overlay */}
                <div className="absolute inset-0 bg-background-dark/95 backdrop-blur-[20px] border-b border-primary/20"></div>

                {/* Decorative Blobs for the Menu */}
                <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px]"></div>

                <button onClick={toggleMobileMenu} className="absolute top-6 right-6 text-white hover:text-primary transition-colors z-50 p-4 active:scale-90">
                    <span className="material-symbols-outlined text-5xl font-black">close</span>
                </button>

                <nav className="relative z-10 flex flex-col items-center gap-6 md:gap-8 w-full px-12">
                    <Link
                        href="/"
                        onClick={toggleMobileMenu}
                        className={`text-3xl md:text-4xl font-display font-black italic skew-x-[-10deg] tracking-tight transition-all duration-300 hover:scale-105 uppercase ${pathname === "/" ? "animated-text-gradient text-glow" : "text-white hover:text-primary"}`}
                    >
                        HOME
                    </Link>
                    <Link
                        href="/#about"
                        onClick={toggleMobileMenu}
                        className="text-3xl md:text-4xl font-display font-black italic skew-x-[-10deg] tracking-tight text-white hover:text-primary transition-all duration-300 hover:scale-105 uppercase"
                    >
                        ABOUT
                    </Link>
                    <Link
                        href="/#activities"
                        onClick={toggleMobileMenu}
                        className="text-3xl md:text-4xl font-display font-black italic skew-x-[-10deg] tracking-tight text-white hover:text-primary transition-all duration-300 hover:scale-105 uppercase"
                    >
                        ACTIVITIES
                    </Link>
                    <Link
                        href="/members"
                        onClick={toggleMobileMenu}
                        className={`text-3xl md:text-4xl font-display font-black italic skew-x-[-10deg] tracking-tight transition-all duration-300 hover:scale-105 uppercase ${pathname === "/members" ? "animated-text-gradient text-glow" : "text-white hover:text-primary"}`}
                    >
                        MEMBERS
                    </Link>

                    <div className="w-full h-px bg-white/10 my-4 max-w-[240px]"></div>

                    {!loading && (
                        user ? (
                            <div className="flex flex-col items-center gap-6 w-full max-w-[280px]">
                                <Link
                                    href="/profile"
                                    onClick={toggleMobileMenu}
                                    className={`w-full py-5 px-6 rounded-2xl border-2 transition-all duration-300 flex items-center justify-center gap-3 text-xl font-black tracking-widest italic skew-x-[-5deg] ${pathname === "/profile"
                                        ? "bg-primary/20 border-primary text-white shadow-glow"
                                        : "border-primary/40 text-primary hover:bg-primary/10 hover:shadow-glow-sm"}`}
                                >
                                    <span className="material-symbols-outlined text-2xl">account_circle</span>
                                    PROFILE
                                </Link>
                                <button
                                    onClick={() => { handleLogout(); toggleMobileMenu(); }}
                                    className="w-full py-5 px-6 rounded-2xl border-2 border-red-500/40 text-red-500 hover:bg-red-500/10 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] transition-all duration-300 flex items-center justify-center gap-3 text-xl font-black tracking-widest italic skew-x-[-5deg]"
                                >
                                    <span className="material-symbols-outlined text-2xl">logout</span>
                                    LOGOUT
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/auth/login"
                                onClick={toggleMobileMenu}
                                className="w-full max-w-[280px] bg-primary hover:bg-primary-dark text-white text-xl font-black py-5 rounded-2xl shadow-glow transition-all text-center flex items-center justify-center gap-3 tracking-widest italic skew-x-[-5deg] hover:scale-105"
                            >
                                <span className="material-symbols-outlined text-2xl">login</span>
                                LOGIN
                            </Link>
                        )
                    )}
                </nav>
            </div>
        </>
    );
}
