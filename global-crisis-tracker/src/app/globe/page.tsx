'use client';
import React, { useEffect, useState } from 'react';
import GlobeComponent from '@/components/GlobeComponent';
import RightSidebar from '@/components/RightSidebar';
import LeftSidebar from '@/components/LeftSidebar';
import { fetchEarth, Earthquake } from '@/lib/fetchEarthquakes';
import { fetchWildfires, Wildfires } from '@/lib/fetchWildfires';
import { fetchAirQuality, AirQuality } from '@/lib/fetchAirQuality';

const GlobePage = () => {
  const [selectedHazard, setSelectedHazard] = useState<'earthquakes' | 'wildfires' | 'tsunamis' | 'tornados'>('earthquakes');

  const [earthquakeData, setEarthquakeData] = useState<Earthquake[]>([]);
  const [wildfireData, setWildfireData] = useState<Wildfires[]>([]);
  const [airQuality, setAirQuality] = useState<AirQuality | null>(null);

  const loadEarthquakes = () => fetchEarth().then(setEarthquakeData);
  const loadWildfires = () => fetchWildfires().then(setWildfireData);
  const loadAirQuality = () => fetchAirQuality(36.7783, -119.4179).then(setAirQuality);

  useEffect(() => {
    // Initial load
    loadEarthquakes();
    loadWildfires();
    loadAirQuality();
  }, []);

  useEffect(() => {
    if (selectedHazard === 'earthquakes') {
      loadEarthquakes();
    }
    if (selectedHazard === 'wildfires') {
      loadWildfires();
      loadAirQuality();
    }
  }, [selectedHazard]);

  return (
    <main className="flex h-screen w-screen overflow-hidden bg-black">
      <LeftSidebar selected={selectedHazard} setSelected={setSelectedHazard} />
      <div className="flex-1 flex justify-center items-center">
        <GlobeComponent
          selectedHazard={selectedHazard}
          earthquakeData={earthquakeData}
          wildfireData={wildfireData}
        />
      </div>
      <RightSidebar
        selectedHazard={selectedHazard}
        earthquakeData={earthquakeData}
        wildfireData={wildfireData}
        airQuality={airQuality}
      />
    </main>
  );
};

export default GlobePage;