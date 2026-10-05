import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoryShelves } from "@/components/home/CategoryShelves";
import { FreshRecommendations } from "@/components/home/FreshRecommendations";
import { SellerCtaSection } from "@/components/home/SellerCtaSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <HeroSection />
      <CategoryShelves />
      <FreshRecommendations />
      <SellerCtaSection />
      <HowItWorksSection />
      <TestimonialsSection />
    </div>
  );
}
