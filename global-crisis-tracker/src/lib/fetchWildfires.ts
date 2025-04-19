export type Wildfires = {
    latitude: number;
    longitude: number;
    confidence: string;
    intensity: string;  // FWI
    type: string;       // fireType
};

export const fetchWildfires = async (): Promise<Wildfires[]> => {
    const response = await fetch(`/api/wildfires`);
  
    if (!response.ok) {
      const err = await response.text();
      console.log('[WILDFIRE API ERROR]', err);
      throw new Error('Failed to fetch wildfires data');
    }
  
    return await response.json();
  };
  