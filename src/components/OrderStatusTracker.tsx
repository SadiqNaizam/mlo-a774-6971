import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCheck, ChefHat, Bike, PackageOpen, CheckCircle2 } from 'lucide-react';

// Define the structure for each step in the tracker
interface OrderStep {
  name: string;
  icon: React.ElementType;
}

// Define the props for the OrderStatusTracker component
interface OrderStatusTrackerProps {
  currentStep: number; // 0-indexed, e.g., 0 for 'Order Confirmed'
  orderId?: string; // Optional: to display or log
}

const orderSteps: OrderStep[] = [
  { name: "Order Confirmed", icon: ClipboardCheck },
  { name: "Preparing Food", icon: ChefHat },
  { name: "Out for Delivery", icon: Bike },
  { name: "Delivered", icon: CheckCircle2 }, // Using CheckCircle2 for a clearer "delivered" state
];

const OrderStatusTracker: React.FC<OrderStatusTrackerProps> = ({ currentStep, orderId }) => {
  console.log(`OrderStatusTracker loaded for order ${orderId || 'N/A'}, current step: ${currentStep}`);

  // Clamp currentStep to be within valid range
  const normalizedCurrentStep = Math.max(0, Math.min(currentStep, orderSteps.length -1));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Order Status {orderId ? `(#${orderId})` : ''}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2 pb-6 px-4 sm:px-6">
        <div className="flex items-start justify-between">
          {orderSteps.map((step, index) => {
            const isCompleted = index < normalizedCurrentStep;
            const isCurrent = index === normalizedCurrentStep;
            const isActive = index <= normalizedCurrentStep; // Covers completed and current

            return (
              <React.Fragment key={step.name}>
                <div className="flex flex-col items-center text-center w-[calc(100%/4)] sm:w-auto">
                  <div
                    className={`
                      rounded-full h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center border-2
                      transition-all duration-300
                      ${isActive ? 'bg-green-500 border-green-500' : 'bg-gray-100 border-gray-300'}
                      ${isCurrent ? 'ring-2 ring-green-600 ring-offset-2' : ''}
                    `}
                  >
                    <step.icon
                      className={`
                        h-5 w-5 sm:h-6 sm:w-6
                        ${isActive ? 'text-white' : 'text-gray-500'}
                      `}
                    />
                  </div>
                  <p
                    className={`
                      mt-2 text-xs sm:text-sm
                      transition-colors duration-300
                      ${isActive ? 'text-green-700' : 'text-gray-500'}
                      ${isCurrent ? 'font-semibold' : 'font-normal'}
                    `}
                  >
                    {step.name}
                  </p>
                </div>
                {index < orderSteps.length - 1 && (
                  <div
                    className={`
                      flex-1 h-1 rounded
                      mt-5 sm:mt-6 mx-1 sm:mx-2
                      transition-colors duration-500 delay-150
                      ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}
                    `}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
        {normalizedCurrentStep === orderSteps.length -1 && (
             <p className="text-center mt-6 text-lg font-medium text-green-600">
                Your order has been delivered!
            </p>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderStatusTracker;