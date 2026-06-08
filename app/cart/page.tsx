'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, cartTotal } = useStore();

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl mb-4">Your Cart is Empty</h1>
        <p className="text-white/60 mb-8">Looks like you haven’t added any watches yet.</p>
        <Link href="/shop" className="btn-gold px-8 py-3 rounded-full inline-block">
          Browse Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-5xl tracking-[-1.5px] mb-10">Your Cart</h1>

      <div className="space-y-6">
        {cart.map((item) => (
          <div key={item.id} className="flex gap-6 border border-white/10 p-6 rounded-2xl">
            <img src={item.image} alt={item.name} className="w-32 h-24 object-cover rounded-xl" />
            
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-xl">{item.name}</h3>
                  <p className="text-sm text-white/60">{item.movement} • {item.caseSize}mm</p>
                </div>
                <div className="text-right">
                  <div className="font-medium">${item.price * item.quantity}</div>
                  <div className="text-sm text-white/50">${item.price} × {item.quantity}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-6">
                <div className="flex border border-white/20 rounded-lg">
                  <button 
                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)} 
                    className="px-3 py-1 hover:bg-white/5"
                  >
                    −
                  </button>
                  <div className="px-4 py-1 border-x border-white/20">{item.quantity}</div>
                  <button 
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)} 
                    className="px-3 py-1 hover:bg-white/5"
                  >
                    +
                  </button>
                </div>

                <button 
                  onClick={() => removeFromCart(item.id)} 
                  className="text-red-400 hover:text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-between items-center border-t border-white/10 pt-8">
        <div>
          <div className="text-sm text-white/60">TOTAL</div>
          <div className="text-4xl font-medium">${cartTotal}</div>
        </div>
        
        <Link 
          href="/checkout" 
          className="btn-gold px-12 py-4 rounded-full text-lg"
        >
          PROCEED TO CHECKOUT
        </Link>
      </div>
    </div>
  );
}
