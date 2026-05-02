'use client';
import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const testimonials = [
{
  id: 1,
  name: 'كريم بن علي',
  city: 'الجزائر العاصمة',
  avatar: "https://images.unsplash.com/photo-1633626655784-65f8b7ed7d79",
  rating: 5,
  text: 'والله ما توقعتش يكون هكذا! ركّبته في غرفتي في 5 دقايق وضرت صاحبي بالمود. الألوان واضحة وقوية، والسينك مع الموسيقى خطرة بصح.',
  featured: true
},
{
  id: 2,
  name: 'سارة مزيان',
  city: 'وهران',
  avatar: "https://images.unsplash.com/photo-1635872563573-5017c7b7e67e",
  rating: 5,
  text: 'شريت لبنتي وهي فرحت بزاف. الألوان زينين والبريموت سهل الاستخدام. التوصيل وصل في 4 أيام.'
},
{
  id: 3,
  name: 'يوسف حمداني',
  city: 'قسنطينة',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ca295da0-1772135697525.png",
  rating: 5,
  text: 'كنت خايف ما يجيش مزيان كيما في الصور، بصح جاء أحسن! 10 متر غطى الغرفة كاملة. نوصي بيه للكل.'
},
{
  id: 4,
  name: 'أميرة بوزيد',
  city: 'سطيف',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1cefecc47-1777679542053.png",
  rating: 5,
  text: 'الدفع عند الاستلام راحة كبيرة. المنتج نظيف وجودة عالية. الإضاءة تبهر الزوار!'
}];


function StarRating({ count }: {count: number;}) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) =>
      <Icon key={i} name="StarIcon" size={14} className="text-primary" variant="solid" />
      )}
    </div>);

}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll<HTMLElement>('.review-item');
    if (!items) return;

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
      { threshold: 0.1 }
    );

    items.forEach((item, i) => {
      item.style.opacity = '0';
      item.style.animationDelay = `${i * 0.12}s`;
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  const featured = testimonials[0];
  const rest = testimonials.slice(1);

  return (
    <section id="testimonials" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto" ref={sectionRef}>
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-4">
            آراء زبائننا
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-foreground">
            ناس جربوا{' '}
            <span className="text-primary">وعجبهم</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Featured Testimonial */}
          <div
            className="review-item relative rounded-4xl overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #111 0%, #0d0d0d 100%)', border: '1px solid rgba(0,255,204,0.2)' }}>
            
            {/* Glow top */}
            <div
              className="absolute top-0 left-0 right-0 h-1 rounded-t-4xl"
              style={{ background: 'linear-gradient(90deg, #00FFCC, #BF00FF, #00FFCC)' }} />
            

            <div className="p-8">
              {/* Quote mark */}
              <div className="text-6xl font-serif text-primary opacity-30 leading-none mb-4">"</div>

              <p className="text-xl text-foreground leading-relaxed mb-8 font-medium">
                {featured.text}
              </p>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary animate-pulse-cyan flex-shrink-0">
                  <AppImage
                    src={featured.avatar}
                    alt={`صورة ${featured.name}، زبون من ${featured.city}`}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover" />
                  
                </div>
                <div>
                  <p className="font-bold text-foreground">{featured.name}</p>
                  <p className="text-xs text-muted-foreground">{featured.city}</p>
                  <StarRating count={featured.rating} />
                </div>
              </div>
            </div>
          </div>

          {/* Rest of testimonials */}
          <div className="flex flex-col gap-5">
            {rest.map((t) =>
            <div
              key={t.id}
              className="review-item rounded-3xl p-6 transition-all duration-300 hover:border-primary/30"
              style={{ background: 'rgba(17,17,17,1)', border: '1px solid rgba(255,255,255,0.06)' }}>
              
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full overflow-hidden border border-border flex-shrink-0">
                    <AppImage
                    src={t.avatar}
                    alt={`صورة ${t.name}، زبون من ${t.city}`}
                    width={44}
                    height={44}
                    className="w-full h-full object-cover" />
                  
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-bold text-foreground text-sm">{t.name}</p>
                      <StarRating count={t.rating} />
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{t.city}</p>
                    <p className="text-sm text-foreground/80 leading-relaxed">{t.text}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {[
          { icon: 'ShieldCheckIcon', label: 'منتج أصلي 100%' },
          { icon: 'TruckIcon', label: 'توصيل مضمون' },
          { icon: 'CreditCardIcon', label: 'دفع عند الاستلام' }].
          map((badge) =>
          <div
            key={badge.label}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-muted-foreground"
            style={{ background: 'rgba(17,17,17,1)', border: '1px solid rgba(255,255,255,0.08)' }}>
            
              <Icon name={badge.icon as Parameters<typeof Icon>[0]['name']} size={16} className="text-primary" />
              {badge.label}
            </div>
          )}
        </div>
      </div>
    </section>);

}