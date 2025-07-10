'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductGrid from '../../components/ProductGrid';
import Navigation from '../../components/Navigation';
import { products as localProducts } from '../../data/products';

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
  slug?: string;
  stock: number;
  preorderAvailable: boolean;
}

export default function Shop() {
  const [filter, setFilter] = useState('all');
  const [products, setProducts] = useState(localProducts.map(p => ({ ...p, stock: 0, preorderAvailable: false })));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/shopify/products`)
      .then(res => res.json())
      .then((shopifyProducts: any[]) => {
        // Map Shopify product data to local Product interface
        const mappedProducts = shopifyProducts.map((p: any) => ({
          id: p.id.toString(),
          name: p.title,
          price: p.variants && p.variants[0] ? parseFloat(p.variants[0].price) : 0,
          featured: false, // Shopify doesn't have this by default
          images: p.images && p.images.length > 0 ? p.images.map((img: any) => img.src) : ['/assets/placeholder.jpg'],
          description: p.body_html || '',
          details: '', // Not available from Shopify by default
          care: '', // Not available from Shopify by default
          footnote: '', // Not available from Shopify by default
          availableVases: [], // Not available from Shopify by default
          category: p.product_type || 'all',
          tags: p.tags ? p.tags.split(',').map((t: string) => t.trim()) : [],
          suggestedProducts: [], // Not available from Shopify by default
          stock: p.variants && p.variants[0] ? p.variants[0].inventory_quantity || 0 : 0,
          preorderAvailable: false, // Not available from Shopify by default
        }));
        setProducts(mappedProducts);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch products');
        setLoading(false);
      });
  }, []);

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
      <section className="text-center pt-24 pb-8 px-6 md:px-10">
        <h1 className="text-2xl md:text-3xl font-extralight mb-4">The Collection</h1>
        <p className="text-base text-[#5f493b]">Eternal arrangements for every mood and moment.</p>
      </section>

      {/* Category Filter */}
      <section className="px-6 md:px-10 mb-6">
        <div className="flex flex-nowrap overflow-x-auto gap-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-4 py-1.5 text-sm uppercase tracking-wide transition-all duration-200 whitespace-nowrap ${
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
        {loading ? (
          <div className="text-center py-12 text-[#5f493b] text-lg">Loading products...</div>
        ) : error ? (
          <div className="text-center py-12 text-[#b00020] text-lg">{error}</div>
        ) : (
          <ProductGrid 
            products={filteredProducts}
            columns="grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            spacing="gap-6 md:gap-8"
          />
        )}
      </section>

      {/* Featured Info Section */}
      <section className="bg-[#e7e2d5] text-[#2f1c11] py-16 px-6 md:px-10 text-center">
        <h2 className="text-2xl md:text-3xl font-extralight mb-6">Why Choose Eternal Flowers?</h2>
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
        <div className="max-w-6xl mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-medium mb-3 uppercase text-sm tracking-wide cursor-pointer" onClick={() => window.location.href = '/contact'}>Stay Connected</h4>
              <div className="space-y-2 text-sm text-[#5f493b]">
                <div><Link href="#" className="hover:underline">Instagram</Link></div>
                <div><Link href="#" className="hover:underline">Pinterest</Link></div>
                <div><Link href="#" className="hover:underline">Newsletter</Link></div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3 uppercase text-sm tracking-wide">Support</h4>
              <div className="space-y-2 text-sm text-[#5f493b]">
                <div><Link href="/care" className="hover:underline">Flower Care</Link></div>
                <div><Link href="/contact" className="hover:underline">Contact Us</Link></div>
                <div><Link href="/faq" className="hover:underline">FAQ</Link></div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3 uppercase text-sm tracking-wide">Company</h4>
              <div className="space-y-2 text-sm text-[#5f493b]">
                <div><Link href="/our-story" className="hover:underline">Our Story</Link></div>
                <div><Link href="/sustainability" className="hover:underline">Sustainability</Link></div>
                <div><Link href="/privacy" className="hover:underline">Privacy</Link></div>
              </div>
            </div>
          </div>
          <div className="border-t border-[#dcd4c3] pt-6 text-sm text-[#5f493b]">
            &copy; {new Date().getFullYear()} LEIA. Crafted with intention.
          </div>
        </div>
      </footer>
    </div>
  );
} 