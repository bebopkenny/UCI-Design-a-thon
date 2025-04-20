'use client';

import React from 'react';
import ParticlesBackground from '@/components/ParticlesBackground';

export default function Home() {
  return (
    <>
      <ParticlesBackground />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col gap-4 items-center mt-48">
        <h1 className="text-white text-4xl font-bold text-center">Global Crisis Tracker</h1>
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/globe"
            className="bg-white text-black px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition"
          >
            View Globe
          </a>
          <a
            href="#how-it-works"
            className="border border-white px-6 py-2 rounded-full text-sm font-semibold text-white hover:bg-white hover:text-black transition"
          >
            How It Works
          </a>
          <a
            href="#resources"
            className="bg-transparent border border-white px-6 py-2 rounded-full text-sm font-semibold text-white hover:bg-white hover:text-black transition"
          >
            Resources & Donate
          </a>
        </div>
      </div>
    </>
  );
}
