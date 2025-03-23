
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Search } from "lucide-react";

// Define product interface
interface Product {
  id: number;
  name: string;
  category: string;
  image?: string;
  price?: number;
  description?: string;
}

// Categories data
const categories = [
  { name: "Furniture", path: "/category/furniture" },
  { name: "Electronics", path: "/category/electronics" },
  { name: "Books", path: "/category/books" },
];

export function SearchDialog({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Load all products from localStorage for searching
  useEffect(() => {
    if (isOpen && query.length > 0) {
      // Get products from all categories
      const allProducts: Product[] = [];
      
      // Get furniture products
      const furnitureProducts = localStorage.getItem("furnitureProducts");
      if (furnitureProducts) {
        const parsed = JSON.parse(furnitureProducts);
        allProducts.push(...parsed);
      } else {
        // Fetch from Category.tsx if not in localStorage
        const furniture = [
          { id: 1, name: "Modern Lounge Chair", category: "furniture" },
          { id: 2, name: "Minimalist Desk", category: "furniture" },
          { id: 4, name: "Premium Bookshelf", category: "furniture" },
          { id: 7, name: "Ergonomic Office Chair", category: "furniture" },
          { id: 11, name: "Scandinavian Coffee Table", category: "furniture" },
          { id: 12, name: "Mid-Century Dining Set", category: "furniture" },
        ];
        localStorage.setItem("furnitureProducts", JSON.stringify(furniture));
        allProducts.push(...furniture);
      }
      
      // Get electronics products
      const electronicsProducts = localStorage.getItem("electronicsProducts");
      if (electronicsProducts) {
        const parsed = JSON.parse(electronicsProducts);
        allProducts.push(...parsed);
      } else {
        // Fetch from Category.tsx if not in localStorage
        const electronics = [
          { id: 3, name: "MacBook Pro 16\"", category: "electronics" },
          { id: 5, name: "4K Smart TV - 55\"", category: "electronics" },
          { id: 8, name: "Wireless Noise-Cancelling Headphones", category: "electronics" },
          { id: 13, name: "Digital Camera DSLR", category: "electronics" },
          { id: 14, name: "Gaming Console", category: "electronics" },
          { id: 15, name: "Bluetooth Speaker", category: "electronics" },
          { id: 16, name: "Tablet - 10\"", category: "electronics" },
          { id: 17, name: "Wireless Earbuds", category: "electronics" },
          { id: 18, name: "Smart Watch", category: "electronics" },
          { id: 19, name: "Home Security Camera", category: "electronics" },
          { id: 20, name: "Drone with Camera", category: "electronics" },
          { id: 21, name: "Mechanical Keyboard", category: "electronics" },
        ];
        localStorage.setItem("electronicsProducts", JSON.stringify(electronics));
        allProducts.push(...electronics);
      }
      
      // Get books products
      const booksProducts = localStorage.getItem("booksProducts");
      if (booksProducts) {
        const parsed = JSON.parse(booksProducts);
        allProducts.push(...parsed);
      } else {
        // Fetch from Category.tsx if not in localStorage
        const books = [
          { id: 6, name: "Bestseller Book Collection", category: "books" },
          { id: 9, name: "Classic Literature Bundle", category: "books" },
          { id: 10, name: "Self Improvement Collection", category: "books" },
          { id: 22, name: "Fantasy Series Box Set", category: "books" },
          { id: 23, name: "Business & Finance Books", category: "books" },
          { id: 24, name: "Children's Illustrated Stories", category: "books" },
        ];
        localStorage.setItem("booksProducts", JSON.stringify(books));
        allProducts.push(...books);
      }

      // Filter products based on search query
      const filtered = allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(filtered);
    }
  }, [query, isOpen]);

  const handleSelect = (item: Product | { name: string; path: string }) => {
    setIsOpen(false);
    
    // Determine if it's a product or category
    if ('path' in item) {
      // It's a category
      navigate(item.path);
    } else {
      // It's a product
      navigate(`/product/${item.id}`);
    }
  };

  // Find matching categories
  const matchingCategories = categories.filter(category => 
    category.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
      <CommandInput
        placeholder="Search products or categories..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        {matchingCategories.length > 0 && (
          <CommandGroup heading="Categories">
            {matchingCategories.map((category) => (
              <CommandItem
                key={category.path}
                value={category.name}
                onSelect={() => handleSelect(category)}
              >
                <Search className="mr-2 h-4 w-4" />
                {category.name}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
        
        {searchResults.length > 0 && (
          <CommandGroup heading="Products">
            {searchResults.map((product) => (
              <CommandItem
                key={product.id}
                value={product.name}
                onSelect={() => handleSelect(product)}
              >
                <Search className="mr-2 h-4 w-4" />
                {product.name}
                <span className="ml-2 text-xs text-muted-foreground capitalize">
                  {product.category}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
