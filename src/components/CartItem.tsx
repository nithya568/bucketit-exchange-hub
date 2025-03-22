
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Heart } from "lucide-react";
import { toast } from "sonner";

interface CartItemProps {
  id: number;
  name: string;
  image: string;
  price: number;
  rentalPeriod: string;
  quantity: number;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onUpdateRentalPeriod: (id: number, period: string) => void;
  onMoveToWishlist: (id: number) => void;
}

export function CartItem({
  id,
  name,
  image,
  price,
  rentalPeriod,
  quantity,
  onRemove,
  onUpdateQuantity,
  onUpdateRentalPeriod,
  onMoveToWishlist,
}: CartItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleRemove = () => {
    onRemove(id);
    toast.success(`${name} removed from cart`);
  };

  const handleMoveToWishlist = () => {
    onMoveToWishlist(id);
    toast.success(`${name} moved to wishlist`);
  };

  return (
    <div 
      className="flex border-b py-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
        <Link to={`/product/${id}`}>
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover object-center"
          />
        </Link>
      </div>

      {/* Product Details */}
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <Link to={`/product/${id}`}>
              <h3 className="text-sm font-medium hover:text-primary transition-colors">{name}</h3>
            </Link>
            <p className="mt-1 text-xs text-muted-foreground">
              Rental Period: 
              <Select 
                defaultValue={rentalPeriod} 
                onValueChange={(value) => onUpdateRentalPeriod(id, value)}
              >
                <SelectTrigger className="h-7 w-28 ml-2 text-xs">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </p>
          </div>
          <p className="text-sm font-medium">
            ${price.toFixed(2)}
            <span className="text-xs text-muted-foreground">
              /{rentalPeriod.slice(0, -2)}
            </span>
          </p>
        </div>

        {/* Bottom Row with Quantity and Actions */}
        <div className="flex items-end justify-between text-sm mt-auto">
          <div className="flex items-center">
            <span className="mr-2 text-muted-foreground">Qty</span>
            <Select 
              defaultValue={quantity.toString()} 
              onValueChange={(value) => onUpdateQuantity(id, parseInt(value))}
            >
              <SelectTrigger className="h-7 w-16 text-xs">
                <SelectValue placeholder="Qty" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs text-muted-foreground hover:text-primary"
              onClick={handleMoveToWishlist}
            >
              <Heart className="h-3 w-3 mr-1" />
              Save for later
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-muted-foreground hover:text-destructive"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
