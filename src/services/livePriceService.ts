// Service for fetching live price data from Data.gov.in API

import { API_CONFIG } from '@/lib/api-config';

export interface LivePriceData {
  commodity: string;
  variety?: string;
  market: string;
  state: string;
  district?: string;
  price: number;
  unit: string;
  date: string;
  change?: number;
  changePercent?: number;
}

export interface LivePriceResponse {
  records: Array<{
    commodity: string;
    variety?: string;
    market: string;
    state: string;
    district?: string;
    modal_price: string;
    price_unit?: string;
    arrival_date: string;
    min_price?: string;
    max_price?: string;
  }>;
  total: number;
  count: number;
}

class LivePriceService {
  private readonly API_KEY = API_CONFIG.LIVE_PRICE_API_KEY;
  private readonly BASE_URL = "https://api.data.gov.in/resource";
  
  // Resource ID for live price data - this would be the actual resource ID from data.gov.in
  private readonly LIVE_PRICE_RESOURCE_ID = "9ef84268-d588-465a-a308-a864a2d2df49";

  async getLivePrices(limit: number = 50, offset: number = 0): Promise<LivePriceData[]> {
    try {
      const url = new URL(`${this.BASE_URL}/${this.LIVE_PRICE_RESOURCE_ID}`);
      url.searchParams.append('api-key', this.API_KEY);
      url.searchParams.append('format', 'json');
      url.searchParams.append('limit', limit.toString());
      url.searchParams.append('offset', offset.toString());

      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: LivePriceResponse = await response.json();
      
      return data.records.map(record => ({
        commodity: record.commodity,
        variety: record.variety,
        market: record.market,
        state: record.state,
        district: record.district,
        price: parseFloat(record.modal_price) || 0,
        unit: record.price_unit || "per quintal",
        date: record.arrival_date,
        change: Math.floor(Math.random() * 200) - 100, // Random change for demo
        changePercent: Math.floor(Math.random() * 10) - 5 // Random percentage for demo
      }));
    } catch (error) {
      console.error('Error fetching live price data:', error);
      // Return mock data for development/demo purposes
      return this.getMockLivePriceData();
    }
  }

  async getLivePricesByState(state: string): Promise<LivePriceData[]> {
    try {
      const url = new URL(`${this.BASE_URL}/${this.LIVE_PRICE_RESOURCE_ID}`);
      url.searchParams.append('api-key', this.API_KEY);
      url.searchParams.append('format', 'json');
      url.searchParams.append('filters[state]', state);
      url.searchParams.append('limit', '50');

      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: LivePriceResponse = await response.json();
      
      return data.records.map(record => ({
        commodity: record.commodity,
        variety: record.variety,
        market: record.market,
        state: record.state,
        district: record.district,
        price: parseFloat(record.modal_price) || 0,
        unit: record.price_unit || "per quintal",
        date: record.arrival_date,
        change: Math.floor(Math.random() * 200) - 100,
        changePercent: Math.floor(Math.random() * 10) - 5
      }));
    } catch (error) {
      console.error('Error fetching live price data by state:', error);
      return this.getMockLivePriceData().filter(item => item.state === state);
    }
  }

  async getLivePricesByCommodity(commodity: string): Promise<LivePriceData[]> {
    try {
      const url = new URL(`${this.BASE_URL}/${this.LIVE_PRICE_RESOURCE_ID}`);
      url.searchParams.append('api-key', this.API_KEY);
      url.searchParams.append('format', 'json');
      url.searchParams.append('filters[commodity]', commodity);
      url.searchParams.append('limit', '50');

      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: LivePriceResponse = await response.json();
      
      return data.records.map(record => ({
        commodity: record.commodity,
        variety: record.variety,
        market: record.market,
        state: record.state,
        district: record.district,
        price: parseFloat(record.modal_price) || 0,
        unit: record.price_unit || "per quintal",
        date: record.arrival_date,
        change: Math.floor(Math.random() * 200) - 100,
        changePercent: Math.floor(Math.random() * 10) - 5
      }));
    } catch (error) {
      console.error('Error fetching live price data by commodity:', error);
      return this.getMockLivePriceData().filter(item => 
        item.commodity.toLowerCase().includes(commodity.toLowerCase())
      );
    }
  }

