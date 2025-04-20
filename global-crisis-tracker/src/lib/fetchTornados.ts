export interface TornadoWarning {
    id: string;
    areaDesc: string;
    effective: string;
    expires: string;
    headline: string;
    description: string;
    coordinates: [number, number] | null;
  }
  
  export async function fetchTornados(): Promise<TornadoWarning[]> {
    const res = await fetch('https://api.weather.gov/alerts/active?event=Tornado Warning');
    const json = await res.json();
  
    return json.features.map((feature: any) => ({
      id: feature.id,
      areaDesc: feature.properties.areaDesc,
      effective: feature.properties.effective,
      expires: feature.properties.expires,
      headline: feature.properties.headline,
      description: feature.properties.description,
      coordinates: feature.geometry?.coordinates?.[0]?.[0] || null  // Some alerts have polygons
    }));
  }