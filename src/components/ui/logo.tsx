
import React from "react";
import { cn } from "@/lib/utils";
import { Bot, TrendingUp } from "lucide-react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  variant?: "dark" | "light";
}

export function Logo({ 
  className, 
  size = "md", 
  showTagline = false,
  variant = "dark"
}: LogoProps) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const iconSize = size === "sm" ? 16 : size === "md" ? 20 : 24;
  const taglineClass = size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base";
  
  return (
    <div className={cn("flex flex-col items-start", className)}>
      <div className="flex items-center gap-2">
        <div className="rounded-full bg-trading-primary p-1.5">
          <div className="relative">
            <Bot className="text-white" size={iconSize} />
            <TrendingUp 
              className="absolute text-white bottom-0 right-0 transform translate-x-1/4" 
              size={iconSize * 0.7} 
              strokeWidth={2.5}
            />
          </div>
        </div>
        <span className={cn("font-bold tracking-tight", sizeClasses[size])}>
          TradingForDummies
        </span>
      </div>
      
      {showTagline && (
        <span className={cn("text-trading-text-secondary mt-1 font-medium", taglineClass)}>
          Negociação de criptomoedas de forma fácil
        </span>
      )}
    </div>
  );
}
