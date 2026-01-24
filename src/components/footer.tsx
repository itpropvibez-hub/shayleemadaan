import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-foreground border-t border-border/10">
      <div className="container mx-auto px-6 py-6 lg:py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-1">
          
          {/* Brand Section */}
          <div className="md:col-span-2 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-3 group mb-6">
               <div className="relative w-60 min-h-32 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Image src="/assets/logo.jpeg" alt="Shaylee Logo" fill className="object-contain" />
              </div>
            </Link>
            <p className="text-background/60 max-w-sm leading-relaxed text-sm lg:text-base">
                Helping you fall in love with where you live. Your goals, your timeline, and a little bit of magic to get you home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-background font-semibold mb-6">Navigation</h4>
            <ul className="space-y-4">
              <li><Link href="#about" className="text-sm text-background/60 hover:text-accent transition-colors">About Me</Link></li>
              <li><Link href="#services" className="text-sm text-background/60 hover:text-accent transition-colors">Services</Link></li>
              <li><Link href="#blog" className="text-sm text-background/60 hover:text-accent transition-colors">Latest Blogs</Link></li>
              <li><Link href="#contact" className="text-sm text-background/60 hover:text-accent transition-colors">Get in Touch</Link></li>
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h4 className="text-background font-semibold mb-6">Connect</h4>
            <ul className="space-y-4">
              <li><a href="https://www.linkedin.com/in/shailyshaily/" className="text-sm text-background/60 hover:text-accent transition-colors">LinkedIn</a></li>
              <li><a href="https://www.instagram.com/shayleerealtorlife/" className="text-sm text-background/60 hover:text-accent transition-colors">Instagram</a></li>
              <li><a href="https://wa.me/9871424020" className="text-sm text-background/60 hover:text-accent transition-colors">WhatsApp</a></li>
              <li><a href="mailto:shailyrealtorlife@gmail.com" className="text-sm text-background/60 hover:text-accent transition-colors">Email</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/40">
            Shaylee Madaan &copy; {new Date().getFullYear()}. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-background/40">
            <span>Built with passion.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}