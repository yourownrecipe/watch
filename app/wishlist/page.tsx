'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 px-6">
        <h1 className="text-4xl mb-4">Your Wishlist is Empty</h1>
        <Link href="/shop" className="btn-gold px-8 py-3 rounded-full inline-block mt-4">
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-5xl tracking-tight mb-10">Wishlist</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {wishlist.map(product => (
          <div key={product.id} className="border border-white/10 rounded-2xl overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full aspect-[16/10] object-cover" />
            <div className="p-6">
              <h3 className="font-semibold text-xl">{product.name}</h3>
              <p className="text-[#C9A962] mt-1">${product.price}</p>
              
              <div className="flex gap-3 mt-6">
                <button 
                  onClick={() => addToCart(product)} 
                  className="flex-1 btn-gold py-3 rounded-full text-sm"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={() => removeFromWishlist(product.id)} 
                  className="flex-1 border border-white/30 py-3 rounded-full text-sm hover:bg-white/5"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
