import { useNavigate } from "react-router-dom";
import { AppHeader } from "@/components/AppHeader";
import { FeatureCard } from "@/components/FeatureCard";
import { Camera, FileText, History } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleStartCapture = () => {
    navigate("/capture");
  };

  const handleViewHistory = () => {
    const savedReport = localStorage.getItem('damageReport');
    if (savedReport) {
      navigate("/report");
    } else {
      navigate("/capture");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            Professional Pencil
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Inspection</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Capture, analyze, and document pencil damage with precision. Our guided inspection 
            process ensures consistent and accurate damage assessment.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <FeatureCard
            title="New Inspection"
            description="Start a comprehensive damage assessment with guided multi-angle photography and detailed annotation tools."
            icon={Camera}
            onClick={handleStartCapture}
            variant="default"
          />
          
          <FeatureCard
            title="View Reports"
            description="Access your inspection history, export detailed damage reports, and track pencil condition over time."
            icon={FileText}
            onClick={handleViewHistory}
            variant="secondary"
          />
        </div>

        {/* Process Overview */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-8">
            Simple 3-Step Process
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto text-primary-foreground font-bold text-lg">
                1
              </div>
              <h3 className="font-semibold text-foreground">Capture Images</h3>
              <p className="text-sm text-muted-foreground">
                Take guided photos from multiple angles
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto text-primary-foreground font-bold text-lg">
                2
              </div>
              <h3 className="font-semibold text-foreground">Select Regions</h3>
              <p className="text-sm text-muted-foreground">
                Mark damaged areas on interactive diagram
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto text-primary-foreground font-bold text-lg">
                3
              </div>
              <h3 className="font-semibold text-foreground">Generate Report</h3>
              <p className="text-sm text-muted-foreground">
                Get detailed analysis and recommendations
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
