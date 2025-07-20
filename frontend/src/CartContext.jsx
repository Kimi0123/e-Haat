import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { currentUser, isLoggedIn } = useAuth();
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Get current user ID for user-specific cart storage
  const getCurrentUserId = () => {
    if (currentUser && currentUser.id) return currentUser.id;
    return null;
  };

  // Get cart key for current user
  const getCartKey = (userId) => {
    return `cart_${userId}`;
  };

  // Fetch cart from backend for logged-in user
  const fetchCartFromBackend = useCallback(async () => {
    if (!isLoggedIn || !currentUser || !localStorage.getItem("token")) return;
    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.ok) {
        const backendCart = await res.json();
        setCart(backendCart);
        setCartCount(backendCart.length);
        // Also update localStorage for consistency
        localStorage.setItem(
          getCartKey(currentUser.id),
          JSON.stringify(backendCart)
        );
      }
    } catch (err) {
      console.error("Error fetching cart from backend:", err);
    }
    // eslint-disable-next-line
  }, [isLoggedIn, currentUser]);

  // Save cart to backend for logged-in user
  const saveCartToBackend = useCallback(
    async (items) => {
      if (!isLoggedIn || !currentUser || !localStorage.getItem("token")) return;
      try {
        await fetch("http://localhost:5000/api/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ items }),
        });
      } catch (err) {
        console.error("Error saving cart to backend:", err);
      }
    },
    [isLoggedIn, currentUser]
  );

  // Update current user ID and reload cart when user changes
  useEffect(() => {
    const userId = getCurrentUserId();
    setCurrentUserId(userId);
    if (isLoggedIn && currentUser && currentUser.id) {
      // Fetch from backend
      fetchCartFromBackend();
    } else {
      setCart([]);
      setCartCount(0);
    }
    // eslint-disable-next-line
  }, [isLoggedIn, currentUser]);

  // Save cart to backend whenever it changes
  useEffect(() => {
    if (currentUserId) {
      setCartCount(cart.length);
      if (isLoggedIn && currentUser && currentUser.id) {
        saveCartToBackend(cart);
      }
    }
    // eslint-disable-next-line
  }, [cart, currentUserId]);

  // Add to cart only if logged in
  const addToCart = (
    product,
    quantity = 1,
    selectedSize = "",
    selectedColor = ""
  ) => {
    if (!isLoggedIn || !currentUser || !currentUser.id) {
      if (window && window.dispatchEvent) {
        window.dispatchEvent(
          new CustomEvent("cart-notification", {
            detail: {
              type: "warning",
              title: "Login Required",
              message: "Please log in to add items to your cart.",
            },
          })
        );
      } else {
        alert("Please log in to add items to your cart.");
      }
      return false;
    }
    setCart((prevCart) => {
      // Check if product already exists in cart
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.id === product.id &&
          item.size === selectedSize &&
          item.color === selectedColor
      );

      if (existingItemIndex !== -1) {
        // Update quantity of existing item
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      } else {
        // Add new item to cart
        const cartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          quantity,
          size: selectedSize,
          color: selectedColor,
          image: product.images?.[0] || product.image,
          stock: product.stock,
        };
        return [...prevCart, cartItem];
      }
    });
    return true;
  };

  const removeFromCart = (itemId, size = "", color = "") => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(item.id === itemId && item.size === size && item.color === color)
      )
    );
  };

  const updateQuantity = (itemId, newQuantity, size = "", color = "") => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId && item.size === size && item.color === color
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    if (isLoggedIn && currentUser && currentUser.id) {
      // Also clear backend cart
      fetch("http://localhost:5000/api/cart", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).catch((err) => console.error("Error clearing backend cart:", err));
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const isInCart = (productId, size = "", color = "") => {
    return cart.some(
      (item) =>
        item.id === productId && item.size === size && item.color === color
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartSubtotal,
        isInCart,
        currentUserId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
