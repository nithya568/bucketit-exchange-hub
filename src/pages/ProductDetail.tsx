
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Heart, ShoppingCart, Truck, RefreshCw, Shield } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  rentalPeriod: string;
  available: boolean;
  description: string;
  details: string;
  reviews: {
    id: number;
    author: string;
    rating: number;
    date: string;
    comment: string;
  }[];
}

// Sample products data
const products: Record<number, Product> = {
  1: {
    id: 1,
    name: "Modern Lounge Chair",
    image: "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?q=80&w=2272&auto=format&fit=crop",
    price: 39.99,
    category: "furniture",
    rentalPeriod: "weekly",
    available: true,
    description: "A comfortable modern lounge chair with a sleek design that complements any living space. Perfect for reading or relaxing after a long day.",
    details: "Materials: Solid wood frame, premium upholstery\nDimensions: 35\"H x 28\"W x 30\"D\nWeight: 24 lbs\nColor: Light Gray\nAssembly: Not required",
    reviews: [
      {
        id: 1,
        author: "Alex J.",
        rating: 5,
        date: "2023-10-15",
        comment: "Extremely comfortable and looks great in my apartment. Really happy with the rental!"
      },
      {
        id: 2,
        author: "Sam T.",
        rating: 4,
        date: "2023-09-22",
        comment: "Very stylish and comfortable. Delivery was prompt and setup was hassle-free."
      }
    ]
  },
  2: {
    id: 2,
    name: "Minimalist Desk",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=2536&auto=format&fit=crop",
    price: 29.99,
    category: "furniture",
    rentalPeriod: "weekly",
    available: true,
    description: "A sleek minimalist desk that provides a clean workspace without cluttering your room. Ideal for home offices or student apartments.",
    details: "Materials: Engineered wood, steel legs\nDimensions: 30\"H x 48\"W x 24\"D\nWeight: 35 lbs\nColor: White/Black\nAssembly: Required (tools included)",
    reviews: [
      {
        id: 1,
        author: "Jordan K.",
        rating: 5,
        date: "2023-11-03",
        comment: "Perfect desk for my small apartment. Assembly was straightforward and it looks great!"
      }
    ]
  },
  3: {
    id: 3,
    name: "MacBook Pro 16\"",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2626&auto=format&fit=crop",
    price: 149.99,
    category: "electronics",
    rentalPeriod: "weekly",
    available: true,
    description: "The latest MacBook Pro featuring a stunning 16-inch Retina display, powerful performance, and all-day battery life. Perfect for professionals and creatives.",
    details: "Specifications:\nProcessor: Apple M2 Pro\nRAM: 16GB\nStorage: 512GB SSD\nDisplay: 16\" Retina\nBattery: Up to 22 hours\nIncludes: Charger and protective sleeve",
    reviews: [
      {
        id: 1,
        author: "Taylor R.",
        rating: 5,
        date: "2023-10-28",
        comment: "Excellent performance! Renting was a great way to try before committing to buy. Very satisfied with this service."
      },
      {
        id: 2,
        author: "Morgan P.",
        rating: 4,
        date: "2023-09-15",
        comment: "Great laptop, arrived fully charged and ready to use. Only giving 4 stars because it had a minor scratch on the bottom."
      }
    ]
  },
  4: {
    id: 4,
    name: "Premium Bookshelf",
    image: "https://images.unsplash.com/photo-1588279102906-b93c06fdc441?q=80&w=2070&auto=format&fit=crop",
    price: 24.99,
    category: "furniture",
    rentalPeriod: "weekly",
    available: true,
    description: "A spacious bookshelf with a contemporary design that offers ample storage for books, decorative items, and more.",
    details: "Materials: Engineered wood with laminate finish\nDimensions: 72\"H x 36\"W x 12\"D\nWeight: 45 lbs\nColor: Walnut\nAssembly: Required",
    reviews: [
      {
        id: 1,
        author: "Casey L.",
        rating: 4,
        date: "2023-08-20",
        comment: "Sturdy bookshelf with plenty of space. Assembly took longer than expected but the end result is worth it."
      }
    ]
  },
  5: {
    id: 5,
    name: "4K Smart TV - 55\"",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=2057&auto=format&fit=crop",
    price: 79.99,
    category: "electronics",
    rentalPeriod: "weekly",
    available: false,
    description: "A stunning 4K Smart TV with HDR and built-in streaming apps. Perfect for movie nights and gaming sessions.",
    details: "Specifications:\nScreen: 55\" 4K UHD\nResolution: 3840x2160\nConnections: 4x HDMI, 2x USB, Ethernet, Wi-Fi\nFeatures: HDR10, Dolby Vision, built-in streaming apps\nIncludes: Remote, wall mount kit, and HDMI cable",
    reviews: [
      {
        id: 1,
        author: "Riley J.",
        rating: 5,
        date: "2023-07-15",
        comment: "Amazing picture quality! Was perfect for our weekend movie marathon."
      }
    ]
  },
  6: {
    id: 6,
    name: "Bestseller Book Collection",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2098&auto=format&fit=crop",
    price: 9.99,
    category: "books",
    rentalPeriod: "weekly",
    available: true,
    description: "A curated collection of this year's bestselling novels, spanning multiple genres from mystery and thriller to romance and science fiction.",
    details: "Collection includes:\n- 5 hardcover bestsellers\n- 3 paperback novels\n- Reading guide\n- Protective book covers\nGenres: Fiction, Mystery, Thriller, Romance, Science Fiction",
    reviews: [
      {
        id: 1,
        author: "Jamie T.",
        rating: 5,
        date: "2023-09-10",
        comment: "Amazing selection! Saved so much money by renting these instead of buying them all individually."
      },
      {
        id: 2,
        author: "Pat D.",
        rating: 4,
        date: "2023-08-28",
        comment: "Great variety of books. One arrived with slightly bent pages, but otherwise perfect."
      }
    ]
  },
  7: {
    id: 7,
    name: "Ergonomic Office Chair",
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=2073&auto=format&fit=crop",
    price: 34.99,
    category: "furniture",
    rentalPeriod: "weekly",
    available: true,
    description: "An ergonomic office chair designed for comfort during long work sessions. Features adjustable height, lumbar support, and padded armrests.",
    details: "Materials: Mesh back, padded seat, steel frame\nAdjustments: Height, armrests, tilt, lumbar support\nWeight capacity: 300 lbs\nColor: Black\nAssembly: Minimal assembly required",
    reviews: [
      {
        id: 1,
        author: "Jordan B.",
        rating: 5,
        date: "2023-10-05",
        comment: "My back thanks me every day! This chair made working from home so much more comfortable."
      }
    ]
  },
  8: {
    id: 8,
    name: "Wireless Noise-Cancelling Headphones",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065&auto=format&fit=crop",
    price: 29.99,
    category: "electronics",
    rentalPeriod: "weekly",
    available: true,
    description: "Premium wireless headphones with active noise cancellation, delivering immersive sound quality and all-day comfort.",
    details: "Specifications:\nType: Over-ear\nBattery life: Up to 30 hours\nConnectivity: Bluetooth 5.0, 3.5mm cable\nFeatures: Active noise cancellation, voice assistant support\nIncludes: Carrying case, charging cable, and audio cable",
    reviews: [
      {
        id: 1,
        author: "Alex R.",
        rating: 5,
        date: "2023-11-15",
        comment: "These headphones are amazing! The noise cancellation is perfect for my daily commute."
      },
      {
        id: 2,
        author: "Sam W.",
        rating: 4,
        date: "2023-10-22",
        comment: "Great sound quality and comfortable to wear for long periods. Battery life is impressive."
      }
    ]
  },
  9: {
    id: 9,
    name: "Classic Literature Bundle",
    image: "https://images.unsplash.com/photo-1519682577862-22b62b24e493?q=80&w=2070&auto=format&fit=crop",
    price: 14.99,
    category: "books",
    rentalPeriod: "weekly",
    available: true,
    description: "A collection of classic literature featuring beautifully bound editions of timeless works from renowned authors throughout history.",
    details: "Collection includes:\n- 10 hardcover classics\n- Author biographies\n- Literary analysis guides\n- Custom bookmarks\nAuthors include: Austen, Dickens, Tolstoy, Bronte, and more",
    reviews: [
      {
        id: 1,
        author: "Morgan L.",
        rating: 5,
        date: "2023-08-18",
        comment: "Beautiful editions of these classic works. Perfect for my literary-themed event."
      }
    ]
  },
  10: {
    id: 10,
    name: "Self Improvement Collection",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2087&auto=format&fit=crop",
    price: 12.99,
    category: "books",
    rentalPeriod: "weekly",
    available: true,
    description: "A carefully selected collection of bestselling self-improvement books covering topics such as productivity, mindfulness, health, and personal finance.",
    details: "Collection includes:\n- 7 hardcover books\n- Workbooks and journals\n- Reading guides\n- Note-taking materials\nTopics: Productivity, Mindfulness, Health, Finance, Relationships",
    reviews: [
      {
        id: 1,
        author: "Taylor S.",
        rating: 5,
        date: "2023-09-30",
        comment: "These books have genuinely changed my perspective. Great selection at an affordable rental price."
      },
      {
        id: 2,
        author: "Jordan K.",
        rating: 4,
        date: "2023-09-05",
        comment: "Really enjoyed most of the books in this collection. The workbooks were especially helpful."
      }
    ]
  }
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedRentalPeriod, setSelectedRentalPeriod] = useState("weekly");
  const [isLoading, setIsLoading] = useState(true);

  // Calculate price based on rental period
  const getPeriodPrice = (basePrice: number, period: string) => {
    switch (period) {
      case "daily":
        return basePrice / 5;
      case "weekly":
        return basePrice;
      case "monthly":
        return basePrice * 3;
      default:
        return basePrice;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate fetching product data
    setIsLoading(true);
    setTimeout(() => {
      if (id && products[parseInt(id)]) {
        setProduct(products[parseInt(id)]);
      }
      setIsLoading(false);
    }, 300);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    toast.success(`${product.name} added to cart (${quantity} ${quantity === 1 ? 'item' : 'items'})`);
  };

  const handleAddToWishlist = () => {
    if (!product) return;
    
    toast.success(`${product.name} added to wishlist`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-16 px-4 md:px-8 bg-muted/30 flex items-center justify-center">
          <div className="text-center">
            <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading product...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-16 px-4 md:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto text-center py-16">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The product you are looking for does not exist or has been removed.
            </p>
            <Link to="/">
              <Button className="rounded-full" size="lg">
                Back to Home
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const periodPrice = getPeriodPrice(product.price, selectedRentalPeriod);

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
              <li>
                <Link to={`/category/${product.category}`} className="text-muted-foreground hover:text-primary">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </Link>
              </li>
              <li className="mx-2 text-muted-foreground">/</li>
              <li className="font-medium">{product.name}</li>
            </ol>
          </nav>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="aspect-square rounded-lg overflow-hidden bg-white">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Product Information */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="text-muted-foreground mt-2">{product.description}</p>
              </div>
              
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">${periodPrice.toFixed(2)}</span>
                <span className="text-muted-foreground ml-2">
                  /{selectedRentalPeriod.slice(0, -2)}
                </span>
              </div>
              
              {!product.available && (
                <div className="bg-destructive/10 text-destructive rounded-md px-4 py-3">
                  Currently unavailable for rent
                </div>
              )}
              
              {/* Rental Period Selection */}
              <div>
                <h3 className="font-medium mb-3">Rental Period</h3>
                <RadioGroup 
                  value={selectedRentalPeriod} 
                  onValueChange={setSelectedRentalPeriod}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="daily" id="daily" />
                    <Label htmlFor="daily">Daily</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weekly" id="weekly" />
                    <Label htmlFor="weekly">Weekly</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly">Monthly</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {/* Quantity Selection */}
              <div className="flex items-center space-x-4">
                <Label htmlFor="quantity" className="font-medium">
                  Quantity
                </Label>
                <div className="flex items-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-l-md rounded-r-none"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={!product.available}
                  >
                    -
                  </Button>
                  <div className="h-8 px-4 flex items-center justify-center border-y border-input">
                    {quantity}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-r-md rounded-l-none"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={!product.available}
                  >
                    +
                  </Button>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  className="rounded-full flex-1"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!product.available}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                
                <Button
                  variant="outline"
                  className="rounded-full"
                  size="lg"
                  onClick={handleAddToWishlist}
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Add to Wishlist
                </Button>
              </div>
              
              {/* Delivery Info */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center text-sm">
                  <Truck className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Free delivery on orders over $150</span>
                </div>
                <div className="flex items-center text-sm">
                  <RefreshCw className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Free returns within 7 days</span>
                </div>
                <div className="flex items-center text-sm">
                  <Shield className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Damage protection included</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="details">
              <TabsList className="mb-6">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({product.reviews.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4">
                <h3 className="text-xl font-medium">Product Details</h3>
                <p className="whitespace-pre-line">{product.details}</p>
              </TabsContent>
              
              <TabsContent value="reviews" className="space-y-6">
                <h3 className="text-xl font-medium">Customer Reviews</h3>
                
                {product.reviews.map((review) => (
                  <div key={review.id} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{review.author}</h4>
                        <div className="flex items-center">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill={i < review.rating ? "currentColor" : "none"}
                                stroke={i < review.rating ? "none" : "currentColor"}
                                strokeWidth="2"
                                className={`h-4 w-4 ${
                                  i < review.rating ? "text-yellow-400" : "text-gray-300"
                                }`}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                />
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground ml-2">
                            {review.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p>{review.comment}</p>
                    <Separator className="my-4" />
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
