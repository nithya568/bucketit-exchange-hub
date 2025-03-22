
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CallToAction } from "@/components/CallToAction";
import { Search, Package, RefreshCw, CreditCard } from "lucide-react";

const HowItWorks = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How bucketIT Works</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Renting high-quality furniture, electronics, and books has never been easier. Follow our simple process to get started.
            </p>
            <Link to="/register">
              <Button size="lg" className="rounded-full">
                Create an Account
              </Button>
            </Link>
          </div>
        </section>
        
        {/* Steps Section */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">Four Simple Steps</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <div className="relative mb-6">
                  <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-7xl font-bold text-primary/10">1</span>
                  <h3 className="text-xl font-bold mb-3">Browse Products</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Explore our wide range of products available for rent. Filter by category, price, or availability to find exactly what you need.
                </p>
                <Link to="/" className="text-primary font-medium hover:underline">
                  Start Browsing
                </Link>
              </div>
              
              {/* Step 2 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CreditCard className="h-8 w-8 text-primary" />
                </div>
                <div className="relative mb-6">
                  <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-7xl font-bold text-primary/10">2</span>
                  <h3 className="text-xl font-bold mb-3">Choose Your Plan</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Select your preferred rental period: daily, weekly, or monthly. Add items to your cart and proceed to checkout.
                </p>
                <Link to="/register" className="text-primary font-medium hover:underline">
                  View Plans
                </Link>
              </div>
              
              {/* Step 3 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="h-8 w-8 text-primary" />
                </div>
                <div className="relative mb-6">
                  <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-7xl font-bold text-primary/10">3</span>
                  <h3 className="text-xl font-bold mb-3">Delivery & Setup</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  We'll deliver your items to your doorstep at your scheduled time. For furniture, we provide free assembly and setup.
                </p>
                <span className="text-primary font-medium">Free for orders over $150</span>
              </div>
              
              {/* Step 4 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <RefreshCw className="h-8 w-8 text-primary" />
                </div>
                <div className="relative mb-6">
                  <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-7xl font-bold text-primary/10">4</span>
                  <h3 className="text-xl font-bold mb-3">Return or Extend</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  When your rental period ends, we'll pick up the items or you can extend your rental with just a few clicks.
                </p>
                <span className="text-primary font-medium">Hassle-free returns</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-20 px-4 md:px-8 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              {/* FAQ Item 1 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-3">What if I damage an item?</h3>
                <p className="text-muted-foreground">
                  All rentals include basic damage protection. Minor wear and tear is covered, but significant damage may incur additional fees. We recommend reviewing our damage policy before renting.
                </p>
              </div>
              
              {/* FAQ Item 2 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-3">Can I extend my rental period?</h3>
                <p className="text-muted-foreground">
                  Yes! You can easily extend your rental period through your account dashboard. As long as the item hasn't been reserved by another customer, extensions are processed instantly.
                </p>
              </div>
              
              {/* FAQ Item 3 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-3">Do you deliver to all locations?</h3>
                <p className="text-muted-foreground">
                  We currently deliver to major cities and surrounding areas. Enter your zip code during checkout to verify delivery availability for your location.
                </p>
              </div>
              
              {/* FAQ Item 4 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-3">How clean are the rental items?</h3>
                <p className="text-muted-foreground">
                  All items are thoroughly cleaned and sanitized between rentals according to industry standards. For furniture, we use professional cleaning services to ensure items are like new.
                </p>
              </div>
              
              {/* FAQ Item 5 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-3">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">
                  We accept all major credit cards, PayPal, and Apple Pay. For security purposes, we require a valid payment method on file for all rentals.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    JD
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium">Jamie D.</h4>
                    <p className="text-sm text-muted-foreground">New York, NY</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5 text-yellow-400"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "bucketIT made furnishing my temporary apartment so simple. The quality was excellent and the delivery team was professional and efficient."
                </p>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    MT
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium">Morgan T.</h4>
                    <p className="text-sm text-muted-foreground">Chicago, IL</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5 text-yellow-400"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "I rented a MacBook Pro for a 3-month project instead of buying one. Saved me a ton of money and it worked perfectly. Great customer service too!"
                </p>
              </div>
              
              {/* Testimonial 3 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    AR
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium">Alex R.</h4>
                    <p className="text-sm text-muted-foreground">Austin, TX</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className={`h-5 w-5 ${star <= 4 ? "text-yellow-400" : "text-gray-300"}`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "The selection of books was incredible. I rented several photography books that would have cost hundreds to buy. Will definitely use this service again."
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <CallToAction />
      </main>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
