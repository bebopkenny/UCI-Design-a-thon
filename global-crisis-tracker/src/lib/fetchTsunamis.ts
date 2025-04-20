export type TsunamiDeposit = {
    id: number;
    year: number;
    location: string;
    country: string;
    lat: number;
    lon: number;
    description: string;
  };
  
  export async function fetchTsunamis(): Promise<TsunamiDeposit[]> {
    try {
      const res = await fetch('https://www.ngdc.noaa.gov/hazel/hazard-service/api/v1/tsunamis/deposits');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
  
      const json = await res.json();
  
      const normalized: TsunamiDeposit[] = (json.items || []).map((item: any) => ({
        id: item.id,
        year: item.yearBegin ?? item.yearEnd ?? 0,
        location: item.locationName || 'Unknown',
        country: item.country || 'Unknown',
        lat: item.latitude,
        lon: item.longitude,
        description: item.description || 'No description available'
      }));
  
      return normalized;
    } catch (err) {
      console.error('[TSUNAMI API ERROR]', err);
      return [];
    }
  }
  