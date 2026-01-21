import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Briefcase, Building, Home as HomeIcon, ShieldCheck, User, Star, Award, BarChart } from 'lucide-react';
import ContactSection1 from '@/components/enquiry-form';
import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from '@/components/ui/separator';
import ContactSection from '@/components/contactform';
import Footer from '@/components/footer';

const shayleeHero = PlaceHolderImages.find(p => p.id === 'shaylee-hero');
// const projects = PlaceHolderImages.filter(p => p.id.startsWith('project-')).slice(0, 3);
const blogPosts = PlaceHolderImages.filter(p => p.id.startsWith('blog-')).slice(0, 3);

const services = [
  { name: 'Investment Advisory', icon: BarChart, description: 'Strategic advice to maximize your real estate portfolio returns.' },
  { name: 'Residential Properties', icon: HomeIcon, description: 'Finding your dream home, tailored to your lifestyle and budget.' },
  { name: 'Commercial Spaces', icon: Building, description: 'Securing the perfect location for your business to thrive.' },
  { name: 'Legal Support', icon: ShieldCheck, description: 'Navigating the legal complexities of property transactions with ease.' },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">

        {/* Hero Section */}
        <section id="home" className="relative h-[80vh] min-h-[600px] w-full text-white">
          <div className="absolute inset-0 bg-black/50 z-10" />
            {shayleeHero && (
                <Image
                    src={shayleeHero.imageUrl}
                    alt={shayleeHero.description}
                    fill
                    className="object-cover object-center w-full min-h-full"
                    data-ai-hint={shayleeHero.imageHint}
                    priority
                />
            )}
          <div className="container relative z-20 flex flex-col items-start justify-center h-full mx-auto px-4 text-left">
            <div className='flex fex-row space-x-6'>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight font-handwriting mt-2 mb-6">
             Guiding your 
            </h1>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight font-handwriting mt-2 mb-6 text-[#cfa34c]">
             right move.
            </h1></div>
            {/* <p className="text-2xl md:text-3xl lg:text-4xl font-handwriting text-accent mt-2 mb-6">
               Guiding your right move.
            </p> */}
            <p className="max-w-xl text-lg text-white/80 mb-10 leading-relaxed">
              With a decade of experience, I provide clarity and confidence in your property journey. Let's build your future, together.
            </p>
            <Button asChild size="lg" className="bg-[#023e2f] text-primary-foreground hover:bg-white/80 hover:text-[#023e2f] group shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 py-7 px-10 text-lg">
                <Link href="#contact">Book a Free Consultation <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" /></Link>
            </Button>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Why Work With Me?</h2>
                <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">Not just selling properties, I help you make the right real estate decision.</p>
               {/* <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">My commitment to you goes beyond the transaction. It's about a partnership built on a solid foundation.</p> */}
                {/* <div className=" relative h-60 w-60 items-center">
                  <Image src="/assets/signature1.png" alt="Shaylee sign" fill className="object-contain " />
                </div> */}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Award, title: '10+ Years Experience', description: 'Decade of dedicated experience in the Delhi NCR real estate market.' },
                { icon: BarChart, title: 'Market Understanding', description: 'Deep insights into market trends and investment opportunities.' },
                { icon: User, title: 'Client-First Approach', description: 'Your goals are my priority, ensuring a personalized service.' },
                { icon: Star, title: 'Trust & Transparency', description: 'Building relationships based on honesty and clear communication.' },
              ].map(item => (
                <Card key={item.title} className="text-center bg-card backdrop-blur-sm border-border/20 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                  <CardHeader className="items-center">
                    <div className="bg-accent/20 p-4 rounded-full mb-4">
                        <item.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-primary">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/70">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
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

        
   {/* Blog / Market Updates Section */}
        <section id="blog" className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-primary">Latest From The Blog</h2>
              <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">Delhi NCR market updates, investment tips, and common buyer mistakes to avoid.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-xl bg-card border-border/50 shadow-lg">
                  <div className="relative aspect-video">
                     <Image
                      src={post.imageUrl}
                      alt={post.description}
                      fill
                      className="object-cover"
                      data-ai-hint={post.imageHint}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{post.description}</CardTitle>
                    <CardDescription className="text-foreground/60 pt-2">Stay informed with the latest trends and advice.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="link" asChild className="text-primary p-0 font-semibold group/link">
                      <Link href="#">Read More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" /></Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>


        {/* Projects/Listings Section */}
        {/* <section id="projects" className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-primary">Featured Projects</h2>
              <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">A curated selection of properties that I am proud to represent. Quality over quantity, always.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden group border-border/50 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-xl">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={project.imageUrl}
                      alt={project.description}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      data-ai-hint={project.imageHint}
                    />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                   <CardHeader className="absolute bottom-0 text-white p-6">
                    <CardTitle className="text-2xl font-bold">{project.description}</CardTitle>
                     <Button variant="link" asChild className="text-accent p-0 mt-2 font-semibold">
                      <Link href="#">View Details <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section> */}
        
        {/* Contact Section */}
        <section id="contact" className="pb-10">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto p-4 md:p-8 lg:p-12 shadow-2xl bg-background border-border/20">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#023e2f]">Let's Talk Real Estate</h2>
                    <p className="mt-2 text-sm text-foreground/70 max-w-2xl mx-auto">Ready to make your next move? Fill out the form below or reach out directly. <br />Your journey to the perfect property starts here.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        {/* <EnquiryForm /> */}
                        <ContactSection1 />
                    </div>
                    <div className="space-y-8 text-center md:text-left">
                      <ContactSection />
                        {/* <div>
                          
                            <h3 className="text-xl font-semibold text-primary">Direct WhatsApp</h3>
                            <p className="text-foreground/70 mt-1">For a quick response, chat with me directly.</p>
                            <Button variant="link" asChild className="text-primary p-0 h-auto mt-2 text-base font-semibold group/link"><Link href="#">Start a Chat <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" /></Link></Button>
                        </div>
                        <Separator />
                        <div>
                            <h3 className="text-xl font-semibold text-primary">Give Me a Call</h3>
                            <p className="text-foreground/70 mt-1">Prefer to talk? I'm available during business hours.</p>
                            <Button variant="link" asChild className="text-primary p-0 h-auto mt-2 text-base font-semibold group/link"><Link href="#">View Number <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" /></Link></Button>
                        </div> */}
                    </div>
                </div>
            </Card>
          </div>
        </section>

      </main>
      <Footer />
      {/* <footer className="bg-foreground border-t border-border/20">
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-background/70">
            <Link href="/" className="text-4xl font-bold text-background tracking-tight font-handwriting mb-4 inline-block hover:text-accent transition-colors">
                Shaylee
            </Link>
            <div className="flex justify-center space-x-6 mb-6">
                <Link href="#about" className="text-sm hover:text-accent">About</Link>
                <Link href="#services" className="text-sm hover:text-accent">Services</Link>
                <Link href="#projects" className="text-sm hover:text-accent">Projects</Link>
                <Link href="#blog" className="text-sm hover:text-accent">Blogs</Link>
                <Link href="#contact" className="text-sm hover:text-accent">Contact</Link>
            </div>
            <p className="text-sm text-background/60">&copy; {new Date().getFullYear()} Shaylee. All Rights Reserved. Built with passion.</p>
        </div>
      </footer> */}
    </div>
  );
}
