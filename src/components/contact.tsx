import { Card } from "@/components/ui/card";
import ContactSection1 from '@/components/enquiry-form';
import ContactSection from '@/components/contactform';

export function Contact() {
  return (
    <section id="contact" className="pb-10">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto p-4 md:p-8 lg:p-12 shadow-2xl bg-background border-border/20">
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-[#023e2f]">Let's Talk Real Estate</h2>
                <p className="mt-2 text-sm text-foreground/70 max-w-2xl mx-auto">Ready to make your next move? Fill out the form below or reach out directly.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <ContactSection1 />
                </div>
                <div className="space-y-8 text-center md:text-left">
                  <ContactSection />
                </div>
            </div>
        </Card>
      </div>
    </section>
  );
}