import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from "@/lib/placeholder-images";

const blogPosts = PlaceHolderImages.filter(p => p.id.startsWith('blog-')).slice(0, 3);

export function Blog() {
  return (
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
  );
}