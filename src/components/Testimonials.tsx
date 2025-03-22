
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Student",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    content: "bucketIT saved me when I moved to a new city for my studies. I was able to furnish my apartment without breaking the bank. The furniture is high-quality and the rental process was incredibly smooth.",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Interior Designer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    content: "As an interior designer, I often recommend bucketIT to clients who need temporary furnishings for home staging. The quality and variety of products have consistently impressed my clients.",
    rating: 5
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Tech Professional",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    content: "I needed a high-end laptop for a three-month project but didn't want to invest in buying one. bucketIT's electronics rental was perfect - latest model, perfect condition, and great price.",
    rating: 4
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "Book Lover",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    content: "I'm an avid reader but was running out of space for books. Now I rent my reading material from bucketIT - it's eco-friendly and I get to enjoy new books without the storage issues.",
    rating: 5
  },
  {
    id: 5,
    name: "David Thompson",
    role: "Event Planner",
    image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=200&auto=format&fit=crop",
    content: "bucketIT has been a game-changer for my event planning business. I can rent furniture and decor for each unique event without the huge overhead of purchasing and storing items.",
    rating: 5
  }
];

interface TestimonialsProps {
  className?: string;
}

export function Testimonials({ className }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const visibleTestimonials = [
    testimonials[activeIndex],
    testimonials[(activeIndex + 1) % testimonials.length],
    testimonials[(activeIndex + 2) % testimonials.length]
  ];

  return (
    <section className={cn("py-16 px-4 md:px-8", className)}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">What Our Customers Say</h2>
            <p className="text-muted-foreground max-w-2xl">
              Don't just take our word for it - hear from the people who have experienced the convenience of renting with bucketIT
            </p>
          </div>
          
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full"
              onClick={handlePrev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full"
              onClick={handleNext}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleTestimonials.map((testimonial, index) => (
            <Card 
              key={`${testimonial.id}-${index}`} 
              className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white h-full"
            >
              <CardContent className="p-6 flex flex-col h-full">
                {/* Rating */}
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-muted'}`} 
                    />
                  ))}
                </div>
                
                {/* Content */}
                <p className="text-muted-foreground flex-grow mb-6">"{testimonial.content}"</p>
                
                {/* Author */}
                <div className="flex items-center mt-auto">
                  <Avatar className="h-10 w-10 mr-3 border">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
