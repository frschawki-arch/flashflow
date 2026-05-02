'use client';
import React, { useState, useEffect } from 'react';
import AppLogo from '@/components/ui/AppLogo';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 px-4 py-3 ${
          scrolled ? 'bg-black/90 backdrop-blur-md border-b border-border' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleScrollTo('hero')}>
            <AppLogo size={36} />
            <span
              className="font-extrabold text-lg tracking-tight text-foreground hidden sm:block"
              style={{ letterSpacing: '-0.02em' }}
            >
              Flash<span className="text-primary">Flow</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <button
              onClick={() => handleScrollTo('features')}
              className="hover:text-primary transition-colors"
            >
              المميزات
            </button>
            <button
              onClick={() => handleScrollTo('testimonials')}
              className="hover:text-primary transition-colors"
            >
              آراء الزبائن
            </button>
            <button
              onClick={() => handleScrollTo('order')}
              className="hover:text-primary transition-colors"
            >
              اطلب دروك
            </button>
          </div>

          {/* CTA */}
          <button
            onClick={() => handleScrollTo('order')}
            className="hidden sm:flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-bold hover:opacity-90 transition-all animate-pulse-cyan"
          >
            اطلب الآن
          </button>

          {/* Hamburger */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className={`block h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
              />
              <span
                className={`block h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`block h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center gap-8"
          onClick={() => setMenuOpen(false)}
        >
          <button
            onClick={() => handleScrollTo('features')}
            className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
          >
            المميزات
          </button>
          <button
            onClick={() => handleScrollTo('testimonials')}
            className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
          >
            آراء الزبائن
          </button>
          <button
            onClick={() => handleScrollTo('order')}
            className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
          >
            اطلب دروك
          </button>
          <button
            onClick={() => handleScrollTo('order')}
            className="mt-4 bg-primary text-primary-foreground px-10 py-4 rounded-full text-lg font-bold animate-pulse-cyan"
          >
            اطلب الآن
          </button>
        </div>
      )}
    </>
  );
}