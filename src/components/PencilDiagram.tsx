import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertTriangle } from "lucide-react";

interface PencilRegion {
  id: string;
  name: string;
  description: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface PencilDiagramProps {
  selectedRegions: string[];
  onRegionSelect: (regionId: string) => void;
  onNext: () => void;
}

const pencilRegions: PencilRegion[] = [
  { id: "eraser", name: "Eraser", description: "Metal ferrule and pink eraser", x: 10, y: 45, width: 40, height: 10 },
  { id: "upper-shaft", name: "Upper Shaft", description: "Wood body near eraser", x: 50, y: 45, width: 80, height: 10 },
  { id: "middle-shaft", name: "Middle Shaft", description: "Main body section", x: 130, y: 45, width: 100, height: 10 },
  { id: "lower-shaft", name: "Lower Shaft", description: "Wood body near tip", x: 230, y: 45, width: 80, height: 10 },
  { id: "tip", name: "Tip", description: "Graphite and wood point", x: 310, y: 45, width: 40, height: 10 }
];

export const PencilDiagram = ({ selectedRegions, onRegionSelect, onNext }: PencilDiagramProps) => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-gradient-card border-border/50 shadow-elegant">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-foreground">
              Select Damage Areas
            </CardTitle>
            <p className="text-muted-foreground">
              Tap on the pencil regions where you notice damage or wear
            </p>
          </CardHeader>
          
          <CardContent className="p-6">
            {/* Pencil SVG Diagram */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <svg width="360" height="100" viewBox="0 0 360 100" className="drop-shadow-lg">
                  {/* Main pencil body */}
                  <rect x="50" y="45" width="260" height="10" fill="#F4C430" stroke="#D4A017" strokeWidth="1" rx="2"/>
                  
                  {/* Eraser */}
                  <rect x="10" y="45" width="40" height="10" fill="#FF69B4" stroke="#C1477C" strokeWidth="1" rx="2"/>
                  <rect x="45" y="43" width="10" height="14" fill="#C0C0C0" stroke="#808080" strokeWidth="1"/>
                  
                  {/* Tip */}
                  <polygon points="310,45 310,55 350,50" fill="#8B4513" stroke="#654321" strokeWidth="1"/>
                  <polygon points="345,48 345,52 355,50" fill="#2C2C2C" stroke="#000000" strokeWidth="1"/>
                  
                  {/* Brand text */}
                  <text x="180" y="52" textAnchor="middle" fontSize="8" fill="#8B4513" fontFamily="serif">
                    #2 HB
                  </text>
                  
                  {/* Interactive regions */}
                  {pencilRegions.map((region) => (
                    <rect
                      key={region.id}
                      x={region.x}
                      y={region.y}
                      width={region.width}
                      height={region.height}
                      fill={
                        selectedRegions.includes(region.id)
                          ? "rgba(251, 146, 60, 0.7)"  // damage-moderate with opacity
                          : hoveredRegion === region.id
                          ? "rgba(251, 146, 60, 0.3)"
                          : "transparent"
                      }
                      stroke={
                        selectedRegions.includes(region.id) || hoveredRegion === region.id
                          ? "#FB9236"
                          : "transparent"
                      }
                      strokeWidth="2"
                      className="cursor-pointer transition-all duration-200"
                      onMouseEnter={() => setHoveredRegion(region.id)}
                      onMouseLeave={() => setHoveredRegion(null)}
                      onClick={() => onRegionSelect(region.id)}
                    />
                  ))}
                </svg>
              </div>
            </div>

            {/* Region Info */}
            {(hoveredRegion || selectedRegions.length > 0) && (
              <div className="mb-6">
                {hoveredRegion && (
                  <div className="text-center text-sm text-muted-foreground mb-2">
                    {pencilRegions.find(r => r.id === hoveredRegion)?.description}
                  </div>
                )}
                
                {selectedRegions.length > 0 && (
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-damage-moderate" />
                      Selected Damage Areas ({selectedRegions.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedRegions.map(regionId => {
                        const region = pencilRegions.find(r => r.id === regionId);
                        return (
                          <div
                            key={regionId}
                            className="bg-damage-moderate/10 border border-damage-moderate/30 rounded-md px-3 py-1 text-sm text-damage-moderate"
                          >
                            {region?.name}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center">
              <Button 
                variant="outline" 
                onClick={() => onRegionSelect('')}
                disabled={selectedRegions.length === 0}
              >
                Clear Selection
              </Button>
              <Button 
                variant="default" 
                onClick={onNext}
                disabled={selectedRegions.length === 0}
                className="min-w-32"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};