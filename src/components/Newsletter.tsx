
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface NewsletterProps {
  className?: string;
}

export function Newsletter({ className }: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Thank you for subscribing!");
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className={cn("py-16 px-4 md:px-8 bg-muted/30", className)}>
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-primary/5 to-blue-600/5 rounded-3xl p-8 md:p-12 border border-primary/10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Stay Updated</h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to our newsletter for exclusive deals, new arrivals, and rental tips
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                className="rounded-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              
              <Button 
                type="submit" 
                className="rounded-full px-6" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            
            <p className="text-xs text-muted-foreground mt-4">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from bucketIT.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
