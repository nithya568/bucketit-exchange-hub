
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CallToActionProps {
  className?: string;
}

export function CallToAction({ className }: CallToActionProps) {
  return (
    <section className={cn("py-20 px-4 md:px-8 relative overflow-hidden", className)}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-blue-600/90 z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-white rounded-b-[100%] opacity-10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-white rounded-t-[100%] opacity-10"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Ready to Transform Your Space Without the Commitment?
          </h2>
          
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who enjoy premium furniture, electronics, and books without the high costs of ownership.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/category/furniture">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full min-w-[160px]">
                Start Browsing
              </Button>
            </Link>
            
            <Link to="/register">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 rounded-full min-w-[160px]">
                Create Account
              </Button>
            </Link>
          </div>
          
          <p className="text-white/80 text-sm mt-6">
            No credit card required • Free shipping on orders over $150
          </p>
        </div>
      </div>
    </section>
  );
}
