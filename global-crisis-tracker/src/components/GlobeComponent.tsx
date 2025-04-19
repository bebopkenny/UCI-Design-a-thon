'use client'
import Globe from 'react-globe.gl'
import React, { useEffect, useState } from 'react'
import { fetchEarth, Earthquake } from '@/lib/fetchEarthquakes'

const GlobeComponent = () => {
    const [quakeData, setQuakeData] = useState<Earthquake[]>([])

    useEffect(() => {
        // Fetch once on load
        fetchEarth().then((data) => {
          console.log('[QUAKE DATA]', data)
          console.log("hello")
          setQuakeData(data)
        })
    
        // Auto-refresh every 60 seconds
        const interval = setInterval(() => {
          fetchEarth().then(setQuakeData)
        }, 60000)
    
        return () => clearInterval(interval)
      }, [])

  return (
    <>
        <Globe
            height={900}
            width={700}
            backgroundColor='rgba(0,0,0,0)'
            // backgroundImageOpacity={0.5}
            showAtmosphere
            showGraticules
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            pointsData={quakeData}
            pointLat={d => (d as Earthquake).geometry.coordinates[1]}
            pointLng={d => (d as Earthquake).geometry.coordinates[0]}
            pointAltitude={d => (d as Earthquake).properties.mag * 0.09}
            pointColor={() => 'red'}
            pointRadius={0.3}
            pointLabel={d => `${(d as Earthquake).properties.title} (Mag ${(d as Earthquake).properties.mag})`}
        />
    </>
  )
}

export default GlobeComponent