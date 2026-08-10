import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => (item.id && item.id === action.payload.id) || (item._id && item._id === action.payload._id) || item.name === action.payload.name
      );
      if (existingItemIndex > -1) {
        const newItems = [...state.items];
        newItems[existingItemIndex].quantity += 1;
        return { ...state, items: newItems };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => (item.id || item._id || item.name) !== action.payload)
      };
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      const newItems = state.items.map(item => 
        (item.id === id || item._id === id || item.name === id) ? { ...item, quantity } : item
      );
      return { ...state, items: newItems };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] }, (initial) => {
    const localData = localStorage.getItem('maayCart');
    return localData ? JSON.parse(localData) : initial;
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('maayCart', JSON.stringify(state));
  }, [state]);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity === 0) {
      removeFromCart(id);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const cartTotal = state.items.reduce((total, item) => {
    let priceStr = item.price.toString();
    // Extract numbers
    let priceVal = parseFloat(priceStr.replace(/[^\d.]/g, '').replace(/\./g, ''));
    if (priceStr.toUpperCase().includes('K') && priceVal < 1000) {
        priceVal = priceVal * 1000;
    }
    return total + (priceVal * item.quantity);
  }, 0);

  const cartCount = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart: state.items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      cartTotal,
      cartCount,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
