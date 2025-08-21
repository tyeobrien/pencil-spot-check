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
    <Card className="bg-gradient-card border-border/50 hover:shadow-elegant transition-all duration-300 group cursor-pointer" onClick={onClick}>
      <CardContent className="p-6 text-center">
        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300 ${
          variant === "default" 
            ? "bg-gradient-primary group-hover:shadow-elegant" 
            : "bg-secondary group-hover:bg-secondary/80"
        }`}>
          <Icon className={`w-8 h-8 ${
            variant === "default" 
              ? "text-primary-foreground" 
              : "text-secondary-foreground"
          }`} />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4 leading-relaxed">{description}</p>
        <Button variant={variant === "default" ? "default" : "secondary"} className="w-full">
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
};