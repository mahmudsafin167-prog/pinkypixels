import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import '../lib/firebase/config';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Pinky Pixels - All-Girls Free Fire Guild',
    description: 'The ultimate all-girls Garena Free Fire guild. Where sisterhood meets competitive dominance.',
    viewport: 'width=device-width, initial-scale=1.0',
};

import { AuthProvider } from '@/lib/contexts/AuthContext';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            </head>
            <body className={`${spaceGrotesk.className} bg-background-dark text-white`}>
                <AuthProvider>
                    <Navbar />
                    {children}
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}
