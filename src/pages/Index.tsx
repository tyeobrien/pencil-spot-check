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
      
      <main className="container mx-auto mobile-container py-4 sm:py-6 md:py-8">
        {/* Hero Section */}
        <div className="text-center mobile-section">
          <h1 className="mobile-title font-bold text-foreground mb-4 leading-tight px-2">
            Professional Pencil
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Inspection</span>
          </h1>
          <p className="mobile-subtitle text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
            Capture, analyze, and document pencil damage with precision. Our guided inspection 
            process ensures consistent and accurate damage assessment.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 max-w-4xl mx-auto px-2">
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
        <div className="mobile-section text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-6 sm:mb-8 px-2">
            Simple 3-Step Process
          </h2>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-3 max-w-3xl mx-auto px-2">
            <div className="space-y-3 sm:space-y-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-primary rounded-full flex items-center justify-center mx-auto text-primary-foreground font-bold text-lg touch-target">
                1
              </div>
              <h3 className="font-semibold text-foreground mobile-body">Capture Images</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Take guided photos from multiple angles
              </p>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-primary rounded-full flex items-center justify-center mx-auto text-primary-foreground font-bold text-lg touch-target">
                2
              </div>
              <h3 className="font-semibold text-foreground mobile-body">Select Regions</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Mark damaged areas on interactive diagram
              </p>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-primary rounded-full flex items-center justify-center mx-auto text-primary-foreground font-bold text-lg touch-target">
                3
              </div>
              <h3 className="font-semibold text-foreground mobile-body">Generate Report</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
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
