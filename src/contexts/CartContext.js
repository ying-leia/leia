'use client';
import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import Toast from '../components/Toast';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id && item.selectedVase?.id === action.payload.selectedVase?.id
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + action.payload.quantity
        };
        return { ...state, items: updatedItems };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, cartId: Date.now() + Math.random() }]
        };
      }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.cartId !== action.payload.cartId)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.cartId === action.payload.cartId
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
      };

    case 'UPDATE_VASE':
      return {
        ...state,
        items: state.items.map(item =>
          item.cartId === action.payload.cartId
            ? { ...item, selectedVase: action.payload.selectedVase }
            : item
        )
      };

    case 'CLEAR_CART':
      return { ...state, items: [] };

    case 'LOAD_CART':
      return { ...state, items: action.payload };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('naia-cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartItems });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('naia-cart', JSON.stringify(state.items));
  }, [state.items]);

  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  const hideToast = () => {
    setToastVisible(false);
  };

  const addItem = (product, selectedVase = null, quantity = 1) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        selectedVase,
        quantity,
        product // Keep reference to full product for easy access
      }
    });

    // Show toast notification
    const vaseText = selectedVase ? ` with ${selectedVase.name}` : '';
    showToast(`${product.name}${vaseText} added to cart`);
  };

  const removeItem = (cartId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { cartId } });
  };

  const updateQuantity = (cartId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { cartId, quantity } });
  };

  const updateVase = (cartId, selectedVase) => {
    dispatch({ type: 'UPDATE_VASE', payload: { cartId, selectedVase } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => {
      const vasePrice = item.selectedVase ? item.selectedVase.price : 0;
      return total + (item.price + vasePrice) * item.quantity;
    }, 0);
  };

  const getCartItemsCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  const getCartSubtotal = () => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartVasesTotal = () => {
    return state.items.reduce((total, item) => {
      const vasePrice = item.selectedVase ? item.selectedVase.price : 0;
      return total + vasePrice * item.quantity;
    }, 0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(price);
  };

  const value = {
    cartItems: state.items,
    addItem,
    removeItem,
    updateQuantity,
    updateVase,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    getCartSubtotal,
    getCartVasesTotal,
    formatPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      <Toast 
        message={toastMessage}
        isVisible={toastVisible}
        onClose={hideToast}
        type="success"
      />
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