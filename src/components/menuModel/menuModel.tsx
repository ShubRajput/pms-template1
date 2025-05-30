import { X } from "lucide-react";
import { MenuItem } from "../../data/menuData";
import { useCart } from "../../hooks/useCart";
import { useAppContext } from "../../context/appContext";

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
  title: string;
}

const MenuModal = ({ isOpen, onClose, items, title }: MenuModalProps) => {
  const { addToCart } = useCart();
  const { sessionToken, setCartItems, cartItems } = useAppContext();

  const handleAddToCart = async (item: MenuItem) => {
    try {
      // Call the API to add the item to the cart
      const response = await addToCart({
        sessionToken: sessionToken || "",
        dishId: item._id,
        quantity: 1,
      });

      // If the API call succeeds, update the cart state
      if (response?.cart) {
        const updatedCart = [...cartItems];
        const existingItem = updatedCart.find((cartItem) => cartItem.dishId === item._id);

        if (existingItem) {
          // If item already exists in the cart, increment its quantity
          existingItem.quantity += 1;
        } else {
          // Otherwise, add the new item to the cart
          updatedCart.push({
            dishId: item._id,
            name: item.name,
            price: item.price,
            quantity: 1,
            _id: response.cartItemId, // Assuming the API response includes a new cart item ID
          });
        }

        setCartItems(updatedCart);
        alert("Item added");
      } else {
        alert("Failed to add item to the cart. Please try again.");
        throw new Error("Failed to add item to the cart. API did not return success.");
      }
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      alert("Failed to add item to the cart. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 text-center">
        <div className="inline-block w-full max-w-2xl p-6 my-8 text-left bg-white rounded-2xl shadow-xl transform transition-all">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl gap-4"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
                  <span className="text-lg font-semibold text-gray-900">
                    ₹{item.price}
                  </span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-full text-sm hover:bg-emerald-700 transition-colors whitespace-nowrap"
                  >
                    Add to Cartt
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
