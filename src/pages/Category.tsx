
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  rentalPeriod: string;
  available: boolean;
}

// Sample products data grouped by category
const productsByCategory: Record<string, Product[]> = {
  furniture: [
    {
      id: 1,
      name: "Modern Lounge Chair",
      image: "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?q=80&w=2272&auto=format&fit=crop",
      price: 39.99,
      category: "furniture",
      rentalPeriod: "weekly",
      available: true
    },
    {
      id: 2,
      name: "Minimalist Desk",
      image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=2536&auto=format&fit=crop",
      price: 29.99,
      category: "furniture",
      rentalPeriod: "weekly",
      available: true
    },
    {
      id: 4,
      name: "Premium Bookshelf",
      image: "https://images.unsplash.com/photo-1588279102906-b93c06fdc441?q=80&w=2070&auto=format&fit=crop",
      price: 24.99,
      category: "furniture",
      rentalPeriod: "weekly",
      available: true
    },
    {
      id: 7,
      name: "Ergonomic Office Chair",
      image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=2073&auto=format&fit=crop",
      price: 34.99,
      category: "furniture",
      rentalPeriod: "weekly",
      available: true
    }
  ],
  electronics: [
    {
      id: 3,
      name: "MacBook Pro 16\"",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2626&auto=format&fit=crop",
      price: 149.99,
      category: "electronics",
      rentalPeriod: "weekly",
      available: true
    },
    {
      id: 5,
      name: "4K Smart TV - 55\"",
      image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=2057&auto=format&fit=crop",
      price: 79.99,
      category: "electronics",
      rentalPeriod: "weekly",
      available: false
    },
    {
      id: 8,
      name: "Wireless Noise-Cancelling Headphones",
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065&auto=format&fit=crop",
      price: 29.99,
      category: "electronics",
      rentalPeriod: "weekly",
      available: true
    }
  ],
  books: [
    {
      id: 6,
      name: "Bestseller Book Collection",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2098&auto=format&fit=crop",
      price: 9.99,
      category: "books",
      rentalPeriod: "weekly",
      available: true
    },
    {
      id: 9,
      name: "Classic Literature Bundle",
      image: "https://images.unsplash.com/photo-1519682577862-22b62b24e493?q=80&w=2070&auto=format&fit=crop",
      price: 14.99,
      category: "books",
      rentalPeriod: "weekly",
      available: true
    },
    {
      id: 10,
      name: "Self Improvement Collection",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2087&auto=format&fit=crop",
      price: 12.99,
      category: "books",
      rentalPeriod: "weekly",
      available: true
    }
  ]
};

const categoryTitles: Record<string, string> = {
  furniture: "Furniture Rentals",
  electronics: "Electronics Rentals",
  books: "Book Rentals"
};

const categoryDescriptions: Record<string, string> = {
  furniture: "Rent high-quality furniture for your home or office without the commitment of ownership.",
  electronics: "Stay up-to-date with the latest technology by renting premium electronics.",
  books: "Explore our extensive collection of books available for rent at affordable prices."
};

const Category = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Scroll to top on page load or category change
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Set products based on the category
    if (category && category in productsByCategory) {
      setProducts(productsByCategory[category]);
      setTitle(categoryTitles[category] || `${category.charAt(0).toUpperCase() + category.slice(1)} Rentals`);
      setDescription(categoryDescriptions[category] || "");
    } else {
      // Handle invalid category
      setProducts([]);
      setTitle("Category Not Found");
      setDescription("The requested category does not exist.");
    }
  }, [category]);

  const handleAddToCart = (productId: number) => {
    // In a real app, this would add to cart through context/API
    toast.success("Item added to cart");
  };

  const handleAddToWishlist = (productId: number) => {
    // In a real app, this would add to wishlist through context/API
    toast.success("Item added to wishlist");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16 px-4 md:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <nav className="mb-8">
            <ol className="flex items-center text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li className="mx-2 text-muted-foreground">/</li>
              <li className="font-medium">{title}</li>
            </ol>
          </nav>
          
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          {description && <p className="text-muted-foreground mb-8 max-w-3xl">{description}</p>}
          
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="relative">
                    <Link to={`/product/${product.id}`}>
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                      </div>
                    </Link>
                    
                    {!product.available && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white font-medium px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm">
                          Currently Unavailable
                        </span>
                      </div>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                      onClick={() => handleAddToWishlist(product.id)}
                      aria-label="Add to wishlist"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <CardContent className="p-4">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-medium mb-1 transition-colors hover:text-primary">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <div className="flex justify-between items-baseline mt-2">
                      <div className="text-sm font-semibold">
                        ${product.price.toFixed(2)}/{product.rentalPeriod.slice(0, -2)}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Link to={`/product/${product.id}`}>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 rounded-full"
                            aria-label="View product"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        
                        <Button
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          disabled={!product.available}
                          onClick={() => handleAddToCart(product.id)}
                          aria-label="Add to cart"
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-medium mb-4">No products found</h2>
              <p className="text-muted-foreground mb-8">
                We couldn't find any products in this category. Please try another category.
              </p>
              <Link to="/">
                <Button className="rounded-full" size="lg">
                  Back to Home
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Category;
