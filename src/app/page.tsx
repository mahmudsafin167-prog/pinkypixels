import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import About from '@/components/About';
import CoreValues from '@/components/CoreValues';
import Activities from '@/components/Activities';
import Join from '@/components/Join';
import Social from '@/components/Social';
import AOSInit from '@/components/AOSInit';

export default function Home() {
    return (
        <main className="flex flex-col min-h-screen bg-[#0f0c19]">
            <AOSInit />
            <Hero />
            <Stats />
            <About />
            <CoreValues />
            <Activities />
            <Join />
            <Social />
        </main>
    );
}
