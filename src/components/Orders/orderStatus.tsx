import React from 'react';
import { CheckCircle2, Clock, ChefHat, Utensils } from 'lucide-react';

interface OrderStatusProps {
  status: 'not_ready' | 'preparing' | 'ready' | 'served';
}

const OrderStatus: React.FC<OrderStatusProps> = ({ status }) => {
  const statusConfig = {
    not_ready: {
      icon: <Clock className="w-6 h-6" />,
      text: 'Not Ready',
      color: 'text-gray-500'
    },
    preparing: {
      icon: <ChefHat className="w-6 h-6" />,
      text: 'Preparing',
      color: 'text-yellow-500'
    },
    ready: {
      icon: <Utensils className="w-6 h-6" />,
      text: 'Ready',
      color: 'text-emerald-500'
    },
    served: {
      icon: <CheckCircle2 className="w-6 h-6" />,
      text: 'Served',
      color: 'text-blue-500'
    }
  };

  const { icon, text, color } = statusConfig[status];

  return (
    <div className={`flex items-center space-x-2 ${color}`}>
      {icon}
      <span className="font-medium">{text}</span>
    </div>
  );
};

export default OrderStatus;