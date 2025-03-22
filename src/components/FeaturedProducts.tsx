
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface Product {
  id: number;
  name: string;
  price: number;
  rentalPrice: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  category: string;
  image: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  isOnSale?: boolean;
  discount?: number;
}

interface FeaturedProductsProps {
  title: string;
  subtitle?: string;
  products: Product[];
  className?: string;
}

export function FeaturedProducts({ title, subtitle, products, className }: FeaturedProductsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
  };

  const scrollTo = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const { clientWidth } = scrollContainerRef.current;
    const scrollAmount = clientWidth * 0.8;
    
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleAddToCart = (product: Product) => {
    toast.success(`${product.name} added to cart`);
    // This would interact with your cart context/state in a real app
  };

  const handleAddToWishlist = (product: Product) => {
    toast.success(`${product.name} added to wishlist`);
    // This would interact with your wishlist context/state in a real app
  };

  return (
    <section className={cn("py-16 px-4 md:px-8", className)}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">{title}</h2>
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
          </div>
          
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Button 
              variant="outline" 
              size="icon" 
              className={`rounded-full transition-opacity duration-200 ${showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              onClick={() => scrollTo('left')}
              disabled={!showLeftArrow}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className={`rounded-full transition-opacity duration-200 ${showRightArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              onClick={() => scrollTo('right')}
              disabled={!showRightArrow}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-6 pb-6 scrollbar-hide"
          onScroll={handleScroll}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
}

function ProductCard({ product, onAddToCart, onAddToWishlist }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className="min-w-[280px] max-w-[280px] border-none shadow-sm hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <div className="aspect-square overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className={`h-full w-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
            />
          </div>
        </Link>
        
        {/* Product badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>
          )}
          {product.isBestSeller && (
            <Badge className="bg-amber-500 hover:bg-amber-600">Best Seller</Badge>
          )}
          {product.isOnSale && (
            <Badge className="bg-red-500 hover:bg-red-600">Sale {product.discount}% Off</Badge>
          )}
        </div>
        
        {/* Actions */}
        <div 
          className={`absolute right-3 top-3 flex flex-col gap-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
          }`}
        >
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
            onClick={(e) => {
              e.preventDefault();
              onAddToWishlist(product);
            }}
            aria-label="Add to wishlist"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4">
        <Link to={`/product/${product.id}`} className="block">
          <div className="text-xs text-muted-foreground mb-1">{product.category}</div>
          <h3 className="font-medium mb-1 transition-colors hover:text-primary">{product.name}</h3>
        </Link>
        
        <div className="flex justify-between items-baseline mt-2">
          <div>
            <div className="text-sm font-semibold">${product.price.toFixed(2)} to buy</div>
            <div className="text-xs text-muted-foreground">
              From ${product.rentalPrice.daily.toFixed(2)}/day
            </div>
          </div>
          
          <Button
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={(e) => {
              e.preventDefault();
              onAddToCart(product);
            }}
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
