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
  const [airQuality, setAirQuality] = useState<AirQuality | null>(null);
  const [tornadoData, setTornadoData] = useState<TornadoWarning[]>([]);

  const loadEarthquakes = () => fetchEarth().then(setEarthquakeData);
  const loadWildfires = () => fetchWildfires().then(setWildfireData);
  const loadTsunamis = () => fetchTsunamis().then(setTsunamiData);
  const loadTornados = () => fetchTornados().then(setTornadoData);
  const loadAirQuality = () => fetchAirQuality(36.7783, -119.4179).then(setAirQuality);

  useEffect(() => {
    loadEarthquakes();
    loadWildfires();
    loadAirQuality();
    loadTsunamis();
    loadTornados();
  }, []);

  useEffect(() => {
    if (selectedHazard === 'earthquakes') {
      loadEarthquakes();
    } else if (selectedHazard === 'wildfires') {
      loadWildfires();
      loadAirQuality();
    } else if (selectedHazard === 'tsunamis') {
      loadTsunamis();
    }
      else if (selectedHazard === 'tornados') {
        loadTornados();
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
          tsunamiData={tsunamiData}
          tornadoData={tornadoData}
        />
      </div>
      <RightSidebar
        selectedHazard={selectedHazard}
        earthquakeData={earthquakeData}
        wildfireData={wildfireData}
        tsunamiData={tsunamiData}
        airQuality={airQuality}
        tornadoData={tornadoData}
      />
    </main>
  );
};

export default GlobePage;