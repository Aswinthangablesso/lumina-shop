import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [cartBump, setCartBump] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('lumina_cart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
      const storedPromo = localStorage.getItem('lumina_promo');
      if (storedPromo) {
        setAppliedPromo(JSON.parse(storedPromo));
      }
    } catch (err) {
      console.error('Failed to load cart:', err);
      setCartItems([]);
    }
  }, []);

  const saveCart = (items) => {
    setCartItems(items);
    try {
      localStorage.setItem('lumina_cart', JSON.stringify(items));
    } catch (err) {
      console.error('Failed to save cart:', err);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  const addToCart = (product, quantity = 1) => {
    if (!product || !product.id) return;

    const existingIndex = cartItems.findIndex(item => item.id === product.id);
    let updatedCart = [];

    if (existingIndex > -1) {
      updatedCart = cartItems.map((item, idx) =>
        idx === existingIndex
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCart = [
        ...cartItems,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          category: product.category,
          quantity: quantity
        }
      ];
    }

    saveCart(updatedCart);
    setCartBump(true);
    setTimeout(() => setCartBump(false), 400);

    showToast(`Added "${product.title}" to cart`, 'success');
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }

    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    saveCart(updatedCart);
    showToast('Updated item quantity', 'info');
  };

  const removeFromCart = (id) => {
    const itemToRemove = cartItems.find(item => item.id === id);
    const updatedCart = cartItems.filter(item => item.id !== id);
    saveCart(updatedCart);
    if (itemToRemove) {
      showToast(`Removed "${itemToRemove.title}" from cart`, 'info');
    }
  };

  const clearCart = () => {
    saveCart([]);
    setAppliedPromo(null);
    localStorage.removeItem('lumina_promo');
  };

  const getCartCount = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  };

  const getSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const applyPromo = (code) => {
    if (!code || typeof code !== 'string') {
      return { success: false, error: 'Please enter a valid promo code.' };
    }

    const normalizedCode = code.trim().toUpperCase();
    if (normalizedCode === 'LUMINA10') {
      const promoData = { code: 'LUMINA10', discountPercent: 10 };
      setAppliedPromo(promoData);
      localStorage.setItem('lumina_promo', JSON.stringify(promoData));
      showToast('Promo code LUMINA10 applied! 10% OFF', 'success');
      return { success: true };
    }

    showToast('Invalid promo code. Use "LUMINA10" for 10% OFF.', 'error');
    return { success: false, error: 'Invalid promo code.' };
  };

  const removePromo = () => {
    setAppliedPromo(null);
    localStorage.removeItem('lumina_promo');
    showToast('Promo code removed', 'info');
  };

  const getDiscountAmount = () => {
    if (!appliedPromo) return 0;
    const subtotal = getSubtotal();
    return (subtotal * appliedPromo.discountPercent) / 100;
  };

  const getShippingFee = () => {
    const subtotal = getSubtotal();
    if (subtotal === 0) return 0;
    return subtotal >= 50 ? 0 : 9.99;
  };

  const getTax = () => {
    const subtotalAfterDiscount = getSubtotal() - getDiscountAmount();
    return subtotalAfterDiscount > 0 ? subtotalAfterDiscount * 0.08 : 0;
  };

  const getTotal = () => {
    const subtotal = getSubtotal();
    if (subtotal === 0) return 0;
    return subtotal - getDiscountAmount() + getShippingFee() + getTax();
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        cartBump,
        toast,
        showToast,
        hideToast,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartCount,
        getSubtotal,
        appliedPromo,
        applyPromo,
        removePromo,
        getDiscountAmount,
        getShippingFee,
        getTax,
        getTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
