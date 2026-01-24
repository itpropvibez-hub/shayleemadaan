import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from "@/lib/placeholder-images";

const shayleeHero = PlaceHolderImages.find(p => p.id === 'shaylee-hero');

export function Hero() {
  return (
    <section id="home" className="relative h-[85vh] min-h-[500px] md:h-[80vh] w-full text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/40 sm:bg-black/50 z-10" />
      
      {shayleeHero && (
        <Image
          src={shayleeHero.imageUrl}
          alt={shayleeHero.description}
          fill
          priority
          sizes="100vw" 
          className="object-cover object-[70%_center] md:object-[70%_center] lg:object-center z-0 transition-opacity duration-500"
        />
      )}

      <div className="container relative z-20 flex flex-col items-start justify-end h-full mx-auto px-6 pb-16 md:pb-24 text-left">
        <div className='flex flex-col-2 space-x-2 mb-4 '>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-handwriting max-[380px]:text-3xl">
            Guiding your 
          </h1>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-handwriting text-[#cfa34c] max-[380px]:text-3xl">
            right move.
          </h1>
        </div>

        <p className="max-w-md md:max-w-xl text-base sm:text-lg text-white/90 mb-8 md:mb-10 leading-tight">
          With a decade of experience, I provide clarity and confidence in your property journey. Let's build your future, together.
        </p>

        <Button asChild size="lg" 
          className="w-full sm:w-auto bg-[#023e2f] text-primary-foreground hover:bg-white/80 hover:text-[#023e2f] group shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 py-3 md:py-7 px-3 md:px-10 text-lg"
        >
          <Link href="#contact" className="flex items-center justify-center">
            Book a Free Consultation 
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </section>
  );
}