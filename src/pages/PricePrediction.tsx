import { useState } from "react";
import { TrendingUp, TrendingDown, BarChart3, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const marketData = [
  {
    crop: "Rice",
    currentPrice: 2850,
    change: 75,
    changePercent: 2.7,
    trend: "up",
    unit: "per quintal",
    prediction: "bullish",
  },
  {
    crop: "Wheat",
    currentPrice: 2200,
    change: -25,
    changePercent: -1.1,
    trend: "down",
    unit: "per quintal",
    prediction: "bearish",
  },
  {
    crop: "Cotton",
    currentPrice: 6500,
    change: 150,
    changePercent: 2.4,
    trend: "up",
    unit: "per quintal",
    prediction: "bullish",
  },
  {
    crop: "Sugarcane",
    currentPrice: 315,
    change: 8,
    changePercent: 2.6,
    trend: "up",
    unit: "per ton",
    prediction: "stable",
  },
];

const regionalPrices = {
  north: [
    { crop: "Rice", price: 2900, market: "Delhi" },
    { crop: "Wheat", price: 2250, market: "Punjab" },
    { crop: "Cotton", price: 6600, market: "Haryana" },
  ],
  south: [
    { crop: "Rice", price: 2800, market: "Chennai" },
    { crop: "Cotton", price: 6400, market: "Hyderabad" },
    { crop: "Sugarcane", price: 320, market: "Bangalore" },
  ],
  east: [
    { crop: "Rice", price: 2750, market: "Kolkata" },
    { crop: "Wheat", price: 2180, market: "Patna" },
    { crop: "Cotton", price: 6350, market: "Bhubaneswar" },
  ],
  west: [
    { crop: "Rice", price: 2950, market: "Mumbai" },
    { crop: "Cotton", price: 6700, market: "Ahmedabad" },
    { crop: "Sugarcane", price: 310, market: "Pune" },
  ],
};

const marketInsights = [
  {
    title: "Rice Market Analysis",
    sentiment: "bullish",
    confidence: 85,
    summary: "Strong demand from export markets driving prices higher. Monsoon conditions favorable for next season.",
    factors: ["Export demand up 15%", "Favorable weather", "Low inventory levels"],
  },
  {
    title: "Cotton Price Forecast",
    sentiment: "bullish",
    confidence: 78,
    summary: "Textile industry recovery boosting cotton demand. International prices showing upward trend.",
    factors: ["Textile recovery", "International demand", "Quality production"],
  },
  {
    title: "Wheat Market Outlook",
    sentiment: "bearish",
    confidence: 72,
    summary: "Abundant harvest leading to supply pressure. Government procurement at MSP providing floor price.",
    factors: ["High production", "MSP support", "Storage concerns"],
  },
];

export default function PricePrediction() {
  const [selectedRegion, setSelectedRegion] = useState("north");

  const getRegionName = (region: string) => {
    const names = { north: "North India", south: "South India", east: "East India", west: "West India" };
    return names[region as keyof typeof names];
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "bullish": return "text-green-600 bg-green-50";
      case "bearish": return "text-red-600 bg-red-50";
      default: return "text-blue-600 bg-blue-50";
    }
  };

  return (
    <div className="space-y-6 p-4 max-w-7xl mx-auto">
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold text-gradient-nature mb-2">
          Price Prediction
        </h1>
        <p className="text-muted-foreground">
          Real-time market prices and forecasts
        </p>
      </div>

      {/* Market Overview Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {marketData.map((item) => (
          <Card key={item.crop} className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{item.crop}</h3>
                <Badge 
                  className={item.trend === "up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
                >
                  {item.trend === "up" ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {item.changePercent}%
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">
                  ₹{item.currentPrice.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">{item.unit}</div>
                <div className={`text-sm font-medium ${item.change > 0 ? "text-green-600" : "text-red-600"}`}>
                  {item.change > 0 ? "+" : ""}₹{item.change} from yesterday
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="chart-container">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Price Trends (6 Months)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Interactive price trend chart</p>
                <p className="text-sm">Chart.js integration</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="chart-container">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Market Predictions (3 Months)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Price prediction models</p>
                <p className="text-sm">ML-based forecasting</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Regional Price Comparison */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Regional Price Comparison</h2>
        
        <Tabs value={selectedRegion} onValueChange={setSelectedRegion}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="north">North</TabsTrigger>
            <TabsTrigger value="south">South</TabsTrigger>
            <TabsTrigger value="east">East</TabsTrigger>
            <TabsTrigger value="west">West</TabsTrigger>
          </TabsList>
          
          {Object.entries(regionalPrices).map(([region, prices]) => (
            <TabsContent key={region} value={region} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {prices.map((item, index) => (
                  <Card key={index} className="hover-lift">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{item.crop}</h3>
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="text-xl font-bold text-primary mb-1">
                        ₹{item.price.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">{item.market}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Market Insights */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Market Insights</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {marketInsights.map((insight, index) => (
            <Card key={index} className="hover-lift">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{insight.title}</CardTitle>
                  <Badge className={getSentimentColor(insight.sentiment)}>
                    {insight.sentiment}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  Confidence: {insight.confidence}%
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{insight.summary}</p>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Key Factors:</h4>
                  {insight.factors.map((factor, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      {factor}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}