const OPENWEATHER_GEO_URL = 'https://api.openweathermap.org/geo/1.0';

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { q, limit = 5 } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'q (query) is required' });
  }

  // Check for API key (also check VITE_ prefix for compatibility)
  const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || process.env.VITE_OPENWEATHER_API_KEY;

  if (!OPENWEATHER_API_KEY) {
    console.error('ERROR: OPENWEATHER_API_KEY is not set in Vercel environment variables');
    return res.status(500).json({ 
      error: 'Server configuration error',
      message: 'OPENWEATHER_API_KEY environment variable is not set. Please add it in Vercel Dashboard → Settings → Environment Variables'
    });
  }

  try {
    const url = `${OPENWEATHER_GEO_URL}/direct?q=${encodeURIComponent(q)}&limit=${limit}&appid=${OPENWEATHER_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error('Direct geocode API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
