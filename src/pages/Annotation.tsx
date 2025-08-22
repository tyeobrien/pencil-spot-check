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
      
      <div className="container mx-auto mobile-container py-4 sm:py-6 max-w-4xl">
        <div className="mb-4 sm:mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-3 sm:mb-4 touch-target text-sm sm:text-base">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <Card className="bg-gradient-card border-border/50 shadow-elegant">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                Annotate Damage Points
              </CardTitle>
              <p className="text-sm sm:text-base text-muted-foreground">
                Tap on damaged areas in the images below. Select severity level first.
              </p>
            </CardHeader>
            
            <CardContent className="p-4 sm:p-6">
              {/* Severity Selector */}
              <div className="mb-4 sm:mb-6">
                <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Damage Severity</h4>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  {(['light', 'moderate', 'severe'] as const).map(severity => (
                    <Button
                      key={severity}
                      variant={currentSeverity === severity ? "damage" : "outline"}
                      onClick={() => setCurrentSeverity(severity)}
                      className="capitalize touch-target text-sm sm:text-base flex-1 sm:flex-none"
                    >
                      {severity}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Selected Regions */}
              <div className="mb-4 sm:mb-6">
                <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Selected Damage Regions</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedRegions.map((region: string) => (
                    <Badge key={region} variant="secondary" className="capitalize text-xs sm:text-sm">
                      {region.replace('-', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Image Annotation Area */}
              <div className="space-y-4 sm:space-y-6">
                {selectedRegions.map((region: string, index: number) => (
                  <Card key={region} className="border border-border/50">
                    <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
                      <h4 className="font-medium capitalize flex items-center gap-2 text-sm sm:text-base">
                        <ZoomIn className="w-4 h-4" />
                        {region.replace('-', ' ')} - Tap to mark damage
                      </h4>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-6 pt-0">
                      <div 
                        className="relative bg-muted rounded-lg aspect-video cursor-crosshair overflow-hidden touch-target"
                        onClick={(e) => handleImageClick(e, region)}
                      >
                        {/* Placeholder for actual image */}
                        <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                          <div className="text-center text-muted-foreground px-2">
                            <div className="text-3xl sm:text-4xl mb-2">📷</div>
                            <p className="text-sm sm:text-base">Captured Image #{index + 1}</p>
                            <p className="text-xs sm:text-sm">Tap to mark damage</p>
                          </div>
                        </div>
                        
                        {/* Annotation Points */}
                        {annotations
                          .filter(annotation => annotation.region === region)
                          .map((annotation, pointIndex) => (
                             <div
                               key={pointIndex}
                               className={`absolute w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white shadow-lg transform -translate-x-1.5 -translate-y-1.5 sm:-translate-x-2 sm:-translate-y-2 ${severityColors[annotation.severity]} touch-target`}
                               style={{
                                 left: `${annotation.x}%`,
                                 top: `${annotation.y}%`
                               }}
                               title={`${annotation.severity} damage`}
                             />
                           ))}
                       </div>
                       
                       {/* Region Annotations Count */}
                       <div className="mt-2 sm:mt-3 text-xs sm:text-sm text-muted-foreground">
                         {annotations.filter(a => a.region === region).length} damage points marked
                       </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Save Button */}
              <div className="mt-6 sm:mt-8 text-center">
                <Button 
                  variant="default" 
                  size="lg" 
                  onClick={handleSave}
                  className="w-full sm:w-auto min-w-48 touch-target text-sm sm:text-base"
                >
                  <Save className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
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