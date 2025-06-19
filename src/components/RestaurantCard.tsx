import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Star, Clock3 } from 'lucide-react';
import { cn } from "@/lib/utils";

interface RestaurantCardProps {
  id: string; // Unique key for lists
  slug: string; // For URL generation: /restaurant-detail/{slug}
  name: string;
  imageUrl: string;
  cuisineTypes: string[];
  rating: number; // e.g., 4.5
  reviewCount?: number; // e.g., (200)
  deliveryTime: string; // e.g., "20-30 min"
  promotionalTag?: string; // e.g., "20% OFF"
  className?: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  slug,
  name,
  imageUrl,
  cuisineTypes,
  rating,
  reviewCount,
  deliveryTime,
  promotionalTag,
  className,
}) => {
  console.log('RestaurantCard loaded for:', name);

  return (
    <Card className={cn("w-full overflow-hidden group border shadow-sm hover:shadow-md transition-all duration-300", className)}>
      <Link to={`/restaurant-detail/${slug}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg">
        <CardHeader className="p-0 relative">
          <AspectRatio ratio={16 / 9}>
            <img
              src={imageUrl || 'https://via.placeholder.com/400x225?text=Restaurant+Image'}
              alt={`Image of ${name}`}
              className="object-cover w-full h-full rounded-t-lg transition-transform duration-300 group-hover:scale-105"
            />
          </AspectRatio>
          {promotionalTag && (
            <Badge
              variant="default" // 'default' usually takes primary color, 'secondary' for muted, 'destructive' for warnings
              className="absolute top-3 right-3 z-10 bg-primary text-primary-foreground" // Example of ensuring contrast
            >
              {promotionalTag}
            </Badge>
          )}
        </CardHeader>
        <CardContent className="p-4 space-y-1.5">
          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors truncate" title={name}>
            {name}
          </h3>
          <p className="text-sm text-muted-foreground truncate" title={cuisineTypes.join(', ')}>
            {cuisineTypes.join(', ') || 'Cuisine not specified'}
          </p>
          <div className="flex items-center justify-between text-sm pt-1">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="font-medium text-foreground">{rating.toFixed(1)}</span>
              {reviewCount !== undefined && <span className="text-xs">({reviewCount})</span>}
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock3 className="w-4 h-4" />
              <span>{deliveryTime}</span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default RestaurantCard;