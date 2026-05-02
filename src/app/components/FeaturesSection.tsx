'use client';
import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const features = [
  {
    id: 'coverage',
    icon: 'HomeIcon',
    title: '10 متر يغطي كل الغرفة',
    desc: 'شريط طويل 10 متر كافي لغرفة كاملة أو حتى صالون كبير. ما تحتاجش تشري أكثر من واحد!',
    accentColor: '#00FFCC',
    colSpan: 'md:col-span-1',
    featured: false,
  },
  {
    id: 'rgb',
    icon: 'SwatchIcon',
    title: 'RGB + بريموت',
    desc: 'غيّر الألوان كيما تحب بريموت في إيدك. أكثر من 16 لون وأوضاع إضاءة مختلفة.',
    accentColor: '#BF00FF',
    colSpan: 'md:col-span-1',
    featured: false,
  },
  {
    id: 'music',
    icon: 'MusicalNoteIcon',
    title: 'يسينك مع الموسيقى 🎵',
    desc: 'الليد يتحرك مع الإيقاع — حوّل غرفتك لكليب موسيقي. مود حقيقي للحفلات والسهرات.',
    accentColor: '#00FFCC',
    colSpan: 'md:col-span-2',
    featured: true,
  },
  {
    id: 'usb',
    icon: 'BoltIcon',
    title: 'USB — ركّبه في 5 دقائق',
    desc: 'ما فيهاش تعقيد. وصّله بأي USB وهو يضوي. اللاصق خلفه يثبّت على أي سطح.',
    accentColor: '#BF00FF',
    colSpan: 'md:col-span-1',
    featured: false,
  },
  {
    id: 'delivery',
    icon: 'TruckIcon',
    title: 'توصيل سريع — كل الجزائر',
    desc: 'من الشرق للغرب، من الشمال للجنوب. 58 ولاية، توصيل في 3-5 أيام. الدفع عند الاستلام.',
    accentColor: '#00FFCC',
    colSpan: 'md:col-span-1',
    featured: false,
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>('.feature-card');
    if (!cards) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('animate-fade-up');
            (entry.target as HTMLElement).style.opacity = '1';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.animationDelay = `${i * 0.1}s`;
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-20 px-4 bg-background"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14 text-center">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-4"
            style={{ letterSpacing: '0.2em' }}
          >
            علاش FlashFlow؟
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight">
            مميزات{' '}
            <span className="animate-shimmer">تخليك تبهر</span>
          </h2>
        </div>

        {/* Bento Grid */}
        {/* 
          GRID MAP (2 cols desktop):
          Row 1: [col-1: coverage cs-1] [col-2: rgb cs-1]
          Row 2: [col-1-2: music cs-2]
          Row 3: [col-1: usb cs-1] [col-2: delivery cs-1]
          Placed 5/5 cards ✓
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`feature-card group relative overflow-hidden rounded-3xl p-7 cursor-default transition-all duration-500 hover:scale-[1.02] ${feature.colSpan}`}
              style={{
                background: feature.featured
                  ? `linear-gradient(135deg, rgba(0,255,204,0.08) 0%, rgba(191,0,255,0.08) 100%)`
                  : 'rgba(17,17,17,1)',
                border: `1px solid ${feature.accentColor}22`,
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${feature.accentColor}10 0%, transparent 70%)`,
                }}
              />

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 relative z-10"
                style={{
                  background: `${feature.accentColor}15`,
                  border: `1px solid ${feature.accentColor}40`,
                }}
              >
                <Icon
                  name={feature.icon as Parameters<typeof Icon>[0]['name']}
                  size={24}
                  className="transition-transform duration-300 group-hover:scale-110"
                  style={{ color: feature.accentColor }}
                />
              </div>

              {/* Text */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>

              {/* Featured badge */}
              {feature.featured && (
                <div
                  className="absolute top-5 left-5 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: 'rgba(0,255,204,0.15)', color: '#00FFCC', border: '1px solid rgba(0,255,204,0.3)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  الميزة المفضّلة
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}