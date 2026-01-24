import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, BarChart, User, Star } from 'lucide-react';

const aboutItems = [
  { icon: Award, title: '10+ Years Experience', description: 'Decade of dedicated experience in the Delhi NCR real estate market.' },
  { icon: BarChart, title: 'Market Understanding', description: 'Deep insights into market trends and investment opportunities.' },
  { icon: User, title: 'Client-First Approach', description: 'Your goals are my priority, ensuring a personalized service.' },
  { icon: Star, title: 'Trust & Transparency', description: 'Building relationships based on honesty and clear communication.' },
];

export function About() {
  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Why Work With Me?</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">Not just selling properties, I help you make the right real estate decision.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {aboutItems.map(item => (
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
  );
}