'use client';
import React, { useState } from 'react';
import ParticlesBackground from '@/components/ParticlesBackground';
import EarthModel from '@/components/EarthModel';

export default function Home() {
  const [view, setView] = useState<'main' | 'how' | 'resources'>('main');

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full z-[-10]">
        <EarthModel />
      </div>

      <ParticlesBackground />
      <div
        className={`absolute top-0 left-0 w-full h-full flex flex-col gap-4 items-center justify-center transition-opacity duration-500 ${
          view === 'main' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <h1 className="text-white text-4xl font-bold text-center">Global Hazard Tracker</h1>
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/globe"
            className="bg-white text-black px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition"
          >
            View Globe
          </a>
          <button
            onClick={() => setView('how')}
            className="border border-white px-6 py-2 rounded-full text-sm font-semibold text-white hover:bg-white hover:text-black transition"
          >
            How It Works
          </button>
          <button
            onClick={() => setView('resources')}
            className="bg-transparent border border-white px-6 py-2 rounded-full text-sm font-semibold text-white hover:bg-white hover:text-black transition"
          >
            Resources & Donate
          </button>
        </div>
      </div>

      <div
        className={`absolute top-0 left-0 w-full h-full flex flex-col gap-6 items-center justify-center text-white text-center px-6 transition-opacity duration-500 ${
          view === 'how' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <h2 className="text-3xl font-bold">How It Works</h2>
        <p className="max-w-xl text-lg text-gray-300">
          This tool pulls real-time disaster data (earthquakes, wildfires, tsunamis, etc.) from trusted APIs and visualizes them on a 3D globe. 
          It's built for awareness, education, and action.
        </p>
        <button
          onClick={() => setView('main')}
          className="mt-4 border border-white px-6 py-2 rounded-full text-sm font-semibold text-white hover:bg-white hover:text-black transition"
        >
          Back to Main
        </button>
      </div>

      <div
        className={`absolute top-0 left-0 w-full h-full flex flex-col gap-6 items-center justify-center text-white text-center px-6 transition-opacity duration-500 ${
          view === 'resources' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <h2 className="text-3xl font-bold">Resources & Donate</h2>
        <p className="max-w-xl text-lg text-gray-300">
          Visit organizations like the Red Cross, World Central Kitchen, or GlobalGiving to donate. We also recommend the National Weather Service and USGS for accurate disaster preparedness.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
        <a
          href="https://www.redcross.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-300"
        >
          Red Cross
        </a>
        <a
          href="https://www.unicef.org/emergencies"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-300"
        >
          UNICEF
        </a>
        <a
          href="https://www.directrelief.org/emergency/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-300"
        >
          Direct Relief
        </a>
      </div>
        <button
          onClick={() => setView('main')}
          className="mt-4 border border-white px-6 py-2 rounded-full text-sm font-semibold text-white hover:bg-white hover:text-black transition"
        >
          Back to Main
        </button>
      </div>
    </>
  );
}