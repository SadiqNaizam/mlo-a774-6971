import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { UtensilsCrossed, MapPin, Search, ShoppingCart, UserCircle, Menu } from 'lucide-react';
import LocationSearchBar from '@/components/LocationSearchBar'; // Assuming this component exists

const AppHeader: React.FC = () => {
  console.log('AppHeader loaded');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItemCount = 1; // Placeholder

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2">
          <UtensilsCrossed className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">FoodApp</span>
        </Link>

        {/* Center: Desktop Location and Search */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4" />
                Set Location
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <LocationSearchBar />
            </PopoverContent>
          </Popover>

          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search dishes or restaurants..."
              className="pl-10 w-full"
            />
          </div>
        </div>

        {/* Right: Icons and Mobile Menu */}
        <div className="flex items-center gap-2">
          <Link to="/cart">
            <Button variant="ghost" size="icon" aria-label="Open Cart">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 justify-center rounded-full p-0.5 text-xs">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </Link>
          <Link to="/user-profile">
            <Button variant="ghost" size="icon" aria-label="User Profile">
              <UserCircle className="h-5 w-5" />
            </Button>
          </Link>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-sm sm:max-w-xs">
                <SheetHeader className="mb-4">
                  <SheetTitle>
                    <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                      <UtensilsCrossed className="h-6 w-6 text-primary" />
                      <span className="font-bold text-lg">FoodApp</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="space-y-4 py-4">
                  <div className="px-2">
                     <h3 className="mb-2 text-sm font-medium text-muted-foreground">Delivery Location</h3>
                     <LocationSearchBar />
                  </div>
                 
                  <div className="relative px-2">
                     <h3 className="mb-2 text-sm font-medium text-muted-foreground">Search</h3>
                    <Search className="absolute left-5 top-[calc(50%+8px)] h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search dishes..."
                      className="pl-10"
                    />
                  </div>
                  {/* Add other mobile navigation links here if needed */}
                  {/* <nav className="grid gap-2 px-2">
                    <Link to="/user-profile" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent" onClick={() => setIsMobileMenuOpen(false)}>
                        <UserCircle className="h-4 w-4" />
                        Profile
                    </Link>
                  </nav> */}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;