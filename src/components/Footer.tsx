import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-primary-dark via-primary to-primary-dark text-white py-8">
            <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-2xl">sports_esports</span>
                    <span className="font-bold text-lg tracking-wider">PINKY PIXELS</span>
                </div>
                <div className="h-px w-24 bg-white/30"></div>
                <p className="font-medium tracking-[0.2em] text-sm uppercase text-white/90 text-center">
                    One Tag • One Guild • One Power
                </p>
                <p className="text-xs text-white/50 mt-4">
                    © {new Date().getFullYear()} Pinky Pixels Guild. All rights reserved. Not affiliated with Garena Free Fire.
                </p>
            </div>
        </footer>
    );
}
