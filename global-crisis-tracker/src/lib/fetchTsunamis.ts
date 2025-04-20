export type TsunamiDeposit = {
    id: number;
    location: string;
    country: string;
    lat: number;
    lon: number;
    year: number;
    description: string;
  };
  
  export async function fetchTsunamis(): Promise<TsunamiDeposit[]> {
    const url = 'https://www.ngdc.noaa.gov/hazel/hazard-service/api/v1/tsunamis/deposits';
  
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
  
      const json = await res.json();
  
      const normalized: TsunamiDeposit[] = (json.items || []).map((item: any) => ({
        id: item.id,
        location: item.locationName,
        country: item.country,
        lat: item.latitude,
        lon: item.longitude,
        year: parseInt(item.yearBegin || item.year || '0', 10),
        description: item.description || 'No description',
      }));
  
      console.log('[TSUNAMI DEPOSITS]', normalized);
      return normalized;
    } catch (err) {
      console.error('[TSUNAMI API ERROR]', err);
      return [];
    }
  }  