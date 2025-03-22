
import { cn } from "@/lib/utils";

interface StepProps {
  number: number;
  title: string;
  description: string;
  icon: string;
}

const steps: StepProps[] = [
  {
    number: 1,
    title: "Browse & Select",
    description: "Explore our vast collection of products and choose what you need",
    icon: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=500&auto=format&fit=crop"
  },
  {
    number: 2,
    title: "Choose Rental Period",
    description: "Select daily, weekly, or monthly rental plans based on your needs",
    icon: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=500&auto=format&fit=crop"
  },
  {
    number: 3,
    title: "Doorstep Delivery",
    description: "We'll deliver your items right to your doorstep at your chosen time",
    icon: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=500&auto=format&fit=crop"
  },
  {
    number: 4,
    title: "Easy Returns",
    description: "When you're done, we'll pick everything up - no hassle",
    icon: "https://images.unsplash.com/photo-1521791055366-0d553872125f?q=80&w=500&auto=format&fit=crop"
  }
];

interface HowItWorksProps {
  className?: string;
}

export function HowItWorks({ className }: HowItWorksProps) {
  return (
    <section className={cn("py-16 px-4 md:px-8 bg-muted/50", className)}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Renting with bucketIT is simple, affordable, and hassle-free
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="relative animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Step number with connector line */}
              <div className="flex items-center justify-center relative mb-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white text-xl font-bold relative z-10">
                  {step.number}
                </div>
                
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-8 left-16 h-0.5 bg-primary/30 w-[calc(100%-1rem)] hidden lg:block" />
                )}
              </div>
              
              {/* Icon */}
              <div className="mb-6 overflow-hidden rounded-xl">
                <img 
                  src={step.icon} 
                  alt={step.title} 
                  className="w-full h-44 object-cover transition-transform hover:scale-110 duration-700"
                />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-medium mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