  // Mock data for development/demo purposes
  private getMockLivePriceData(): LivePriceData[] {
    const today = new Date().toISOString().split('T')[0];
    
    return [
      {
        commodity: "Rice",
        variety: "Common",
        market: "Delhi",
        state: "Delhi",
        district: "New Delhi",
        price: 2850,
        unit: "per quintal",
        date: today,
        change: 75,
        changePercent: 2.7
      },
      {
        commodity: "Wheat",
        variety: "Sharbati",
        market: "Ludhiana",
        state: "Punjab",
        district: "Ludhiana",
        price: 2200,
        unit: "per quintal",
        date: today,
        change: -25,
        changePercent: -1.1
      },
      {
        commodity: "Cotton",
        variety: "Medium Staple",
        market: "Ahmedabad",
        state: "Gujarat",
        district: "Ahmedabad",
        price: 6500,
        unit: "per quintal",
        date: today,
        change: 150,
        changePercent: 2.4
      },
      {
        commodity: "Sugarcane",
        market: "Pune",
        state: "Maharashtra",
        district: "Pune",
        price: 315,
        unit: "per ton",
        date: today,
        change: 8,
        changePercent: 2.6
      },
      {
        commodity: "Maize",
        variety: "Yellow",
        market: "Hyderabad",
        state: "Telangana",
        district: "Hyderabad",
        price: 1800,
        unit: "per quintal",
        date: today,
        change: 45,
        changePercent: 2.6
      },
      {
        commodity: "Soybean",
        variety: "Yellow",
        market: "Indore",
        state: "Madhya Pradesh",
        district: "Indore",
        price: 3200,
        unit: "per quintal",
        date: today,
        change: -80,
        changePercent: -2.4
      },
      {
        commodity: "Mustard",
        variety: "Black",
        market: "Jaipur",
        state: "Rajasthan",
        district: "Jaipur",
        price: 4500,
        unit: "per quintal",
        date: today,
        change: 120,
        changePercent: 2.7
      },
      {
        commodity: "Potato",
        variety: "Red",
        market: "Agra",
        state: "Uttar Pradesh",
        district: "Agra",
        price: 1200,
        unit: "per quintal",
        date: today,
        change: -30,
        changePercent: -2.4
      },
      {
        commodity: "Onion",
        variety: "Red",
        market: "Nashik",
        state: "Maharashtra",
        district: "Nashik",
        price: 2500,
        unit: "per quintal",
        date: today,
        change: 200,
        changePercent: 8.7
      },
      {
        commodity: "Tomato",
        variety: "Hybrid",
        market: "Bangalore",
        state: "Karnataka",
        district: "Bangalore Rural",
        price: 3500,
        unit: "per quintal",
        date: today,
        change: -150,
        changePercent: -4.1
      }
    ];
  }

  // Get available states
  getAvailableStates(): string[] {
    return [
      "Delhi",
      "Punjab",
      "Gujarat",
      "Maharashtra",
      "Telangana",
      "Madhya Pradesh",
      "Rajasthan",
      "Uttar Pradesh",
      "Karnataka",
      "Tamil Nadu",
      "West Bengal",
      "Haryana"
    ];
  }

  // Get available commodities
  getAvailableCommodities(): string[] {
    return [
      "Rice",
      "Wheat",
      "Cotton",
      "Sugarcane",
      "Maize",
      "Soybean",
      "Mustard",
      "Potato",
      "Onion",
      "Tomato",
      "Gram",
      "Lentil",
      "Barley",
      "Sunflower"
    ];
  }

  // Calculate price trend
  calculateTrend(change: number): 'up' | 'down' | 'stable' {
    if (change > 0) return 'up';
    if (change < 0) return 'down';
    return 'stable';
  }

  // Get price prediction based on trend
  getPrediction(changePercent: number): 'bullish' | 'bearish' | 'stable' {
    if (changePercent > 2) return 'bullish';
    if (changePercent < -2) return 'bearish';
    return 'stable';
  }
}

export const livePriceService = new LivePriceService();