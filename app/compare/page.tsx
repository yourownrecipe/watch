'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import Link from 'next/link';

export default function ComparePage() {
  const { compare, removeFromCompare, clearCompare } = useStore();

  if (compare.length === 0) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 px-6">
        <h1 className="text-4xl mb-4">No Watches to Compare</h1>
        <p className="text-white/60 mb-8">Add watches from the shop to compare them side by side.</p>
        <Link href="/shop" className="btn-gold px-8 py-3 rounded-full inline-block">
          Browse Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl tracking-tight">Compare Watches</h1>
        <button onClick={clearCompare} className="text-sm text-red-400 hover:text-red-500">
          Clear All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left py-4 w-48">Specification</th>
              {compare.map((watch, index) => (
                <th key={index} className="text-left py-4 px-4 font-normal">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold">{watch.name}</div>
                      <div className="text-sm text-[#C9A962]">${watch.price}</div>
                    </div>
                    <button 
                      onClick={() => removeFromCompare(watch.id)} 
                      className="text-red-400 text-xs hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {['movement', 'caseSize', 'category'].map((spec) => (
              <tr key={spec} className="border-b border-white/10">
                <td className="py-4 text-white/60 capitalize">{spec}</td>
                {compare.map((watch, i) => (
                  <td key={i} className="py-4 px-4">
                    {(watch as any)[spec] || '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-sm text-white/50">
        You can compare up to 4 watches at a time.
      </div>
    </div>
  );
}
