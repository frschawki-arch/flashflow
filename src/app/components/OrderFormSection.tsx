'use client';
import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

const WILAYAS = [
  'أدرار','الشلف','الأغواط','أم البواقي','باتنة','بجاية','بسكرة','بشار',
  'البليدة','البويرة','تمنراست','تبسة','تلمسان','تيارت','تيزي وزو','الجزائر',
  'الجلفة','جيجل','سطيف','سعيدة','سكيكدة','سيدي بلعباس','عنابة','قالمة',
  'قسنطينة','المدية','مستغانم','المسيلة','معسكر','ورقلة','وهران','البيض',
  'إليزي','برج بوعريريج','بومرداس','الطارف','تيندوف','تيسمسيلت','الوادي',
  'خنشلة','سوق أهراس','تيبازة','ميلة','عين الدفلى','النعامة','عين تيموشنت',
  'غرداية','غليزان','تيميمون','برج باجي مختار','أولاد جلال','بني عباس',
  'إن صالح','إن قزام','توقرت','جانت','المغير','المنيعة',
];

interface FormData {
  name: string;
  phone: string;
  wilaya: string;
  quantity: number;
}

interface FormErrors {
  name?: string;
  phone?: string;
  wilaya?: string;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

// 3D LED Strip Component
function LedStrip3D() {
  const [tick, setTick] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => setTick((t) => t + 1), 80);
    return () => clearInterval(interval);
  }, []);

  const colors = [
    '#FF0040', '#FF4400', '#FF8800', '#FFCC00',
    '#00FF88', '#00FFCC', '#00CCFF', '#0088FF',
    '#4400FF', '#8800FF', '#CC00FF', '#FF00CC',
  ];

  const leds = Array.from({ length: 28 });

  if (!mounted) {
    return (
      <div className="relative w-full flex flex-col items-center gap-1 py-3">
        <div
          className="relative w-full rounded-full overflow-hidden flex items-center justify-between px-2"
          style={{
            height: '18px',
            background: 'linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 40%, #111 100%)',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8), inset 0 -1px 2px rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full flex flex-col items-center gap-1 py-3">
      {/* LED strip body */}
      <div
        className="relative w-full rounded-full overflow-hidden flex items-center justify-between px-2"
        style={{
          height: '18px',
          background: 'linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 40%, #111 100%)',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8), inset 0 -1px 2px rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* PCB trace lines */}
        <div className="absolute inset-0 flex flex-col justify-center gap-0.5 px-1 pointer-events-none">
          <div style={{ height: '1px', background: 'rgba(255,200,0,0.15)', width: '100%' }} />
          <div style={{ height: '1px', background: 'rgba(255,200,0,0.1)', width: '100%' }} />
        </div>

        {leds.map((_, i) => {
          const colorIndex = (i + tick) % colors.length;
          const color = colors[colorIndex];
          const brightness = 0.7 + 0.3 * Math.sin((i + tick * 0.5) * 0.8);
          return (
            <div
              key={i}
              className="relative flex-shrink-0"
              style={{ width: '10px', height: '10px' }}
            >
              {/* LED chip body */}
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '2px',
                  background: `rgba(${hexToRgb(color)}, ${brightness})`,
                  boxShadow: `0 0 6px 2px ${color}${Math.round(brightness * 180).toString(16).padStart(2,'0')}, 0 0 12px 4px ${color}60`,
                  border: '1px solid rgba(255,255,255,0.15)',
                  position: 'relative',
                  zIndex: 1,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Glow reflection below strip */}
      <div
        className="w-full rounded-full"
        style={{
          height: '6px',
          background: `linear-gradient(90deg, ${colors.map((c, i) => `${c}${Math.round(40 + 20 * Math.sin((i + tick * 0.3))).toString(16).padStart(2,'0')} ${(i / colors.length) * 100}%`).join(', ')})`,
          filter: 'blur(4px)',
          opacity: 0.6,
          transform: 'scaleY(0.5)',
        }}
      />

      {/* Floor reflection */}
      <div
        className="w-3/4 rounded-full"
        style={{
          height: '3px',
          background: `linear-gradient(90deg, transparent, #00FFCC60, #BF00FF60, #00FFCC60, transparent)`,
          filter: 'blur(6px)',
          opacity: 0.4,
        }}
      />
    </div>
  );
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

// Countdown Timer Component
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Set end time to 23:59:59 today (resets daily)
    const getEndTime = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(23, 59, 59, 0);
      return end.getTime();
    };

    const endTime = getEndTime();

    const calc = () => {
      const now = Date.now();
      const diff = Math.max(0, endTime - now);
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ hours: h, minutes: m, seconds: s });
    };

    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div
      className="mt-5 rounded-2xl p-4"
      style={{ background: 'rgba(191,0,255,0.08)', border: '1px solid rgba(191,0,255,0.25)' }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-bold text-red-400 uppercase tracking-widest">ينتهي العرض</span>
        </div>
        <span className="text-xs text-muted-foreground">اليوم فقط</span>
      </div>

      <div className="flex items-center justify-center gap-2" dir="ltr">
        {/* Hours */}
        <div className="flex flex-col items-center">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center font-mono font-extrabold text-2xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(191,0,255,0.3) 0%, rgba(100,0,180,0.2) 100%)',
              border: '1px solid rgba(191,0,255,0.4)',
              color: '#E0AAFF',
              boxShadow: '0 0 12px rgba(191,0,255,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
              textShadow: '0 0 10px rgba(191,0,255,0.8)',
            }}
          >
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 50%)' }}
            />
            {pad(timeLeft.hours)}
          </div>
          <span className="text-xs text-muted-foreground mt-1">ساعة</span>
        </div>

        <span className="text-2xl font-extrabold text-primary mb-4" style={{ textShadow: '0 0 8px #00FFCC' }}>:</span>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center font-mono font-extrabold text-2xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(0,255,204,0.2) 0%, rgba(0,150,120,0.15) 100%)',
              border: '1px solid rgba(0,255,204,0.35)',
              color: '#00FFCC',
              boxShadow: '0 0 12px rgba(0,255,204,0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
              textShadow: '0 0 10px rgba(0,255,204,0.8)',
            }}
          >
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 50%)' }}
            />
            {pad(timeLeft.minutes)}
          </div>
          <span className="text-xs text-muted-foreground mt-1">دقيقة</span>
        </div>

        <span className="text-2xl font-extrabold text-primary mb-4" style={{ textShadow: '0 0 8px #00FFCC' }}>:</span>

        {/* Seconds */}
        <div className="flex flex-col items-center">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center font-mono font-extrabold text-2xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,60,0,0.2) 0%, rgba(180,30,0,0.15) 100%)',
              border: '1px solid rgba(255,80,0,0.35)',
              color: '#FF6030',
              boxShadow: '0 0 12px rgba(255,60,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
              textShadow: '0 0 10px rgba(255,80,0,0.8)',
            }}
          >
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 50%)' }}
            />
            {pad(timeLeft.seconds)}
          </div>
          <span className="text-xs text-muted-foreground mt-1">ثانية</span>
        </div>
      </div>
    </div>
  );
}

