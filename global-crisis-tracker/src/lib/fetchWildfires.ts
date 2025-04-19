'use client'

const apiAmbeeKey = process.env.NEXT_PUBLIC_AMBEE_API_KEY;

export type Wildfires = {
    latitude: number;
    longitude: number;
    confidence: string;
    intensity: string;
    type: string;
};

export const fetchWildfires = async (
    lat: number, 
    lng: number
): Promise<Wildfires[]> => {
    const response = await fetch(
        `https://api.ambeedata.com/fire/latest/by-lat-lng?lat=${lat}&lng=${lng}`,
        {
            method: 'GET',
            headers: {
                'x-api-key': apiAmbeeKey!,
                'Content-type': 'application/json',
            },
        }
    );

    if (!response.ok) {
        console.log('[WILDFIRE API ERROR', await response.text());
        throw new Error('Failed to fetch wildfires data');
    }

    const data = await response.json();
    
    return data.data || [];
};


