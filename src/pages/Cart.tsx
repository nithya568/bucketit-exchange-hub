
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartItem } from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface CartProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  rentalPeriod: string;
  quantity: number;
}

// Sample cart data
const initialCartItems: CartProduct[] = [
  {
    id: 1,
    name: "Modern Lounge Chair",
    image: "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?q=80&w=2272&auto=format&fit=crop",
    price: 39.99,
    rentalPeriod: "weekly",
    quantity: 1
  },
  {
    id: 3,
    name: "MacBook Pro 16\"",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2626&auto=format&fit=crop",
    price: 149.99,
    rentalPeriod: "weekly",
    quantity: 1
  },
  {
    id: 6,
    name: "Bestseller Book Collection",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2098&auto=format&fit=crop",
    price: 9.99,
    rentalPeriod: "weekly",
    quantity: 2
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartProduct[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleUpdateRentalPeriod = (id: number, period: string) => {
    let newPrice = 0;
    
    // This would normally come from an API/context with product details
    // Simulating price changes based on rental period
    if (id === 1) {
      newPrice = period === "daily" ? 8.99 : period === "weekly" ? 39.99 : 99.99;
    } else if (id === 3) {
      newPrice = period === "daily" ? 24.99 : period === "weekly" ? 149.99 : 449.99;
    } else if (id === 6) {
      newPrice = period === "daily" ? 1.99 : period === "weekly" ? 9.99 : 29.99;
    }
    
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, rentalPeriod: period, price: newPrice } : item
      )
    );
  };

  const handleMoveToWishlist = (id: number) => {
    // In a real app, this would add to wishlist through context/API
    // and then remove from cart
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleApplyPromo = () => {
    if (!promoCode) {
      toast.error("Please enter a promo code");
      return;
    }
    
    setIsApplyingPromo(true);
    
    // Simulate API call
    setTimeout(() => {
      if (promoCode.toUpperCase() === "BUCKET10") {
        setPromoDiscount(10);
        toast.success("Promo code applied: 10% discount");
      } else {
        toast.error("Invalid promo code");
      }
      setIsApplyingPromo(false);
    }, 1000);
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  
  const discountAmount = (subtotal * promoDiscount) / 100;
  const deliveryFee = subtotal > 150 ? 0 : 15.99;
  const total = subtotal - discountAmount + deliveryFee;

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
              <li className="font-medium">Cart</li>
            </ol>
          </nav>
          
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
          
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white shadow-sm rounded-lg p-6 border">
                  <h2 className="text-xl font-medium mb-6">Cart Items ({cartItems.reduce((count, item) => count + item.quantity, 0)})</h2>
                  
                  <div className="space-y-0">
                    {cartItems.map((item) => (
                      <CartItem
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        price={item.price}
                        rentalPeriod={item.rentalPeriod}
                        quantity={item.quantity}
                        onRemove={handleRemoveItem}
                        onUpdateQuantity={handleUpdateQuantity}
                        onUpdateRentalPeriod={handleUpdateRentalPeriod}
                        onMoveToWishlist={handleMoveToWishlist}
                      />
                    ))}
                  </div>
                  
                  <div className="mt-6 flex justify-between">
                    <Link to="/">
                      <Button variant="outline" className="rounded-full">
                        Continue Shopping
                      </Button>
                    </Link>
                    
                    <Button
                      variant="destructive"
                      onClick={() => {
                        setCartItems([]);
                        toast.success("Cart cleared");
                      }}
                      className="rounded-full"
                    >
                      Clear Cart
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white shadow-sm rounded-lg p-6 border">
                  <h2 className="text-xl font-medium mb-6">Order Summary</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    
                    {promoDiscount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({promoDiscount}%)</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span>
                        {deliveryFee === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `$${deliveryFee.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    
                    <Separator className="my-2" />
                    
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    
                    {/* Promo Code */}
                    <div className="mt-6">
                      <label className="text-sm font-medium">Promo Code</label>
                      <div className="flex mt-1.5">
                        <Input
                          type="text"
                          placeholder="Enter code"
                          className="rounded-l-full rounded-r-none"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <Button
                          className="rounded-r-full rounded-l-none"
                          onClick={handleApplyPromo}
                          disabled={isApplyingPromo}
                        >
                          {isApplyingPromo ? "Applying..." : "Apply"}
                        </Button>
                      </div>
                      {deliveryFee > 0 && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Add ${(150 - subtotal).toFixed(2)} more to get free delivery
                        </p>
                      )}
                    </div>
                    
                    <Button
                      className="w-full rounded-full"
                      size="lg"
                      onClick={() => {
                        toast.success("Proceeding to checkout");
                        // Navigate to checkout in a real app
                      }}
                    >
                      Proceed to Checkout
                    </Button>
                    
                    <div className="mt-4 text-xs text-muted-foreground text-center">
                      <p>Secure Checkout</p>
                      <p className="mt-1">We accept all major credit cards, PayPal, and Apple Pay</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added any items to your cart yet.
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

export default Cart;
