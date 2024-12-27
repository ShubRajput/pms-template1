import { useState, useEffect } from 'react';
import { UtensilsCrossed, ShoppingBag, ClipboardList } from 'lucide-react';
import Cart from '../Cart/cart';
import OrderModal from '../Orders/orderModal';
import { useCart } from '../../hooks/useCart';
import { useOrders } from '../../hooks/useOrders';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const { items } = useCart();
  const { orders, updateOrderStatus } = useOrders();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const statusOrder = ['not_ready', 'preparing', 'ready', 'served'];
    orders.forEach((order) => {
      const currentIndex = statusOrder.indexOf(order.status);
      if (currentIndex < statusOrder.length - 1) {
        const timer = setTimeout(() => {
          updateOrderStatus(order.id, statusOrder[currentIndex + 1] as any);
        }, 3000);
        return () => clearTimeout(timer);
      }
    });
  }, [orders]);

  return (
    <>
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <UtensilsCrossed className="h-8 w-8 text-emerald-600" />
            <span className="ml-2 text-xl font-bold">Restaurant</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-gray-100 rounded-full"
            >
              <ShoppingBag className="h-6 w-6" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {items.length}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsOrdersOpen(true)}
              className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-emerald-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <ClipboardList className="w-4 h-4" />
              <span className="hidden sm:inline">My Orders</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
    
    <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    <OrderModal 
      isOpen={isOrdersOpen} 
      onClose={() => setIsOrdersOpen(false)}
      orders={orders}
    />
  </>
  );
};

export default Navbar;