export default function OrderFormSection() {
  const [form, setForm] = useState<FormData>({ name: '', phone: '', wilaya: '', quantity: 1 });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim() || form.name.trim().length < 3) {
      newErrors.name = 'الاسم الكامل مطلوب (3 أحرف على الأقل)';
    }
    if (!form.phone.trim() || !/^(0[5-7]\d{8})$/.test(form.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'رقم هاتف جزائري صحيح مطلوب (05/06/07...)';
    }
    if (!form.wilaya) {
      newErrors.wilaya = 'اختر ولايتك';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validate()) return;
  setLoading(true);

  // إرسال البيانات إلى Formspree
  try {
    await fetch('https://formspree.io/f/mdabanbl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    });
  } catch (error) {
    console.error('Error sending order:', error);
  }

  // إكمال الخطوات المعتادة للموقع بعد الإرسال
  setTimeout(() => {
    const id = 'STA-' + Math.floor(100000 + Math.random() * 900000);
    const today = new Date();
    const minDays = 3;
    const maxDays = 5;
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + minDays);
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + maxDays);
    const formatDate = (d: Date) =>
      d.toLocaleDateString('ar-DZ', { day: 'numeric', month: 'numeric' });
    setOrderId(id);
    setDeliveryDate(`${formatDate(minDate)} - ${formatDate(maxDate)}`);
    setLoading(false);
    setSubmitted(true);
  }, 1500);
};

  const handleChange = (field: keyof FormData, value: string) => {
    const parsed = field === 'quantity' ? parseInt(value, 10) || 1 : value;
    setForm((prev) => ({ ...prev, [field]: parsed }));
    if (field !== 'quantity' && errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (submitted) {
    return (
      <section id="order" className="py-20 px-4 bg-background">
        <div className="max-w-xl mx-auto text-center">
          <div
            className="rounded-4xl p-10"
            style={{ background: 'rgba(17,17,17,1)', border: '1px solid rgba(0,255,204,0.3)' }}
          >
            {/* Success icon */}
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-cyan"
              style={{ background: 'rgba(0,255,204,0.15)', border: '2px solid #00FFCC' }}
            >
              <Icon name="CheckIcon" size={40} className="text-primary" />
            </div>

            <h3 className="text-3xl font-extrabold text-foreground mb-2">
              تم الطلب بنجاح! 🎉
            </h3>
            <p className="text-muted-foreground text-sm mb-8">
              شكراً {form.name}! سنتصل بيك قريباً على{' '}
              <span className="text-primary font-bold">{form.phone}</span> لتأكيد التوصيل.
            </p>

            {/* Order Summary Card */}
            <div
              className="rounded-3xl p-6 text-right mb-6"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {/* Order ID */}
              <div className="flex items-center justify-between mb-5 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <span className="text-xs font-mono text-primary tracking-widest">{orderId}</span>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">رقم الطلب</span>
              </div>

              {/* Items */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-right">المنتجات</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-primary">{(1500 * form.quantity).toLocaleString('ar-DZ')} دج</span>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">STASCIA LED RGB — 10 متر</p>
                      <p className="text-xs text-muted-foreground">× {form.quantity} — مع بريموت مجاني</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground">عند الاستلام</span>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">التوصيل</p>
                      <p className="text-xs text-muted-foreground">دفع عند الاستلام — {form.wilaya}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} className="my-4" />

              {/* Total */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-xl font-extrabold text-primary">{(1500 * form.quantity).toLocaleString('ar-DZ')} دج</span>
                <span className="text-sm font-bold text-foreground">المجموع الكلي</span>
              </div>

              {/* Divider */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} className="my-4" />

              {/* Estimated Delivery */}
              <div className="flex items-start justify-between">
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">{deliveryDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">التوصيل المتوقع</p>
                  <p className="text-xs text-muted-foreground">3 — 5 أيام عمل</p>
                </div>
              </div>
            </div>

            {/* Note */}
            <p className="text-xs text-muted-foreground leading-relaxed">
              ستصلك رسالة تأكيد على هاتفك. الدفع عند الاستلام فقط — لا دفع مسبق.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="order" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* 3D LED Strip Banner */}
        <div
          className="mb-6 rounded-3xl overflow-hidden relative"
          style={{
            background: 'linear-gradient(180deg, rgba(8,8,8,1) 0%, rgba(14,14,14,1) 100%)',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
          }}
        >
          {/* Top LED strip */}
          <div className="px-4 pt-4">
            <LedStrip3D />
          </div>

          {/* Label */}
          <div className="flex items-center justify-center gap-3 py-3">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>
              STASCIA RGB LED — 16 مليون لون
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          </div>

          {/* Bottom LED strip */}
          <div className="px-4 pb-4">
            <LedStrip3D />
          </div>

          {/* Side glow effects */}
          <div
            className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, rgba(0,255,204,0.08), transparent)' }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none"
            style={{ background: 'linear-gradient(270deg, rgba(191,0,255,0.08), transparent)' }}
          />
        </div>

        {/* Dark rounded container */}
        <div
          className="rounded-5xl overflow-hidden relative"
          style={{ background: 'rgba(10,10,10,1)' }}
        >
          {/* Neon top border */}
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{ background: 'linear-gradient(90deg, #00FFCC 0%, #BF00FF 50%, #00FFCC 100%)' }}
          />

          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(0,255,204,0.06) 0%, transparent 60%)',
            }}
          />

          <div className="relative z-10 grid md:grid-cols-2 gap-0">
            {/* Left — promo info */}
            <div
              className="p-10 md:p-14 flex flex-col justify-center"
              style={{ borderLeft: '1px solid rgba(255,255,255,0.06)' }}
            >
              <span className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
                اطلب دروك
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-6">
                STASCIA LED RGB
                <br />
                <span className="text-primary">10 متر</span> بريموت
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                ابعث طلبك وسنتصل بيك خلال 24 ساعة. الدفع عند الاستلام في كل الجزائر.
              </p>

              {/* Product highlights */}
              <div className="space-y-4">
                {[
                  { icon: 'CheckCircleIcon', text: '10 متر — يغطي غرفة كاملة' },
                  { icon: 'CheckCircleIcon', text: 'RGB + بريموت مجاني' },
                  { icon: 'CheckCircleIcon', text: 'سينك موسيقى تلقائي' },
                  { icon: 'CheckCircleIcon', text: 'USB — ركّبه في 5 دقايق' },
                  { icon: 'CheckCircleIcon', text: 'توصيل 3-5 أيام + دفع عند الاستلام' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <Icon
                      name={item.icon as Parameters<typeof Icon>[0]['name']}
                      size={18}
                      className="text-primary flex-shrink-0"
                      variant="solid"
                    />
                    <span className="text-sm text-foreground/80">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Price & Discount */}
              <div
                className="mt-8 rounded-3xl p-6"
                style={{ background: 'rgba(0,255,204,0.06)', border: '1px solid rgba(0,255,204,0.2)' }}
              >
                {/* Discount badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{ background: 'rgba(191,0,255,0.2)', color: '#BF00FF', border: '1px solid rgba(191,0,255,0.4)' }}
                  >
                    تخفيض 25%
                  </span>
                  <span className="text-xs text-muted-foreground">عرض محدود</span>
                </div>

                {/* Prices */}
                <div className="flex items-end gap-4">
                  <div>
                    <p className="text-4xl font-extrabold text-primary leading-none">1,500 دج</p>
                    <p className="text-xs text-muted-foreground mt-1">السعر الحالي</p>
                  </div>
                  <div className="mb-1">
                    <p className="text-xl font-bold text-muted-foreground line-through leading-none">2,000 دج</p>
                    <p className="text-xs text-muted-foreground mt-1">السعر الأصلي</p>
                  </div>
                </div>

                {/* Savings callout */}
                <div className="mt-4 flex items-center gap-2">
                  <Icon name="TagIcon" size={14} className="text-primary flex-shrink-0" />
                  <span className="text-sm font-semibold text-primary">وفّر 500 دج على كل حبة!</span>
                </div>

                {/* Countdown Timer */}
                <CountdownTimer />
              </div>
            </div>

            {/* Right — form */}
            <div className="p-10 md:p-14">
              <h3 className="text-2xl font-bold text-foreground mb-8">
                فورم الطلب
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate suppressHydrationWarning>
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    الاسم الكامل *
                  </label>
                  <div className="relative">
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <Icon name="UserIcon" size={18} className="text-muted-foreground" />
                    </div>
                    <input
                      type="text"
                      placeholder="مثال: محمد بن عمر"
                      value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className={`w-full pr-12 pl-4 py-4 rounded-2xl text-foreground placeholder-muted-foreground text-sm font-medium transition-all outline-none ${
                        errors.name
                          ? 'border-red-500' :'border-border focus:border-primary'
                      }`}
                      style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${errors.name ? '#ef4444' : 'rgba(255,255,255,0.1)'}` }}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    رقم الهاتف *
                  </label>
                  <div className="relative">
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <Icon name="PhoneIcon" size={18} className="text-muted-foreground" />
                    </div>
                    <input
                      type="tel"
                      placeholder="0555 123 456"
                      value={form.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      dir="ltr"
                      className={`w-full pr-12 pl-4 py-4 rounded-2xl text-foreground placeholder-muted-foreground text-sm font-medium transition-all outline-none`}
                      style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${errors.phone ? '#ef4444' : 'rgba(255,255,255,0.1)'}` }}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.phone}</p>
                  )}
                </div>

                {/* Wilaya */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    الولاية *
                  </label>
                  <div className="relative">
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <Icon name="MapPinIcon" size={18} className="text-muted-foreground" />
                    </div>
                    <select
                      value={form.wilaya}
                      onChange={(e) => handleChange('wilaya', e.target.value)}
                      className="w-full pr-12 pl-4 py-4 rounded-2xl text-sm font-medium transition-all outline-none appearance-none cursor-pointer"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: `1px solid ${errors.wilaya ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
                        color: form.wilaya ? '#F5F5F5' : '#888888',
                      }}
                    >
                      <option value="" disabled style={{ background: '#111', color: '#888' }}>
                        اختر ولايتك
                      </option>
                      {WILAYAS.map((w) => (
                        <option key={w} value={w} style={{ background: '#111', color: '#F5F5F5' }}>
                          {w}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.wilaya && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.wilaya}</p>
                  )}
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    الكمية
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleChange('quantity', String(Math.max(1, form.quantity - 1)))}
                      className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl transition-all hover:opacity-80"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#F5F5F5' }}
                    >
                      −
                    </button>
                    <div
                      className="flex-1 h-12 rounded-2xl flex items-center justify-center font-extrabold text-xl text-foreground"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      {form.quantity}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleChange('quantity', String(form.quantity + 1))}
                      className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl transition-all hover:opacity-80"
                      style={{ background: 'rgba(0,255,204,0.12)', border: '1px solid rgba(0,255,204,0.3)', color: '#00FFCC' }}
                    >
                      +
                    </button>
                  </div>

                  {/* Special offer banner for 2 units */}
                  {form.quantity === 2 && (
                    <div
                      className="mt-3 rounded-2xl p-4 flex items-start gap-3"
                      style={{
                        background: 'linear-gradient(135deg, rgba(191,0,255,0.15) 0%, rgba(0,255,204,0.1) 100%)',
                        border: '1px solid rgba(191,0,255,0.4)',
                        boxShadow: '0 0 16px rgba(191,0,255,0.2)',
                      }}
                    >
                      <span className="text-2xl flex-shrink-0">🎁</span>
                      <div className="text-right">
                        <p className="text-sm font-extrabold text-primary leading-snug">
                          عرض خاص — حبتين!
                        </p>
                        <p className="text-xs text-foreground/80 mt-1 leading-relaxed">
                          عند طلب حبتين تحصل على <span className="text-primary font-bold">بريموت إضافي مجاني</span> + أولوية في التوصيل 🚀
                        </p>
                        <p className="text-xs font-bold mt-2" style={{ color: '#BF00FF' }}>
                          المجموع: 3,000 دج فقط
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-base transition-all duration-300 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed animate-pulse-cyan"
                  style={{ background: '#00FFCC', color: '#000000' }}
                >
                  {loading ? (
                    <>
                      <div
                        className="w-5 h-5 rounded-full border-2 border-black/30 border-t-black animate-spin"
                      />
                      جاري الإرسال...
                    </>
                  ) : (
                    <>
                      <Icon name="ShoppingCartIcon" size={20} className="text-primary-foreground" />
                      أكمل الطلب الآن
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-muted-foreground">
                  بالطلب، أنت توافق على التواصل معك للتأكيد. الدفع عند الاستلام فقط.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
