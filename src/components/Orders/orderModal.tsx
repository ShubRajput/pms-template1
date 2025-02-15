import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import OrderStatus from "./orderStatus";
import { ref, onValue } from "firebase/database"; // Firebase imports
import { db } from "../../ config/firebaseConfig"; // Adjust import based on your file structure

interface Order {
  orderId: string;
  createdAt: number;
  items: string[];
  status: string;
  total: number;
}

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Real-time listener for orders
  useEffect(() => {
    if (!isOpen) return;

    const ordersRef = ref(db, "orders");
    const unsubscribe = onValue(ordersRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log("data of the snapshot", data);
        
        const ordersArray = Object.entries(data).map(([key, order]: any) => ({
          orderId: key,
          ...order,
        }));
        setOrders(ordersArray);
      } else {
        setOrders([]); // No orders available
      }
    });

    return () => unsubscribe(); // Cleanup listener when modal closes
  }, [isOpen]);

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
                key={order.orderId}
                className="bg-gray-50 p-4 rounded-lg space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">Order #{order.orderId}</h3>
                    <p className="text-sm text-gray-600">
                      Items: {order.items.join(", ")}
                    </p>
                  </div>
                  <OrderStatus status={"not_ready"} />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Total: ₹{order.total}
                  </span>
                  <span className="text-gray-600">
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
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
