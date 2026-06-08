'use client';

import Link from 'next/link';
import { ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '@/context/StoreContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useStore();

  return (
    <nav className="sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#C9A962] flex items-center justify-center">
            <span className="text-[#C9A962] font-serif text-xl tracking-[-1px]">A</span>
          </div>
          <div>
            <div className="font-semibold tracking-[1.5px] text-lg">ALGHAZALI</div>
            <div className="text-[9px] text-[#C9A962] -mt-1 tracking-[2px]">WATCHES</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-9 text-sm tracking-[1px]">
          <Link href="/shop" className="hover:text-[#C9A962] transition">SHOP</Link>
          <Link href="/collections" className="hover:text-[#C9A962] transition">COLLECTIONS</Link>
          <Link href="/quiz" className="hover:text-[#C9A962] transition">STYLE FINDER</Link>
          <Link href="/journal" className="hover:text-[#C9A962] transition">JOURNAL</Link>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-5">
          <Link href="/wishlist" className="hover:text-[#C9A962] transition hidden md:block">
            <Heart size={20} />
          </Link>
          <Link href="/cart" className="hover:text-[#C9A962] transition relative">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C9A962] text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <Link href="/admin" className="hover:text-[#C9A962] transition hidden md:block">
            <User size={20} />
          </Link>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-white/10 px-6 py-6 bg-[#0A0A0A]">
          <div className="flex flex-col gap-4 text-sm">
            <Link href="/shop" className="py-2">SHOP</Link>
            <Link href="/collections" className="py-2">COLLECTIONS</Link>
            <Link href="/quiz" className="py-2">STYLE FINDER</Link>
            <Link href="/wishlist" className="py-2">WISHLIST</Link>
            <Link href="/admin" className="py-2">ADMIN</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
