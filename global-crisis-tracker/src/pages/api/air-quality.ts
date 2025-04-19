import type { NextApiRequest, NextApiResponse } from 'next';

const AMBEE_API_KEY = process.env.NEXT_PUBLIC_AMBEE_API_KEY!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: 'Missing lat/lng' });
  }

  try {
    const response = await fetch(
      `https://api.ambeedata.com/latest/by-lat-lng?lat=${lat}&lng=${lng}`,
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
    const stats = data.stations[0];

    res.status(200).json({
      aqi: stats.aqi,
      category: stats.category,
      pm25: stats.pm2_5,
      pm10: stats.pm10,
      co: stats.co,
      so2: stats.so2,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
}