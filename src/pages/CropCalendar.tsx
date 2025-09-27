import { useState } from "react";
import { Calendar, Droplets, Bug, Thermometer, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const seasons = {
  kharif: {
    name: "Kharif",
    period: "June - October",
    description: "Monsoon season crops",
    color: "bg-green-500",
  },
  rabi: {
    name: "Rabi", 
    period: "November - April",
    description: "Winter season crops",
    color: "bg-blue-500",
  },
  zaid: {
    name: "Zaid",
    period: "March - June", 
    description: "Summer season crops",
    color: "bg-orange-500",
  },
};

const currentMonthActivities = [
  {
    crop: "Rice",
    activity: "Transplanting",
    priority: "High",
    deadline: "Next 2 weeks",
    description: "Transplant 25-30 day old seedlings in puddled fields",
  },
  {
    crop: "Cotton",
    activity: "Sowing",
    priority: "Medium",
    deadline: "This month",
    description: "Sow cotton seeds in well-prepared fields",
  },
  {
    crop: "Sugarcane",
    activity: "Irrigation",
    priority: "High",
    deadline: "Weekly",
    description: "Maintain adequate moisture for healthy growth",
  },
  {
    crop: "Wheat",
    activity: "Land Preparation",
    priority: "Low",
    deadline: "Next month",
    description: "Begin preparing fields for winter sowing",
  },
];

const cropCalendar = [
  { month: "January", crops: ["Wheat (Growing)", "Mustard (Harvest)", "Potato (Harvest)"] },
  { month: "February", crops: ["Wheat (Growing)", "Barley (Harvest)", "Peas (Harvest)"] },
  { month: "March", crops: ["Wheat (Harvest)", "Summer Moong (Sow)", "Fodder (Sow)"] },
  { month: "April", crops: ["Summer Moong (Growing)", "Fodder (Growing)", "Wheat (Post-harvest)"] },
  { month: "May", crops: ["Summer Moong (Harvest)", "Fodder (Harvest)", "Land Prep for Kharif"] },
  { month: "June", crops: ["Rice (Sow)", "Cotton (Sow)", "Sugarcane (Plant)"] },
  { month: "July", crops: ["Rice (Transplant)", "Cotton (Growing)", "Maize (Sow)"] },
  { month: "August", crops: ["Rice (Growing)", "Cotton (Growing)", "Soybean (Sow)"] },
  { month: "September", crops: ["Rice (Flowering)", "Cotton (Flowering)", "Soybean (Growing)"] },
  { month: "October", crops: ["Rice (Harvest)", "Cotton (Picking)", "Soybean (Harvest)"] },
  { month: "November", crops: ["Wheat (Sow)", "Mustard (Sow)", "Gram (Sow)"] },
  { month: "December", crops: ["Wheat (Growing)", "Mustard (Growing)", "Potato (Plant)"] },
];

const farmingTips = [
  {
    title: "Soil Health Management",
    icon: Thermometer,
    tips: [
      "Test soil pH regularly - ideal range 6.0-7.5",
      "Add organic matter to improve soil structure",
      "Practice crop rotation to maintain nutrients",
      "Use cover crops during fallow periods",
    ],
  },
  {
    title: "Irrigation Best Practices", 
    icon: Droplets,
    tips: [
      "Water early morning or late evening",
      "Use drip irrigation for water efficiency",
      "Monitor soil moisture at 6-inch depth",
      "Avoid overwatering to prevent root rot",
    ],
  },
  {
    title: "Pest & Disease Control",
    icon: Bug,
    tips: [
      "Regular field monitoring for early detection",
      "Use integrated pest management (IPM)",
      "Maintain field hygiene and remove crop residues",
      "Apply pesticides only when threshold is reached",
    ],
  },
  {
    title: "Weather Management",
    icon: Calendar,
    tips: [
      "Plan operations based on weather forecasts",
      "Protect crops during extreme weather events",
      "Adjust irrigation based on rainfall",
      "Use weather data for timing field operations",
    ],
  },
];

export default function CropCalendar() {
  const [selectedSeason, setSelectedSeason] = useState("kharif");
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high": return "bg-red-100 text-red-700";
      case "medium": return "bg-yellow-100 text-yellow-700";  
      case "low": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6 p-4 max-w-7xl mx-auto">
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold text-gradient-nature mb-2">
          Crop Calendar
        </h1>
        <p className="text-muted-foreground">
          Plan your farming activities throughout the year
        </p>
      </div>

      {/* Season Selector */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Select Season</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(seasons).map(([key, season]) => (
            <Button
              key={key}
              variant={selectedSeason === key ? "default" : "outline"}
              className={`h-auto p-6 flex flex-col items-center space-y-2 ${
                selectedSeason === key ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedSeason(key)}
            >
              <div className={`w-4 h-4 rounded-full ${season.color}`}></div>
              <div className="text-lg font-semibold">{season.name}</div>
              <div className="text-sm text-muted-foreground">{season.period}</div>
              <div className="text-xs">{season.description}</div>
            </Button>
          ))}
        </div>
      </section>

      {/* Current Month Activities */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Current Activities - {currentMonth}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentMonthActivities.map((activity, index) => (
            <Card key={index} className="hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">{activity.crop}</h3>
                  <Badge className={getPriorityColor(activity.priority)}>
                    {activity.priority}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="text-primary font-medium">{activity.activity}</div>
                  <div className="text-sm text-muted-foreground">
                    <strong>Deadline:</strong> {activity.deadline}
                  </div>
                  <p className="text-sm">{activity.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 12-Month Calendar Grid */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Year-Round Calendar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {cropCalendar.map((month, index) => (
            <Card 
              key={index} 
              className={`hover-lift ${month.month === currentMonth ? "ring-2 ring-primary" : ""}`}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {month.month}
                  {month.month === currentMonth && (
                    <Badge variant="default" className="ml-auto">Current</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {month.crops.map((crop, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      {crop}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Farming Tips */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Seasonal Farming Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {farmingTips.map((tip, index) => (
            <Card key={index} className="hover-lift">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <tip.icon className="h-5 w-5 text-primary" />
                  {tip.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tip.tips.map((tipText, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <Lightbulb className="h-3 w-3 text-yellow-500 mt-1 flex-shrink-0" />
                      <span>{tipText}</span>
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