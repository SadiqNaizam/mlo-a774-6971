import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import AppHeader from '@/components/layout/AppHeader';
import LocationSearchBar from '@/components/LocationSearchBar';
import CuisineCategoryChip from '@/components/CuisineCategoryChip';
import RestaurantCard from '@/components/RestaurantCard';
import AppFooter from '@/components/layout/AppFooter';

// Shadcn/UI Components
import { ScrollArea } from '@/components/ui/scroll-area';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const HomePage: React.FC = () => {
  console.log('HomePage loaded');
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);

  const handleLocationSet = (location: string | { lat: number; lon: number }) => {
    console.log('HomePage: Location set to', location);
    // Potentially trigger a re-fetch of restaurants based on new location
  };

  const handleCuisineSelect = (cuisine: string) => {
    setSelectedCuisine(cuisine === selectedCuisine ? null : cuisine);
    console.log('HomePage: Cuisine selected', cuisine);
    // Potentially filter restaurants based on cuisine
  };

  const cuisines = ["Italian", "Chinese", "Mexican", "Indian", "Pizza", "Burgers", "Sushi", "Vegan", "Thai", "Desserts"];

  const promotions = [
    { id: 'promo1', title: "50% Off Your First Order!", description: "Valid for new users.", imageUrl: "https://source.unsplash.com/random/800x450/?food,offer,discount&sig=1", link: "#"},
    { id: 'promo2', title: "Free Delivery Weekend", description: "On orders over $20.", imageUrl: "https://source.unsplash.com/random/800x450/?food,delivery,special&sig=2", link: "#"},
    { id: 'promo3', title: "Taco Tuesday Extravaganza", description: "All tacos 20% off.", imageUrl: "https://source.unsplash.com/random/800x450/?tacos,food,promotion&sig=3", link: "#"},
  ];

  const restaurants = [
    { id: '1', slug: 'pizza-palace', name: 'Pizza Palace', imageUrl: 'https://source.unsplash.com/random/400x225/?pizza,restaurant&sig=10', cuisineTypes: ['Pizza', 'Italian'], rating: 4.5, reviewCount: 150, deliveryTime: '25-35 min', promotionalTag: '20% OFF' },
    { id: '2', slug: 'sushi-zen', name: 'Sushi Zen', imageUrl: 'https://source.unsplash.com/random/400x225/?sushi,restaurant&sig=11', cuisineTypes: ['Japanese', 'Sushi'], rating: 4.8, reviewCount: 210, deliveryTime: '30-40 min' },
    { id: '3', slug: 'burger-bliss', name: 'Burger Bliss', imageUrl: 'https://source.unsplash.com/random/400x225/?burger,restaurant&sig=12', cuisineTypes: ['Burgers', 'American'], rating: 4.3, reviewCount: 180, deliveryTime: '20-30 min', promotionalTag: 'Free Fries' },
    { id: '4', slug: 'curry-house', name: 'Curry House', imageUrl: 'https://source.unsplash.com/random/400x225/?indian,curry,restaurant&sig=13', cuisineTypes: ['Indian', 'Curry'], rating: 4.6, reviewCount: 250, deliveryTime: '35-45 min' },
    { id: '5', slug: 'taco-fiesta', name: 'Taco Fiesta', imageUrl: 'https://source.unsplash.com/random/400x225/?tacos,mexican,restaurant&sig=14', cuisineTypes: ['Mexican', 'Tacos'], rating: 4.4, reviewCount: 120, deliveryTime: '25-35 min' },
    { id: '6', slug: 'sweet-sensations', name: 'Sweet Sensations', imageUrl: 'https://source.unsplash.com/random/400x225/?dessert,cafe&sig=15', cuisineTypes: ['Desserts', 'Bakery'], rating: 4.9, reviewCount: 90, deliveryTime: '15-25 min', promotionalTag: 'New!' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AppHeader />
      <ScrollArea className="flex-1">
        <main className="container mx-auto py-6 sm:py-8 px-4">
          {/* Section 1: Hero / Location Search */}
          <section className="mb-8 sm:mb-12 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-gray-800">
              Your Favorite Food, Delivered Fast
            </h1>
            <p className="text-md sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
              Enter your address to discover the best local restaurants and enjoy exclusive offers.
            </p>
            <div className="max-w-lg mx-auto">
              <LocationSearchBar 
                onLocationSet={handleLocationSet} 
                placeholder="Enter your delivery address or zip code"
              />
            </div>
          </section>

          {/* Section 2: Promotions Carousel */}
          {promotions.length > 0 && (
            <section className="mb-8 sm:mb-12">
              <h2 className="text-2xl font-semibold mb-4 sm:mb-6 text-gray-800">Featured Promotions</h2>
              <Carousel 
                opts={{ align: "start", loop: true }} 
                className="w-full"
                aria-label="Promotional offers carousel"
              >
                <CarouselContent>
                  {promotions.map((promo) => (
                    <CarouselItem key={promo.id} className="md:basis-1/2 lg:basis-1/3">
                      <Card className="overflow-hidden group">
                        <CardContent className="flex aspect-[16/9] items-center justify-center p-0 relative">
                          <img 
                            src={promo.imageUrl} 
                            alt={promo.title} 
                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col items-start justify-end p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-bold text-white drop-shadow-md">{promo.title}</h3>
                            <p className="text-xs sm:text-sm text-gray-200 mb-2 drop-shadow-sm">{promo.description}</p>
                            <Button size="sm" variant="default" asChild className="bg-primary hover:bg-primary/90">
                              <Link to={promo.link}>View Offer</Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
              </Carousel>
            </section>
          )}

          {/* Section 3: Cuisine Categories */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-2xl font-semibold mb-4 sm:mb-6 text-gray-800">Explore by Cuisine</h2>
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
              {cuisines.map((cuisine) => (
                <CuisineCategoryChip
                  key={cuisine}
                  cuisine={cuisine}
                  onClick={handleCuisineSelect}
                  isSelected={selectedCuisine === cuisine}
                />
              ))}
            </div>
          </section>

          {/* Section 4: Popular Restaurants */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-2xl font-semibold mb-4 sm:mb-6 text-gray-800">Popular Near You</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {restaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  id={restaurant.id}
                  slug={restaurant.slug}
                  name={restaurant.name}
                  imageUrl={restaurant.imageUrl}
                  cuisineTypes={restaurant.cuisineTypes}
                  rating={restaurant.rating}
                  reviewCount={restaurant.reviewCount}
                  deliveryTime={restaurant.deliveryTime}
                  promotionalTag={restaurant.promotionalTag}
                />
              ))}
            </div>
             <div className="text-center mt-8">
                <Button variant="outline" size="lg">
                    View More Restaurants
                </Button>
            </div>
          </section>
        </main>
      </ScrollArea>
      <AppFooter />
    </div>
  );
};

export default HomePage;