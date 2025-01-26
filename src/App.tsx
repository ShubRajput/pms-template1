import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import AnimatedImage from "./components/AnimatedImage/animatedImage";
import FoodSection from "./components/FoodSection/foodSection";
import FeedbackSection from "./components/Feedback/feedBackSection";
import Footer from "./components/Footer/footer";
import { API } from "./lib/axios/method";
import { useAppContext } from "./context/appContext";

function App() {
  const [searchParams] = useSearchParams(); // Hook to read query parameters
  const { setSessionToken, setCartItems, cartItems } = useAppContext();

  const createSession = async (tableNumber: string) => {
    try {
      console.log("Sending table number:", tableNumber);
      const response = await API.session.getSession({ tableNumber });
      console.log("Session Created:", response);
      if (response.sessionToken) {
        setSessionToken(response.sessionToken);
        setCartItems(response.cart || []); // Set the cart items
        console.log("Cart Item is: -->", cartItems);
      }
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  useEffect(() => {
    const tableNo = searchParams.get("tableNo"); // Get the table_no from query params

    if (tableNo && tableNo.trim() !== "") {
      console.log("Creating session with table number:", tableNo);
      createSession(tableNo);
    } else {
      console.error("Table number is missing or invalid");
    }
  }, [searchParams, ]); // Depend on searchParams to re-run if URL changes

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Delicious Food
                <br />
                For Every Mood
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Experience the perfect blend of taste and tradition with our
                carefully crafted dishes.
              </p>
              <button className="bg-emerald-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-emerald-700 transition-colors duration-200">
                Explore Menu
              </button>
            </div>
            <div className="flex-1 flex justify-center">
              <AnimatedImage
                src="https://templates.petpooja.com/template-12/assets/images/banner-img.jpg"
                alt="Delicious pancakes with syrup"
              />
            </div>
          </div>
        </div>
      </div>
      <FoodSection />
      <FeedbackSection />
      <Footer />
    </div>
  );
}

export default App;
