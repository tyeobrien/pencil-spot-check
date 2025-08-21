import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImageCaptureGuide } from "@/components/ImageCaptureGuide";
import { toast } from "sonner";

export const Capture = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const navigate = useNavigate();
  
  const totalSteps = 4;

  const handleCapture = () => {
    // Simulate image capture
    const newImage = `captured-image-${currentStep + 1}`;
    setCapturedImages(prev => [...prev, newImage]);
    toast.success(`Image ${currentStep + 1} captured successfully!`);
    
    // Auto-advance to next step
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Navigate to damage selection
      navigate("/damage-selection", { 
        state: { capturedImages } 
      });
    }
  };

  const handleSkip = () => {
    toast.info("Step skipped");
    handleNext();
  };

  return (
    <ImageCaptureGuide
      currentStep={currentStep}
      totalSteps={totalSteps}
      onCapture={handleCapture}
      onNext={handleNext}
      onSkip={handleSkip}
    />
  );
};

export default Capture;