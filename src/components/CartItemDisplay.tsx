import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItemDisplayProps {
  id: string | number;
  imageUrl: string;
  name: string;
  customizations?: string[];
  unitPrice: number;
  quantity: number;
  onQuantityChange: (itemId: string | number, newQuantity: number) => void;
  onRemoveItem: (itemId: string | number) => void;
  minQuantity?: number;
  maxQuantity?: number;
  currencySymbol?: string;
}

const CartItemDisplay: React.FC<CartItemDisplayProps> = ({
  id,
  imageUrl,
  name,
  customizations = [],
  unitPrice,
  quantity,
  onQuantityChange,
  onRemoveItem,
  minQuantity = 1,
  maxQuantity = 99,
  currencySymbol = '$',
}) => {
  console.log(`CartItemDisplay loaded for item ID: ${id}, Name: ${name}`);

  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      onQuantityChange(id, quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > minQuantity) {
      onQuantityChange(id, quantity - 1);
    }
  };

  const itemTotalPrice = unitPrice * quantity;

  return (
    <div className="flex items-start space-x-3 sm:space-x-4 p-4 border-b border-gray-200 last:border-b-0">
      <Avatar className="h-16 w-16 sm:h-20 sm:w-20 rounded-md">
        <AvatarImage src={imageUrl} alt={name} className="object-cover" />
        <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>

      <div className="flex-grow min-w-0">
        <h3 className="text-base sm:text-lg font-semibold truncate" title={name}>{name}</h3>
        {customizations.length > 0 && (
          <p className="text-xs sm:text-sm text-gray-500 truncate" title={customizations.join(', ')}>
            {customizations.join(', ')}
          </p>
        )}
        <p className="text-sm text-gray-700 mt-1">
          Unit Price: {currencySymbol}{unitPrice.toFixed(2)}
        </p>
      </div>

      <div className="flex flex-col items-end space-y-2 w-auto sm:w-32 flex-shrink-0 ml-2 sm:ml-4">
        <div className="flex items-center space-x-1 sm:space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 sm:h-8 sm:w-8"
            onClick={handleDecrement}
            disabled={quantity <= minQuantity}
            aria-label="Decrease quantity"
          >
            <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <span className="w-6 sm:w-8 text-center text-sm sm:text-base font-medium">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 sm:h-8 sm:w-8"
            onClick={handleIncrement}
            disabled={quantity >= maxQuantity}
            aria-label="Increase quantity"
          >
            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
        <p className="text-sm sm:text-base font-semibold text-gray-800">
          {currencySymbol}{itemTotalPrice.toFixed(2)}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemoveItem(id)}
          className="text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1"
          aria-label="Remove item"
        >
          <Trash2 className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
          <span className="text-xs sm:text-sm">Remove</span>
        </Button>
      </div>
    </div>
  );
};

export default CartItemDisplay;