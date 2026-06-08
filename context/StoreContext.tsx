'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  movement: string;
  caseSize: number;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: Product[];
  compare: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateCartQuantity: (id: number, quantity: number) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: number) => void;
  addToCompare: (product: Product) => void;
  removeFromCompare: (id: number) => void;
  clearCompare: () => void;
  cartTotal: number;
  cartCount: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [compare, setCompare] = useState<Product[]>([]);

  // Load from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('alghazali_cart');
    if (savedCart) setCart(JSON.parse(savedCart));

    const savedWishlist = localStorage.getItem('alghazali_wishlist');
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

    const savedCompare = localStorage.getItem('alghazali_compare');
    if (savedCompare) setCompare(JSON.parse(savedCompare));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('alghazali_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('alghazali_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('alghazali_compare', JSON.stringify(compare));
  }, [compare]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const addToWishlist = (product: Product) => {
    if (!wishlist.find(p => p.id === product.id)) {
      setWishlist(prev => [...prev, product]);
    }
  };

  const removeFromWishlist = (id: number) => {
    setWishlist(prev => prev.filter(p => p.id !== id));
  };

  const addToCompare = (product: Product) => {
    if (compare.length >= 4) {
      alert("You can compare up to 4 watches at a time.");
      return;
    }
    if (!compare.find(p => p.id === product.id)) {
      setCompare(prev => [...prev, product]);
    }
  };

  const removeFromCompare = (id: number) => {
    setCompare(prev => prev.filter(p => p.id !== id));
  };

  const clearCompare = () => setCompare([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        compare,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        addToWishlist,
        removeFromWishlist,
        addToCompare,
        removeFromCompare,
        clearCompare,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
