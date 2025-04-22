'use client';
import React from 'react';
import { Earthquake } from '@/lib/fetchEarthquakes';
import { Wildfires } from '@/lib/fetchWildfires';
import { AirQuality } from '@/lib/fetchAirQuality';
import { TsunamiDeposit } from '@/lib/fetchTsunamis';
import { TornadoWarning } from '@/lib/fetchTornados';
import { FloodWarning } from '@/lib/fetchFloods';

interface RightSidebarProps {
  selectedHazard: 'earthquakes' | 'wildfires' | 'tsunamis' | 'tornados' | 'floods';
  earthquakeData: Earthquake[];
  wildfireData: Wildfires[];
  tsunamiData: TsunamiDeposit[];
  tornadoData: TornadoWarning[];
  airQuality: AirQuality | null;
  floodData: FloodWarning[];
}

const RightSidebar: React.FC<RightSidebarProps> = ({
  selectedHazard,
  earthquakeData,
  wildfireData,
  tsunamiData,
  airQuality,
  tornadoData,
  floodData
}) => {
  return (
    <aside className="w-[300px] h-screen bg-black bg-opacity-60 text-white p-6 overflow-y-auto border-l border-white font-sans">
      {selectedHazard === 'earthquakes' && (
        <>
          <h2 className="text-xl font-bold mb-2">Earthquake Stats</h2>
          <p>Total Quakes: {earthquakeData.length}</p>
          <h3 className="mt-6 font-semibold">Recent Earthquakes</h3>
          <ul className="space-y-2 text-sm">
            {earthquakeData.slice(0, 5).map((item) => (
              <li key={item.id} className="text-gray-300">
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
          <ul className="space-y-2 text-sm">
            {wildfireData.slice(0, 5).map((fire, idx) => (
              <li key={idx} className="text-gray-300">
                Lat: {fire.latitude}, Lng: {fire.longitude}<br />
                Intensity: {fire.intensity}, Confidence: {fire.confidence}<br />
                Type: {fire.type}
              </li>
            ))}
          </ul>

          {airQuality && (
            <>
              <h2 className="mt-6 text-xl font-bold">Air Quality</h2>
              <ul className="space-y-1 text-sm text-gray-300">
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
          <h3 className="mt-6 font-semibold">Recent Tsunami Deposits</h3>
          <ul className="space-y-2 text-sm text-gray-300">
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

      {selectedHazard === 'floods' && (
        <>
          <h2 className="text-xl font-bold mb-2">Flood Stats</h2>
          <p>Total Warnings: {floodData.length}</p>
          <h3>Active Warnings</h3>
          <ul className="text-sm space-y-2 mt-2">
            {floodData.map((flood) => (
              <li key={flood.id}>
                <strong>{flood.geometry.coordinates}</strong><br/>
                Event: {flood.properties.event}

              </li>
            ))}
          </ul>
        </>
      )}
    </aside>
  );
};

export default RightSidebar;