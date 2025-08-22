import { Camera, FileText } from "lucide-react";

export const AppHeader = () => {
  return (
    <header className="bg-gradient-card border-b border-border/50 shadow-elegant">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-elegant touch-target">
              <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-foreground">PencilCheck</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">Damage Detection</p>
            </div>
          </div>
          <div className="flex items-center gap-2 touch-target">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
};