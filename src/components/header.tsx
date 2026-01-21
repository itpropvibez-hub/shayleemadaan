"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    // { href: '#projects', label: 'Projects' },
    { href: '#blog', label: 'Blog' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className={cn(
  "sticky top-0 z-50 w-full transition-all duration-300",
  isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : "bg-transparent"
)}>
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex h-20 items-center justify-between">
      
      {/* --- LOGO SECTION --- */}
      <div className="flex items-center">
        <Link href="/" className="relative h-32 w-60 mt-4"> {/* Defined height/width for fill */}
          <Image 
            src="/assets/signature1.png" 
            alt="Shaylee Logo" 
            fill 
            className="object-contain object-left" // object-left keeps it pinned to the start
            priority 
          />
        </Link>
      </div>

      {/* --- DESKTOP NAV --- */}
      <nav className="hidden md:flex items-center space-x-8">
        {navLinks.map((link) => (
          <Link 
            key={link.href} 
            href={link.href} 
            className="text-sm font-bold text-foreground/80 hover:text-primary transition-colors hover:text-yellow-600"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      
      {/* --- ACTION BUTTONS / MOBILE TOGGLE --- */}
      <div className="flex items-center space-x-4">
        <Button asChild size="sm" className="hidden sm:flex bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href="#contact">Book a Consultation</Link>
        </Button>
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </div>
  </div>
  
  {/* Mobile Menu logic remains same... */}
</header>
  );
}
