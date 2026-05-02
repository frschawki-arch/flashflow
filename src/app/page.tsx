import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import TestimonialsSection from './components/TestimonialsSection';
import OrderFormSection from './components/OrderFormSection';

export default function LandingPage() {
  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <OrderFormSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}