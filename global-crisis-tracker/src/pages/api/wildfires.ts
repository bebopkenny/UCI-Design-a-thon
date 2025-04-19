import type { NextApiRequest, NextApiResponse } from 'next';

const AMBEE_API_KEY = process.env.NEXT_PUBLIC_AMBEE_API_KEY!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      const response = await fetch(
        'https://api.ambeedata.com/fire/latest/by-place?place=earth',
        {
          method: 'GET',
          headers: {
            'x-api-key': AMBEE_API_KEY,
            'Content-type': 'application/json',
          },
        }
      );
  
      if (!response.ok) {
        const errorText = await response.text();
        return res.status(500).json({ error: errorText });
      }
  
      const data = await response.json();
  
      const normalized = (data.data || []).map((item: any) => ({
        latitude: item.lat,
        longitude: item.lng,
        confidence: item.confidence,
        intensity: item.fwi.toFixed(2),
        type: item.fireType,
      }));
  
      res.status(200).json(normalized);
    } catch (err) {
      res.status(500).json({ error: 'Server Error' });
    }
  }
  