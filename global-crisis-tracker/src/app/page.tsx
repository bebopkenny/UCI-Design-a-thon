'use client';
import ParticlesBackground from '@/components/ParticlesBackground';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black">
      <ParticlesBackground />
      <div className="flex flex-col items-center justify-center text-white text-center h-screen px-4">
        <h1 className="text-4xl font-bold">Global Crisis Tracker</h1>
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <a href="/globe" className="bg-white text-black px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition">
            View Globe
          </a>
          <a href="#how-it-works" className="border border-white px-6 py-2 rounded-full text-sm font-semibold text-white hover:bg-white hover:text-black transition">
            How It Works
          </a>
          <a href="#resources" className="bg-transparent border border-white px-6 py-2 rounded-full text-sm font-semibold text-white hover:bg-white hover:text-black transition">
            Resources & Donate
          </a>
        </div>
      </div>
    </div>
  );
}
