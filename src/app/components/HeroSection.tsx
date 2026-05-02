'use client';
import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPct = (clientX / innerWidth - 0.5) * 20;
      const yPct = (clientY / innerHeight - 0.5) * 10;
      const glows = heroRef.current.querySelectorAll<HTMLElement>('.parallax-glow');
      glows.forEach((glow, i) => {
        const factor = (i + 1) * 0.4;
        glow.style.transform = `translate(${xPct * factor}px, ${yPct * factor}px)`;
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full min-h-screen overflow-hidden bg-background"
      style={{ borderBottomLeftRadius: '80px' }}
    >
      {/* Background product image — full bleed */}
      <div className="absolute inset-0 z-0">
        <AppImage
          src="/assets/images/IMG_7183-1777678935505.png"
          alt="شريط LED RGB مضيء بألوان نيون في غرفة مظلمة، ضوء سيان وبنفسجي على الجدران"
          fill
          priority
          className="object-cover object-center animate-rgb"
          sizes="100vw"
        />
        {/* Dark scrim for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50" />
      </div>

      {/* Atmospheric glow blobs */}
      <div
        className="parallax-glow absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none transition-transform duration-300"
        style={{ background: 'radial-gradient(circle, #00FFCC 0%, transparent 70%)' }}
      />
      <div
        className="parallax-glow absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px] opacity-15 pointer-events-none transition-transform duration-300"
        style={{ background: 'radial-gradient(circle, #BF00FF 0%, transparent 70%)' }}
      />

      {/* Floating Info Card — top left on mobile, top right on desktop */}
      <div
        className="absolute top-24 right-4 md:right-12 z-20 animate-float hidden md:block"
        style={{ maxWidth: '280px' }}
      >
        <div className="glass-dark rounded-3xl p-6 neon-border-cyan">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(0,255,204,0.15)', border: '1px solid rgba(0,255,204,0.4)' }}
            >
              <Icon name="BoltIcon" size={20} className="text-primary" variant="solid" />
            </div>
            <span className="font-bold text-foreground text-sm">توصيل سريع</span>
          </div>
          <div className="space-y-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>في كل ولايات الجزائر</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: '0.5s' }} />
              <span>3-5 أيام للتوصيل</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '1s' }} />
              <span>الدفع عند الاستلام</span>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t border-border">
            <a href="#order" className="flex items-center justify-between text-primary text-xs font-bold hover:opacity-80 transition-opacity">
              <span>اطلب دروك</span>
              <Icon name="ArrowLeftIcon" size={14} className="text-primary" />
            </a>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-end min-h-screen max-w-6xl mx-auto px-4 pb-16 pt-32">
        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2 mb-6 w-fit"
          style={{
            background: 'rgba(0,255,204,0.1)',
            border: '1px solid rgba(0,255,204,0.3)',
            borderRadius: '100px',
            padding: '6px 16px',
          }}
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-primary text-xs font-bold tracking-widest uppercase">
            STASCIA LED RGB 10M
          </span>
        </div>

        {/* Main Headline — text-highlight technique */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-8 max-w-3xl"
          style={{ lineHeight: 1.25 }}
        >
          <span className="text-highlight-neon">ضوء يجيب</span>
          <br />
          <span className="text-highlight-neon">الحياة</span>{' '}
          <span className="text-highlight-accent">لبيتك</span>
        </h1>

        {/* Sub */}
        <p className="text-lg md:text-xl text-foreground/80 max-w-xl mb-10 leading-relaxed">
          شريط LED RGB 10 متر — بريموت، يسينك مع الموسيقى، وسهل التركيب. جرب الفرق!
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <a
            href="#order"
            className="flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-base hover:opacity-90 transition-all animate-pulse-cyan"
          >
            <Icon name="ShoppingCartIcon" size={20} className="text-primary-foreground" />
            اطلب دروك
          </a>
          <a
            href="#features"
            className="flex items-center gap-3 border border-foreground/20 text-foreground px-8 py-4 rounded-full font-bold text-base hover:border-primary hover:text-primary transition-all"
          >
            شوف المميزات
            <Icon name="ChevronDownIcon" size={18} className="text-current" />
          </a>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-border">
          {[
            { value: '10M', label: 'طول الشريط' },
            { value: '16+', label: 'لون مختلف' },
            { value: '58', label: 'ولاية توصيل' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="text-3xl font-extrabold text-primary">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}