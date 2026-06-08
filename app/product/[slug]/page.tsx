'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { products } from '@/lib/products';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { toast } from 'sonner';
import InteractiveWatchViewer from '@/components/InteractiveWatchViewer';

export default function ProductDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const { addToCart, addToCompare, wishlist, addToWishlist } = useStore();
  
  const product = products.find(p => p.slug === slug);

  if (!product) {
    return <div className="p-12 text-center">Product not found</div>;
  }

  const isInWishlist = wishlist.some(p => p.id === product.id);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    toast.success(`${product.name} added to wishlist`);
  };

  const handleAddToCompare = () => {
    addToCompare(product);
    toast.success(`Added to compare`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Significantly Improved Interactive Viewer */}
        <div>
          <InteractiveWatchViewer 
            imageUrl={product.image} 
            productName={product.name} 
          />
        </div>

        {/* Details */}
        <div>
          <div className="text-[#C9A962] text-sm tracking-[2px]">{product.collection}</div>
          <h1 className="text-5xl tracking-[-1.5px] mt-2">{product.name}</h1>
          
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-4xl font-medium">${product.price}</span>
          </div>

          <p className="mt-6 text-[#F9F6F0]/80 leading-relaxed">{product.description}</p>

          {/* Specs */}
          <div className="mt-10">
            <h3 className="font-semibold tracking-widest text-sm mb-4">TECHNICAL SPECIFICATIONS</h3>
            <div className="space-y-3 text-sm">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/60 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="font-medium text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              onClick={handleAddToCart}
              className="btn-gold py-4 rounded-full text-lg font-medium"
            >
              ADD TO CART
            </button>
            
            <button 
              onClick={handleAddToCompare}
              className="py-4 rounded-full border border-white/30 hover:bg-white/5 transition"
            >
              ADD TO COMPARE
            </button>

            <button 
              onClick={handleAddToWishlist}
              disabled={isInWishlist}
              className="py-4 rounded-full border border-white/30 hover:bg-white/5 disabled:opacity-50 transition"
            >
              {isInWishlist ? 'IN WISHLIST' : 'ADD TO WISHLIST'}
            </button>

            <Link 
              href="/quiz" 
              className="py-4 rounded-full border border-white/30 text-center hover:bg-white/5 flex items-center justify-center"
            >
              FIND SIMILAR
            </Link>
          </div>

          <div className="mt-6 text-xs text-white/50">
            Free worldwide shipping • 5-year warranty • Lifetime servicing
          </div>
        </div>
      </div>
    </div>
  );
}
