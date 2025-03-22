
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CategorySection } from "@/components/CategorySection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { CallToAction } from "@/components/CallToAction";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";

const categoryData = [
  {
    id: "furniture",
    name: "Furniture",
    description: "Stylish and comfortable furniture for all spaces",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2070&auto=format&fit=crop",
    count: 120
  },
  {
    id: "electronics",
    name: "Electronics",
    description: "Latest gadgets and tech at your fingertips",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2901&auto=format&fit=crop",
    count: 85
  },
  {
    id: "books",
    name: "Books",
    description: "Explore our extensive collection of books",
    image: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?q=80&w=2071&auto=format&fit=crop",
    count: 250
  }
];

const featuredProducts = [
  {
    id: 1,
    name: "Modern Lounge Chair",
    price: 599.99,
    rentalPrice: {
      daily: 8.99,
      weekly: 39.99,
      monthly: 99.99
    },
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?q=80&w=2272&auto=format&fit=crop",
    isNew: true
  },
  {
    id: 2,
    name: "Minimalist Desk",
    price: 349.99,
    rentalPrice: {
      daily: 5.99,
      weekly: 29.99,
      monthly: 79.99
    },
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=2536&auto=format&fit=crop",
    isBestSeller: true
  },
  {
    id: 3,
    name: "MacBook Pro 16\"",
    price: 2399.99,
    rentalPrice: {
      daily: 24.99,
      weekly: 149.99,
      monthly: 449.99
    },
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2626&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Premium Bookshelf",
    price: 279.99,
    rentalPrice: {
      daily: 4.99,
      weekly: 24.99,
      monthly: 69.99
    },
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1588279102906-b93c06fdc441?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "4K Smart TV - 55\"",
    price: 899.99,
    rentalPrice: {
      daily: 12.99,
      weekly: 79.99,
      monthly: 199.99
    },
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=2057&auto=format&fit=crop",
    isOnSale: true,
    discount: 15
  },
  {
    id: 6,
    name: "Bestseller Book Collection",
    price: 129.99,
    rentalPrice: {
      daily: 1.99,
      weekly: 9.99,
      monthly: 29.99
    },
    category: "Books",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2098&auto=format&fit=crop"
  }
];

const newArrivals = [
  {
    id: 7,
    name: "Ergonomic Office Chair",
    price: 399.99,
    rentalPrice: {
      daily: 6.99,
      weekly: 34.99,
      monthly: 89.99
    },
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=2073&auto=format&fit=crop",
    isNew: true
  },
  {
    id: 8,
    name: "Wireless Noise-Cancelling Headphones",
    price: 249.99,
    rentalPrice: {
      daily: 4.99,
      weekly: 29.99,
      monthly: 79.99
    },
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065&auto=format&fit=crop",
    isNew: true
  },
  {
    id: 9,
    name: "Coffee Table Book Collection",
    price: 79.99,
    rentalPrice: {
      daily: 1.49,
      weekly: 7.99,
      monthly: 24.99
    },
    category: "Books",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2067&auto=format&fit=crop",
    isNew: true
  },
  {
    id: 10,
    name: "Modern Floor Lamp",
    price: 159.99,
    rentalPrice: {
      daily: 2.99,
      weekly: 14.99,
      monthly: 39.99
    },
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=2074&auto=format&fit=crop",
    isNew: true
  }
];

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        <CategorySection 
          title="Explore Our Categories" 
          subtitle="Find exactly what you need from our wide range of rental options"
          categories={categoryData}
        />
        
        <FeaturedProducts 
          title="Featured Products" 
          subtitle="Our most popular rentals that customers love"
          products={featuredProducts}
        />
        
        <HowItWorks />
        
        <FeaturedProducts 
          title="New Arrivals" 
          subtitle="The latest additions to our rental collection"
          products={newArrivals}
          className="bg-muted/30"
        />
        
        <Testimonials />
        
        <CallToAction />
        
        <Newsletter />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
