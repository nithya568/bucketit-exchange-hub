
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CreditCard, Lock } from "lucide-react";

export function CreditCardForm() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    
    if (v.length > 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpiry(e.target.value);
    setExpiry(formattedValue);
  };

  return (
    <div className="space-y-4 mt-4 glass-card rounded-xl p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium gradient-text">Card Details</h3>
        <div className="flex space-x-2">
          <svg className="h-8 w-auto" viewBox="0 0 48 48" fill="none">
            <path d="M44 11H4V36H44V11Z" fill="#E9EAEB" />
            <path d="M19 24.5C19 27.5376 16.5376 30 13.5 30C10.4624 30 8 27.5376 8 24.5C8 21.4624 10.4624 19 13.5 19C16.5376 19 19 21.4624 19 24.5Z" fill="#F65623" />
            <path d="M26 24.5C26 27.5376 23.5376 30 20.5 30C17.4624 30 15 27.5376 15 24.5C15 21.4624 17.4624 19 20.5 19C23.5376 19 26 21.4624 26 24.5Z" fill="#EB001B" />
            <path d="M17 24.5C17 22.2019 18.0055 20.1235 19.6348 18.7521C18.4605 17.6611 16.9022 17 15.1739 17C11.2201 17 8 20.3579 8 24.5C8 28.6421 11.2201 32 15.1739 32C16.9022 32 18.4605 31.3389 19.6348 30.2479C18.0055 28.8765 17 26.7981 17 24.5Z" fill="#F79F1A" />
          </svg>
          <svg className="h-8 w-auto" viewBox="0 0 48 48" fill="none">
            <path d="M45 35H3V13H45V35Z" fill="#0077A6" />
            <path d="M18.0001 20L15.0001 28H12.6001L11.1001 22C11.1001 22 11.0001 21.6 10.5001 21.3C10.0001 21 9.1001 20.7 9.1001 20.7H9.0001L9.0001 20.5H12.9001C13.2001 20.5 13.5001 20.8 13.5001 21.1L14.1001 25.9L16.0001 20.5H18.0001V20ZM35.1001 28H33.3001L32.1001 20.5H34.5001L35.1001 28ZM28.8001 20.7C28.2001 20.5 27.3001 20.3 26.4001 20.3C24.6001 20.3 22.5001 21 22.5001 22.5C22.4001 23.7 24.0001 24.3 24.9001 24.7C25.8001 25.1 26.1001 25.3 26.1001 25.6C26.1001 26.1 25.5001 26.3 24.9001 26.3C24.0001 26.3 23.4001 26.2 22.6001 25.8L22.3001 25.7L22.0001 27.5C22.6001 27.8 23.7001 28 24.8001 28C26.7001 28 28.7001 27.3 28.7001 25.7C28.7001 24.8 28.2001 24.1 26.9001 23.5C26.1001 23.1 25.6001 22.9 25.6001 22.5C25.6001 22.2 25.9001 21.9 26.7001 21.9C27.3001 21.9 27.8001 22 28.2001 22.2L28.4001 22.3L28.8001 20.7ZM31.2001 20.5L29.7001 28H27.6001L29.1001 20.5H31.2001ZM21.9001 20.5L19.8001 25.4L19.6001 24.5L19.0001 21.2C19.0001 20.8 18.7001 20.5 18.3001 20.5H15.0001V20.6C15.9001 20.8 16.7001 21.2 17.3001 21.6C17.9001 22 18.2001 22.5 18.4001 23.2L19.8001 28H21.9001L25.2001 20.5H23.1001L21.9001 20.5Z" fill="white" />
          </svg>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="card-number" className="text-foreground/90">Card Number</Label>
          <div className="relative">
            <Input 
              id="card-number"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={handleCardNumberChange}
              maxLength={19}
              className="pl-10 bg-white/70 backdrop-blur-sm border-accent/30 focus:border-primary/50"
            />
            <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/70" />
          </div>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="card-name" className="text-foreground/90">Cardholder Name</Label>
          <Input 
            id="card-name" 
            placeholder="John Smith"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            className="bg-white/70 backdrop-blur-sm border-accent/30 focus:border-primary/50"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="expiry" className="text-foreground/90">Expiry Date</Label>
            <Input 
              id="expiry" 
              placeholder="MM/YY"
              value={expiry}
              onChange={handleExpiryChange}
              maxLength={5}
              className="bg-white/70 backdrop-blur-sm border-accent/30 focus:border-primary/50"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="cvv" className="text-foreground/90">CVV</Label>
            <div className="relative">
              <Input 
                id="cvv" 
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                maxLength={3}
                className="pl-10 bg-white/70 backdrop-blur-sm border-accent/30 focus:border-primary/50"
              />
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/70" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
