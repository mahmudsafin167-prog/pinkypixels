import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import '../lib/firebase/config';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    themeColor: '#ff007f',
};

export const metadata: Metadata = {
    title: 'Pinky Pixels - All-Girls Free Fire Guild',
    description: 'The ultimate all-girls Garena Free Fire guild. Where sisterhood meets competitive dominance.',
    manifest: '/manifest.json',
    appleWebApp: {
        capable: true,
        title: 'Pinky Pixels',
        statusBarStyle: 'black-translucent',
    },
};

import { AuthProvider } from '@/lib/contexts/AuthContext';
import { Toaster } from 'react-hot-toast';

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
                    <Toaster 
                        position="top-center" 
                        toastOptions={{
                            style: {
                                background: 'rgba(26, 11, 29, 0.9)',
                                color: '#fff',
                                border: '1px solid rgba(255, 0, 127, 0.3)',
                                backdropFilter: 'blur(10px)'
                            },
                            success: {
                                iconTheme: {
                                    primary: '#00ff00',
                                    secondary: '#000',
                                }
                            }
                        }} 
                    />
                </AuthProvider>
            </body>
        </html>
    );
}
