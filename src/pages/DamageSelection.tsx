import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PencilDiagram } from "@/components/PencilDiagram";
import { AppHeader } from "@/components/AppHeader";

export const DamageSelection = () => {
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  
  const capturedImages = location.state?.capturedImages || [];

  const handleRegionSelect = (regionId: string) => {
    if (regionId === '') {
      // Clear all selections
      setSelectedRegions([]);
      return;
    }
    
    setSelectedRegions(prev => 
      prev.includes(regionId)
        ? prev.filter(id => id !== regionId)
        : [...prev, regionId]
    );
  };

  const handleNext = () => {
    navigate("/annotation", {
      state: {
        capturedImages,
        selectedRegions
      }
    });
  };

  return (
    <div>
      <AppHeader />
      <PencilDiagram
        selectedRegions={selectedRegions}
        onRegionSelect={handleRegionSelect}
        onNext={handleNext}
      />
    </div>
  );
};

export default DamageSelection;