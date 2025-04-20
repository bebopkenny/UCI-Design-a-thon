export interface TornadoWarning {
    id: string;
    areaDesc: string;
    effective: string;
    expires: string;
    headline: string;
    description: string;
    coordinates: [number, number] | null; // [lng, lat]
  }
  
  export async function fetchTornados(): Promise<TornadoWarning[]> {
    try {
      const res = await fetch('https://api.weather.gov/alerts/active?event=Tornado Warning');
      const json = await res.json();
  
      return json.features.map((feature: any) => {
        const coords = feature.geometry?.coordinates?.[0]?.[0]; // Handle Polygon geometry
        return {
          id: feature.id,
          areaDesc: feature.properties.areaDesc,
          effective: feature.properties.effective,
          expires: feature.properties.expires,
          headline: feature.properties.headline,
          description: feature.properties.description,
          coordinates: coords && coords.length === 2 ? coords : null // Ensure [lng, lat] pair
        };
      }).filter((entry: TornadoWarning) => entry.coordinates !== null);
  
    } catch (error) {
      console.error('Failed to fetch tornado warnings:', error);
      return [];
    }
  }