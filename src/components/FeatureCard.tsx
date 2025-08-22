import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  variant?: "default" | "secondary";
}

export const FeatureCard = ({ 
  title, 
  description, 
  icon: Icon, 
  onClick, 
  variant = "default" 
}: FeatureCardProps) => {
  return (
    <Card className="bg-gradient-card border-border/50 hover:shadow-elegant transition-all duration-300 group touch-card" onClick={onClick}>
      <CardContent className="p-4 sm:p-6 text-center">
        <div className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center transition-all duration-300 touch-target ${
          variant === "default" 
            ? "bg-gradient-primary group-hover:shadow-elegant" 
            : "bg-secondary group-hover:bg-secondary/80"
        }`}>
          <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${
            variant === "default" 
              ? "text-primary-foreground" 
              : "text-secondary-foreground"
          }`} />
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 leading-relaxed">{description}</p>
        <Button variant={variant === "default" ? "default" : "secondary"} className="w-full touch-target text-sm sm:text-base">
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
};