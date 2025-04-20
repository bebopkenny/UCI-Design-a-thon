export type AirQuality = {
    aqi: number;
    category: string;
    pm25: number;
    pm10: number;
    co: number;
    so2: number;
  }

export const fetchAirQuality = async (
    lat: number,
    lng: number
  ): Promise<AirQuality> => {
    const res = await fetch(`/api/air-quality?lat=${lat}&lng=${lng}`)
  
    if (!res.ok) {
      const err = await res.text()
      console.error('[AIR QUALITY ERROR]', err)
      throw new Error('Failed to fetch air quality')
    }
  
    return await res.json()
  }