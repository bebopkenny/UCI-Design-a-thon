'use client';
import React from 'react';
import { Earthquake } from '@/lib/fetchEarthquakes';
import { Wildfires } from '@/lib/fetchWildfires';
import { AirQuality } from '@/lib/fetchAirQuality';
import { TsunamiDeposit } from '@/lib/fetchTsunamis';

interface RightSidebarProps {
  selectedHazard: 'earthquakes' | 'wildfires' | 'tsunamis' | 'tornados';
  earthquakeData: Earthquake[];
  wildfireData: Wildfires[];
  tsunamiData: TsunamiDeposit[];
  airQuality: AirQuality | null;
}

const RightSidebar: React.FC<RightSidebarProps> = ({
  selectedHazard,
  earthquakeData,
  wildfireData,
  airQuality,
  tsunamiData
}) => {
  return (
    <aside className="w-[300px] h-screen bg-[#111827] text-white p-4 overflow-y-auto">
      {selectedHazard === 'earthquakes' && (
        <>
          <h2 className="text-xl font-bold mb-2">Earthquake Stats</h2>
          <p>Total Quakes: {earthquakeData.length}</p>
          <h3 className="mt-6">Recent Earthquakes</h3>
          <ul>
            {earthquakeData.slice(0, 5).map((item) => (
              <li key={item.id}>
                <strong>Mag {item.properties.mag.toFixed(1)}</strong> - {item.properties.title}<br />
                Alert: {item.properties.alert || 'none'}<br />
                Status: {item.properties.status}
              </li>
            ))}
          </ul>
        </>
      )}

      {selectedHazard === 'wildfires' && (
        <>
          <h2 className="text-xl font-bold mb-2">Wildfire Stats</h2>
          <p>Total Fires: {wildfireData.length}</p>
          <ul>
            {wildfireData.slice(0, 5).map((fire, idx) => (
              <li key={idx}>
                Lat: {fire.latitude}, Lng: {fire.longitude}<br />
                Intensity: {fire.intensity}, Confidence: {fire.confidence}<br />
                Type: {fire.type}
              </li>
            ))}
          </ul>

          {airQuality && (
            <>
              <h2 className="mt-6">Air Quality Stats</h2>
              <ul>
                <li>AQI: {airQuality.aqi}</li>
                <li>Category: {airQuality.category}</li>
                <li>PM2.5: {airQuality.pm25} µg/m³</li>
                <li>PM10: {airQuality.pm10} µg/m³</li>
                <li>CO: {airQuality.co} ppm</li>
                <li>SO₂: {airQuality.so2} ppm</li>
              </ul>
            </>
          )}
        </>
      )}

      {selectedHazard === 'tsunamis' && (
        <>
            <h2 className="text-xl font-bold mb-2">Tsunami Stats</h2>
            <p>Total Deposits: {tsunamiData.length}</p>
            <h3 className="mt-6">Recent Tsunami Deposits</h3>
            <ul className="space-y-2 text-sm">
            {tsunamiData.slice(0, 5).map((tsunami) => (
                <li key={tsunami.id}>
                <strong>{tsunami.location}, {tsunami.country}</strong><br />
                Year: {tsunami.year}<br />
                Lat: {tsunami.lat}, Lon: {tsunami.lon}<br />
                Desc: {tsunami.description.length > 80
                    ? tsunami.description.slice(0, 80) + '...'
                    : tsunami.description}
                </li>
            ))}
            </ul>
        </>
      )}
    </aside>
  );
};

export default RightSidebar;