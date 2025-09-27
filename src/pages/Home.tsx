import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, MapPin, Thermometer, Droplets, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const recommendations = [
  {
    id: 1,
    title: "Rice Cultivation Guide",
    description: "Best practices for growing healthy rice crops this season",
    image: "🌾",
    category: "Cultivation",
  },
  {
    id: 2,
    title: "Wheat Harvest Time",
    description: "Optimal timing and techniques for wheat harvesting",
    image: "🌾",
    category: "Harvest",
  },
  {
    id: 3,
    title: "Tomato Care Tips",
    description: "Essential care guide for healthy tomato plants",
    image: "🍅",
    category: "Care",
  },
  {
    id: 4,
    title: "Soil Testing Benefits",
    description: "Why regular soil testing improves crop yields",
    image: "🧪",
    category: "Testing",
  },
  {
    id: 5,
    title: "Smart Irrigation",
    description: "Water-efficient irrigation techniques",
    image: "💧",
    category: "Irrigation",
  },
  {
    id: 6,
    title: "Fertilizer Application",
    description: "Timing and methods for fertilizer use",
    image: "🌱",
    category: "Fertilizer",
  },
  {
    id: 7,
    title: "Weather Alerts",
    description: "Stay updated with weather forecasts",
    image: "🌤️",
    category: "Weather",
  },
  {
    id: 8,
    title: "Market Prices",
    description: "Current market rates for your crops",
    image: "📈",
    category: "Market",
  },
  {
    id: 9,
    title: "Equipment Rental",
    description: "Affordable farm equipment rental options",
    image: "🚜",
    category: "Equipment",
  },
  {
    id: 10,
    title: "Expert Consultation",
    description: "Connect with agricultural experts",
    image: "👨‍🌾",
    category: "Expert",
  },
];

const governmentSchemes = [
  {
    title: "PM Kisan Scheme",
    amount: "₹6,000",
    description: "Annual financial benefit",
    status: "Active",
  },
  {
    title: "PM Fasal Bima Yojana",
    amount: "Up to 90%",
    description: "Crop insurance coverage",
    status: "Enroll Now",
  },
  {
    title: "Equipment Subsidies",
    amount: "50% Off",
    description: "On tractors & machinery",
    status: "Available",
  },
  {
    title: "New Farm Laws 2023",
    amount: "Updated",
    description: "Marketing reforms",
    status: "Learn More",
  },
  {
    title: "Micro Irrigation Fund",
    amount: "₹10,000",
    description: "Drip/sprinkler support",
    status: "Apply",
  },
  {
    title: "Kisan Credit Card",
    amount: "Easy Credit",
    description: "Low interest farming loans",
    status: "Get Card",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [weather, setWeather] = useState<any>(null);
  const [locationPermission, setLocationPermission] = useState<string>('default');
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % recommendations.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const requestLocation = async () => {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      
      setLocationPermission('granted');
      // Simulate weather data
      setWeather({
        location: "Punjab, India",
        temperature: 28,
        condition: "Partly Cloudy",
        humidity: 65,
        wind: 12,
        forecast: [
          { day: "Today", high: 30, low: 18, condition: "sunny" },
          { day: "Tomorrow", high: 28, low: 16, condition: "cloudy" },
          { day: "Day 3", high: 32, low: 20, condition: "rain" },
        ]
      });
      
      toast({
        title: "Location Access Granted",
        description: "Weather forecast updated for your location",
      });
    } catch (error) {
      setLocationPermission('denied');
      toast({
        title: "Location Access Denied",
        description: "Please enable location access for weather updates",
        variant: "destructive",
      });
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % recommendations.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + recommendations.length) % recommendations.length);
  };

  return (
    <div className="space-y-6 p-4 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-gradient-nature mb-4">
          Welcome to Krishi
        </h1>
        <p className="text-lg text-muted-foreground">
          Your comprehensive agricultural companion
        </p>
      </div>

      {/* Recommendations Carousel */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Recommendations</h2>
        <div className="relative">
          <div className="overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {recommendations.map((item) => (
                <Card key={item.id} className="min-w-full hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{item.image}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{item.title}</h3>
                          <Badge variant="secondary">{item.category}</Badge>
                        </div>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            className="absolute left-2 top-1/2 -translate-y-1/2 glass"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 glass"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Government Schemes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Government Schemes</h2>
        <div className="overflow-x-auto">
          <div className="flex gap-4 pb-4" style={{ width: 'max-content' }}>
            {governmentSchemes.map((scheme, index) => (
              <Card key={index} className="w-64 hover-lift card-nature">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-white mb-2">{scheme.title}</h3>
                  <div className="text-2xl font-bold text-white mb-1">{scheme.amount}</div>
                  <p className="text-white/80 text-sm mb-3">{scheme.description}</p>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {scheme.status}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Weather Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Weather Forecast</h2>
        {locationPermission === 'default' && (
          <Card className="p-6 text-center">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Enable Location Access</h3>
            <p className="text-muted-foreground mb-4">
              Get personalized weather forecasts for your farm location
            </p>
            <Button onClick={requestLocation} className="hover-glow">
              Allow Location Access
            </Button>
          </Card>
        )}
        
        {weather && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4 card-sky">
              <div className="text-center text-white">
                <Thermometer className="h-8 w-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{weather.temperature}°C</div>
                <div className="text-sm opacity-90">{weather.condition}</div>
              </div>
            </Card>
            
            <Card className="p-4 card-earth">
              <div className="text-center text-white">
                <Droplets className="h-8 w-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{weather.humidity}%</div>
                <div className="text-sm opacity-90">Humidity</div>
              </div>
            </Card>
            
            <Card className="p-4 card-nature">
              <div className="text-center text-white">
                <Wind className="h-8 w-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{weather.wind} km/h</div>
                <div className="text-sm opacity-90">Wind Speed</div>
              </div>
            </Card>
            
            <Card className="p-4 glass">
              <div className="text-center">
                <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-lg font-semibold">{weather.location}</div>
                <div className="text-sm text-muted-foreground">Current Location</div>
              </div>
            </Card>
          </div>
        )}
      </section>
    </div>
  );
}