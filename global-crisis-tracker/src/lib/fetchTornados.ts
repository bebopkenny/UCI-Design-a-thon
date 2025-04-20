export interface TornadoWarning {
  id: string;
  geometry: {
    coordinates: [number, number]; // [lng, lat]
  };
  properties: {
    event: string;
    severity: string;
    certainty: string;
    urgency: string;
    headline: string;
    description: string;
    effective: string;
    expires: string;
    areaDesc: string;
  };
}

export async function fetchTornados(): Promise<TornadoWarning[]> {
  const url = 'https://api.weather.gov/alerts?event=Tornado%20Warning&status=actual&message_type=alert,update,cancel';

  const response = await fetch(url, {
    headers: {
      'Accept': 'application/geo+json',
      'User-Agent': '(kennygarcia.net, kennygarcia15@csu.fullerton.edu)' 
    }
  });

  if (!response.ok) {
    console.error(`HTTP error! status: ${response.status}`);
    return [];
  }

  const data = await response.json();

  if (!data.features || !Array.isArray(data.features)) {
    console.error('Invalid tornado data structure:', data);
    return [];
  }

  const warnings = data.features.map((feature: any) => {
    let coordinates: [number, number] = [0, 0];

    if (feature.geometry && feature.geometry.coordinates && feature.geometry.coordinates.length) {
      const geom = feature.geometry.coordinates;

      if (Array.isArray(geom[0][0])) {
        coordinates = [geom[0][0][0], geom[0][0][1]];
      } else if (Array.isArray(geom[0])) {
        coordinates = [geom[0][0], geom[0][1]];
      }
    }

    return {
      id: feature.id,
      geometry: { coordinates },
      properties: feature.properties,
    };
  });

  return warnings;
}
