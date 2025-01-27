import { ShoppingBag, X } from "lucide-react";
import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { useCart } from "../../hooks/useCart";
import { API, Item } from "../../lib/axios/method";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart = ({ isOpen, onClose }: CartProps) => {
  const { cartItems, setCartItems, sessionToken } = useAppContext();
  const { addToCart, removeFromCart } = useCart();

  const handleCheckout = async (
    items: Item[],
    sessionToken: string,
    total: number
  ) => {
    const data: { items: Item[]; sessionToken: string; total: number } = {
      items,
      sessionToken,
      total,
    };
    try {
      await API.orders.placeorder({
        items,
        sessionToken,
        total,
      });
    } catch (error) {}
    console.log("data is in the cart to checkout", data);
    const emptyArray: any = []
    setCartItems(emptyArray)
    alert("Order Placed Successfully!")
  };

  // Increment item quantity
  const incrementItem = async (id: string) => {
    const item = cartItems.find((item) => item.dishId === id);
    if (!item) return;

    try {
      const response = await addToCart({
        sessionToken: sessionToken || "",
        dishId: id,
        quantity: 1,
      });

      if (response?.cart) {
        const updatedCart = cartItems.map((item) =>
          item.dishId === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCartItems(updatedCart);
      } else {
        console.error("Failed to increment item quantity:", response?.message);
      }
    } catch (error) {
      console.error("Error incrementing item quantity:", error);
    }
  };

  // Decrement item quantity
  const decrementItem = async (id: string) => {
    // alert("hi")
    const item = cartItems.find((item) => item.dishId === id);
    if (!item || item.quantity <= 1) return;

    try {
      const response = await removeFromCart({
        sessionToken: sessionToken || "",
        itemId: id,
      });

      if (response?.cart) {
        const updatedCart = cartItems.map((item) =>
          item.dishId === id ? { ...item, quantity: item.quantity - 1 } : item
        );

        setCartItems(updatedCart);
      } else {
        console.error("Failed to decrement item quantity:", response?.message);
      }
    } catch (error) {
      console.error("Error decrementing item quantity:", error);
    }
  };

  // Remove an item from the cart
  const handleRemoveFromCart = async (id: string) => {
    try {
      const response = await removeFromCart({
        sessionToken: sessionToken || "",
        itemId: id,
      });

      if (response) {
        const updatedCart = cartItems.filter((item) => item._id !== id);
        setCartItems(updatedCart);
      } else {
        console.error("Failed to remove item from cart:", response?.message);
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Calculate the total price of items in the cart
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (isOpen) {
      console.log("Cart items in the cart component:", cartItems);
    }
  }, [isOpen, cartItems]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed inset-y-0 right-0 max-w-[350px] w-full bg-white shadow-lg flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <ShoppingBag className="w-12 h-12 mb-2" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      ₹{item.price} x {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => decrementItem(item.dishId)}
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => incrementItem(item.dishId)}
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemoveFromCart(item._id)}
                      className="text-red-500 hover:text-red-600 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t p-4">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold">₹{total}</span>
            </div>
            <button
              onClick={() =>
                handleCheckout(
                  cartItems,
                  sessionToken ? sessionToken : "",
                  total
                )
              }
              className="w-full bg-emerald-600 text-white py-3 rounded-full hover:bg-emerald-700 transition-colors"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
