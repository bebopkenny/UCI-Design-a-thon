'use client'
import React, { useState, useEffect} from 'react'
import { Earthquake, fetchEarth } from '@/lib/fetchEarthquakes'
import { Wildfires, fetchWildfires } from '@/lib/fetchWildfires'

interface RightSidebarProps {
    selectedHazard:  'earthquakes' | 'wildfires' | 'tsunamis' | 'tornados';
}

const RightSidebar: React.FC<RightSidebarProps> = ({ selectedHazard }) => {
    const [currentStat, setCurrentStat] = useState(["Earthquake", "WildFires", "Tsunamis", "Tornados"]);


    // Wildfire Section
    const [wildfireResponse, setWildfireResponse] = useState<Wildfires[]>([])


    // Earthquake Section
    const [quakeStatInfo, setQuakeStatInfo] = useState<Earthquake[]>([])

    useEffect(() => {
        if (selectedHazard === 'earthquakes') {
            fetchEarth().then((data) => {
                console.log('LOADED EARTHQUAKE DATA: ', data)
                setQuakeStatInfo(data)
            })
            const interval = setInterval(() => {
                fetchEarth().then(setQuakeStatInfo)
            }, 60000)
            return () => clearInterval(interval)
        } else if (selectedHazard === 'wildfires') {
            // Temp Cali
            fetchWildfires().then((data) => {
                console.log('LOADED WILDFIRE DATA: ', data)
                setWildfireResponse(data)
              })
              const interval = setInterval(() => {
                fetchWildfires().then(setWildfireResponse)
              }, 60000)              
            return () => clearInterval(interval)
        }
    }, [selectedHazard])

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
        </>
      )}
    </aside>
  )
}

export default RightSidebar