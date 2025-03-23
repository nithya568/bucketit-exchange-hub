import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, ShoppingCart, Eye } from "lucide-react";
import { toast } from "sonner";

interface WishlistItem {
  id: number;
  name: string;
  image: string;
  price: number;
  rentalPeriod: string;
  available: boolean;
}

// Initialize with empty wishlist
const initialWishlistItems: WishlistItem[] = [];

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(initialWishlistItems);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRemoveItem = (id: number) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
    toast.success("Item removed from wishlist");
  };

  const handleAddToCart = (item: WishlistItem) => {
    // In a real app, this would add to cart through context/API
    toast.success(`${item.name} added to cart`);
    
    // Option to remove from wishlist after adding to cart
    setWishlistItems(wishlistItems.filter((wishlistItem) => wishlistItem.id !== item.id));
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
              <li className="font-medium">Wishlist</li>
            </ol>
          </nav>
          
          <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
          
          {wishlistItems.length > 0 ? (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {wishlistItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="relative">
                      <Link to={`/product/${item.id}`}>
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                          />
                        </div>
                      </Link>
                      
                      {!item.available && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white font-medium px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm">
                            Currently Unavailable
                          </span>
                        </div>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-muted-foreground hover:text-destructive"
                        onClick={() => handleRemoveItem(item.id)}
                        aria-label="Remove from wishlist"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <CardContent className="p-4">
                      <Link to={`/product/${item.id}`}>
                        <h3 className="font-medium mb-1 transition-colors hover:text-primary">
                          {item.name}
                        </h3>
                      </Link>
                      
                      <div className="flex justify-between items-baseline mt-2">
                        <div className="text-sm font-semibold">
                          ${item.price.toFixed(2)}/{item.rentalPeriod.slice(0, -2)}
                        </div>
                        
                        <div className="flex space-x-2">
                          <Link to={`/product/${item.id}`}>
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
                            disabled={!item.available}
                            onClick={() => handleAddToCart(item)}
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
              
              <div className="flex justify-between items-center">
                <Link to="/">
                  <Button variant="outline" className="rounded-full">
                    Continue Shopping
                  </Button>
                </Link>
                
                <Button
                  variant="destructive"
                  onClick={() => {
                    setWishlistItems([]);
                    toast.success("Wishlist cleared");
                  }}
                  className="rounded-full"
                >
                  Clear Wishlist
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-medium mb-4">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-8">
                Save items you're interested in renting for easy access later.
              </p>
              <Link to="/">
                <Button className="rounded-full" size="lg">
                  Start Shopping
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

export default Wishlist;
