import React from 'react';
import AppLogo from '@/components/ui/AppLogo';

export default function Footer() {
  return (
    <footer className="border-t border-border py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <AppLogo size={28} />
          <span className="font-bold text-foreground">
            Flash<span className="text-primary">Flow</span>
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-primary transition-colors">
            المميزات
          </a>
          <a href="#testimonials" className="hover:text-primary transition-colors">
            الزبائن
          </a>
          <a href="#order" className="hover:text-primary transition-colors">
            الطلب
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-muted-foreground">
          © 2026 FlashFlow. جميع الحقوق محفوظة
        </p>
      </div>
    </footer>
  );
}