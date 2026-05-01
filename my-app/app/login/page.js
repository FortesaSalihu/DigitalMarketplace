"use client"


import LoginPage from "@/components/login/LoginPage"
import Category from "@/components/categories/CategoriesBar";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <Category />
      <LoginPage />
      <Footer />
    </>
  );
}