
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HeroImage {
  src: string;
  alt: string;
  category: string;
  primaryText: string;
  secondaryText: string;
}

const heroImages: HeroImage[] = [
  {
    src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158&auto=format&fit=crop",
    alt: "Modern living room with minimal furniture",
    category: "furniture",
    primaryText: "Transform Your Space",
    secondaryText: "Rent premium furniture for your home or office"
  },
  {
    src: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070&auto=format&fit=crop",
    alt: "Latest electronics and gadgets",
    category: "electronics",
    primaryText: "Stay Connected",
    secondaryText: "Access the latest tech without the commitment"
  },
  {
    src: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop",
    alt: "Collection of books on a shelf",
    category: "books",
    primaryText: "Discover Stories",
    secondaryText: "Explore our vast collection of books for all readers"
  }
];

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startSlideTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    timerRef.current = setTimeout(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        setIsAnimating(false);
      }, 500);
    }, 6000);
  };

  useEffect(() => {
    startSlideTimer();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [activeIndex]);

  const goToSlide = (index: number) => {
    if (index === activeIndex) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsAnimating(false);
    }, 500);
    startSlideTimer();
  };

  const activeImage = heroImages[activeIndex];

  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
        style={{
          backgroundImage: `url(${activeImage.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl">
            <span 
              className={`inline-block px-4 py-1.5 mb-4 text-xs font-medium tracking-wide uppercase bg-primary/10 backdrop-blur-sm text-primary rounded-full transition-all duration-500 ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}
            >
              {activeImage.category}
            </span>
            
            <h1 
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight transition-all duration-500 ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}
            >
              {activeImage.primaryText}
            </h1>
            
            <p 
              className={`text-lg md:text-xl text-white/90 mb-8 transition-all duration-500 delay-100 ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}
            >
              {activeImage.secondaryText}
            </p>
            
            <div className={`flex flex-wrap gap-4 transition-all duration-500 delay-200 ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
              <Link to={`/category/${activeImage.category}`}>
                <Button size="lg" className="rounded-full">
                  Explore {activeImage.category}
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button size="lg" variant="outline" className="rounded-full text-white border-white hover:bg-white/10">
                  How It Works
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Indicators */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'w-8 bg-primary' 
                    : 'w-3 bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
