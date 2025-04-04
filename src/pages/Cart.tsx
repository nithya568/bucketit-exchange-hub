
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartItem } from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { PaymentOptions } from "@/components/PaymentOptions";
import { CreditCardForm } from "@/components/CreditCardForm";
import { ShippingAddressForm, ShippingAddress } from "@/components/ShippingAddressForm";
import { toast } from "sonner";
import { ChevronRight, MapPin } from "lucide-react";

interface CartProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  rentalPeriod: string;
  quantity: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "shipping" | "payment" | "review">("cart");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    window.dispatchEvent(new Event("cartUpdated"));
  }, [cartItems]);

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    toast.success("Item removed from cart");
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleUpdateRentalPeriod = (id: number, period: string) => {
    // Find the original base price for the product
    const product = cartItems.find(item => item.id === id);
    if (!product) return;

    // Calculate the new price based on the period
    let newPrice = 0;
    const basePrice = getBasePrice(id);
    
    if (period === "daily") {
      newPrice = basePrice;
    } else if (period === "weekly") {
      newPrice = basePrice * 5; // Weekly is 5x daily
    } else if (period === "monthly") {
      newPrice = basePrice * 15; // Monthly is 15x daily
    }
    
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, rentalPeriod: period, price: newPrice } : item
      )
    );
  };

  // Helper function to get base daily price for a product
  const getBasePrice = (id: number): number => {
    // Base daily prices for products
    const basePrices: Record<number, number> = {
      1: 8.99,
      2: 5.99,
      3: 24.99,
      4: 4.99,
      5: 15.99,
      6: 1.99,
      7: 6.99,
      8: 5.99,
      9: 2.99,
      10: 2.59
    };
    
    return basePrices[id] || 9.99; // Default price if not found
  };

  const handleMoveToWishlist = (id: number) => {
    const itemToMove = cartItems.find(item => item.id === id);
    
    setCartItems(cartItems.filter((item) => item.id !== id));
    
    if (itemToMove) {
      const currentCount = localStorage.getItem("wishlistCount");
      const newCount = currentCount ? parseInt(currentCount) + 1 : 1;
      
      localStorage.setItem("wishlistCount", newCount.toString());
      
      window.dispatchEvent(new Event("wishlistUpdated"));
      
      toast.success(`${itemToMove.name} moved to wishlist`);
    }
  };

  const handleApplyPromo = () => {
    if (!promoCode) {
      toast.error("Please enter a promo code");
      return;
    }
    
    setIsApplyingPromo(true);
    
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

  const proceedToShipping = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setCheckoutStep("shipping");
    window.scrollTo(0, 0);
  };

  const handleShippingComplete = (address: ShippingAddress) => {
    setShippingAddress(address);
    setCheckoutStep("payment");
    window.scrollTo(0, 0);
    toast.success("Shipping address saved");
  };

  const proceedToReview = () => {
    setCheckoutStep("review");
    window.scrollTo(0, 0);
    toast.success("Payment details confirmed");
  };

  const completeOrder = () => {
    toast.success("Order placed successfully!");
    setCartItems([]);
    setCheckoutStep("cart");
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success("Cart cleared");
  };

  const renderCheckoutContent = () => {
    switch (checkoutStep) {
      case "shipping":
        return (
          <ShippingAddressForm 
            onComplete={handleShippingComplete}
            onBack={() => setCheckoutStep("cart")}
          />
        );
        
      case "payment":
        return (
          <>
            <h2 className="text-xl font-medium mb-6">Payment Information</h2>
            <PaymentOptions 
              selectedMethod={paymentMethod}
              onSelect={setPaymentMethod}
            />
            
            {paymentMethod === "credit_card" && <CreditCardForm />}
            
            <div className="flex justify-between mt-6">
              <Button 
                variant="outline" 
                className="rounded-full"
                onClick={() => setCheckoutStep("shipping")}
              >
                Back to Shipping
              </Button>
              <Button 
                className="rounded-full"
                onClick={proceedToReview}
              >
                Review Order
              </Button>
            </div>
          </>
        );
      
      case "review":
        return (
          <>
            <h2 className="text-xl font-medium mb-6">Review Order</h2>
            
            <div className="space-y-6">
              <div className="bg-muted/20 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Order Summary</h3>
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.name} x {item.quantity} ({item.rentalPeriod})
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {shippingAddress && (
                <div className="bg-muted/20 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" /> Shipping Address
                  </h3>
                  <p className="text-sm">{shippingAddress.fullName}</p>
                  <p className="text-sm">{shippingAddress.streetAddress} {shippingAddress.apartment && `, ${shippingAddress.apartment}`}</p>
                  <p className="text-sm">{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
                  <p className="text-sm">{shippingAddress.country}</p>
                  <p className="text-sm">{shippingAddress.phone}</p>
                </div>
              )}
              
              <div className="bg-muted/20 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Payment Method</h3>
                <p className="capitalize">
                  {paymentMethod.replace('_', ' ')}
                </p>
              </div>
              
              <div className="bg-muted/20 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Price Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({promoDiscount}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>
                      {deliveryFee === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `$${deliveryFee.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <Button 
                variant="outline" 
                className="rounded-full"
                onClick={() => setCheckoutStep("payment")}
              >
                Back to Payment
              </Button>
              <Button 
                className="rounded-full"
                onClick={completeOrder}
              >
                Place Order
              </Button>
            </div>
          </>
        );
      
      default:
        return (
          <>
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
                onClick={clearCart}
                className="rounded-full"
              >
                Clear Cart
              </Button>
            </div>
          </>
        );
    }
  };

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
          <nav className="mb-6">
            <ol className="flex items-center text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li className="mx-2 text-muted-foreground">/</li>
              <li className={checkoutStep === "cart" ? "font-medium" : "text-muted-foreground"}>
                Cart
              </li>
              {checkoutStep !== "cart" && (
                <>
                  <li className="mx-2 text-muted-foreground"><ChevronRight className="h-3 w-3" /></li>
                  <li className={checkoutStep === "shipping" ? "font-medium" : "text-muted-foreground"}>
                    Shipping
                  </li>
                </>
              )}
              {(checkoutStep === "payment" || checkoutStep === "review") && (
                <>
                  <li className="mx-2 text-muted-foreground"><ChevronRight className="h-3 w-3" /></li>
                  <li className={checkoutStep === "payment" ? "font-medium" : "text-muted-foreground"}>
                    Payment
                  </li>
                </>
              )}
              {checkoutStep === "review" && (
                <>
                  <li className="mx-2 text-muted-foreground"><ChevronRight className="h-3 w-3" /></li>
                  <li className="font-medium">Review</li>
                </>
              )}
            </ol>
          </nav>
          
          <h1 className="text-3xl font-bold mb-8">
            {checkoutStep === "cart" 
              ? "Your Cart" 
              : checkoutStep === "shipping"
                ? "Shipping Information"
                : checkoutStep === "payment" 
                  ? "Payment" 
                  : "Review Order"}
          </h1>
          
          {cartItems.length > 0 || checkoutStep !== "cart" ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white shadow-sm rounded-lg p-6 border">
                  {renderCheckoutContent()}
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white shadow-sm rounded-lg p-6 border sticky top-8">
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
                    
                    {checkoutStep === "cart" && (
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
                    )}
                    
                    {checkoutStep === "cart" ? (
                      <Button
                        className="w-full rounded-full mt-4"
                        size="lg"
                        onClick={proceedToShipping}
                        disabled={cartItems.length === 0}
                      >
                        Proceed to Checkout
                      </Button>
                    ) : checkoutStep === "shipping" ? (
                      <div className="mt-4 text-xs text-muted-foreground text-center">
                        <p>Please complete the shipping form</p>
                      </div>
                    ) : checkoutStep === "payment" ? (
                      <div className="mt-4 text-xs text-muted-foreground text-center">
                        <p>Please complete the payment details</p>
                      </div>
                    ) : (
                      <Button
                        className="w-full rounded-full mt-4"
                        size="lg"
                        onClick={completeOrder}
                      >
                        Complete Order
                      </Button>
                    )}
                    
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
