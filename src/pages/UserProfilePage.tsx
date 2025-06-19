import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import AppHeader from '@/components/layout/AppHeader';
import AppFooter from '@/components/layout/AppFooter';
import OrderStatusTracker from '@/components/OrderStatusTracker';

// Shadcn/UI Components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Lucide Icons
import { User, MapPin, CreditCard, Bell, HelpCircle, Package, History, Edit3, PlusCircle, Trash2, LogOut, Settings } from 'lucide-react';

// Placeholder Data
const userProfile = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  phone: '555-123-4567',
  avatarUrl: 'https://i.pravatar.cc/150?u=alexjohnson', // Placeholder avatar
};

const deliveryAddresses = [
  { id: 'addr1', street: '123 Culinary Lane', city: 'Foodville', zip: '12345', isDefault: true, type: 'Home' },
  { id: 'addr2', street: '456 Work Drive', city: 'Foodville', zip: '67890', isDefault: false, type: 'Work' },
];

const paymentMethods = [
  { id: 'pay1', type: 'Visa', last4: '4242', expiry: '12/2025' },
  { id: 'pay2', type: 'MasterCard', last4: '5555', expiry: '06/2027' },
];

const currentOrder = {
  id: 'FD12345XYZ',
  currentStep: 2, // 0: Confirmed, 1: Preparing, 2: Out for Delivery, 3: Delivered
};

const pastOrders = [
  {
    id: 'FD00789ABC',
    date: '2024-07-10',
    total: 35.99,
    status: 'Delivered',
    items: [
      { name: 'Margherita Pizza', quantity: 1, price: 15.99 },
      { name: 'Coke', quantity: 4, price: 2.00 },
    ],
    restaurantName: 'Luigi\'s Pizzeria',
  },
  {
    id: 'FD00654DEF',
    date: '2024-06-25',
    total: 22.50,
    status: 'Delivered',
    items: [
      { name: 'Chicken Burger', quantity: 1, price: 12.50 },
      { name: 'Fries', quantity: 1, price: 5.00 },
      { name: 'Sprite', quantity: 1, price: 2.50 },
    ],
    restaurantName: 'Burger Hub',
  },
];

