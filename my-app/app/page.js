"use client";
import Header from "@/components/header/Header"
import Category from "@/components/categories/CategoriesBar";
import HeroSection from "@/components/home/hero/HeroSection"

export default function Home() {
  return (
    <div>
      <Header />
      <Category />
      <HeroSection />
    </div>
  );
}
