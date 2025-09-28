import { API_CONFIG, API_ENDPOINTS } from './api-config';

// Types for API responses
export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  wind: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  forecast: WeatherForecast[];
}

export interface WeatherForecast {
  day: string;
  high: number;
  low: number;
  condition: string;
  precipitation: number;
  windSpeed: number;
}

export interface CropPriceData {
  crop: string;
  price: number;
  unit: string;
  market: string;
  state: string;
  date: string;
  change: number;
  changePercent: number;
}

export interface MarketData {
  crop: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
  unit: string;
  prediction: 'bullish' | 'bearish' | 'stable';
  demand: number;
  supply: number;
  market: string;
  state: string;
}

export interface DemandSupplyData {
  crop: string;
  demand: number;
  supply: number;
  deficit: number;
  surplus: number;
  market: string;
  state: string;
  date: string;
}

// Weather API Service
export class WeatherService {
  static async getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
    try {
      // Use Tomorrow.io API if key is available
  if (API_CONFIG.WEATHER_API_KEY) {
        const response = await fetch(
          `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lon}&apikey=${API_CONFIG.WEATHER_API_KEY}`
        );
        if (response.ok) {
          const data = await response.json();
          // Parse Tomorrow.io response
          const current = data.timelines?.minutely?.[0]?.values || {};
          return {
            location: `${lat}, ${lon}`,
            temperature: Math.round(current.temperature || 0),
            condition: current.weatherCode ? String(current.weatherCode) : 'Unknown',
            humidity: Math.round(current.humidity || 0),
            wind: Math.round(current.windSpeed || 0),
            pressure: Math.round(current.pressureSurfaceLevel || 0),
            visibility: Math.round(current.visibility || 0),
            uvIndex: Math.round(current.uvIndex || 0),
            forecast: [] // Will be populated by forecast API
          };
        }
      }
      
      // Fallback to realistic mock data based on location and season
      const currentHour = new Date().getHours();
      const isDay = currentHour >= 6 && currentHour <= 18;
      const season = new Date().getMonth(); // 0-11 for Jan-Dec
      
      // Seasonal temperature variations
      const baseTemp = season >= 2 && season <= 4 ? 35 : // Summer (Mar-May)
                      season >= 5 && season <= 8 ? 28 : // Monsoon (Jun-Sep)
                      season >= 9 && season <= 11 ? 25 : 20; // Winter (Oct-Feb)
      
      const temperature = baseTemp + (Math.random() - 0.5) * 10;
      const humidity = season >= 5 && season <= 8 ? 80 + Math.random() * 15 : // High in monsoon
                       season >= 9 && season <= 11 ? 40 + Math.random() * 20 : // Low in winter
                       50 + Math.random() * 30; // Moderate in other seasons
      
      const conditions = isDay ? 
        ['Clear sky', 'Partly cloudy', 'Sunny', 'Few clouds'] :
        ['Clear sky', 'Partly cloudy', 'Few clouds'];
      
      return {
        location: 'Current Location', // Will be updated by getLocationFromCoords
        temperature: Math.round(temperature),
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        humidity: Math.round(humidity),
        wind: Math.round(5 + Math.random() * 15), // 5-20 km/h
        pressure: Math.round(1010 + (Math.random() - 0.5) * 20), // 1000-1020 hPa
        visibility: Math.round(8 + Math.random() * 7), // 8-15 km
        uvIndex: isDay ? Math.round(3 + Math.random() * 8) : 0, // 3-11 during day
        forecast: [] // Will be populated by forecast API
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }

  static async getWeatherForecast(lat: number, lon: number): Promise<WeatherForecast[]> {
    try {
      // Use Tomorrow.io API if key is available
  if (API_CONFIG.WEATHER_API_KEY) {
        const response = await fetch(
          `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lon}&apikey=${API_CONFIG.WEATHER_API_KEY}`
        );
        if (response.ok) {
          const data = await response.json();
          // Parse Tomorrow.io daily forecast
          const forecast: WeatherForecast[] = [];
          const dailyData = data.timelines?.daily || [];
          dailyData.forEach((item: any, index: number) => {
            const date = new Date(item.time);
            const dayName = index === 0 ? 'Today' :
              index === 1 ? 'Tomorrow' :
              date.toLocaleDateString('en-US', { weekday: 'long' });
            const values = item.values || {};
            forecast.push({
              day: dayName,
              high: Math.round(values.temperatureMax || 0),
              low: Math.round(values.temperatureMin || 0),
              condition: values.weatherCode ? String(values.weatherCode) : 'Unknown',
              precipitation: Math.round(values.precipitationProbability || 0),
              windSpeed: Math.round(values.windSpeedAvg || 0)
            });
          });
          return forecast;
        }
      }
      
      // Fallback to realistic mock forecast data
      const forecast: WeatherForecast[] = [];
      const currentDate = new Date();
      const season = new Date().getMonth();
      
      for (let i = 0; i < 5; i++) {
        const date = new Date(currentDate);
        date.setDate(date.getDate() + i);
        
        const dayName = i === 0 ? 'Today' : 
                       i === 1 ? 'Tomorrow' : 
                       date.toLocaleDateString('en-US', { weekday: 'long' });
        
        // Seasonal temperature variations
        const baseHigh = season >= 2 && season <= 4 ? 38 : // Summer
                         season >= 5 && season <= 8 ? 32 : // Monsoon
                         season >= 9 && season <= 11 ? 28 : 25; // Winter
        const baseLow = baseHigh - 15;
        
        const high = baseHigh + (Math.random() - 0.5) * 8;
        const low = baseLow + (Math.random() - 0.5) * 6;
        
        const conditions = ['Clear sky', 'Partly cloudy', 'Sunny', 'Few clouds', 'Cloudy'];
        const condition = conditions[Math.floor(Math.random() * conditions.length)];
        
        forecast.push({
          day: dayName,
          high: Math.round(high),
          low: Math.round(low),
          condition,
          precipitation: Math.random() > 0.7 ? Math.round(Math.random() * 10) : 0,
          windSpeed: Math.round(8 + Math.random() * 12)
        });
      }
      
      return forecast;
    } catch (error) {
      console.error('Error fetching weather forecast:', error);
      throw error;
    }
  }

  static async getLocationFromCoords(lat: number, lon: number): Promise<string> {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.REVERSE_GEOCODING}?latlng=${lat},${lon}&key=${API_CONFIG.GOOGLE_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Geocoding API request failed');
      }
      
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        const components = result.address_components;
        
        // Extract city, state and country
        let city = '';
        let state = '';
        let country = '';
        
        components.forEach((component: any) => {
          if (component.types.includes('locality') || component.types.includes('administrative_area_level_2')) {
            city = component.long_name;
          }
          if (component.types.includes('administrative_area_level_1')) {
            state = component.long_name;
          }
          if (component.types.includes('country')) {
            country = component.long_name;
          }
        });
        
        // Return the most specific location available
        if (city && state) {
          return `${city}, ${state}, ${country}`;
        } else if (state) {
          return `${state}, ${country}`;
        } else {
          return country || 'Unknown Location';
        }
      }
      
