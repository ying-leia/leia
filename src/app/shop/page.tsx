'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { products } from '../../data/products';
import ProductGrid from '../../components/ProductGrid';
import Navigation from '../../components/Navigation';

interface Product {
  id: string;
  name: string;
  price: number;
  featured: boolean;
  images: string[];
  description: string;
  details: string;
  care: string;
  footnote: string;
  availableVases: Array<{
    id: string;
    name: string;
    image: string;
    price: number;
  }>;
  category: string;
  tags: string[];
  suggestedProducts: string[];
}

export default function Shop() {
  const [filter, setFilter] = useState('all');

  const filteredProducts: Product[] = filter === 'all' 
    ? products 
    : products.filter(product => product.category === filter);

  const categories = [
    { id: 'all', name: 'All Creations' },
    { id: 'minimalist', name: 'Minimalist' },
    { id: 'romantic', name: 'Romantic' },
    { id: 'warm', name: 'Warm Tones' },
    { id: 'ethereal', name: 'Ethereal' },
    { id: 'dramatic', name: 'Dramatic' },
    { id: 'luxury', name: 'Luxury' }
  ];

  return (
    <div className="min-h-screen bg-[#F8F5F2] text-[#2f1c11]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&display=swap');
        body {
          font-family: 'Playfair Display', serif;
        }
      `}</style>

      <Navigation currentPage="shop" />

      {/* Hero Section */}
      <section className="text-center py-16 px-6 md:px-10">
        <h1 className="text-4xl md:text-5xl font-light mb-4">The Collection</h1>
        <p className="text-lg text-[#5f493b] max-w-2xl mx-auto leading-relaxed">
          Discover our carefully curated selection of eternal flower arrangements, 
          each piece crafted to bring lasting beauty to your space.
        </p>
      </section>

      {/* Category Filter */}
      <section className="px-6 md:px-10 mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-2 text-sm uppercase tracking-wide transition-all duration-200 ${
                filter === category.id
                  ? 'bg-[#5F493B] text-white'
                  : 'bg-[#e7e2d5] text-[#2f1c11] hover:bg-[#dcd4c3]'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-6 md:px-10 pb-20">
        <ProductGrid 
          products={filteredProducts}
          columns="grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          spacing="gap-6 md:gap-8"
        />
      </section>

      {/* Featured Info Section */}
      <section className="bg-[#e7e2d5] text-[#2f1c11] py-16 px-6 md:px-10 text-center">
        <h2 className="text-3xl font-light mb-6">Why Choose Eternal Flowers?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div>
            <h3 className="text-lg font-medium mb-3">Lasting Beauty</h3>
            <p className="text-sm text-[#5f493b] leading-relaxed">
              Our preserved flowers maintain their natural beauty for 2-4 years with proper care.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">Sustainable Choice</h3>
            <p className="text-sm text-[#5f493b] leading-relaxed">
              Sourced from sustainable Ecuadorian farms using eco-friendly preservation methods.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">Artisan Crafted</h3>
            <p className="text-sm text-[#5f493b] leading-relaxed">
              Each arrangement is individually designed and crafted by our skilled artisans.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#F8F5F2] py-12 px-6 md:px-10 border-t border-[#dcd4c3]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-medium mb-4">leia</h3>
              <p className="text-sm text-[#5f493b] leading-relaxed">
                Eternal flowers crafted with intention for the poetic soul.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-3 uppercase text-sm tracking-wide">Information</h4>
              <ul className="space-y-2 text-sm text-[#5f493b]">
                <li><Link href="/story" className="hover:underline">Our Story</Link></li>
                <li><Link href="/impact" className="hover:underline">Impact</Link></li>
                <li><Link href="/care" className="hover:underline">Flower Care</Link></li>
                <li><Link href="/business" className="hover:underline">For Businesses</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3 uppercase text-sm tracking-wide">Help</h4>
              <ul className="space-y-2 text-sm text-[#5f493b]">
                <li><Link href="/shipping" className="hover:underline">Shipping & Returns</Link></li>
                <li><Link href="/faq" className="hover:underline">FAQs</Link></li>
                <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
                <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3 uppercase text-sm tracking-wide cursor-pointer" onClick={() => window.location.href = '/contact'}>Stay Connected</h4>
              <div className="space-y-3">
                <div className="flex gap-4 text-sm">
                  <Link href="#" className="text-[#5f493b] hover:underline">Instagram</Link>
                  <Link href="#" className="text-[#5f493b] hover:underline">Pinterest</Link>
                  <Link href="#" className="text-[#5f493b] hover:underline">TikTok</Link>
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Email for updates"
                    className="w-full px-3 py-2 text-sm border border-[#dcd4c3] bg-white text-[#2f1c11] focus:outline-none focus:border-[#5F493B]"
                  />
                  <button className="w-full mt-2 bg-[#e7e2d5] text-[#2f1c11] py-2 text-xs uppercase tracking-wide hover:bg-[#dcd4c3] transition-colors duration-200">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-[#dcd4c3] mt-8 pt-6 text-center text-sm text-[#5f493b]">
            &copy; {new Date().getFullYear()} Éternelle. Crafted with intention.
          </div>
        </div>
      </footer>
    </div>
  );
} 