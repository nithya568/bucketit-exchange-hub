
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CallToAction } from "@/components/CallToAction";

const AboutUs = () => {
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
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">About bucketIT</h1>
                <p className="text-xl text-muted-foreground mb-8">
                  We're on a mission to make high-quality products accessible to everyone without the burden of ownership.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/how-it-works">
                    <Button size="lg" className="rounded-full">
                      How It Works
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="lg" variant="outline" className="rounded-full">
                      Join Us
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="order-first md:order-last">
                <img 
                  src="https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=2070&auto=format&fit=crop" 
                  alt="Team working together" 
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Founded in 2022, bucketIT began with a simple observation: many people need quality furniture, electronics, and books temporarily, but purchasing these items outright is expensive and impractical.
            </p>
            <p className="text-lg text-muted-foreground">
              What started as a small operation in New York has grown into a nationwide service trusted by thousands of customers. Our focus on quality products, flexible rental terms, and exceptional customer service has made us the leader in online rentals.
            </p>
          </div>
        </section>
        
        {/* Values */}
        <section className="py-20 px-4 md:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Value 1 */}
              <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Sustainability</h3>
                <p className="text-muted-foreground">
                  We believe in reducing waste and consumption. By renting instead of buying, our customers help minimize environmental impact and promote a circular economy.
                </p>
              </div>
              
              {/* Value 2 */}
              <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Accessibility</h3>
                <p className="text-muted-foreground">
                  We're committed to making high-quality products accessible to everyone, regardless of budget constraints or temporary living situations.
                </p>
              </div>
              
              {/* Value 3 */}
              <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Quality</h3>
                <p className="text-muted-foreground">
                  We only offer products that meet our high standards for quality and durability. Each item is thoroughly inspected and maintained between rentals.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">Meet Our Team</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {/* Team Member 1 */}
              <div className="text-center">
                <div className="aspect-square rounded-full overflow-hidden mb-4 max-w-[200px] mx-auto">
                  <img
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
                    alt="Sarah Johnson"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">Sarah Johnson</h3>
                <p className="text-primary">Founder & CEO</p>
              </div>
              
              {/* Team Member 2 */}
              <div className="text-center">
                <div className="aspect-square rounded-full overflow-hidden mb-4 max-w-[200px] mx-auto">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
                    alt="David Chen"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">David Chen</h3>
                <p className="text-primary">CTO</p>
              </div>
              
              {/* Team Member 3 */}
              <div className="text-center">
                <div className="aspect-square rounded-full overflow-hidden mb-4 max-w-[200px] mx-auto">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
                    alt="Aisha Patel"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">Aisha Patel</h3>
                <p className="text-primary">Head of Operations</p>
              </div>
              
              {/* Team Member 4 */}
              <div className="text-center">
                <div className="aspect-square rounded-full overflow-hidden mb-4 max-w-[200px] mx-auto">
                  <img
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop"
                    alt="Marcus Williams"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">Marcus Williams</h3>
                <p className="text-primary">Customer Experience</p>
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

export default AboutUs;