      return 'Unknown Location';
    } catch (error) {
      console.error('Error fetching location:', error);
      return 'Unknown Location';
    }
  }
}

// Market Data Service
export class MarketDataService {
  static async getCropPrices(): Promise<CropPriceData[]> {
    try {
      // Try to fetch real data from government API first
      try {
        const response = await fetch(
          `${API_CONFIG.GOVERNMENT_DATA_API}/9ef84268-d588-465a-a308-a864a2d2df49?api-key=${API_CONFIG.LIVE_PRICE_API_KEY}&format=json&limit=20`
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data.records && data.records.length > 0) {
            // Process real government data
            const processedData: CropPriceData[] = data.records.map((record: any) => ({
              crop: record.commodity || 'Unknown',
              price: parseFloat(record.modal_price) || 0,
              unit: record.price_unit || 'per quintal',
              market: record.market || 'Unknown',
              state: record.state || 'Unknown',
              date: record.arrival_date || new Date().toISOString(),
              change: Math.floor(Math.random() * 200) - 100, // Random change for demo
              changePercent: Math.floor(Math.random() * 10) - 5 // Random percentage for demo
            }));
            
            return processedData.slice(0, 10); // Return top 10 results
          }
        }
      } catch (apiError) {
        console.warn('Government API not available, using fallback data:', apiError);
      }
      
      // Fallback to realistic mock data with current date and random variations
      const basePrices = {
        'Rice': 2850,
        'Wheat': 2200,
        'Cotton': 6500,
        'Sugarcane': 315,
        'Maize': 1800,
        'Soybean': 3200,
        'Mustard': 4500,
        'Potato': 1200
      };
      
      const states = ['Delhi', 'Punjab', 'Haryana', 'Uttar Pradesh', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'West Bengal'];
      const markets = ['Delhi', 'Ludhiana', 'Karnal', 'Lucknow', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata'];
      
      const mockData: CropPriceData[] = Object.entries(basePrices).map(([crop, basePrice]) => {
        const variation = (Math.random() - 0.5) * 0.2; // ±10% variation
        const currentPrice = Math.round(basePrice * (1 + variation));
        const change = Math.round((Math.random() - 0.5) * 200);
        const changePercent = Math.round((change / (currentPrice - change)) * 100 * 100) / 100;
        const stateIndex = Math.floor(Math.random() * states.length);
        
        return {
          crop,
          price: currentPrice,
          unit: crop === 'Sugarcane' ? 'per ton' : 'per quintal',
          market: markets[stateIndex],
          state: states[stateIndex],
          date: new Date().toISOString(),
          change,
          changePercent
        };
      });
      
      return mockData;
    } catch (error) {
      console.error('Error fetching crop prices:', error);
      throw error;
    }
  }

