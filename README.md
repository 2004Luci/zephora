# Zephora - Weather App

A modern weather application built with React, TypeScript, and Vite. Features a secure backend proxy to protect API keys.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- OpenWeatherMap API key ([Get one here](https://openweathermap.org/api))

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up the backend server:**
   ```bash
   # Create server .env file
   cd server
   echo "OPENWEATHER_API_KEY=your_api_key_here" > .env
   echo "PORT=3001" >> .env
   cd ..
   ```

3. **Run the application:**
   ```bash
   # Run both frontend and backend together
   npm run dev:all
   
   # Or run separately:
   # Terminal 1: Backend server
   npm run dev:server
   
   # Terminal 2: Frontend
   npm run dev
   ```

4. **Open your browser:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## 🔒 Security

The API key is **never exposed** to the client:
- ✅ Stored server-side only in `server/.env`
- ✅ All API calls go through the backend proxy
- ✅ No API key visible in browser network tab
- ✅ `.env` files are gitignored

## 📁 Project Structure

```
zephora/
├── api/              # Vercel serverless functions (production)
│   ├── weather.js
│   ├── forecast.js
│   └── geo/
├── server/           # Express backend proxy (local development only)
│   ├── index.js      # Server entry point
│   └── .env          # Server environment variables (not in git)
├── src/              # React frontend
│   ├── api/          # API client (calls backend, not OpenWeatherMap directly)
│   ├── components/   # React components
│   └── ...
└── ...
```

## 📝 Available Scripts

- `npm run dev` - Start frontend dev server
- `npm run dev:server` - Start backend server
- `npm run dev:all` - Start both frontend and backend
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Frontend
The frontend automatically uses:
- **Development**: `http://localhost:3001/api` (Express server)
- **Production (Vercel)**: `/api` (relative paths, same domain)

No configuration needed - it auto-detects the environment!

### Backend

**For Local Development:**
Configure the server in `server/.env`:
```
OPENWEATHER_API_KEY=your_api_key_here
PORT=3001
```

**For Vercel Deployment:**
Add environment variable in Vercel Dashboard:
1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add: `OPENWEATHER_API_KEY` = `your_api_key_here`
4. Apply to: **Production**, **Preview**, and **Development**
5. Redeploy your application

## 📚 API Endpoints

The backend exposes these endpoints:

- `GET /api/weather?lat={lat}&lon={lon}` - Current weather
- `GET /api/forecast?lat={lat}&lon={lon}` - Weather forecast
- `GET /api/geo/reverse?lat={lat}&lon={lon}` - Reverse geocoding
- `GET /api/geo/direct?q={query}` - Location search

## 🚀 Vercel Deployment

### First Time Setup

1. **Push your code to GitHub** (if not already done)

2. **In Vercel Dashboard:**
   - Go to your project → **Settings** → **Environment Variables**
   - Click **Add New**
   - Name: `OPENWEATHER_API_KEY`
   - Value: Your OpenWeatherMap API key
   - Select: **Production**, **Preview**, and **Development**
   - Click **Save**

3. **Redeploy:**
   - Go to **Deployments** tab
   - Click the **⋯** menu on your latest deployment
   - Click **Redeploy**

### After Code Changes

When you push to your main branch, Vercel will automatically:
- Build your frontend
- Deploy your serverless functions
- Use the `OPENWEATHER_API_KEY` environment variable you set

**No additional configuration needed!** The API routes in `/api` folder will automatically be deployed as serverless functions.
