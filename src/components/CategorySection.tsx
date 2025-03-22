
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  count: number;
}

interface CategorySectionProps {
  title: string;
  subtitle: string;
  categories: Category[];
  className?: string;
}

export function CategorySection({ title, subtitle, categories, className }: CategorySectionProps) {
  return (
    <section className={cn("py-16 px-4 md:px-8", className)}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 animate-slide-up">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-slide-up">{subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link 
              key={category.id}
              to={`/category/${category.id}`}
              className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-lg animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-[3/4] w-full overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                <div className="absolute bottom-0 p-6 w-full">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                      <p className="text-white/80 text-sm mb-3">{category.description}</p>
                      <span className="text-xs text-white/70">{category.count} products</span>
                    </div>
                    
                    <span className="flex items-center justify-center p-2 bg-white/10 backdrop-blur-sm rounded-full text-white transition-all duration-300 group-hover:bg-primary">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
