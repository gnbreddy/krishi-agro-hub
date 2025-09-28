// API Configuration for Real-time Data
export const API_CONFIG = {
  // Google Maps API Key
  GOOGLE_API_KEY: 'AIzaSyAwRn_dxX7Af_y8kkIrNJTOA4F0DPYiOoE',

  // Live Price API Key (Data.gov.in)
  LIVE_PRICE_API_KEY: '579b464db66ec23bdd00000132c9eda86fb4455e738a268668dbff0c',

  // Weather API Key (Tomorrow.io)
  WEATHER_API_KEY: 'BFCDkVAztAwUSoCefEQ3Fwe5rkWbq4GA',

  // API Endpoints
  GOOGLE_MAPS_API_URL: 'https://maps.googleapis.com/maps/api',
  WEATHER_API_URL: 'https://api.tomorrow.io/v4/weather/forecast',
  DEMAND_SUPPLY_API_URL: 'https://api.data.gov.in',

  // Indian Government Data API
  GOVERNMENT_DATA_API: 'https://api.data.gov.in/resource',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  // Weather endpoints
  WEATHER_CURRENT: `${API_CONFIG.WEATHER_API_URL}/weather`,
  WEATHER_FORECAST: `${API_CONFIG.WEATHER_API_URL}/forecast`,

  // Google Maps endpoints
  GEOLOCATION: `${API_CONFIG.GOOGLE_MAPS_API_URL}/geocode/json`,
  REVERSE_GEOCODING: `${API_CONFIG.GOOGLE_MAPS_API_URL}/geocode/json`,

  // Government data endpoints
  CROP_PRICES: `${API_CONFIG.GOVERNMENT_DATA_API}/9ef84268-d588-465a-a308-a864a2d2df49`,
  FERTILIZER_PRICES: `${API_CONFIG.GOVERNMENT_DATA_API}/9a1b33f0-7c63-4b9e-8b1a-1c1d1e1f1g1h`,
  MARKET_PRICES: `${API_CONFIG.GOVERNMENT_DATA_API}/9ef84268-d588-465a-a308-a864a2d2df49`,
} as const;
