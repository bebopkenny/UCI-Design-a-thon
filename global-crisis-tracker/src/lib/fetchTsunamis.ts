export type TsunamiRunup = {
    id: number;
    lat: number;
    lon: number;
    locationName: string;
    country: string;
    maxHeight: number | null;
    cause: string;
    eventDate: string;
  };
  
  export async function fetchTsunamis(): Promise<TsunamiRunup[]> {
    const url = 'https://www.ngdc.noaa.gov/hazard-service/api/v1/tsunamis/runups';
  
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
  
      const json = await res.json();

      const normalized: TsunamiRunup[] = (json.data || []).map((item: any) => ({
        id: item.id,
        lat: item.latitude,
        lon: item.longitude,
        locationName: item.locationName,
        country: item.country,
        maxHeight: item.maxWaterHeight ?? null,
        cause: item.causeName,
        eventDate: item.year ? `${item.year}-${item.month || '??'}-${item.day || '??'}` : 'Unknown',
      }));

      console.log('[TSUNAMI DATA]', normalized)
  
      return normalized;
    } catch (err) {
      console.error('[TSUNAMI API ERROR]', err);
      return [];
    }
  }