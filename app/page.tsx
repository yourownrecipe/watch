'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Award, Clock, Shield, Truck } from 'lucide-react';

export default function AlghazaliHome() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F9F6F0]">
      {/* Hero Section */}
      <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#C9A962_0.5px,transparent_1px)] bg-[length:4px_4px] opacity-10"></div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-[#C9A962]/30 text-[#C9A962] text-sm tracking-[3px]">
            EST. 2018 — GENEVA
          </div>
          
          <h1 className="text-7xl md:text-8xl font-semibold tracking-[-3.5px] leading-[0.9] mb-6">
            TIME,<br />PERFECTED.
          </h1>
          <p className="max-w-md mx-auto text-xl text-[#F9F6F0]/70 mb-10">
            Precision-engineered timepieces for those who measure life in moments, not minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/shop" 
              className="btn-gold px-10 py-4 rounded-full text-lg font-medium flex items-center justify-center gap-3 group"
            >
              DISCOVER THE COLLECTION
              <ArrowRight className="group-hover:translate-x-1 transition" size={20} />
            </Link>
            <Link 
              href="#quiz" 
              className="px-10 py-4 rounded-full border border-white/30 hover:bg-white/5 text-lg font-medium transition flex items-center justify-center"
            >
              TAKE THE STYLE FINDER
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-xs tracking-[2px] text-white/50">
          SCROLL TO BEGIN <div className="h-px w-8 bg-white/30 mt-2" />
        </div>
      </section>

      {/* Trust Bar */}
      <div className="border-b border-white/10 py-5">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center gap-x-12 gap-y-4 text-sm text-[#F9F6F0]/60">
          <div className="flex items-center gap-2"><Shield size={16} /> 5-YEAR WARRANTY</div>
          <div className="flex items-center gap-2"><Clock size={16} /> LIFETIME SERVICING</div>
          <div className="flex items-center gap-2"><Truck size={16} /> INSURED WORLDWIDE SHIPPING</div>
          <div className="flex items-center gap-2"><Award size={16} /> HAND-FINISHED IN GENEVA</div>
        </div>
      </div>

      {/* Featured Collections */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <div className="text-[#C9A962] text-sm tracking-[3px] mb-2">CURATED FOR DISCERNING COLLECTORS</div>
            <h2 className="text-5xl tracking-[-1.5px]">Signature Collections</h2>
          </div>
          <Link href="/shop" className="hidden md:flex items-center gap-2 text-[#C9A962] hover:underline">
            VIEW ALL <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((col, index) => (
            <Link key={index} href={`/shop?collection=${col.slug}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl luxury-border bg-[#111]">
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 z-10" />
                <img 
                  src={col.image} 
                  alt={col.name} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute bottom-0 left-0 p-8 z-20">
                  <div className="text-[#C9A962] text-xs tracking-[2px] mb-1">{col.count} PIECES</div>
                  <h3 className="text-3xl font-semibold tracking-tight">{col.name}</h3>
                  <p className="text-[#F9F6F0]/70 mt-1 text-sm max-w-[260px]">{col.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Watch Style Finder CTA */}
      <section id="quiz" className="bg-[#111] py-20 border-y border-white/10">
        <div className="max-w-2xl mx-auto text-center px-6">
          <div className="text-[#C9A962] text-sm tracking-[3px] mb-3">DISCOVER YOUR SIGNATURE PIECE</div>
          <h2 className="text-6xl tracking-[-2px] leading-none mb-6">Find Your Perfect Timepiece</h2>
          <p className="text-[#F9F6F0]/70 text-lg mb-10 max-w-md mx-auto">
            Answer a few thoughtful questions and receive personalized recommendations from our curators.
          </p>
          <Link 
            href="/quiz" 
            className="inline-flex items-center gap-3 px-9 py-4 rounded-full border border-[#C9A962] text-[#C9A962] hover:bg-[#C9A962] hover:text-black transition text-lg"
          >
            START THE WATCH FINDER <ArrowRight />
          </Link>
        </div>
      </section>

      {/* Why Alghazali */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <div className="text-[#C9A962] text-xs tracking-[3px]">THE ALGHAZALI STANDARD</div>
          <h2 className="text-5xl tracking-tight mt-3">Why Collectors Choose Us</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyUs.map((item, i) => (
            <div key={i} className="border-l-2 border-[#C9A962]/40 pl-6">
              <div className="text-[#C9A962] mb-4">{item.icon}</div>
              <h4 className="font-semibold text-xl tracking-tight mb-2">{item.title}</h4>
              <p className="text-[#F9F6F0]/70 text-[15px]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const collections = [
  {
    name: "Heritage Automatic",
    slug: "heritage",
    count: 18,
    description: "Timeless dress watches with Geneva stripes and hand-finished movements.",
    image: "https://picsum.photos/id/1015/800/600"
  },
  {
    name: "Sports Chronograph",
    slug: "sports",
    count: 12,
    description: "High-performance timepieces built for those who live life at full speed.",
    image: "https://picsum.photos/id/160/800/600"
  },
  {
    name: "Limited Editions",
    slug: "limited",
    count: 7,
    description: "Exclusive numbered pieces featuring rare materials and complications.",
    image: "https://picsum.photos/id/201/800/600"
  }
];

const whyUs = [
  { icon: <Award size={28} />, title: "Geneva Finishing", desc: "Every movement is hand-decorated in our atelier with Côtes de Genève and perlage." },
  { icon: <Shield size={28} />, title: "Lifetime Service", desc: "We service every Alghazali watch for life at no cost to the original owner." },
  { icon: <Clock size={28} />, title: "5-Year Warranty", desc: "Comprehensive international warranty with rapid turnaround at our service centers." },
  { icon: <Truck size={28} />, title: "Insured Delivery", desc: "Every timepiece is fully insured and delivered in a handcrafted presentation box." },
];
