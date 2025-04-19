'use client'
import Globe from 'react-globe.gl'
import React, { useEffect, useState } from 'react'
import { fetchEarth, Earthquake } from '@/lib/fetchEarthquakes'
import { Wildfires } from '@/lib/fetchWildfires'

interface GlobeComponentProps {
  selectedHazard: 'earthquakes' | 'wildfires' | 'tsunamis' | 'tornados';
  wildfireData: Wildfires[];
  earthquakeData: Earthquake[];
}

const GlobeComponent: React.FC<GlobeComponentProps> = ({ selectedHazard, wildfireData, earthquakeData }) => {

  return (
    <>
      <Globe
        key={selectedHazard}
        height={900}
        width={700}
        backgroundColor='rgba(0,0,0,0)'
        showAtmosphere
        showGraticules
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"

        // Earthquakes (rings)
        ringsData={selectedHazard === 'earthquakes' ? earthquakeData : []}
        ringLat={(d) => (d as Earthquake).geometry.coordinates[1]}
        ringLng={(d) => (d as Earthquake).geometry.coordinates[0]}
        ringAltitude={0}
        ringColor={() => (t: number) => `rgba(255,100,50,${Math.sqrt(1 - t)})`}
        ringMaxRadius={(d) => (d as Earthquake).properties.mag * 5}
        ringPropagationSpeed={1}
        ringRepeatPeriod={700}

        // Wildfires (paths)
        pathsData={selectedHazard === 'wildfires' ? wildfireData.map(fire => ({
          name: `Wildfire | Intensity: ${fire.intensity}`,
          coordinates: [
            [fire.latitude, fire.longitude],
            [fire.latitude + 1.0, fire.longitude + 1.0] // Extend to make more visible
          ]
        })) : []}
        pathPoints={(d: any) => d.coordinates}
        pathPointLat={(coord: number[]) => coord[0]}
        pathPointLng={(coord: number[]) => coord[1]}
        pathLabel={(d: any) => d.name}
        pathStroke={1.5} // Thicker for visibility
        pathColor={() => '#ff4500'}
        pathDashAnimateTime={2000}
      />
    </>
  )
}

export default GlobeComponent