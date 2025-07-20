import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Get current user ID for user-specific cart storage
  const getCurrentUserId = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user.uid || "guest";
  };

  // Get cart key for current user
  const getCartKey = (userId) => {
    return `cart_${userId}`;
  };

  // Update current user ID and reload cart when user changes
  useEffect(() => {
    const userId = getCurrentUserId();
    if (userId !== currentUserId) {
      setCurrentUserId(userId);

      // Load cart for the new user
      const cartKey = getCartKey(userId);
      const savedCart = localStorage.getItem(cartKey);
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          setCart(parsedCart);
          setCartCount(parsedCart.length);
        } catch (error) {
          console.error("Error parsing cart data:", error);
          setCart([]);
          setCartCount(0);
        }
      } else {
        setCart([]);
        setCartCount(0);
      }
    }
  }, [currentUserId]);

  // Listen for user changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const userId = getCurrentUserId();
      if (userId !== currentUserId) {
        setCurrentUserId(userId);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [currentUserId]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (currentUserId) {
      const cartKey = getCartKey(currentUserId);
      localStorage.setItem(cartKey, JSON.stringify(cart));
      setCartCount(cart.length);
    }
  }, [cart, currentUserId]);

  const addToCart = (
    product,
    quantity = 1,
    selectedSize = "",
    selectedColor = ""
  ) => {
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
