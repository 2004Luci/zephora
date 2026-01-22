# Backend Server Setup

This backend server acts as a proxy to hide the OpenWeatherMap API key from the client-side code.

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create a `.env` file in the `server/` directory:**
   ```bash
   cd server
   cp .env.example .env
   ```

3. **Add your OpenWeatherMap API key to `server/.env`:**
   ```
   OPENWEATHER_API_KEY=your_actual_api_key_here
   PORT=3001
   ```

4. **Run the server:**
   ```bash
   # From project root
   npm run dev:server
   
   # Or run both frontend and backend together
   npm run dev:all
   ```

## API Endpoints

The server exposes the following endpoints:

- `GET /api/weather?lat={lat}&lon={lon}&units=metric` - Get current weather
- `GET /api/forecast?lat={lat}&lon={lon}&units=metric` - Get weather forecast
- `GET /api/geo/reverse?lat={lat}&lon={lon}&limit=1` - Reverse geocoding
- `GET /api/geo/direct?q={query}&limit=5` - Location search
- `GET /api/health` - Health check

## Security

- The API key is stored server-side only in `server/.env`
- The `.env` file is excluded from git via `.gitignore`
- Client-side code never sees the API key
- All API calls go through the backend proxy
