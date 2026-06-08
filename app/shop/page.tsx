'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { products } from '@/lib/products';
import { useStore } from '@/context/StoreContext';
import { toast } from 'sonner';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const { addToCart, addToWishlist } = useStore();

  const categories = ['All', 'Heritage', 'Sports', 'Limited Edition', 'Dive'];

  const filteredProducts = products
    .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0;
    });

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleAddToWishlist = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    addToWishlist(product);
    toast.success(`${product.name} added to wishlist`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-end mb-10">
        <div>
          <div className="text-[#C9A962] text-sm tracking-[2px]">DISCOVER</div>
          <h1 className="text-6xl tracking-[-2px]">The Collection</h1>
        </div>
        
        <div className="flex gap-4">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#111] border border-white/20 px-4 py-2 text-sm rounded-lg"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-1.5 text-sm rounded-full border transition ${
              selectedCategory === cat 
                ? 'bg-[#C9A962] text-black border-[#C9A962]' 
                : 'border-white/20 hover:bg-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group block">
            <Link href={`/product/${product.slug}`}>
              <div className="card luxury-border rounded-2xl overflow-hidden bg-[#111]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="product-image w-full h-full object-cover" 
                  />
                  {product.isLimited && (
                    <div className="absolute top-4 right-4 bg-black/80 text-[#C9A962] text-xs px-3 py-1 tracking-widest">LIMITED</div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm text-[#C9A962] tracking-widest">{product.collection}</div>
                      <h3 className="font-semibold text-xl tracking-tight mt-1">{product.name}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-medium">${product.price}</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <div className="text-[#C9A962]">{product.movement}</div>
                    <div className="text-white/50">{product.caseSize}mm</div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Quick Actions */}
            <div className="flex gap-2 mt-3 px-1">
              <button 
                onClick={(e) => handleAddToCart(e, product)}
                className="flex-1 text-xs py-2.5 border border-white/20 rounded-full hover:bg-white/5 transition"
              >
                Add to Cart
              </button>
              <button 
                onClick={(e) => handleAddToWishlist(e, product)}
                className="flex-1 text-xs py-2.5 border border-white/20 rounded-full hover:bg-white/5 transition"
              >
                Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
