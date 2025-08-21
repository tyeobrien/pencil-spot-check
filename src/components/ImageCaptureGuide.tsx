import { useState } from "react";
import { Camera, CheckCircle, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNativeCamera } from "@/hooks/useNativeCamera";

interface ImageCaptureGuideProps {
  currentStep: number;
  totalSteps: number;
  onCapture: (imageUri?: string) => void;
  onNext: () => void;
  onSkip?: () => void;
}

const steps = [
  { label: "Front View", description: "Center the pencil horizontally" },
  { label: "Side View", description: "Rotate 90° to show the side profile" },
  { label: "Back View", description: "Show the opposite side from front" },
  { label: "Top View", description: "Point tip toward camera" }
];

export const ImageCaptureGuide = ({ 
  currentStep, 
  totalSteps, 
  onCapture, 
  onNext,
  onSkip 
}: ImageCaptureGuideProps) => {
  const currentStepInfo = steps[currentStep];
  const { takePicture, selectFromGallery } = useNativeCamera();
  const [isCapturing, setIsCapturing] = useState(false);

  const handleNativeCapture = async () => {
    try {
      setIsCapturing(true);
      const imageUri = await takePicture();
      onCapture(imageUri);
    } catch (error) {
      console.error('Camera error:', error);
      // Fallback to regular capture
      onCapture();
    } finally {
      setIsCapturing(false);
    }
  };

  const handleGallerySelect = async () => {
    try {
      setIsCapturing(true);
      const imageUri = await selectFromGallery();
      onCapture(imageUri);
    } catch (error) {
      console.error('Gallery error:', error);
      // Fallback to regular capture
      onCapture();
    } finally {
      setIsCapturing(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-camera flex flex-col">
      {/* Header */}
      <div className="p-4 text-center border-b border-white/10">
        <h2 className="text-white text-xl font-semibold mb-2">
          Step {currentStep + 1} of {totalSteps}
        </h2>
        <h3 className="text-white/90 text-lg">{currentStepInfo.label}</h3>
        <p className="text-white/70 text-sm mt-1">{currentStepInfo.description}</p>
      </div>

      {/* Camera Viewfinder Area */}
      <div className="flex-1 relative flex items-center justify-center p-4">
        <div className="relative">
          {/* Pencil outline guide */}
          <div className="w-80 h-60 border-2 border-dashed border-white/40 rounded-lg flex items-center justify-center">
            <div className="text-center text-white/60">
              <Camera className="w-12 h-12 mx-auto mb-2" />
              <p className="text-sm">Align pencil within guide</p>
            </div>
          </div>
          
          {/* Corner markers */}
          <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-white/60 -translate-x-2 -translate-y-2" />
          <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-white/60 translate-x-2 -translate-y-2" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-white/60 -translate-x-2 translate-y-2" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-white/60 translate-x-2 translate-y-2" />
        </div>
      </div>

      {/* Progress Steps */}
      <div className="p-4">
        <div className="flex justify-center gap-2 mb-6">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index < currentStep 
                  ? 'bg-primary' 
                  : index === currentStep 
                    ? 'bg-white' 
                    : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <div className="flex gap-3">
            <Button 
              variant="camera" 
              size="lg" 
              className="flex-1"
              onClick={handleNativeCapture}
              disabled={isCapturing}
            >
              <Camera className="w-5 h-5 mr-2" />
              {isCapturing ? 'Capturing...' : 'Take Photo'}
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleGallerySelect}
              disabled={isCapturing}
              className="text-white border-white/30 hover:bg-white/10"
            >
              <ImageIcon className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="flex gap-3">
            {currentStep < totalSteps - 1 ? (
              <Button 
                variant="ghost" 
                size="lg"
                onClick={onNext}
                className="flex-1 text-white hover:bg-white/10"
              >
                Next
              </Button>
            ) : (
              <Button 
                variant="default" 
                size="lg"
                onClick={onNext}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Done
              </Button>
            )}
          </div>
        </div>
        
        {onSkip && (
          <Button 
            variant="ghost" 
            className="w-full mt-3 text-white/70 hover:bg-white/5"
            onClick={onSkip}
          >
            Skip This Step
          </Button>
        )}
      </div>
    </div>
  );
};