const UserProfilePage = () => {
  console.log('UserProfilePage loaded');
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [phone, setPhone] = useState(userProfile.phone);

  const [notifications, setNotifications] = useState({
    orderUpdatesEmail: true,
    orderUpdatesSms: false,
    promotionsEmail: true,
    newsletters: false,
  });

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AppHeader />
      <ScrollArea className="flex-1">
        <main className="container mx-auto max-w-5xl py-8 px-4 sm:px-6 lg:px-8">
          {/* User Intro Section */}
          <section className="mb-8 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Avatar className="h-24 w-24 border-2 border-primary">
              <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} />
              <AvatarFallback>{userProfile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-800">{userProfile.name}</h1>
              <p className="text-muted-foreground">{userProfile.email}</p>
              <Link to="/" className="inline-flex items-center text-sm text-primary hover:underline mt-2">
                <LogOut className="mr-1.5 h-4 w-4" />
                Logout (Placeholder - links to Home)
              </Link>
            </div>
          </section>

          <Tabs defaultValue="order-history" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap lg:grid-cols-6 bg-gray-100 p-1 rounded-lg mb-6">
              {[{value: "profile-info", label: "Profile", icon: User},
               {value: "addresses", label: "Addresses", icon: MapPin},
               {value: "payment-methods", label: "Payment", icon: CreditCard},
               {value: "order-history", label: "Orders", icon: Package},
               {value: "notifications", label: "Notifications", icon: Bell},
               {value: "help-support", label: "Support", icon: HelpCircle}].map(tab => (
                <TabsTrigger key={tab.value} value={tab.value} className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <tab.icon className="mr-2 h-4 w-4" /> {tab.label}
                </TabsTrigger>
               ))}
            </TabsList>

            {/* Profile Information Tab */}
            <TabsContent value="profile-info">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><User className="mr-2 h-5 w-5" /> Personal Information</CardTitle>
                  <CardDescription>Manage your name, email, and phone number.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button><Edit3 className="mr-2 h-4 w-4" /> Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Delivery Addresses Tab */}
            <TabsContent value="addresses">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><MapPin className="mr-2 h-5 w-5" /> Delivery Addresses</CardTitle>
                  <CardDescription>Manage your saved delivery locations.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {deliveryAddresses.map((addr) => (
                    <Card key={addr.id} className="p-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{addr.type} {addr.isDefault && <span className="text-xs text-green-600 font-medium ml-2">(Default)</span>}</h4>
                        <p className="text-sm text-muted-foreground">{addr.street}, {addr.city}, {addr.zip}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="icon"><Edit3 className="h-4 w-4" /></Button>
                        <Button variant="outline" size="icon" className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </Card>
                  ))}
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> Add New Address</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Payment Methods Tab */}
            <TabsContent value="payment-methods">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><CreditCard className="mr-2 h-5 w-5" /> Payment Methods</CardTitle>
                  <CardDescription>Manage your saved payment options.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {paymentMethods.map((pm) => (
                    <Card key={pm.id} className="p-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{pm.type} ending in {pm.last4}</h4>
                        <p className="text-sm text-muted-foreground">Expires: {pm.expiry}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="icon"><Edit3 className="h-4 w-4" /></Button>
                        <Button variant="outline" size="icon" className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </Card>
                  ))}
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> Add New Payment Method</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Order History Tab */}
            <TabsContent value="order-history">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center"><Package className="mr-2 h-5 w-5" /> Current Order Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  {currentOrder ? (
                    <OrderStatusTracker currentStep={currentOrder.currentStep} orderId={currentOrder.id} />
                  ) : (
                    <p className="text-muted-foreground">You have no active orders.</p>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><History className="mr-2 h-5 w-5" /> Past Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  {pastOrders.length > 0 ? (
                    <Accordion type="single" collapsible className="w-full">
                      {pastOrders.map((order) => (
                        <AccordionItem value={order.id} key={order.id}>
                          <AccordionTrigger>
                            <div className="flex justify-between w-full pr-2">
                              <span>Order ID: {order.id} ({order.date})</span>
                              <span>${order.total.toFixed(2)} - {order.status}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="bg-gray-50 p-4 rounded-b-md">
                            <h5 className="font-semibold mb-1">Restaurant: {order.restaurantName}</h5>
                            <ul className="list-disc list-inside text-sm space-y-0.5">
                              {order.items.map(item => (
                                <li key={item.name}>{item.quantity}x {item.name} (${item.price.toFixed(2)} each)</li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <p className="text-muted-foreground">You have no past orders.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notification Preferences Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><Bell className="mr-2 h-5 w-5" /> Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive updates from us.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(Object.keys(notifications) as Array<keyof typeof notifications>).map((key) => (
                    <div key={key} className="flex items-center justify-between p-3 border rounded-md">
                      <Label htmlFor={key} className="capitalize">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </Label>
                      <Switch
                        id={key}
                        checked={notifications[key]}
                        onCheckedChange={() => handleNotificationChange(key)}
                      />
                    </div>
                  ))}
                </CardContent>
                 <CardFooter className="border-t px-6 py-4">
                  <Button><Settings className="mr-2 h-4 w-4" /> Update Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Help & Support Tab */}
            <TabsContent value="help-support">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><HelpCircle className="mr-2 h-5 w-5" /> Help & Support</CardTitle>
                  <CardDescription>Find answers to common questions or contact us.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="link" className="p-0 h-auto text-base text-primary">Frequently Asked Questions (FAQs)</Button>
                  <Separator />
                  <Button variant="link" className="p-0 h-auto text-base text-primary">Contact Customer Support</Button>
                  <Separator />
                  <Button variant="link" className="p-0 h-auto text-base text-primary">Report an Issue with an Order</Button>
                  <Separator />
                   <Button variant="link" className="p-0 h-auto text-base text-primary">Terms of Service</Button>
                   <Separator />
                   <Button variant="link" className="p-0 h-auto text-base text-primary">Privacy Policy</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </ScrollArea>
      <AppFooter />
    </div>
  );
};

export default UserProfilePage;