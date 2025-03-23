
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Search,
  Heart, 
  ShoppingCart, 
  User,
  Menu,
  X,
  Home,
  Package,
  BookOpen,
  Monitor
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // For demo purposes, we'll check login status
  useEffect(() => {
    // Check if user is logged in - would use auth context in a real app
    const userLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(userLoggedIn);
    
    // Load cart and wishlist counts from localStorage if they exist
    const storedCartItems = localStorage.getItem("cartItems");
    const storedWishlistCount = localStorage.getItem("wishlistCount");
    
    const cartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
    setCartCount(cartItems.length);
    setWishlistCount(storedWishlistCount ? parseInt(storedWishlistCount) : 0);
  }, []);

  // Listen for cart and wishlist update events
  useEffect(() => {
    const handleCartUpdate = () => {
      const storedCartItems = localStorage.getItem("cartItems");
      const cartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
      setCartCount(cartItems.length);
    };

    const handleWishlistUpdate = () => {
      const storedWishlistCount = localStorage.getItem("wishlistCount");
      setWishlistCount(storedWishlistCount ? parseInt(storedWishlistCount) : 0);
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    window.addEventListener("wishlistUpdated", handleWishlistUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
    };
  }, []);

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Furniture", path: "/category/furniture", icon: Package },
    { name: "Electronics", path: "/category/electronics", icon: Monitor },
    { name: "Books", path: "/category/books", icon: BookOpen },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/80 backdrop-blur-lg shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
            bucket<span className="text-foreground font-black">IT</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link 
              key={item.name}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.path ? "text-primary" : "text-foreground/80"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {/* Search */}
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>

          {/* Wishlist */}
          <Link to="/wishlist">
            <Button variant="ghost" size="icon" className="rounded-full relative" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-white">
                  {wishlistCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Cart */}
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="rounded-full relative" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-white">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Auth */}
          {isLoggedIn ? (
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="rounded-full" aria-label="Profile">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button size="sm" variant="outline" className="rounded-full px-4">
                Sign In
              </Button>
            </Link>
          )}

          {/* Mobile Menu */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden rounded-full" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[80%]">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center py-4">
                    <h2 className="text-lg font-bold">Menu</h2>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                  </div>

                  <div className="py-4 flex flex-col space-y-4">
                    {navItems.map((item) => (
                      <Link 
                        key={item.name}
                        to={item.path}
                        className={`flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                          location.pathname === item.path 
                            ? "bg-primary/10 text-primary" 
                            : "hover:bg-secondary"
                        }`}
                      >
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  <div className="mt-auto">
                    {isLoggedIn ? (
                      <Link to="/profile">
                        <Button className="w-full">My Profile</Button>
                      </Link>
                    ) : (
                      <div className="flex flex-col space-y-2">
                        <Link to="/login">
                          <Button variant="outline" className="w-full">Sign In</Button>
                        </Link>
                        <Link to="/register">
                          <Button className="w-full">Create Account</Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </nav>
  );
}