  static async getMarketData(): Promise<MarketData[]> {
    try {
      const cropPrices = await this.getCropPrices();
      
      return cropPrices.map(price => {
        // Calculate more realistic demand and supply based on price trends
        const baseDemand = 70 + (price.changePercent * 2); // Higher demand when prices are rising
        const baseSupply = 80 - (price.changePercent * 1.5); // Lower supply when prices are rising
        
        const demand = Math.max(20, Math.min(100, Math.round(baseDemand + (Math.random() - 0.5) * 20)));
        const supply = Math.max(20, Math.min(100, Math.round(baseSupply + (Math.random() - 0.5) * 20)));
        
        return {
          crop: price.crop,
          currentPrice: price.price,
          change: price.change,
          changePercent: price.changePercent,
          trend: price.change > 0 ? 'up' : price.change < 0 ? 'down' : 'stable',
          unit: price.unit,
          prediction: price.changePercent > 2 ? 'bullish' : price.changePercent < -2 ? 'bearish' : 'stable',
          demand,
          supply,
          market: price.market,
          state: price.state
        };
      });
    } catch (error) {
      console.error('Error fetching market data:', error);
      throw error;
    }
  }
}

// Demand and Supply Service
export class DemandSupplyService {
  static async getDemandSupplyData(): Promise<DemandSupplyData[]> {
    try {
      // Get market data to calculate demand and supply
      const marketData = await MarketDataService.getMarketData();
      
      const demandSupplyData: DemandSupplyData[] = marketData.map(item => {
        const deficit = Math.max(0, item.demand - item.supply);
        const surplus = Math.max(0, item.supply - item.demand);
        
        return {
          crop: item.crop,
          demand: item.demand,
          supply: item.supply,
          deficit,
          surplus,
          market: item.market,
          state: item.state,
          date: new Date().toISOString()
        };
      });
      
      return demandSupplyData;
    } catch (error) {
      console.error('Error fetching demand supply data:', error);
      throw error;
    }
  }
}

// Utility function to get user's current location
export const getUserLocation = (): Promise<{ lat: number; lon: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
};
