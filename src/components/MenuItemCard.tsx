import React from 'react';

import { ShoppingCart, Settings2 } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

interface MenuItemCardProps {
  id: string | number;
  imageUrl?: string; // Image is optional
  name: string;
  description: string;
  price: number;
  actionText?: string; // e.g., "Add to Cart", "Customize Options"
  onActionClick?: () => void; // Callback for the main action button
  isUnavailable?: boolean;
  className?: string; // For additional styling or layout control from parent
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  id,
  imageUrl,
  name,
  description,
  price,
  actionText = "Add to Cart",
  onActionClick,
  isUnavailable = false,
  className,
}) => {
  console.log(`MenuItemCard loaded for: ${name}, ID: ${id}`);

  let ActionIcon = ShoppingCart;
  if (actionText?.toLowerCase().includes("customize") || actionText?.toLowerCase().includes("options")) {
    ActionIcon = Settings2;
  }

  return (
    <Card className={cn("w-full flex flex-col overflow-hidden group transition-all duration-300 hover:shadow-lg", className)}>
      {imageUrl && (
        <CardHeader className="p-0 border-b">
          <AspectRatio ratio={4 / 3} className="bg-muted">
            <img
              src={imageUrl}
              alt={name}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </AspectRatio>
        </CardHeader>
      )}
      
      <CardContent className="p-4 space-y-1.5 flex-grow">
        <CardTitle className="text-lg font-semibold line-clamp-2">{name}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-3 min-h-[3.75rem]">{description}</p> {/* min-h to maintain structure even if desc is short */}
        <p className="text-xl font-bold text-gray-900 pt-1">${price.toFixed(2)}</p>
      </CardContent>
      
      <CardFooter className="p-3 border-t bg-slate-50">
        <Button
          className="w-full"
          onClick={onActionClick}
          disabled={isUnavailable || !onActionClick}
          aria-label={isUnavailable ? `${name} is unavailable` : `${actionText} ${name}`}
        >
          {isUnavailable ? (
            "Unavailable"
          ) : (
            <>
              <ActionIcon className="mr-2 h-4 w-4" />
              {actionText}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MenuItemCard;