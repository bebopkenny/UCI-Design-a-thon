export type Earthquake ={
    id: string; 
    geometry: {
        coordinates: [number, number, number];
    };

    properties: {
        mag: number; 
        title: string; 
        time: number;
        alert?: 'green' | 'yellow' | 'orange' | 'red';
        status: 'automatic' | 'reviewed';
    }
}

export async function fetchEarth(): Promise<Earthquake[]> {
    const BASE_URL = 'https://earthquake.usgs.gov/fdsnws/event/1/query'

    const today = new Date().toISOString().split('T')[0]

    const url = `${BASE_URL}?format=geojson&starttime=${today}&minmagnitude=2.5&orderby=time`

    const res = await fetch(url)
    const data = await res.json()

    return data.features
}

