'use client'
import React, { useState, useEffect} from 'react'
import { Earthquake, fetchEarth } from '@/lib/fetchEarthquakes'


const RightSidebar = () => {
    const [currentStat, setCurrentStat] = useState(["Earthquake", "WildFires", "Tsunamis", "Tornados"]);
    const [quakeStatInfo, setQuakeStatInfo] = useState<Earthquake[]>([])

    useEffect(() => {
        fetchEarth().then((data) => {
            console.log('LOADED DATA: ', data)
            setQuakeStatInfo(data)
        })
        const interval = setInterval(() => {
            fetchEarth().then(setQuakeStatInfo)
        }, 60000)

        return () => clearInterval(interval)
    }, [])

  return (
    <aside className="w-[300px] h-screen bg-[#111827] text-white p-4 border-1 border-gray-700 overflow-y-auto">
        <h2 className="text-xl font-bold mb-2">Earthquake Stats</h2>
        <p className="mb-2 text-sm text-gray-300">Total Quakes: {quakeStatInfo.length}</p>
        <ul className="mt-4 space-y-2 text-sm">
            {currentStat.map((item) => (
                <li key={item} className="text-sm text-grey-300">{item} Statistics</li>
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
    </aside>
  )
}

export default RightSidebar