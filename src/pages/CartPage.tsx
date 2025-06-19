import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import AppHeader from '@/components/layout/AppHeader';
import AppFooter from '@/components/layout/AppFooter';
import CartItemDisplay from '@/components/CartItemDisplay';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, Info } from 'lucide-react';
import { toast } from "sonner";

interface CartItem {
  id: string | number;
  imageUrl: string;
  name: string;
  customizations?: string[];
  unitPrice: number;
  quantity: number;
}

const initialCartItems: CartItem[] = [
  {
    id: 'pizza1',
    name: 'Margherita Pizza',
    imageUrl: 'https://source.unsplash.com/random/150x150/?pizza,margherita',
    customizations: ['Large', 'Thin Crust'],
    unitPrice: 12.99,
    quantity: 1,
  },
  {
    id: 'burger1',
    name: 'Classic Cheeseburger',
    imageUrl: 'https://source.unsplash.com/random/150x150/?burger,cheeseburger',
    customizations: ['Extra Pickles'],
    unitPrice: 8.50,
    quantity: 2,
  },
  {
    id: 'soda1',
    name: 'Cola Can',
    imageUrl: 'https://source.unsplash.com/random/150x150/?soda,can',
    unitPrice: 1.50,
    quantity: 4,
  },
];

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState<string>('');
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string>('');

  useEffect(() => {
    console.log('CartPage loaded');
  }, []);

  const handleQuantityChange = (itemId: string | number, newQuantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ).filter(item => item.quantity > 0) // Optional: remove if quantity becomes 0
    );
    toast.success("Item quantity updated.");
  };

  const handleRemoveItem = (itemId: string | number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    toast.error("Item removed from cart.");
  };

  const handleApplyPromoCode = () => {
    // Simple mock promo code logic
    if (promoCode === "SAVE10") {
      setPromoDiscount(subtotal * 0.10); // 10% discount
      setPromoMessage("Promo code SAVE10 applied! You saved 10%.");
      toast.success("Promo code applied!");
    } else if (promoCode === "FREE5") {
        setPromoDiscount(5.00); // $5 flat discount
        setPromoMessage("Promo code FREE5 applied! You saved $5.00.");
        toast.success("Promo code applied!");
    } else {
      setPromoDiscount(0);
      setPromoMessage("Invalid promo code.");
      toast.error("Invalid promo code.");
    }
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  }, [cartItems]);

  const deliveryFee = cartItems.length > 0 ? 5.00 : 0; // Example fixed delivery fee
  const taxes = cartItems.length > 0 ? subtotal * 0.08 : 0; // Example 8% tax
  const total = subtotal - promoDiscount + deliveryFee + taxes;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <AppHeader />
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Your Shopping Cart</h1>
            {cartItems.length > 0 && (
                <span className="text-sm text-muted-foreground">{cartItems.length} item(s)</span>
            )}
        </div>

        {cartItems.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent className="flex flex-col items-center gap-4">
              <ShoppingBag className="w-16 h-16 text-gray-400" />
              <h2 className="text-2xl font-semibold text-gray-700">Your cart is empty!</h2>
              <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
              <Button asChild size="lg" className="mt-4">
                <Link to="/">Browse Restaurants</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <ScrollArea className="lg:col-span-2 bg-white rounded-lg shadow-sm max-h-[600px] lg:max-h-none">
              <div className="divide-y divide-gray-200">
                {cartItems.map(item => (
                  <CartItemDisplay
                    key={item.id}
                    {...item}
                    onQuantityChange={handleQuantityChange}
                    onRemoveItem={handleRemoveItem}
                  />
                ))}
              </div>
            </ScrollArea>

            <div className="lg:col-span-1">
              <Card className="sticky top-20 shadow-sm"> {/* Sticky summary for long item lists */}
                <CardHeader>
                  <CardTitle className="text-xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {promoDiscount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Promo Discount</span>
                        <span>-${promoDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes (Est.)</span>
                      <span>${taxes.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="promo-code" className="font-medium">Promotional Code (e.g., SAVE10)</Label>
                    <div className="flex items-center space-x-2">
                      <InputOTP 
                        maxLength={6} 
                        value={promoCode} 
                        onChange={(value) => {
                            setPromoCode(value.toUpperCase());
                            // Clear previous message if user starts typing new code
                            if (promoMessage) setPromoMessage(''); 
                            if (promoDiscount > 0) setPromoDiscount(0);
                        }}
                        name="promo-code"
                        id="promo-code"
                      >
                        <InputOTPGroup className="flex-grow">
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                      <Button onClick={handleApplyPromoCode} disabled={promoCode.length < 5 || promoCode.length > 6} variant="outline" size="sm">Apply</Button>
                    </div>
                    {promoMessage && (
                      <p className={`text-xs flex items-center gap-1 ${promoDiscount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <Info size={14} /> {promoMessage}
                      </p>
                    )}
                  </div>

                  <Separator />
                  
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild size="lg" className="w-full">
                    <Link to="/checkout">Proceed to Checkout</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </main>
      <AppFooter />
    </div>
  );
};

export default CartPage;