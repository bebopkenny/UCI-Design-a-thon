'use client'

import React, { useState, useEffect } from 'react'
import { Earthquake, fetchEarth } from '@/lib/fetchEarthquakes'
import { Wildfires, fetchWildfires } from '@/lib/fetchWildfires'
import { AirQuality, fetchAirQuality } from '@/lib/fetchAirQuality'

interface RightSidebarProps {
    selectedHazard: 'earthquakes' | 'wildfires' | 'tsunamis' | 'tornados'
    earthquakeData: Earthquake[]
    wildfireData: Wildfires[]
    airQuality: AirQuality | null
  }
  
const RightSidebar: React.FC<RightSidebarProps> = ({ selectedHazard }) => {
  const [currentStat, setCurrentStat] = useState(["Earthquake", "WildFires", "Tsunamis", "Tornados"]);
  const [quakeStatInfo, setQuakeStatInfo] = useState<Earthquake[]>([])
  const [wildfireResponse, setWildfireResponse] = useState<Wildfires[]>([])
  const [airQuality, setAirQuality] = useState<AirQuality | null>(null)

  useEffect(() => {
    if (selectedHazard === 'earthquakes') {
      fetchEarth()
        .then((data) => {
          console.log('LOADED EARTHQUAKE DATA: ', data)
          setQuakeStatInfo(data)
        })
        .catch((err) => {
          console.error('[EARTHQUAKE ERROR]', err)
        });
    }
  
    if (selectedHazard === 'wildfires') {
      fetchWildfires()
        .then((data) => {
          console.log('LOADED WILDFIRE DATA: ', data)
          setWildfireResponse(data)
        })
        .catch((err) => {
          console.error('[WILDFIRE ERROR]', err)
        });
  
      fetchAirQuality(36.7783, -119.4179)
        .then((data) => {
          console.log('LOADED AIR QUALITY DATA:', data)
          setAirQuality(data)
        })
        .catch((err) => {
          console.error('[AIR QUALITY ERROR]', err)
        });
    }
  }, [selectedHazard]);

  return (
    <aside className="w-[300px] h-screen bg-[#111827] text-white p-4 border-1 border-gray-700 overflow-y-auto">
      {selectedHazard === 'earthquakes' && (
        <>
          <h2 className="text-xl font-bold mb-2">Earthquake Stats</h2>
          <p className="mb-2 text-sm text-gray-300">Total Quakes: {quakeStatInfo.length}</p>
          <ul className="mt-4 space-y-2 text-sm">
            {currentStat.map((item) => (
              <li key={item} className="text-sm text-gray-300">{item} Statistics</li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold mt-6 mb-2">Recent Earthquakes</h3>
          <ul className="space-y-2">
            {quakeStatInfo.slice(0, 5).map((item) => (
              <li key={item.id}>
                <strong>Mag {item.properties.mag.toFixed(1)}</strong> - {item.properties.title}<br />
                Alert: {item.properties.alert || 'none'}<br />
                Review: {item.properties.status}
              </li>
            ))}
          </ul>
        </>
      )}

      {selectedHazard === 'wildfires' && (
        <>
          <h2 className="text-xl font-bold mb-2">Wildfire Stats</h2>
          <p className="mb-2 text-sm text-gray-300">Total Fires: {wildfireResponse.length}</p>
          <ul className="mt-4 space-y-2 text-sm">
            {wildfireResponse.slice(0, 5).map((fire, id) => (
              <li key={id}>
                Lat: {fire.latitude}, Lng: {fire.longitude}<br />
                Intensity: {fire.intensity}<br />
                Confidence: {fire.confidence}<br />
                Type: {fire.type}
              </li>
            ))}
          </ul>

          {airQuality && (
            <>
              <h2 className="text-xl font-bold mt-6 mb-2">Air Quality Stats</h2>
              <ul className="space-y-1 text-sm text-gray-300">
                <li><strong>AQI:</strong> {airQuality.aqi}</li>
                <li><strong>Category:</strong> {airQuality.category}</li>
                <li><strong>PM2.5:</strong> {airQuality.pm25} µg/m³</li>
                <li><strong>PM10:</strong> {airQuality.pm10} µg/m³</li>
                <li><strong>CO:</strong> {airQuality.co} ppm</li>
                <li><strong>SO₂:</strong> {airQuality.so2} ppm</li>
              </ul>
            </>
          )}
        </>
      )}
    </aside>
  )
}

export default RightSidebar;
