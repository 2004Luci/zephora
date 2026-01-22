import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Get API key from environment (server-side only)
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

if (!OPENWEATHER_API_KEY) {
  console.error('ERROR: OPENWEATHER_API_KEY is not set in environment variables');
  process.exit(1);
}

const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const OPENWEATHER_GEO_URL = 'https://api.openweathermap.org/geo/1.0';

// Helper function to proxy requests to OpenWeatherMap
async function proxyRequest(url, res) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json(data);
    }
    
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Weather endpoints
app.get('/api/weather', async (req, res) => {
  const { lat, lon, units = 'metric' } = req.query;
  
  if (!lat || !lon) {
    return res.status(400).json({ error: 'lat and lon are required' });
  }
  
  const url = `${OPENWEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${OPENWEATHER_API_KEY}`;
  await proxyRequest(url, res);
});

app.get('/api/forecast', async (req, res) => {
  const { lat, lon, units = 'metric' } = req.query;
  
  if (!lat || !lon) {
    return res.status(400).json({ error: 'lat and lon are required' });
  }
  
  const url = `${OPENWEATHER_BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${OPENWEATHER_API_KEY}`;
  await proxyRequest(url, res);
});

// Geocoding endpoints
app.get('/api/geo/reverse', async (req, res) => {
  const { lat, lon, limit = 1 } = req.query;
  
  if (!lat || !lon) {
    return res.status(400).json({ error: 'lat and lon are required' });
  }
  
  const url = `${OPENWEATHER_GEO_URL}/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${OPENWEATHER_API_KEY}`;
  await proxyRequest(url, res);
});

app.get('/api/geo/direct', async (req, res) => {
  const { q, limit = 5 } = req.query;
  
  if (!q) {
    return res.status(400).json({ error: 'q (query) is required' });
  }
  
  const url = `${OPENWEATHER_GEO_URL}/direct?q=${encodeURIComponent(q)}&limit=${limit}&appid=${OPENWEATHER_API_KEY}`;
  await proxyRequest(url, res);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
