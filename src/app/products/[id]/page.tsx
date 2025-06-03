'use client';
import React, { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../../contexts/CartContext';
import { getProductById, getSuggestedProducts, products } from '../../../data/products';
import ProductCard from '../../../components/ProductCard';
import { colors } from '../../../styles/colors';

// Type definitions
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
  availableVases: Vase[];
  category: string;
  tags: string[];
  suggestedProducts: string[];
}

interface Vase {
  id: string;
  name: string;
  image: string;
  price: number;
  productImage?: string;
}

interface ProductDetailProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetail({ params }: ProductDetailProps) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVase, setSelectedVase] = useState<Vase | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  
  const { addItem, formatPrice, getCartItemsCount } = useCart();

  useEffect(() => {
    const foundProduct = getProductById(id);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedVase(foundProduct.availableVases[0] || null);
      setSuggestedProducts(getSuggestedProducts(id).filter((p): p is Product => p !== undefined));
      // Get all products except current one for "Uncover More Creations"
      setAllProducts(products.filter(p => p.id !== id));
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, selectedVase, 1);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const getCurrentProductImage = () => {
    if (!product) return '';
    
    // If a vase is selected and has a product image, use that
    if (selectedVase && selectedVase.productImage) {
      return selectedVase.productImage;
    }
    
    // Otherwise use the selected image from the product gallery
    return product.images[selectedImageIndex];
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F8F5F2] flex items-center justify-center">
        <p className="text-[#5f493b] text-lg">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5F2] text-[#2f1c11]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&display=swap');
        body {
          font-family: 'Playfair Display', serif;
        }
      `}</style>

      {/* Header */}
      <header className="flex justify-between items-center px-6 md:px-10 py-6 text-[#2f1c11] uppercase tracking-wide">
        <Link href="/" className="text-2xl md:text-3xl font-medium">naia</Link>
        <nav className="flex gap-4 md:gap-8 text-sm items-center">
          <Link href="/shop" className="hover:underline">Shop</Link>
          <Link href="/our-story" className="hover:underline">About</Link>
          <Link href="/services" className="hover:underline">Services</Link>
          <a href="/#contact" className="hover:underline">Contact</a>
          <Link href="/cart" className="hover:underline flex items-center gap-1">
            Cart
            {getCartItemsCount() > 0 && (
              <span className="bg-[#5F493B] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center leading-none">
                {getCartItemsCount()}
              </span>
            )}
          </Link>
        </nav>
      </header>

      {/* Breadcrumb */}
      <div className="px-6 md:px-10 mb-6">
        <nav className="text-sm text-[#5f493b]">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:underline">Shop</Link>
          <span className="mx-2">/</span>
          <span>{product.name}</span>
        </nav>
      </div>

      <div className="px-6 md:px-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Image Gallery Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-[4/5] relative overflow-hidden">
              <Image
                src={getCurrentProductImage()}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 relative overflow-hidden border-2 transition-all duration-200 ${
                    selectedImageIndex === index ? 'border-[#5F493B]' : 'border-transparent hover:border-[#dcd4c3]'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information Section */}
          <div className="space-y-6">
            {/* Title and Price */}
            <div>
              <h1 className="text-3xl md:text-4xl font-light mb-2">{product.name}</h1>
              <p className="text-xl font-medium">{formatPrice(product.price)}</p>
            </div>

            {/* Vase Selection */}
            {product.availableVases && product.availableVases.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Select Vase</h3>
                <div className="grid grid-cols-3 gap-3">
                  {product.availableVases.map((vase) => (
                    <button
                      key={vase.id}
                      onClick={() => setSelectedVase(vase)}
                      className={`text-left p-3 border-2 transition-all duration-200 ${
                        selectedVase?.id === vase.id ? 'border-[#5F493B] bg-[#e7e2d5]' : 'border-[#dcd4c3] hover:border-[#5F493B]'
                      }`}
                    >
                      <div className="aspect-square relative mb-2 overflow-hidden">
                        <Image
                          src={vase.image}
                          alt={vase.name}
                          fill
                          sizes="150px"
                          className="object-cover"
                        />
                      </div>
                      <p className="text-sm font-medium">{vase.name}</p>
                      <p className="text-xs text-[#5f493b]">+{formatPrice(vase.price)}</p>
                    </button>
                  ))}
                </div>
                {selectedVase && (
                  <p className="text-sm text-[#5f493b]">
                    Total: {formatPrice(product.price + selectedVase.price)}
                  </p>
                )}
              </div>
            )}

            {/* Collapsible Sections */}
            <div className="space-y-4">
              {/* Product Description */}
              <div className="border-b border-[#dcd4c3]">
                <button
                  onClick={() => toggleSection('description')}
                  className="flex justify-between items-center w-full py-3 text-left"
                >
                  <span className="font-medium">Product Description</span>
                  <span className="text-xl">{expandedSection === 'description' ? '−' : '+'}</span>
                </button>
                {expandedSection === 'description' && (
                  <div className="pb-4 text-[#5f493b] leading-relaxed">
                    {product.description}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="border-b border-[#dcd4c3]">
                <button
                  onClick={() => toggleSection('details')}
                  className="flex justify-between items-center w-full py-3 text-left"
                >
                  <span className="font-medium">Product Details</span>
                  <span className="text-xl">{expandedSection === 'details' ? '−' : '+'}</span>
                </button>
                {expandedSection === 'details' && (
                  <div className="pb-4 text-[#5f493b] leading-relaxed">
                    {product.details}
                  </div>
                )}
              </div>

              {/* Product Care */}
              <div className="border-b border-[#dcd4c3]">
                <button
                  onClick={() => toggleSection('care')}
                  className="flex justify-between items-center w-full py-3 text-left"
                >
                  <span className="font-medium">Product Care</span>
                  <span className="text-xl">{expandedSection === 'care' ? '−' : '+'}</span>
                </button>
                {expandedSection === 'care' && (
                  <div className="pb-4 text-[#5f493b] leading-relaxed">
                    {product.care}
                  </div>
                )}
              </div>
            </div>

            {/* NAIA Experience Card */}
            <div className="bg-[#e7e2d5] text-[#2f1c11] p-6 my-8">
              <h3 className="text-xl font-light mb-3">The NAIA Experience</h3>
              <p className="text-sm leading-relaxed mb-4">
                Every arrangement tells a story of preservation and beauty. From our sustainable Ecuadorian farms 
                to your home, each bloom is carefully selected and preserved to maintain its natural elegance for years. 
                Experience the poetry of eternal flowers that capture moments in time.
              </p>
              <div className="text-xs uppercase tracking-wide text-[#5f493b]">
                Crafted with intention • Preserved with care • Designed for eternity
              </div>
            </div>

            {/* Add to Cart - Desktop */}
            <div className="hidden lg:block">
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#5F493B] text-white py-4 text-sm uppercase tracking-wide hover:bg-[#2f1c11] transition-colors duration-200"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Uncover More Creations - Auto-scrolling carousel */}
        <div className="mt-20">
          <h2 className="text-2xl font-light text-center mb-8 uppercase tracking-wide">
            Uncover More of Our Creations
          </h2>
          <div className="overflow-hidden">
            <div className="flex animate-scroll gap-6">
              {[...allProducts, ...allProducts].map((product, index) => (
                <Link
                  key={`${product.id}-${index}`}
                  href={`/products/${product.id}`}
                  className="flex-shrink-0 w-64 block"
                >
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="256px"
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* You May Also Like */}
        {suggestedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-light text-center mb-8 uppercase tracking-wide">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {suggestedProducts.map((product) => (
                <ProductCard key={product.id} product={product} className="w-full" />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Add to Cart - Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#dcd4c3] p-4 z-50">
        <button
          onClick={handleAddToCart}
          className="w-full bg-[#5F493B] text-white py-4 text-sm uppercase tracking-wide hover:bg-[#2f1c11] transition-colors duration-200"
        >
          Add to Cart {selectedVase && `• ${formatPrice(product.price + selectedVase.price)}`}
        </button>
      </div>

      {/* Auto-scroll animation styles */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
} 