
import React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="bg-crypto-yellow p-1.5 rounded">
        <TrendingUp className="text-black" size={size === "sm" ? 16 : size === "md" ? 20 : 24} />
      </div>
      <span className={cn("font-bold tracking-tight", sizeClasses[size])}>
        NegociaçãoParaIniciantes
      </span>
    </div>
  );
}
