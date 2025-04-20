'use client';
import React from 'react';
import { Earthquake } from '@/lib/fetchEarthquakes';
import { Wildfires } from '@/lib/fetchWildfires';
import { AirQuality } from '@/lib/fetchAirQuality';
import { TsunamiDeposit } from '@/lib/fetchTsunamis';
import { TornadoWarning } from '@/lib/fetchTornados';

interface RightSidebarProps {
  selectedHazard: 'earthquakes' | 'wildfires' | 'tsunamis' | 'tornados';
  earthquakeData: Earthquake[];
  wildfireData: Wildfires[];
  tsunamiData: TsunamiDeposit[];
  tornadoData: TornadoWarning[];
  airQuality: AirQuality | null;
}

const RightSidebar: React.FC<RightSidebarProps> = ({
  selectedHazard,
  earthquakeData,
  wildfireData,
  tsunamiData,
  airQuality,
  tornadoData
}) => {
  return (
    <aside className="w-[300px] h-screen bg-transparent text-white p-6 overflow-y-auto font-[var(--font-geist-sans)]">
      {selectedHazard === 'earthquakes' && (
        <>
          <h2 className="text-xl font-bold mb-2">Earthquake Stats</h2>
          <p className="text-sm">Total Quakes: {earthquakeData.length}</p>
          <h3 className="mt-6 font-semibold">Recent Earthquakes</h3>
          <ul className="text-sm space-y-2 mt-2">
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
          <p className="text-sm">Total Fires: {wildfireData.length}</p>
          <ul className="text-sm space-y-2 mt-2">
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
              <h2 className="mt-6 text-xl font-bold">Air Quality Stats</h2>
              <ul className="text-sm space-y-1 mt-2">
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
          <p className="text-sm">Total Deposits: {tsunamiData.length}</p>
          <h3 className="mt-6 font-semibold">Recent Tsunami Deposits</h3>
          <ul className="space-y-2 text-sm mt-2">
            {tsunamiData.slice(0, 5).map((tsunami, idx) => (
              <li key={idx}>
                <strong>{tsunami.location}, {tsunami.country}</strong><br />
                Year: {tsunami.year > 0 ? tsunami.year : 'Unknown'}<br />
                Lat: {tsunami.lat}, Lon: {tsunami.lon}<br />
                Desc: {tsunami.description.slice(0, 80)}...
              </li>
            ))}
          </ul>
        </>
      )}
      {selectedHazard === 'tornados' && (
        <>
          <h2 className="text-xl font-bold mb-2">Tornado Stats</h2>
          <p>Total Warnings: {tornadoData.length}</p>
          <h3 className="mt-6 font-semibold">Active Warnings</h3>
          <ul className="text-sm space-y-2 mt-2">
            {tornadoData.slice(0, 5).map((tornado) => (
              <li key={tornado.id}>
                <strong>{tornado.properties.event}</strong><br />
                Severity: {tornado.properties.severity}<br />
                Location: {tornado.properties.headline}<br />
                Effective: {new Date(tornado.properties.effective).toLocaleString()}<br />
                Expires: {new Date(tornado.properties.expires).toLocaleString()}
              </li>
            ))}
          </ul>
        </>
      )}
    </aside>
  );
};

export default RightSidebar;