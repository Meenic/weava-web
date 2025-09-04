import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, User, ArrowRight } from "lucide-react";

const featuredStories = [
  {
    id: "1",
    title: "The Enchanted Forest",
    author: "AI Storyteller",
    genre: "Fantasy",
    estimatedTime: "15-20 min",
    description: "A magical adventure through an ancient forest filled with mystical creatures and hidden secrets. Your choices will determine whether you become a hero of legend or discover darker truths.",
    image: "https://images.pexels.com/photos/1496373/pexels-photo-1496373.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "2",
    title: "The Space Station Mystery",
    author: "AI Storyteller", 
    genre: "Sci-Fi",
    estimatedTime: "20-25 min",
    description: "A thrilling mystery aboard a remote space station where nothing is as it seems. Uncover the truth behind a sinister plot that threatens humanity itself.",
    image: "https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export function StoryShowcase() {
  return (
    <section className="py-24 px-4 sm:px-6 relative">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(143,0,255,0.08),transparent_70%)]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="scroll-m-20 text-3xl md:text-4xl lg:text-5xl [font-family:var(--font-geist-mono)] font-bold tracking-tight mb-4">
            Featured Stories
          </h2>
          <p className="text-lg md:text-xl font-semibold text-foreground/90 max-w-2xl mx-auto">
            Dive into immersive narratives where every choice shapes your destiny
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {featuredStories.map((story) => (
            <Card key={story.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      <BookOpen className="w-3 h-3 mr-1" />
                      {story.genre}
                    </Badge>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      <Clock className="w-3 h-3 mr-1" />
                      {story.estimatedTime}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl mb-2">{story.title}</CardTitle>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                  <User className="w-4 h-4" />
                  by {story.author}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {story.description}
                </p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <Button asChild className="w-full group">
                  <Link href={`/story/${story.id}`}>
                    Start Adventure
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            Ready to create your own interactive story?
          </p>
          <Button size="lg" variant="outline" className="rounded-full">
            Create Your Story
          </Button>
        </div>
      </div>
    </section>
  );
}