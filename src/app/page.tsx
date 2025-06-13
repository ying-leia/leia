"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getFeaturedProducts, getOccasions } from "../data/products";
import ProductCard from "../components/ProductCard";
import { useCart } from "../contexts/CartContext";

export default function Home() {
  const { getCartItemsCount } = useCart();
  const featuredProducts = getFeaturedProducts();
  const occasions = getOccasions();
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle manual scrolling detection
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setIsScrolling(true);
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Resume animation after scroll stops
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Create enough items for seamless wrapping (4 sets for smooth infinite scroll)
  const occasionItems = [...occasions, ...occasions, ...occasions, ...occasions];

  return (
    <main className="min-h-screen bg-[#F8F5F2] text-[#2f1c11] font-[serif] font-light">
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&display=swap");
        body {
          font-family: "Playfair Display", serif;
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        
        /* Hide scrollbar for webkit browsers */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for Firefox */
        .scrollbar-hide {
          scrollbar-width: none;
        }
        
        /* Pause animation when container is being scrolled */
        .scroll-container:hover .animate-scroll {
          animation-play-state: paused;
        }
      `}</style>

      {/* Top Nav */}
      <header className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-10 py-6 text-[#2f1c11] uppercase tracking-wide">
        <h1 className="text-3xl font-medium">leia</h1>
        <nav className="flex gap-8 text-sm items-center">
          <Link href="/shop" className="hover:underline">Shop</Link>
          <Link href="/our-story" className="hover:underline">About</Link>
          <Link href="/services" className="hover:underline">Services</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
          <Link href="/cart" className="hover:underline flex items-center gap-1">
            Cart
            {getCartItemsCount() > 0 && (
              <span className="bg-[#5F493B] text-white text-sm font-medium rounded-full w-5 h-5 flex items-center justify-center leading-none text-center">
                {getCartItemsCount()}
              </span>
            )}
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-[100vh] flex items-center justify-center">
        <Image
          src="/assets-old/hero.jpg"
          alt="Floral Arrangement Hero"
          fill
          priority
          className="object-cover z-0"
        />
      </section>

      {/* Featured Products Section */}
      <section className="py-24 px-6 md:px-10 text-center">
        <h2 className="text-3xl tracking-wide uppercase mb-4">Featured Collection</h2>
        <p className="text-[#5f493b] mb-12 max-w-2xl mx-auto leading-relaxed">
          Discover our most beloved eternal flower arrangements, each crafted to bring lasting beauty to your space.
        </p>
        
        {/* Responsive grid that fills the screen properly */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              className="w-full"
            />
          ))}
        </div>

        <div className="mt-12">
          <Link 
            href="/shop"
            className="inline-block bg-[#e7e2d5] text-[#2f1c11] px-8 py-3 text-sm uppercase tracking-wide hover:bg-[#dcd4c3] transition-colors duration-200"
          >
            Shop All Creations
          </Link>
        </div>
      </section>

      {/* Occasions Carousel Section */}
      <section id="occasions" className="py-24 px-0 text-center">
        <h2 className="text-3xl tracking-wide uppercase mb-8">Perfect for Every Occasion</h2>
        <p className="text-[#5f493b] mb-12 max-w-2xl mx-auto leading-relaxed px-6">
          From life's grandest celebrations to its quietest moments, our eternal arrangements 
          mark occasions with lasting beauty and meaning.
        </p>
        
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto overflow-y-hidden scrollbar-hide scroll-container" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className={`flex gap-8 ${!isScrolling ? 'animate-scroll' : ''}`} style={{ width: 'max-content' }}>
            {occasionItems.map((occasion, index) => (
              <Link
                key={`${occasion.id}-${index}`}
                href={`/products/${occasion.productId}`}
                className="flex-shrink-0 w-80 block group"
              >
                <div className="relative aspect-[4/5] overflow-hidden mb-4">
                  <Image
                    src={occasion.image}
                    alt={occasion.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="text-center px-4">
                  <h3 className="text-xl font-light text-[#2f1c11] mb-2 group-hover:text-[#5F493B] transition-colors duration-200">
                    {occasion.name}
                  </h3>
                  <p className="text-sm text-[#5f493b] leading-relaxed">
                    {occasion.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Scroll Hint */}
        <div className="mt-6 text-xs text-[#5f493b] opacity-60">
          ← Scroll to explore more occasions →
        </div>
      </section>

      {/* Footer Visual Section: 2/3 Image + 1/3 Text */}
      <section id="about" className="py-20 px-0 grid grid-cols-1 md:grid-cols-3 items-center">
        <div className="md:col-span-2 h-full w-full relative">
          <Image
            src="/assets/products/liora/sunset-side.jpg"
            alt="Eternal Image Feature"
            fill
            sizes="(max-width: 768px) 100vw, 66vw"
            className="object-cover"
          />
        </div>
        <div className="bg-[#F8F5F2] px-8 py-16 text-left">
          <h5 className="uppercase text-sm text-[#5f493b] mb-4 tracking-wide">For the poetic</h5>
          <p className="text-base leading-relaxed mb-6">
            We design with feeling. Flowers are fleeting by nature — but when preserved with
            intention, they evoke nostalgia, softness, and meaning across time. Each arrangement
            we craft is a love letter to nature's details, grounded in balance and emotion.
          </p>
          <Link 
            href="/our-story"
            className="inline-block text-sm uppercase tracking-wide text-[#5f493b] border-b border-[#5f493b] hover:text-[#2f1c11] hover:border-[#2f1c11] transition-colors duration-200"
          >
            Discover Our Story
          </Link>
        </div>
      </section>

      {/* Chic Socials Section */}
      <section id="contact" className="py-20 px-6 md:px-20 text-center">
        <h3 className="text-2xl font-light uppercase mb-4 cursor-pointer" onClick={() => window.location.href = '/contact'}>Stay Connected</h3>
        <p className="text-[#5f493b] mb-10">Follow us for floral stories, behind-the-scenes moments, and exclusive previews.</p>
        <div className="flex justify-center gap-8 text-sm uppercase tracking-wide">
          <Link href="#" className="hover:underline">Instagram</Link>
          <Link href="#" className="hover:underline">Pinterest</Link>
          <Link href="#" className="hover:underline">TikTok</Link>
          <Link href="#" className="hover:underline">Newsletter</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2f1c11] text-white py-10 px-6 md:px-20 text-sm">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <p>&copy; {new Date().getFullYear()} LEIA. Crafted with intention.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:underline">Privacy</Link>
            <Link href="#" className="hover:underline">Terms</Link>
            <Link href="#" className="hover:underline">Instagram</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
