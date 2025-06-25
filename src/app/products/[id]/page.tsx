'use client';
import React, { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../../contexts/CartContext';
import { getProductById, getSuggestedProducts, products } from '../../../data/products';
import ProductCard from '../../../components/ProductCard';
import Navigation from '../../../components/Navigation';

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
  slug?: string;
  stock?: number;
  preorderAvailable?: boolean;
}

interface Vase {
  id: string;
  name: string;
  image: string;
  price: number;
  productImage?: string;
}

interface ProductDetailProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetail({ params }: ProductDetailProps) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVase, setSelectedVase] = useState<Vase | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orderStatus, setOrderStatus] = useState<string | null>(null);
  
  const { addItem, formatPrice } = useCart();
  const isAdmin = false; // Set to false for production so admin controls are hidden

  useEffect(() => {
    const foundProduct = getProductById(id);
    if (foundProduct) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/inventory/${id}`)
        .then(res => res.json())
        .then(inv => {
          setProduct({ ...foundProduct, stock: inv.stock, preorderAvailable: !!inv.preorderAvailable });
          setSelectedVase(foundProduct.availableVases[0] || null);
          setSuggestedProducts(getSuggestedProducts(id).filter((p): p is Product => p !== undefined).map(p => ({ ...p, stock: 0, preorderAvailable: false })));
          setAllProducts(products.filter(p => p.id !== id).map(p => ({ ...p, stock: 0, preorderAvailable: false })));
          setLoading(false);
        })
        .catch(() => {
          setProduct({ ...foundProduct, stock: 0, preorderAvailable: false });
          setSelectedVase(foundProduct.availableVases[0] || null);
          setSuggestedProducts(getSuggestedProducts(id).filter((p): p is Product => p !== undefined).map(p => ({ ...p, stock: 0, preorderAvailable: false })));
          setAllProducts(products.filter(p => p.id !== id).map(p => ({ ...p, stock: 0, preorderAvailable: false })));
          setLoading(false);
        });
    } else {
      setError('Product not found.');
      setLoading(false);
    }
  }, [id]);

  const handleOrder = () => {
    if (!product) return;
    setOrderStatus('pending');
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: product.id, quantity: 1 })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          if (data.type === 'purchase') {
            addItem(product, selectedVase, 1);
            setOrderStatus('added');
          } else if (data.type === 'preorder') {
            setOrderStatus('preordered');
          }
        } else {
          setOrderStatus('error');
        }
      })
      .catch(() => setOrderStatus('error'));
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const getCurrentProductImage = () => {
    if (!product) return '/assets/placeholder.jpg';
    // If a vase is selected and has a product image, use that
    if (selectedVase && selectedVase.productImage) {
      return selectedVase.productImage || '/assets/placeholder.jpg';
    }
    // Otherwise use the selected image from the product gallery
    return product.images && product.images[selectedImageIndex]
      ? product.images[selectedImageIndex]
      : '/assets/placeholder.jpg';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F5F2] flex items-center justify-center">
        <p className="text-[#5f493b] text-lg">Loading product...</p>
      </div>
    );
  }
  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#F8F5F2] flex items-center justify-center">
        <p className="text-[#b00020] text-lg">{error || 'Product not found.'}</p>
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

      <Navigation currentPage="shop" />

      {/* Breadcrumb */}
      <div className="px-6 md:px-10 mb-6 mt-28 md:mt-32">
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
                    src={image || '/assets/placeholder.jpg'}
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
                          src={vase.image || '/assets/placeholder.jpg'}
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

            {/* LEIA Experience Card */}
            <div className="bg-[#e7e2d5] text-[#2f1c11] p-6 my-8">
              <h3 className="text-xl font-light mb-3">The LEIA Experience</h3>
              <p className="text-sm leading-relaxed mb-4">
                Every arrangement tells a story of preservation and beauty. From our sustainable Ecuadorian farms 
                to your home, each bloom is carefully selected and preserved to maintain its natural elegance for years. 
                Experience the poetry of eternal flowers that capture moments in time.
              </p>
              <div className="text-xs uppercase tracking-wide text-[#5f493b]">
                Crafted with intention • Preserved with care • Designed for eternity
              </div>
            </div>

            {/* Add to Cart / Preorder Button */}
            <div className="mt-6">
              {orderStatus === 'added' && (
                <div className="text-green-700 mb-2">Added to cart!</div>
              )}
              {orderStatus === 'preordered' && (
                <div className="text-blue-700 mb-2">Pre-order placed!</div>
              )}
              {orderStatus === 'error' && (
                <div className="text-red-700 mb-2">Could not place order. Please try again.</div>
              )}
              <button
                onClick={handleOrder}
                className={`w-full py-3 text-white text-lg font-medium rounded transition-colors duration-200 ${
                  (product.stock ?? 0) === 0 && (product.preorderAvailable ?? false)
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : (product.stock ?? 0) > 0
                    ? 'bg-[#5F493B] hover:bg-[#2f1c11]'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
                disabled={(product.stock ?? 0) === 0 && !(product.preorderAvailable ?? false)}
              >
                {(product.stock ?? 0) === 0 && (product.preorderAvailable ?? false)
                  ? 'Pre-order'
                  : (product.stock ?? 0) > 0
                  ? 'Add to Cart'
                  : 'Out of Stock'}
              </button>
            </div>

            {/* Admin Controls: Update Stock & Preorder */}
            {isAdmin && (
              <div className="mt-10 p-4 border border-dashed border-[#5f493b] bg-[#f9f6f2] rounded">
                <h3 className="text-lg font-medium mb-2">Admin: Update Inventory</h3>
                <div className="flex items-center gap-4 mb-2">
                  <label className="text-sm">Stock:</label>
                  <input
                    type="number"
                    min={0}
                    value={product.stock}
                    onChange={e => {
                      const newStock = parseInt(e.target.value, 10);
                      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/inventory/${product.id}/stock`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ stock: newStock })
                      })
                        .then(res => res.json())
                        .then(data => {
                          if (data.success) setProduct(prev => prev ? { ...prev, stock: newStock } : prev);
                        });
                    }}
                    className="border px-2 py-1 w-20"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="text-sm">Preorder Available:</label>
                  <input
                    type="checkbox"
                    checked={product.preorderAvailable}
                    onChange={e => {
                      const preorderAvailable = e.target.checked;
                      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/inventory/${product.id}/preorder`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ preorderAvailable })
                      })
                        .then(res => res.json())
                        .then(data => {
                          if (data.success) setProduct(prev => prev ? { ...prev, preorderAvailable } : prev);
                        });
                    }}
                    className="w-5 h-5"
                  />
                </div>
              </div>
            )}
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
                  href={`/products/${product.id || product.slug}`}
                  className="flex-shrink-0 w-64 block"
                >
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <Image
                      src={product.images[0] || '/assets/placeholder.jpg'}
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