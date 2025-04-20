'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'
const GlobeComponent = dynamic(() => import('@/components/GlobeComponent'), { ssr: false });
import RightSidebar from '@/components/RightSidebar';
import LeftSidebar from '@/components/LeftSidebar';
import { fetchEarth, Earthquake } from '@/lib/fetchEarthquakes';
import { fetchWildfires, Wildfires } from '@/lib/fetchWildfires';
import { fetchAirQuality, AirQuality } from '@/lib/fetchAirQuality';
import { fetchTsunamis, TsunamiDeposit } from '@/lib/fetchTsunamis';
import { fetchTornados, TornadoWarning } from '@/lib/fetchTornados';

const GlobePage = () => {
  const [selectedHazard, setSelectedHazard] = useState<'earthquakes' | 'wildfires' | 'tsunamis' | 'tornados'>('earthquakes');

  const [earthquakeData, setEarthquakeData] = useState<Earthquake[]>([]);
  const [wildfireData, setWildfireData] = useState<Wildfires[]>([]);
  const [tsunamiData, setTsunamiData] = useState<TsunamiDeposit[]>([]);
  const [tornadoData, setTornadoData] = useState<TornadoWarning[]>([]);
  const [airQuality, setAirQuality] = useState<AirQuality | null>(null);

  useEffect(() => {
    fetchEarth().then(setEarthquakeData);
    fetchWildfires().then(setWildfireData);
    fetchAirQuality(36.7783, -119.4179).then(setAirQuality);
    fetchTsunamis().then(setTsunamiData);
    fetchTornados().then(setTornadoData);
  }, []);

  useEffect(() => {
    if (selectedHazard === 'earthquakes') fetchEarth().then(setEarthquakeData);
    if (selectedHazard === 'wildfires') fetchWildfires().then(setWildfireData);
    if (selectedHazard === 'tsunamis') fetchTsunamis().then(setTsunamiData);
    if (selectedHazard === 'tornados') fetchTornados().then(setTornadoData);
  }, [selectedHazard]);

  return (
    <main className="flex h-screen w-screen overflow-hidden bg-black">
      <LeftSidebar selected={selectedHazard} setSelected={setSelectedHazard} />
      <div className="flex-1 flex justify-center items-center">
        <GlobeComponent
          selectedHazard={selectedHazard}
          earthquakeData={earthquakeData}
          wildfireData={wildfireData}
          tsunamiData={tsunamiData}
          tornadoData={tornadoData}
        />
      </div>
      <RightSidebar
        selectedHazard={selectedHazard}
        earthquakeData={earthquakeData}
        wildfireData={wildfireData}
        tsunamiData={tsunamiData}
        tornadoData={tornadoData}
        airQuality={airQuality}
      />
    </main>
  );
};

export default GlobePage;
