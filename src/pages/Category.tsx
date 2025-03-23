
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Eye, Filter, ChevronDown, Star, StarHalf } from "lucide-react";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  rentalPeriod: string;
  available: boolean;
  rating?: number;
  featured?: boolean;
  discount?: number; 
  description?: string;
}

const productsByCategory: Record<string, Product[]> = {
  furniture: [
    {
      id: 1,
      name: "Modern Lounge Chair",
      image: "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?q=80&w=2272&auto=format&fit=crop",
      price: 39.99,
      category: "furniture",
      rentalPeriod: "weekly",
      available: true,
      rating: 4.5,
      description: "Elegant lounge chair with ergonomic design"
    },
    {
      id: 2,
      name: "Minimalist Desk",
      image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=2536&auto=format&fit=crop",
      price: 29.99,
      category: "furniture",
      rentalPeriod: "weekly",
      available: true,
      rating: 4.2,
      description: "Sleek and spacious workspace solution"
    },
    {
      id: 4,
      name: "Premium Bookshelf",
      image: "https://images.unsplash.com/photo-1588279102906-b93c06fdc441?q=80&w=2070&auto=format&fit=crop",
      price: 24.99,
      category: "furniture",
      rentalPeriod: "weekly",
      available: true,
      rating: 4.7,
      featured: true,
      description: "Stylish bookshelf with adjustable shelves"
    },
    {
      id: 7,
      name: "Ergonomic Office Chair",
      image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=2073&auto=format&fit=crop",
      price: 34.99,
      category: "furniture",
      rentalPeriod: "weekly",
      available: true,
      rating: 4.8,
      description: "Comfortable chair designed for long work hours"
    },
    {
      id: 11,
      name: "Scandinavian Coffee Table",
      image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=2664&auto=format&fit=crop",
      price: 19.99,
      category: "furniture",
      rentalPeriod: "weekly",
      available: true,
      rating: 4.3,
      description: "Minimalist coffee table with wooden finish"
    },
    {
      id: 12,
      name: "Mid-Century Dining Set",
      image: "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?q=80&w=2070&auto=format&fit=crop",
      price: 49.99,
      category: "furniture",
      rentalPeriod: "weekly",
      available: true,
      rating: 4.6,
      featured: true,
      description: "Complete dining set with 4 chairs and table"
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
      available: true,
      rating: 4.9,
      featured: true,
      description: "Powerful laptop for professionals and creators"
    },
    {
      id: 5,
      name: "4K Smart TV - 55\"",
      image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=2057&auto=format&fit=crop",
      price: 79.99,
      category: "electronics",
      rentalPeriod: "weekly",
      available: false,
      rating: 4.5,
      description: "Ultra HD resolution with smart streaming capabilities"
    },
    {
      id: 8,
      name: "Wireless Noise-Cancelling Headphones",
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065&auto=format&fit=crop",
      price: 29.99,
      category: "electronics",
      rentalPeriod: "weekly",
      available: true,
      rating: 4.7,
      description: "Premium sound with active noise cancellation"
    },
    {
      id: 13,
      name: "Digital Camera DSLR",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2138&auto=format&fit=crop",
      price: 89.99,
      category: "electronics",
      rentalPeriod: "weekly",
      available: true,
      rating: 4.6,
      description: "Professional-grade camera for photography enthusiasts"
    },
    {
      id: 14,
      name: "Gaming Console",
      image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=2070&auto=format&fit=crop",
      price: 59.99,
      category: "electronics",
      rentalPeriod: "weekly",
      available: true,
      rating: 4.8,
      featured: true,
      description: "Next-gen gaming experience with latest titles"
    },
    {
      id: 15,
      name: "Bluetooth Speaker",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2069&auto=format&fit=crop",
      price: 19.99,
      category: "electronics",
      rentalPeriod: "weekly",
      available: true,
      rating: 4.4,
      description: "Portable speaker with rich, room-filling sound"
    },
    {
      id: 16,
      name: "Tablet - 10\"",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=2033&auto=format&fit=crop",
      price: 39.99,
      category: "electronics",
      rentalPeriod: "weekly",
      available: true,
      rating: 4.5,
      description: "Versatile tablet for work and entertainment"
    },
    {
      id: 17,
      name: "Wireless Earbuds",
      image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=2070&auto=format&fit=crop",
      price: 24.99,
      category: "electronics",
      rentalPeriod: "weekly",
      available: true,
      rating: 4.3,
      description: "True wireless earbuds with charging case"
    },
    {
      id: 18,
      name: "Smart Watch",
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072&auto=format&fit=crop",
      price: 34.99,
      category: "electronics",
      rentalPeriod: "weekly",
      available: true,
      rating: 4.6,
      featured: true,
      description: "Fitness tracking and notifications on your wrist"
    },
    {
      id: 19,
      name: "Home Security Camera",
      image: "https://images.unsplash.com/photo-1580745294621-e560e0695269?q=80&w=2154&auto=format&fit=crop",
      price: 29.99,
      category: "electronics",
      rentalPeriod: "weekly",
      available: true,
      rating: 4.4,
      description: "HD security camera with motion detection"
    },
    {
      id: 20,
      name: "Drone with Camera",
      image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?q=80&w=2070&auto=format&fit=crop",
      price: 99.99,
      category: "electronics",
      rentalPeriod: "weekly",
      available: false,
      rating: 4.7,
      description: "Aerial photography and video capture"
    },
    {
      id: 21,
      name: "Mechanical Keyboard",
      image: "https://images.unsplash.com/photo-1595225476474-63bd911e074c?q=80&w=2072&auto=format&fit=crop",
      price: 29.99,
      category: "electronics",
      rentalPeriod: "weekly",
      available: true,
      rating: 4.8,
      description: "Tactile typing experience with RGB lighting"
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
      available: true,
      rating: 4.5,
      description: "Collection of top bestselling fiction titles"
    },
    {
      id: 9,
      name: "Classic Literature Bundle",
      image: "https://images.unsplash.com/photo-1519682577862-22b62b24e493?q=80&w=2070&auto=format&fit=crop",
      price: 14.99,
      category: "books",
      rentalPeriod: "weekly",
      available: true,
      rating: 4.8,
      featured: true,
      description: "Timeless classics from renowned authors"
    },
    {
      id: 10,
      name: "Self Improvement Collection",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2087&auto=format&fit=crop",
      price: 12.99,
      category: "books",
      rentalPeriod: "weekly",
      available: true,
      rating: 4.6,
      description: "Books to help personal growth and development"
    },
    {
      id: 22,
      name: "Fantasy Series Box Set",
      image: "https://images.unsplash.com/photo-1533589605630-e8c5204dda38?q=80&w=2079&auto=format&fit=crop",
      price: 24.99,
      category: "books",
      rentalPeriod: "weekly",
      available: true,
      rating: 4.9,
      featured: true,
      description: "Complete fantasy series in collectible box"
    },
    {
      id: 23,
      name: "Business & Finance Books",
      image: "https://images.unsplash.com/photo-1554496397-1aaf7e05bd1c?q=80&w=2070&auto=format&fit=crop",
      price: 17.99,
      category: "books",
      rentalPeriod: "weekly",
      available: true,
      rating: 4.4,
      description: "Essential reads for entrepreneurs and investors"
    },
    {
      id: 24,
      name: "Children's Illustrated Stories",
      image: "https://images.unsplash.com/photo-1512196514232-58f9775fee95?q=80&w=2070&auto=format&fit=crop",
      price: 8.99,
      category: "books",
      rentalPeriod: "weekly",
      available: true,
      rating: 4.7,
      description: "Beautifully illustrated books for young readers"
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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [filterAvailable, setFilterAvailable] = useState(false);
  const [filterFeatured, setFilterFeatured] = useState(false);
  const [sortOption, setSortOption] = useState("recommended");

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (category && category in productsByCategory) {
      const categoryProducts = productsByCategory[category];
      setProducts(categoryProducts);
      
      // Store product data in localStorage for search functionality
      localStorage.setItem(`${category}Products`, JSON.stringify(
        categoryProducts.map(product => ({
          id: product.id,
          name: product.name,
          category: product.category,
          image: product.image,
          price: product.price,
          description: product.description
        }))
      ));
      
      setTitle(categoryTitles[category] || `${category.charAt(0).toUpperCase() + category.slice(1)} Rentals`);
      setDescription(categoryDescriptions[category] || "");
    } else {
      setProducts([]);
      setTitle("Category Not Found");
      setDescription("The requested category does not exist.");
    }
  }, [category]);

  useEffect(() => {
    let result = [...products];
    
    if (filterAvailable) {
      result = result.filter(product => product.available);
    }
    
    if (filterFeatured) {
      result = result.filter(product => product.featured);
    }
    
    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "recommended":
      default:
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return (b.rating || 0) - (a.rating || 0);
        });
    }
    
    setFilteredProducts(result);
    setCurrentPage(1);
  }, [products, filterAvailable, filterFeatured, sortOption]);

  const handleAddToCart = (product: Product) => {
    const storedCart = localStorage.getItem("cartItems");
    let cartItems = storedCart ? JSON.parse(storedCart) : [];
    
    cartItems.push(product);
    
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    
    const newCartCount = cartItems.length;
    localStorage.setItem("cartCount", newCartCount.toString());
    
    window.dispatchEvent(new Event('storage'));
    
    toast.success("Item added to cart");
  };

  const handleAddToWishlist = (product: Product) => {
    const storedWishlist = localStorage.getItem("wishlistItems");
    let wishlistItems = storedWishlist ? JSON.parse(storedWishlist) : [];
    
    const isAlreadyInWishlist = wishlistItems.some((item: Product) => item.id === product.id);
    
    if (!isAlreadyInWishlist) {
      wishlistItems.push(product);
      
      localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
      
      const newWishlistCount = wishlistItems.length;
      localStorage.setItem("wishlistCount", newWishlistCount.toString());
      
      window.dispatchEvent(new Event('storage'));
      
      toast.success("Item added to wishlist");
    } else {
      toast.info("Item is already in your wishlist");
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const renderPagination = () => {
    const pageNumbers = [];
    
    pageNumbers.push(1);
    
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    if (startPage > 2) {
      pageNumbers.push("ellipsis1");
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    if (endPage < totalPages - 1) {
      pageNumbers.push("ellipsis2");
    }
    
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
    
    return (
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>
        
        {pageNumbers.map((page, index) => (
          typeof page === "number" ? (
            <PaginationItem key={index}>
              <PaginationLink 
                onClick={() => setCurrentPage(page)}
                isActive={currentPage === page}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <div className="flex h-9 w-9 items-center justify-center">
                <span className="text-muted-foreground">...</span>
              </div>
            </PaginationItem>
          )
        ))}
        
        <PaginationItem>
          <PaginationNext 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            aria-disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    );
  };

  const renderRating = (rating: number = 0) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center gap-0.5 text-amber-500">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-current" />
        ))}
        {hasHalfStar && <StarHalf className="h-3.5 w-3.5 fill-current" />}
        <span className="ml-1 text-xs text-muted-foreground">({rating.toFixed(1)})</span>
      </div>
    );
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
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-4">{title}</h1>
              {description && <p className="text-muted-foreground mb-4 max-w-3xl">{description}</p>}
            </div>
            
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {filteredProducts.length} products
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8 p-4 bg-card rounded-lg shadow-sm border border-border/40">
            <div className="flex-1 flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filters:</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={filterAvailable ? "default" : "outline"}
                  size="sm"
                  className="h-8 text-xs rounded-full"
                  onClick={() => setFilterAvailable(!filterAvailable)}
                >
                  In Stock
                </Button>
                <Button
                  variant={filterFeatured ? "default" : "outline"}
                  size="sm"
                  className="h-8 text-xs rounded-full"
                  onClick={() => setFilterFeatured(!filterFeatured)}
                >
                  Featured
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Sort by:</span>
              <select
                className="h-8 rounded-md border border-input bg-background px-3 py-1 text-sm outline-none focus:ring-1 focus:ring-ring"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
          
          {currentProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                {currentProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300 group">
                    <div className="relative">
                      <Link to={`/product/${product.id}`}>
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
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
                      
                      {product.featured && product.available && (
                        <div className="absolute top-2 left-2">
                          <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                            Featured
                          </span>
                        </div>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        onClick={() => handleAddToWishlist(product)}
                        aria-label="Add to wishlist"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <CardContent className="p-4">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-medium mb-1 transition-colors hover:text-primary line-clamp-1">
                          {product.name}
                        </h3>
                      </Link>
                      
                      {product.description && (
                        <p className="text-muted-foreground text-xs mb-2 line-clamp-2">
                          {product.description}
                        </p>
                      )}
                      
                      {product.rating && (
                        <div className="mb-2">
                          {renderRating(product.rating)}
                        </div>
                      )}
                      
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
                            onClick={() => handleAddToCart(product)}
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
              
              {totalPages > 1 && (
                <Pagination className="my-8">
                  {renderPagination()}
                </Pagination>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-medium mb-4">No products found</h2>
              <p className="text-muted-foreground mb-8">
                Try changing your filters or check another category.
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
