import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; // useParams to potentially get restaurant ID/slug
import AppHeader from '@/components/layout/AppHeader';
import AppFooter from '@/components/layout/AppFooter';
import MenuItemCard from '@/components/MenuItemCard';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Star, Clock, Info, ShoppingBag, ChevronUp, ChevronDown, MessageSquare, Utensils } from 'lucide-react';
import { toast } from 'sonner';

// Placeholder data for a single restaurant
// In a real app, this would come from an API based on `useParams()`
const restaurantData = {
  id: "1",
  name: "Luigi's Pizzeria Napoletana",
  slug: "luigis-pizzeria-napoletana",
  imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  rating: 4.7,
  reviewCount: 352,
  cuisineTypes: ["Italian", "Pizza", "Pasta"],
  deliveryTime: "30-40 min",
  openingHours: "Mon-Sun: 11:00 AM - 10:30 PM",
  address: "123 Pizza Lane, Foodville, FV 45678",
  description: "Experience authentic Neapolitan pizza baked in our wood-fired oven. We use only the freshest ingredients, from San Marzano tomatoes to imported buffalo mozzarella. Also serving fresh pasta and delightful Italian desserts.",
  menu: {
    "Starters": [
      { id: "app1", name: "Garlic Knots (6 pcs)", description: "House-made dough, baked золотисто-коричневий and tossed in garlic-herb butter, served with marinara.", price: 7.99, imageUrl: "https://images.unsplash.com/photo-1597080092914-de6cb0bd062a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80" },
      { id: "app2", name: "Caprese Skewers", description: "Cherry tomatoes, fresh mozzarella balls, basil, drizzled with balsamic glaze.", price: 9.50, imageUrl: "https://images.unsplash.com/photo-1579806047449-a9910805eb55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80" },
    ],
    "Wood-Fired Pizzas": [
      { id: "piz1", name: "Margherita Classica", description: "San Marzano tomato sauce, fresh mozzarella, basil, extra virgin olive oil.", price: 15.99, imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" },
      { id: "piz2", name: "Diavola (Spicy Salami)", description: "Tomato sauce, mozzarella, spicy salami, fresh chili, black olives.", price: 18.50, imageUrl: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" },
      { id: "piz3", name: "Funghi & Tartufo", description: "Mozzarella, mixed wild mushrooms, truffle oil, parsley (no tomato sauce).", price: 19.00, imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", isUnavailable: true },
    ],
    "Pasta Fresca": [
      { id: "pas1", name: "Spaghetti Carbonara", description: "Classic carbonara with guanciale, pecorino romano, egg yolk, black pepper.", price: 17.00, imageUrl: "https://images.unsplash.com/photo-1588013273468-31508066bf20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80" },
      { id: "pas2", name: "Lasagna Bolognese", description: "Layers of fresh pasta, rich meat ragu, béchamel, and Parmesan.", price: 18.00, imageUrl: "https://images.unsplash.com/photo-1619895092602-f6d1509a0fe3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80" },
    ],
    "Desserts & Drinks": [
      { id: "des1", name: "Tiramisù", description: "Ladyfingers dipped in coffee, layered with mascarpone cream, cocoa.", price: 8.00, imageUrl: "https://images.unsplash.com/photo-1542444592-0d5997f24001?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80" },
      { id: "drk1", name: "San Pellegrino (500ml)", description: "Sparkling natural mineral water.", price: 3.50 },
    ],
  },
  reviews: [
    { id: "r1", userName: "Sarah K.", rating: 5, date: "2 days ago", comment: "Absolutely divine pizza! The crust was perfect and ingredients so fresh. Best Margherita I've had outside Naples." },
    { id: "r2", userName: "Mike P.", rating: 4, date: "1 week ago", comment: "Great pasta, good service. A bit noisy on a Friday night but the food made up for it. Will return!" },
    { id: "r3", userName: "Chen L.", rating: 5, date: "3 weeks ago", comment: "Authentic and delicious. The Diavola pizza had a nice kick!" },
  ],
};

interface MenuItemType {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  isUnavailable?: boolean;
}

const RestaurantDetailPage = () => {
  const { slug } = useParams(); // In a real app, use this to fetch data
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItemType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState("");

  useEffect(() => {
    console.log('RestaurantDetailPage loaded for slug:', slug);
    // Here you would typically fetch restaurant data based on the slug/id
    // For now, we're using static data.
    window.scrollTo(0, 0); // Scroll to top on page load
  }, [slug]);

  const handleOpenDialog = (item: MenuItemType) => {
    if (item.isUnavailable) return;
    setSelectedMenuItem(item);
    setQuantity(1);
    setSpecialInstructions("");
    setIsDialogOpen(true);
  };

  const handleAddToCart = () => {
    if (!selectedMenuItem) return;
    // Mock add to cart logic
    console.log(`Adding ${quantity} of ${selectedMenuItem.name} to cart. Instructions: "${specialInstructions}"`);
    toast.success(`${quantity}x ${selectedMenuItem.name} added to cart!`);
    setIsDialogOpen(false);
  };

  const firstCategory = Object.keys(restaurantData.menu)[0] || "";

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AppHeader />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto py-6 sm:py-8 px-4">
          {/* Restaurant Hero Section */}
          <section className="mb-8 md:mb-12">
            <Card className="overflow-hidden shadow-lg">
              <div className="grid md:grid-cols-5 gap-0">
                <div className="md:col-span-2">
                  <AspectRatio ratio={16 / 10} className="bg-muted">
                    <img
                      src={restaurantData.imageUrl}
                      alt={`Image of ${restaurantData.name}`}
                      className="object-cover w-full h-full"
                    />
                  </AspectRatio>
                </div>
                <div className="md:col-span-3 p-6">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">{restaurantData.name}</h1>
                  <p className="text-md text-muted-foreground mb-4">{restaurantData.cuisineTypes.join(' • ')}</p>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3 text-sm">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1.5" />
                      <span className="font-semibold">{restaurantData.rating.toFixed(1)}</span>
                      <span className="text-muted-foreground ml-1">({restaurantData.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1.5" />
                      <span>{restaurantData.deliveryTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Info className="w-4 h-4 mr-1.5 flex-shrink-0" />
                    <span>{restaurantData.openingHours}</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                    {restaurantData.description}
                  </p>
                   <p className="text-xs text-muted-foreground mt-3">{restaurantData.address}</p>
                </div>
              </div>
            </Card>
          </section>

          {/* Menu Section */}
          <section className="mb-8 md:mb-12">
            <div className="flex items-center mb-4">
              <Utensils className="h-6 w-6 mr-2 text-primary" />
              <h2 className="text-2xl sm:text-3xl font-semibold">Menu</h2>
            </div>
            <Tabs defaultValue={firstCategory} className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:flex-wrap lg:w-auto mb-4">
                {Object.keys(restaurantData.menu).map((category) => (
                  <TabsTrigger key={category} value={category} className="text-sm sm:text-base">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              {Object.entries(restaurantData.menu).map(([category, items]) => (
                <TabsContent key={category} value={category}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {(items as MenuItemType[]).map((item) => (
                      <MenuItemCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        imageUrl={item.imageUrl}
                        isUnavailable={item.isUnavailable}
                        actionText={item.isUnavailable ? "Unavailable" : "View & Add"}
                        onActionClick={() => handleOpenDialog(item)}
                      />
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </section>

          {/* Reviews Section */}
          <section>
            <div className="flex items-center mb-4">
                <MessageSquare className="h-6 w-6 mr-2 text-primary" />
                <h2 className="text-2xl sm:text-3xl font-semibold">Customer Reviews</h2>
            </div>
            <div className="space-y-6">
              {restaurantData.reviews.length > 0 ? (
                restaurantData.reviews.map((review) => (
                  <Card key={review.id} className="shadow-sm">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-md font-semibold">{review.userName}</CardTitle>
                          <CardDescription className="text-xs">{review.date}</CardDescription>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-700">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-muted-foreground">No reviews yet for this restaurant.</p>
              )}
            </div>
          </section>
        </main>
      </ScrollArea>

      {/* Item Customization Dialog */}
      {selectedMenuItem && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedMenuItem.name}</DialogTitle>
              <DialogDescription>{selectedMenuItem.description}</DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              {selectedMenuItem.imageUrl && (
                  <AspectRatio ratio={16/9} className="bg-muted rounded overflow-hidden">
                      <img src={selectedMenuItem.imageUrl} alt={selectedMenuItem.name} className="object-cover w-full h-full" />
                  </AspectRatio>
              )}
              <div className="flex items-center justify-between">
                <Label htmlFor="quantity" className="text-lg font-medium">Quantity</Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Input
                    id="quantity"
                    type="number"
                    value={quantity}
                    readOnly // Or onChange for direct input
                    className="w-16 h-8 text-center"
                    aria-label="Quantity"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="special-instructions">Special Instructions (optional)</Label>
                <Textarea
                  id="special-instructions"
                  placeholder="e.g., no onions, extra spicy..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="mt-1"
                />
              </div>
              <p className="text-2xl font-bold text-right">
                Total: ${(selectedMenuItem.price * quantity).toFixed(2)}
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddToCart} className="bg-green-600 hover:bg-green-700">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      <AppFooter />
    </div>
  );
};

export default RestaurantDetailPage;