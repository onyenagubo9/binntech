"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Projects from "@/components/Projects"; // 👈 Add this import
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <Navbar />

        <section className="text-center py-16">
          <Hero />
        </section>

        <section className="py-20 border-t border-gray-700">
          <About />
        </section>

        <section className="py-20 border-t border-gray-700">
          <Features />
        </section>

        <section className="py-20 border-t border-gray-700">
          <Skills />
        </section>

        {/* 👇 New Projects Section */}
        <section className="py-20 border-t border-gray-700">
          <Projects />
        </section>

         {/* 👇 New Projects Section */}
        <section className="py-20 border-t border-gray-700">
          <ContactSection />
        </section>

        <Footer />
      </div>
    </main>
  );
}
