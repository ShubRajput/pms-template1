import React from 'react';
import { X } from 'lucide-react';
import OrderStatus from './orderStatus';
import { Order } from '../../types/orders';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, orders }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 text-center">
        <div className="inline-block w-full max-w-2xl p-6 my-8 text-left bg-white rounded-2xl shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">My Orders</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-gray-50 p-4 rounded-lg space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">Order #{order.id}</h3>
                    <p className="text-sm text-gray-600">{order.items.join(', ')}</p>
                  </div>
                  <OrderStatus status={order.status} />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total: ₹{order.total}</span>
                  <span className="text-gray-600">{order.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;