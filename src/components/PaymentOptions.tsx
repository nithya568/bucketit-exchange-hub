
import { useState } from "react";
import { Check, CreditCard, Wallet } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface PaymentOptionsProps {
  onSelect: (method: string) => void;
  selectedMethod: string;
}

export function PaymentOptions({ onSelect, selectedMethod }: PaymentOptionsProps) {
  const handleSelection = (value: string) => {
    onSelect(value);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Payment Method</h3>
      
      <RadioGroup value={selectedMethod} onValueChange={handleSelection} className="grid gap-3">
        <div>
          <RadioGroupItem value="credit_card" id="credit_card" className="peer sr-only" />
          <Label
            htmlFor="credit_card"
            className={cn(
              "flex cursor-pointer items-center justify-between rounded-lg border p-4 hover:bg-muted/50 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary",
              selectedMethod === "credit_card" ? "bg-muted/50" : ""
            )}
          >
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <div className="space-y-1">
                <p className="font-medium">Credit / Debit Card</p>
                <p className="text-sm text-muted-foreground">Pay with Visa, Mastercard, etc.</p>
              </div>
            </div>
            {selectedMethod === "credit_card" && (
              <Check className="h-5 w-5 text-primary" />
            )}
          </Label>
        </div>
        
        <div>
          <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />
          <Label
            htmlFor="paypal"
            className={cn(
              "flex cursor-pointer items-center justify-between rounded-lg border p-4 hover:bg-muted/50 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary",
              selectedMethod === "paypal" ? "bg-muted/50" : ""
            )}
          >
            <div className="flex items-center gap-3">
              <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.763 3h6.305c2.014 0 3.47.97 4.124 2.7.954 2.526.42 4.492-.53 6.257-.953 1.765-2.649 2.952-4.73 2.952h-1.508c-.419 0-.824.296-.893.7l-.824 3.373c-.047.27-.28.565-.528.658H6.605c-.353 0-.536-.342-.476-.7l2.154-11.983c.098-.423.531-.957.957-.957h-1.83C3.926 6 2.874 7.69 2.621 9.662l-1.37 9.174c-.097.671.329 1.164 1 1.164h3.523c.673 0 1.376-.493 1.566-1.164l.766-2.701c.094-.423.488-.776.911-.776h1.247c3.346 0 5.634-1.694 6.976-4.94.953-2.293 1.377-5.104-.412-7.262C15.098 1.814 13.038 1 10.365 1H5.347c-.7 0-1.377.54-1.571 1.257L1.081 11.91c-.094.423-.166.846-.235 1.27h1.988c.329-2.999 1.694-5.693 4.93-5.693z" />
              </svg>
              <div className="space-y-1">
                <p className="font-medium">PayPal</p>
                <p className="text-sm text-muted-foreground">Pay using your PayPal account</p>
              </div>
            </div>
            {selectedMethod === "paypal" && (
              <Check className="h-5 w-5 text-primary" />
            )}
          </Label>
        </div>

        <div>
          <RadioGroupItem value="apple_pay" id="apple_pay" className="peer sr-only" />
          <Label
            htmlFor="apple_pay"
            className={cn(
              "flex cursor-pointer items-center justify-between rounded-lg border p-4 hover:bg-muted/50 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary",
              selectedMethod === "apple_pay" ? "bg-muted/50" : ""
            )}
          >
            <div className="flex items-center gap-3">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.488 2C9.465 2.115 7.733 3.318 6.885 4.9c-.766 1.364-.629 3.92 1.309 5.229.888.617 1.888.948 2.628 1.01-.104 1.679-2.157 3.219-2.157 3.219.063.315.104.578.13.762.26.552.639 1.133 1.041 1.538 0 0 1.576-1.656 3.249-1.866.83-.105 1.539.157 2.236.5.472.21 1.07.552 1.888.472 1.645-.157 2.522-1.326 2.628-1.46-1.888-1.041-1.699-3.594-1.699-3.688-.21-2.132.956-3.057 1.07-3.13-.557-1.539-2.341-1.678-2.814-1.733C13.48 5.015 12.13 2 12.13 2c0 .026-.21.026-.642 0z" />
                <path d="M19.585 16.312c-.366 0-.732.079-1.05.21-.52.236-.968.604-1.283 1.099l-.79-.5c-.236-.157-.525-.263-.84-.289-.209-.026-.419 0-.629.079-.209.052-.366.131-.55.21l-.156.13-.184.158c-.27.262-.418.551-.523.867-.53.84.314 1.757 1.102 2.099.366.157.76.21 1.153.183.262-.26.497-.79.707-.158.21-.78.366-.183.55-.314.313-.236.602-.525.812-.867.287-.446.392-.946.34-1.47-.026-.34-.132-.655-.34-.943-.236-.366-.628-.63-1.076-.735-.079-.027-.183-.027-.262-.027l.026.026-.051-.026z" />
              </svg>
              <div className="space-y-1">
                <p className="font-medium">Apple Pay</p>
                <p className="text-sm text-muted-foreground">Pay using Apple Pay</p>
              </div>
            </div>
            {selectedMethod === "apple_pay" && (
              <Check className="h-5 w-5 text-primary" />
            )}
          </Label>
        </div>

        <div>
          <RadioGroupItem value="google_pay" id="google_pay" className="peer sr-only" />
          <Label
            htmlFor="google_pay"
            className={cn(
              "flex cursor-pointer items-center justify-between rounded-lg border p-4 hover:bg-muted/50 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary",
              selectedMethod === "google_pay" ? "bg-muted/50" : ""
            )}
          >
            <div className="flex items-center gap-3">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M12 24c6.6274 0 12-5.3726 12-12S18.6274 0 12 0 0 5.3726 0 12s5.3726 12 12 12z" fill="#fff" />
                <path d="M12.4284 12.4853l4.6671-4.6665a.261.261 0 0 0-.1849-.4454H5.0968a.2609.2609 0 0 0-.1851.4446l4.667 4.6679L12 14.0789l.4284-.4283v-.0827l-.4284.4288L7.78 9.8127H16.22l-4.2201 4.1926.4285.4273v.0828z" fill="#4285f4" />
                <path d="M16.8212 9.8127l-4.673 4.6703-4.6666-4.6703h9.3395z" fill="#c5221f" />
                <path d="M7.78 9.8127l4.2201 4.1926-.4284.4283-.5523.1379-3.8063-3.8049-.0332-.5539z" fill="#34a853" />
                <path d="M16.22 9.8127l-.5769.5768-.0329.5539-3.806 3.8049-.5524-.1379-.4284-.4273 4.2202-4.1926z" fill="#fabb05" />
              </svg>
              <div className="space-y-1">
                <p className="font-medium">Google Pay</p>
                <p className="text-sm text-muted-foreground">Pay using Google Pay</p>
              </div>
            </div>
            {selectedMethod === "google_pay" && (
              <Check className="h-5 w-5 text-primary" />
            )}
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
