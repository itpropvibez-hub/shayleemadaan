import { BarChart, Home as HomeIcon, Building, ShieldCheck } from 'lucide-react';

const services = [
  { name: 'Investment Advisory', icon: BarChart, description: 'Strategic advice to maximize your real estate portfolio returns.' },
  { name: 'Residential Properties', icon: HomeIcon, description: 'Finding your dream home, tailored to your lifestyle and budget.' },
  { name: 'Commercial Spaces', icon: Building, description: 'Securing the perfect location for your business to thrive.' },
  { name: 'Legal Support', icon: ShieldCheck, description: 'Navigating the legal complexities of property transactions with ease.' },
];

export function Services() {
  return (
    <section id="services" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">My Services</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">Comprehensive real estate solutions tailored to your unique needs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div key={service.name} className="flex flex-col items-center text-center p-6 group">
              <div className="bg-primary/10 p-5 rounded-full mb-5 border-2 border-transparent group-hover:border-accent group-hover:scale-110 transition-all duration-300">
                <service.icon className="h-10 w-10 text-primary transition-transform duration-300" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">{service.name}</h3>
              <p className="text-foreground/70 mt-2 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}