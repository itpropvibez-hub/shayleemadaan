import { Header } from '@/components/header';
import Footer from '@/components/footer';
import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Services } from '@/components/services';
import { Blog } from '@/components/blog';
import { Contact } from '@/components/contact';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}