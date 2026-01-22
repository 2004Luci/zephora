// Backend proxy URL - API key is now hidden server-side
// In production (Vercel), use relative paths. In development, use localhost server
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.PROD ? '/api' : 'http://localhost:3001/api');

export const API_CONFIG = {
    BASE_URL: `${API_BASE_URL}`,
    WEATHER: `${API_BASE_URL}/weather`,
    FORECAST: `${API_BASE_URL}/forecast`,
    GEO_REVERSE: `${API_BASE_URL}/geo/reverse`,
    GEO_DIRECT: `${API_BASE_URL}/geo/direct`,
    DEFAULT_PARAMS: {
        units: "metric"
    }
};