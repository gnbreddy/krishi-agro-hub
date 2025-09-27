import { useState } from "react";
import { Calculator, Beaker, Calendar, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const crops = [
  { value: "rice", label: "Rice", n: 120, p: 60, k: 40 },
  { value: "wheat", label: "Wheat", n: 100, p: 50, k: 25 },
  { value: "cotton", label: "Cotton", n: 150, p: 75, k: 50 },
  { value: "sugarcane", label: "Sugarcane", n: 200, p: 100, k: 150 },
  { value: "maize", label: "Maize", n: 120, p: 60, k: 40 },
  { value: "soybean", label: "Soybean", n: 30, p: 75, k: 45 },
];

const soilTypes = [
  { value: "sandy", label: "Sandy", nFactor: 1.2, pFactor: 1.0, kFactor: 1.3 },
  { value: "loamy", label: "Loamy", nFactor: 1.0, pFactor: 1.0, kFactor: 1.0 },
  { value: "clay", label: "Clay", nFactor: 0.8, pFactor: 0.9, kFactor: 0.7 },
  { value: "silty", label: "Silty", nFactor: 0.9, pFactor: 1.1, kFactor: 0.8 },
];

const fertilizers = [
  { name: "Urea", n: 46, p: 0, k: 0 },
  { name: "DAP", n: 18, p: 46, k: 0 },
  { name: "NPK 10:26:26", n: 10, p: 26, k: 26 },
  { name: "NPK 20:20:20", n: 20, p: 20, k: 20 },
  { name: "MOP", n: 0, p: 0, k: 60 },
  { name: "SSP", n: 0, p: 16, k: 0 },
];

const soilTestingSteps = [
  {
    step: "Sample Collection",
    icon: "🌱",
    description: "Collect soil samples from 6-8 inch depth at multiple points",
    duration: "15-20 minutes",
  },
  {
    step: "Laboratory Analysis",
    icon: "🧪", 
    description: "Send samples to certified soil testing laboratory",
    duration: "3-5 days",
  },
  {
    step: "Report Analysis",
    icon: "📊",
    description: "Review pH, NPK levels, organic matter content",
    duration: "30 minutes",
  },
  {
    step: "Recommendation",
    icon: "📝",
    description: "Get customized fertilizer recommendations based on results",
    duration: "Planning phase",
  },
];

export default function FertilizerCalculator() {
  const [formData, setFormData] = useState({
    crop: "",
    area: "",
    soilType: "",
    pH: "",
    previousCrop: "",
  });
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const calculateFertilizer = () => {
    if (!formData.crop || !formData.area || !formData.soilType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const selectedCrop = crops.find(c => c.value === formData.crop);
    const selectedSoil = soilTypes.find(s => s.value === formData.soilType);
    const area = parseFloat(formData.area);

    if (!selectedCrop || !selectedSoil || !area) return;

    // Calculate NPK requirements adjusted for soil type
    const nRequired = selectedCrop.n * selectedSoil.nFactor * area;
    const pRequired = selectedCrop.p * selectedSoil.pFactor * area;
    const kRequired = selectedCrop.k * selectedSoil.kFactor * area;

    // pH adjustment factor
    const pH = parseFloat(formData.pH) || 7.0;
    const phFactor = pH < 6.5 ? 1.2 : pH > 8.0 ? 1.1 : 1.0;

    setResults({
      nRequired: Math.round(nRequired * phFactor),
      pRequired: Math.round(pRequired * phFactor),
      kRequired: Math.round(kRequired * phFactor),
      crop: selectedCrop.label,
      area: area,
      soilType: selectedSoil.label,
      fertilizers: calculateFertilizerAmounts(nRequired * phFactor, pRequired * phFactor, kRequired * phFactor),
    });

    toast({
      title: "Calculation Complete",
      description: "Fertilizer recommendations generated successfully",
    });
  };

  const calculateFertilizerAmounts = (n: number, p: number, k: number) => {
    // Simple fertilizer calculation - DAP for P, MOP for K, Urea for remaining N
    const dap = Math.min(p / 0.46, n / 0.18); // Use DAP for phosphorus
    const remainingN = Math.max(0, n - (dap * 0.18));
    const urea = remainingN / 0.46;
    const mop = k / 0.60;

    return {
      urea: Math.round(urea),
      dap: Math.round(dap), 
      mop: Math.round(mop),
    };
  };

  return (
    <div className="space-y-6 p-4 max-w-7xl mx-auto">
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold text-gradient-nature mb-2">
          Fertilizer Calculator
        </h1>
        <p className="text-muted-foreground">
          Calculate optimal fertilizer requirements for your crops
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calculator Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Smart Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="crop">Crop Type *</Label>
              <Select value={formData.crop} onValueChange={(value) => setFormData({...formData, crop: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  {crops.map((crop) => (
                    <SelectItem key={crop.value} value={crop.value}>
                      {crop.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">Area (Acres) *</Label>
              <Input
                id="area"
                type="number"
                placeholder="Enter area in acres"
                value={formData.area}
                onChange={(e) => setFormData({...formData, area: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="soilType">Soil Type *</Label>
              <Select value={formData.soilType} onValueChange={(value) => setFormData({...formData, soilType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  {soilTypes.map((soil) => (
                    <SelectItem key={soil.value} value={soil.value}>
                      {soil.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pH">Soil pH (Optional)</Label>
              <Input
                id="pH"
                type="number"
                step="0.1"
                placeholder="e.g., 6.5"
                value={formData.pH}
                onChange={(e) => setFormData({...formData, pH: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="previousCrop">Previous Crop (Optional)</Label>
              <Input
                id="previousCrop"
                placeholder="e.g., Cotton, Wheat"
                value={formData.previousCrop}
                onChange={(e) => setFormData({...formData, previousCrop: e.target.value})}
              />
            </div>

            <Button 
              onClick={calculateFertilizer}
              className="w-full hover-glow"
              size="lg"
            >
              Calculate Fertilizer Requirements
            </Button>
          </CardContent>
        </Card>

        {/* Results Display */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Beaker className="h-5 w-5" />
              NPK Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            {results ? (
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg bg-blue-50">
                    <div className="text-2xl font-bold text-blue-600">
                      {results.nRequired}
                    </div>
                    <div className="text-sm text-blue-700">Nitrogen (kg)</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-green-50">
                    <div className="text-2xl font-bold text-green-600">
                      {results.pRequired}
                    </div>
                    <div className="text-sm text-green-700">Phosphorus (kg)</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-orange-50">
                    <div className="text-2xl font-bold text-orange-600">
                      {results.kRequired}
                    </div>
                    <div className="text-sm text-orange-700">Potassium (kg)</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Recommended Fertilizers:</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 rounded border">
                      <span>Urea (46-0-0)</span>
                      <Badge>{results.fertilizers.urea} kg</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded border">
                      <span>DAP (18-46-0)</span>
                      <Badge>{results.fertilizers.dap} kg</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded border">
                      <span>MOP (0-0-60)</span>
                      <Badge>{results.fertilizers.mop} kg</Badge>
                    </div>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Application Schedule:</h4>
                  <div className="text-sm space-y-1">
                    <div>• Basal: 50% Urea + Full DAP + Full MOP</div>
                    <div>• Top Dressing: 50% Urea (30-35 days after sowing)</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Fill the form and click calculate to see results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Soil Testing Guide */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Soil Testing Guide</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {soilTestingSteps.map((step, index) => (
            <Card key={index} className="hover-lift">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="font-semibold mb-2">{step.step}</h3>
                <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                <Badge variant="outline">{step.duration}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Fertilizer Database */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Fertilizer Database</h2>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Common Fertilizers & NPK Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {fertilizers.map((fertilizer, index) => (
                <div key={index} className="p-4 rounded-lg border">
                  <h3 className="font-semibold mb-2">{fertilizer.name}</h3>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-blue-600">{fertilizer.n}%</div>
                      <div className="text-xs">N</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-green-600">{fertilizer.p}%</div>
                      <div className="text-xs">P</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-orange-600">{fertilizer.k}%</div>
                      <div className="text-xs">K</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}