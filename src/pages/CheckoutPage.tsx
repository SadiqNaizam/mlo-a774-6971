import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Custom Components
import AppHeader from '@/components/layout/AppHeader';
import AppFooter from '@/components/layout/AppFooter';

// Shadcn/ui Components
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

// Lucide Icons
import { CreditCard, MapPin, User, Mail, Calendar, Lock, ShoppingBag, DollarSign, Banknote, CheckCircle } from 'lucide-react';

const checkoutFormSchema = z.object({
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  postalCode: z.string().min(4, { message: "Postal code must be at least 4 characters." }),
  country: z.string().min(2, { message: "Country is required." }),
  
  paymentMethod: z.enum(["creditCard", "paypal", "cod"], {
    required_error: "Please select a payment method.",
  }),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(), // Format MM/YY
  cardCVC: z.string().optional(),
}).refine(
  (data) => {
    if (data.paymentMethod === "creditCard") {
      return !!data.cardNumber && !!data.cardExpiry && !!data.cardCVC;
    }
    return true;
  },
  {
    message: "Card number, expiry, and CVC are required for credit card payments.",
    path: ["cardNumber"], 
  }
).refine(
  (data) => {
    if (data.paymentMethod === "creditCard" && data.cardNumber) {
      // Basic check for 13-19 digits, allowing spaces which we'd typically strip before validation
      return /^\d{13,19}$/.test(data.cardNumber.replace(/\s/g, ''));
    }
    return true;
  },
  {
    message: "Invalid card number format (must be 13-19 digits).",
    path: ["cardNumber"],
  }
).refine(
  (data) => {
    if (data.paymentMethod === "creditCard" && data.cardExpiry) {
      return /^(0[1-9]|1[0-2])\/\d{2}$/.test(data.cardExpiry); // MM/YY
    }
    return true;
  },
  {
    message: "Invalid expiry date format (MM/YY).",
    path: ["cardExpiry"],
  }
).refine(
  (data) => {
    if (data.paymentMethod === "creditCard" && data.cardCVC) {
      return /^\d{3,4}$/.test(data.cardCVC);
    }
    return true;
  },
  {
    message: "Invalid CVC format (3 or 4 digits).",
    path: ["cardCVC"],
  }
);

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

const countries = [
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "GB", label: "United Kingdom" },
  { value: "AU", label: "Australia" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
];

const sampleCartItems = [
  { id: "1", name: "Margherita Pizza", quantity: 1, price: 12.99, imageUrl: "https://via.placeholder.com/64x64?text=Pizza" },
  { id: "2", name: "Soda Bundle (4-pack)", quantity: 1, price: 5.00, imageUrl: "https://via.placeholder.com/64x64?text=Drinks" },
  { id: "3", name: "Cheesy Garlic Bread", quantity: 1, price: 7.50, imageUrl: "https://via.placeholder.com/64x64?text=Sides" },
];
const shippingCost = 4.99;
const subtotal = sampleCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
const total = subtotal + shippingCost;


const CheckoutPage = () => {
  console.log('CheckoutPage loaded');
  const navigate = useNavigate();
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      paymentMethod: undefined,
      cardNumber: "",
      cardExpiry: "",
      cardCVC: "",
    },
  });

  const paymentMethod = form.watch("paymentMethod");

  const onSubmit = async (data: CheckoutFormValues) => {
    console.log("Checkout data:", data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success("Order placed successfully!", {
        description: "You will be redirected to your profile shortly.",
        icon: <CheckCircle className="w-4 h-4" />
    });
    navigate('/user-profile'); // As per user journey
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AppHeader />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto py-8 px-4 md:px-6">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold">Secure Checkout</h1>
            <p className="text-muted-foreground mt-2">Complete your order by providing the details below.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                {/* Column 1 & 2: Delivery and Payment */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Delivery Address Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center"><MapPin className="w-5 h-5 mr-2 text-primary" /> Delivery Address</CardTitle>
                      <CardDescription>Where should we send your order?</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Main St, Apt 4B" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="Anytown" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postal Code</FormLabel>
                            <FormControl>
                              <Input placeholder="12345" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Country</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {countries.map(c => (
                                  <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  {/* Payment Method Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center"><CreditCard className="w-5 h-5 mr-2 text-primary" /> Payment Method</CardTitle>
                      <CardDescription>Choose how you'd like to pay.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="creditCard" />
                                  </FormControl>
                                  <FormLabel className="font-normal flex items-center"><CreditCard className="w-4 h-4 mr-2"/>Credit/Debit Card</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="paypal" />
                                  </FormControl>
                                  <FormLabel className="font-normal flex items-center"><img src="https://www.paypalobjects.com/webstatic/mktg/Logo/AM_SbyPP_mc_vs_ms_ae_UK.png" alt="PayPal" className="w-16 h-auto mr-1" /> </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="cod" />
                                  </FormControl>
                                  <FormLabel className="font-normal flex items-center"><Banknote className="w-4 h-4 mr-2"/>Cash on Delivery</FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {paymentMethod === 'creditCard' && (
                        <div className="mt-6 space-y-4 border-t pt-6">
                          <FormField
                            control={form.control}
                            name="cardNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Card Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="•••• •••• •••• ••••" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="cardExpiry"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Expiry Date</FormLabel>
                                  <FormControl>
                                    <Input placeholder="MM/YY" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="cardCVC"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>CVC/CVV</FormLabel>
                                  <FormControl>
                                    <Input placeholder="•••" {...field} />
                                  </FormControl>
                                  <FormDescription className="flex items-center"><Lock className="w-3 h-3 mr-1"/> Secure</FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Column 3: Order Summary */}
                <div className="lg:col-span-1 space-y-6 mt-8 lg:mt-0">
                  <Card className="sticky top-24"> {/* Sticky summary for larger screens */}
                    <CardHeader>
                      <CardTitle className="flex items-center"><ShoppingBag className="w-5 h-5 mr-2 text-primary"/> Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-3">
                        {sampleCartItems.map(item => (
                          <li key={item.id} className="flex justify-between items-center text-sm">
                            <div className="flex items-center">
                                <img src={item.imageUrl} alt={item.name} className="w-10 h-10 rounded mr-3 object-cover"/>
                                <div>
                                    <span className="font-medium">{item.name}</span>
                                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                </div>
                            </div>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Subtotal</span>
                          <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Shipping</span>
                          <span>${shippingCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-base border-t pt-2 mt-2">
                          <span>Total</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" className="w-full" size="lg" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Placing Order...
                          </>
                        ) : (
                          <>
                            <DollarSign className="w-5 h-5 mr-2" /> Place Order
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </form>
          </Form>
        </main>
      </ScrollArea>
      <AppFooter />
    </div>
  );
};

export default CheckoutPage;