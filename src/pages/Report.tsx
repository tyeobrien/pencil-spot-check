import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppHeader } from "@/components/AppHeader";
import { Badge } from "@/components/ui/badge";
import { Download, Home, RotateCcw, Calendar } from "lucide-react";
import { toast } from "sonner";

interface DamageReport {
  images: string[];
  selectedRegions: string[];
  annotations: Array<{
    x: number;
    y: number;
    severity: 'light' | 'moderate' | 'severe';
    region: string;
  }>;
  timestamp: string;
}

export const Report = () => {
  const [report, setReport] = useState<DamageReport | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedReport = localStorage.getItem('damageReport');
    if (savedReport) {
      setReport(JSON.parse(savedReport));
    } else {
      toast.error("No damage report found");
      navigate("/");
    }
  }, [navigate]);

  const handleExport = () => {
    if (!report) return;
    
    const dataStr = JSON.stringify(report, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pencil-damage-report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast.success("Report exported successfully!");
  };

  const handleNewInspection = () => {
    localStorage.removeItem('damageReport');
    navigate("/");
  };

  if (!report) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading report...</p>
        </div>
      </div>
    );
  }

  const severityCount = {
    light: report.annotations.filter(a => a.severity === 'light').length,
    moderate: report.annotations.filter(a => a.severity === 'moderate').length,
    severe: report.annotations.filter(a => a.severity === 'severe').length
  };

  const totalDamage = report.annotations.length;

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <div className="container mx-auto p-4 max-w-4xl">
        <Card className="bg-gradient-card border-border/50 shadow-elegant">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-foreground">
              Damage Assessment Report
            </CardTitle>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{new Date(report.timestamp).toLocaleDateString()}</span>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-foreground">{totalDamage}</div>
                <div className="text-sm text-muted-foreground">Total Damage Points</div>
              </div>
              <div className="text-center p-4 bg-damage-light/10 rounded-lg">
                <div className="text-2xl font-bold text-damage-light">{severityCount.light}</div>
                <div className="text-sm text-muted-foreground">Light Damage</div>
              </div>
              <div className="text-center p-4 bg-damage-moderate/10 rounded-lg">
                <div className="text-2xl font-bold text-damage-moderate">{severityCount.moderate}</div>
                <div className="text-sm text-muted-foreground">Moderate Damage</div>
              </div>
              <div className="text-center p-4 bg-damage-severe/10 rounded-lg">
                <div className="text-2xl font-bold text-damage-severe">{severityCount.severe}</div>
                <div className="text-sm text-muted-foreground">Severe Damage</div>
              </div>
            </div>

            {/* Affected Regions */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Affected Regions</h3>
              <div className="flex flex-wrap gap-2">
                {report.selectedRegions.map(region => (
                  <Badge key={region} variant="secondary" className="capitalize">
                    {region.replace('-', ' ')}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Damage Analysis */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Damage Analysis</h3>
              <div className="bg-muted/30 rounded-lg p-4">
                {totalDamage === 0 ? (
                  <p className="text-center text-muted-foreground">No damage detected</p>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Overall Condition:</span>
                      <Badge variant={
                        severityCount.severe > 0 ? "destructive" :
                        severityCount.moderate > 2 ? "secondary" : 
                        "outline"
                      }>
                        {severityCount.severe > 0 ? "Poor" :
                         severityCount.moderate > 2 ? "Fair" : 
                         "Good"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Replacement Recommended:</span>
                      <span className={severityCount.severe > 0 || totalDamage > 5 ? "text-damage-severe" : "text-muted-foreground"}>
                        {severityCount.severe > 0 || totalDamage > 5 ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button variant="default" onClick={handleNewInspection} className="flex-1">
                <RotateCcw className="w-4 h-4 mr-2" />
                New Inspection
              </Button>
              <Button variant="outline" onClick={handleExport} className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button variant="secondary" onClick={() => navigate("/")} className="flex-1">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Report;