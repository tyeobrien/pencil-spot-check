import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppHeader } from "@/components/AppHeader";
import { Badge } from "@/components/ui/badge";
import { ZoomIn, Save, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface AnnotationPoint {
  x: number;
  y: number;
  severity: 'light' | 'moderate' | 'severe';
  region: string;
}

export const Annotation = () => {
  const [annotations, setAnnotations] = useState<AnnotationPoint[]>([]);
  const [currentSeverity, setCurrentSeverity] = useState<'light' | 'moderate' | 'severe'>('moderate');
  const location = useLocation();
  const navigate = useNavigate();
  
  const { capturedImages = [], selectedRegions = [] } = location.state || {};

  const handleImageClick = (event: React.MouseEvent<HTMLDivElement>, regionId: string) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    
    const newAnnotation: AnnotationPoint = {
      x,
      y,
      severity: currentSeverity,
      region: regionId
    };
    
    setAnnotations(prev => [...prev, newAnnotation]);
    toast.success("Damage point marked!");
  };

  const handleSave = () => {
    const damageReport = {
      images: capturedImages,
      selectedRegions,
      annotations,
      timestamp: new Date().toISOString()
    };
    
    // Store in localStorage for this demo
    localStorage.setItem('damageReport', JSON.stringify(damageReport));
    
    navigate("/report");
    toast.success("Damage report saved successfully!");
  };

  const severityColors = {
    light: 'bg-damage-light',
    moderate: 'bg-damage-moderate', 
    severe: 'bg-damage-severe'
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <Card className="bg-gradient-card border-border/50 shadow-elegant">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">
                Annotate Damage Points
              </CardTitle>
              <p className="text-muted-foreground">
                Click on damaged areas in the images below. Select severity level first.
              </p>
            </CardHeader>
            
            <CardContent>
              {/* Severity Selector */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Damage Severity</h4>
                <div className="flex gap-2">
                  {(['light', 'moderate', 'severe'] as const).map(severity => (
                    <Button
                      key={severity}
                      variant={currentSeverity === severity ? "damage" : "outline"}
                      onClick={() => setCurrentSeverity(severity)}
                      className="capitalize"
                    >
                      {severity}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Selected Regions */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Selected Damage Regions</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedRegions.map((region: string) => (
                    <Badge key={region} variant="secondary" className="capitalize">
                      {region.replace('-', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Image Annotation Area */}
              <div className="space-y-6">
                {selectedRegions.map((region: string, index: number) => (
                  <Card key={region} className="border border-border/50">
                    <CardHeader className="pb-3">
                      <h4 className="font-medium capitalize flex items-center gap-2">
                        <ZoomIn className="w-4 h-4" />
                        {region.replace('-', ' ')} - Click to mark damage
                      </h4>
                    </CardHeader>
                    <CardContent>
                      <div 
                        className="relative bg-muted rounded-lg aspect-video cursor-crosshair overflow-hidden"
                        onClick={(e) => handleImageClick(e, region)}
                      >
                        {/* Placeholder for actual image */}
                        <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                          <div className="text-center text-muted-foreground">
                            <div className="text-4xl mb-2">📷</div>
                            <p>Captured Image #{index + 1}</p>
                            <p className="text-xs">Click to mark damage</p>
                          </div>
                        </div>
                        
                        {/* Annotation Points */}
                        {annotations
                          .filter(annotation => annotation.region === region)
                          .map((annotation, pointIndex) => (
                            <div
                              key={pointIndex}
                              className={`absolute w-4 h-4 rounded-full border-2 border-white shadow-lg transform -translate-x-2 -translate-y-2 ${severityColors[annotation.severity]}`}
                              style={{
                                left: `${annotation.x}%`,
                                top: `${annotation.y}%`
                              }}
                              title={`${annotation.severity} damage`}
                            />
                          ))}
                      </div>
                      
                      {/* Region Annotations Count */}
                      <div className="mt-3 text-sm text-muted-foreground">
                        {annotations.filter(a => a.region === region).length} damage points marked
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Save Button */}
              <div className="mt-8 text-center">
                <Button 
                  variant="default" 
                  size="lg" 
                  onClick={handleSave}
                  className="min-w-48"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save Damage Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Annotation;