'use client'
import Globe from 'react-globe.gl'
import React from 'react'
import { Earthquake } from '@/lib/fetchEarthquakes'
import { Wildfires } from '@/lib/fetchWildfires'
import { TsunamiDeposit } from '@/lib/fetchTsunamis'

interface GlobeComponentProps {
  selectedHazard: 'earthquakes' | 'wildfires' | 'tsunamis' | 'tornados';
  wildfireData: Wildfires[];
  earthquakeData: Earthquake[];
  tsunamiData: TsunamiDeposit[];
}

interface TsunamiArc {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  label: string;
  color: [string, string];
}

const GlobeComponent: React.FC<GlobeComponentProps> = ({
  selectedHazard,
  wildfireData,
  earthquakeData,
  tsunamiData
}) => {
  // Format tsunami arcs
  const tsunamiArcs: TsunamiArc[] = tsunamiData.map(t => ({
    startLat: t.lat,
    startLng: t.lon,
    endLat: 0, // dummy center point
    endLng: 0,
    label: `${t.location}, ${t.country} (${t.year})`,
    color: ['#00ffff', '#0077ff']
  }));

  return (
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
      ringMaxRadius={(d) => (d as Earthquake).properties.mag * 2.5} 
      ringPropagationSpeed={0.8} 
      ringRepeatPeriod={1500} 

      // Wildfires (paths)
      pathsData={selectedHazard === 'wildfires' ? wildfireData.map(fire => ({
        name: `Wildfire | Intensity: ${fire.intensity}`,
        coordinates: [
          [fire.latitude, fire.longitude],
          [fire.latitude + 1.0, fire.longitude + 1.0]
        ]
      })) : []}
      pathPoints={(d: any) => d.coordinates}
      pathPointLat={(coord: number[]) => coord[0]}
      pathPointLng={(coord: number[]) => coord[1]}
      pathLabel={(d: any) => d.name}
      pathStroke={1.5}
      pathColor={() => '#ff4500'}
      pathDashAnimateTime={2000}

      // Tsunami Arcs
      arcsData={selectedHazard === 'tsunamis' ? tsunamiArcs : []}
      arcLabel={(d: object) => (d as TsunamiArc).label}
      arcStartLat={(d: object) => (d as TsunamiArc).startLat}
      arcStartLng={(d: object) => (d as TsunamiArc).startLng}
      arcEndLat={(d: object) => (d as TsunamiArc).endLat}
      arcEndLng={(d: object) => (d as TsunamiArc).endLng}
      arcColor={(d: object) => (d as TsunamiArc).color}
      arcDashLength={0.4}
      arcDashGap={0.2}
      arcDashAnimateTime={6000}
      arcAltitudeAutoScale={0.25}
    />
  )
}

export default GlobeComponent
