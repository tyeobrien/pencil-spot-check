import { Camera, FileText } from "lucide-react";

export const AppHeader = () => {
  return (
    <header className="bg-gradient-card border-b border-border/50 shadow-elegant">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-elegant">
              <Camera className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">PencilCheck</h1>
              <p className="text-sm text-muted-foreground">Damage Detection</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
};