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
  isScrolled ? "bg-background border-b border-border" : "bg-background"
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
  
    {/* Mobile Menu */}

{/* Mobile Menu Overlay */}
<div 
  className={cn(
    "fixed inset-0 z-50 transition-opacity md:hidden",
    isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
  )}
  onClick={() => setIsMenuOpen(false)}
/>

{/* Mobile Menu Panel */}
{/* Backdrop - dimmed background so user can click out to close */}
{isMenuOpen && (
  <div 
    className="fixed inset-0 z-[60] bg-black/50 md:hidden" 
    onClick={() => setIsMenuOpen(false)} 
  />
)}

{/* The Sidebar */}
<div className={cn(
  "fixed inset-y-0 left-0 z-[70] w-72 transition-transform duration-300 ease-in-out transform md:hidden",
  "bg-background border-r border-border", // Solid background, no transparency
  isMenuOpen ? "translate-x-0" : "-translate-x-full"
)}>
  <nav className="flex flex-col h-full p-6">
    {/* Close Button & Logo Area */}
    <div className="flex items-center justify-between mb-10">
      <div className="relative h-20 w-40">
         <Image src="/assets/logo.jpeg" alt="Logo" fill className="object-contain object-left" />
      </div>
      <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
        <X className="h-6 w-6" />
      </button>
    </div>

    {/* Navigation Links */}
    <div className="flex flex-col space-y-6">
      {navLinks.map((link) => (
        <Link 
          key={link.href} 
          href={link.href} 
          onClick={() => setIsMenuOpen(false)} 
          className="text-lg font-bold text-foreground hover:text-primary transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </div>

    {/* Bottom Action */}
    <div className="mt-auto pb-6">
      <Button asChild className="w-full bg-primary text-primary-foreground">
        <Link href="#contact" onClick={() => setIsMenuOpen(false)}>Book a Consultation</Link>
      </Button>
    </div>
  </nav>
</div>

{/* <div className={cn(
  "fixed opacity-100 inset-y-0 left-0 z-50 w-3/4 max-w-sm bg-background border-r border-border p-6 shadow-xl transition-transform duration-300 ease-in-out transform md:hidden",
  isMenuOpen ? "translate-x-0" : "-translate-x-full",
  isScrolled 
    ? "bg-background border-b border-border shadow-sm" 
    : "bg-background border-b border-transparent"
)}>
  <div className="flex flex-col h-full">
    <div className="flex items-center justify-between mb-8">
      
      <span className="text-xl font-bold text-primary font-handwriting">Shaylee</span>
      <button onClick={() => setIsMenuOpen(false)} className="p-2">
        <X className="h-6 w-6" />
      </button>
    </div>

    <nav className="flex flex-col space-y-6">
      {navLinks.map((link) => (
        <Link 
          key={link.href} 
          href={link.href} 
          onClick={() => setIsMenuOpen(false)} 
          className="text-xl font-semibold text-foreground/80 hover:text-primary transition-colors"
        >
          {link.label}
        </Link>
      ))}
      
      <Button asChild size="lg" className="w-full mt-4 bg-primary text-primary-foreground">
        <Link href="#contact" onClick={() => setIsMenuOpen(false)}>
          Book a Consultation
        </Link>
      </Button>
    </nav>
  </div>
</div> */}

      {/* {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="flex flex-col space-y-4 p-4">
            {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium text-foreground/80 hover:text-primary transition-colors">
                    {link.label}
                </Link>
            ))}
            <Button asChild size="lg" className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="#contact" onClick={() => setIsMenuOpen(false)}>Book a Consultation</Link>
             </Button>
          </nav>
        </div>
      )} */}
</header>
  );
}
