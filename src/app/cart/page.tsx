'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../contexts/CartContext';
import Navigation from '../../components/Navigation';

interface CartItem {
  cartId: string;
  id: string;
  name: string;
  price: number;
  image: string;
  selectedVase?: {
    id: string;
    name: string;
    price: number;
    image: string;
  } | null;
  quantity: number;
}

export default function Cart() {
  const { 
    cartItems, 
    removeItem, 
    updateQuantity, 
    getCartTotal, 
    getCartSubtotal, 
    getCartVasesTotal,
    formatPrice,
    getCartItemsCount
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F5F2] text-[#2f1c11]">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&display=swap');
          body {
            font-family: 'Playfair Display', serif;
          }
        `}</style>

        <Navigation />

        {/* Empty Cart */}
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 pt-20 md:pt-12">
          <h1 className="text-3xl md:text-4xl font-light mb-4">Your Cart is Empty</h1>
          <p className="text-[#5f493b] mb-8 text-center max-w-md">
            Discover our beautiful collection of eternal flower arrangements and start creating your perfect space.
          </p>
          <Link 
            href="/shop"
            className="bg-[#e7e2d5] text-[#2f1c11] px-8 py-3 text-sm uppercase tracking-wide hover:bg-[#dcd4c3] transition-colors duration-200"
          >
            Shop Collection
          </Link>
        </div>
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

      <Navigation />

      <div className="px-6 md:px-10 py-12 pt-20 md:pt-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-light mb-8 flex items-center gap-3">
            Shopping Cart
            {getCartItemsCount() > 0 && (
              <span className="bg-[#5F493B] text-white text-sm font-medium rounded-full w-6 h-6 flex items-center justify-center leading-none text-center">
                {getCartItemsCount()}
              </span>
            )}
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item: CartItem) => (
                <div key={item.cartId} className="border border-[#dcd4c3] p-6 bg-white">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 relative flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium text-lg">{item.name}</h3>
                          <p className="text-sm text-[#5f493b]">{formatPrice(item.price)}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.cartId)}
                          className="text-[#5f493b] hover:text-[#2f1c11] text-sm"
                        >
                          Remove
                        </button>
                      </div>

                      {/* Vase Selection */}
                      {item.selectedVase && (
                        <div className="mb-3">
                          <p className="text-sm text-[#5f493b]">
                            Vase: {item.selectedVase.name} (+{formatPrice(item.selectedVase.price)})
                          </p>
                        </div>
                      )}

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-[#dcd4c3]">
                          <button
                            onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                            className="px-3 py-1 hover:bg-[#e7e2d5] transition-colors duration-200"
                          >
                            −
                          </button>
                          <span className="px-4 py-1 border-x border-[#dcd4c3]">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                            className="px-3 py-1 hover:bg-[#e7e2d5] transition-colors duration-200"
                          >
                            +
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-medium">
                            {formatPrice((item.price + (item.selectedVase?.price || 0)) * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border border-[#dcd4c3] p-6 bg-white sticky top-6">
                <h2 className="text-xl font-medium mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({cartItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)} items)</span>
                    <span>{formatPrice(getCartSubtotal())}</span>
                  </div>
                  
                  {getCartVasesTotal() > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Vases</span>
                      <span>{formatPrice(getCartVasesTotal())}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  
                  <div className="border-t border-[#dcd4c3] pt-3">
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>{formatPrice(getCartTotal())}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button - FIXED */}
                <Link
                  href="/checkout"
                  className="w-full bg-[#5F493B] text-white py-4 text-center text-sm uppercase tracking-wide hover:bg-[#2f1c11] transition-colors duration-200 block"
                >
                  Proceed to Checkout
                </Link>

                {/* Continue Shopping */}
                <Link
                  href="/shop"
                  className="w-full bg-[#e7e2d5] text-[#2f1c11] py-3 text-center text-sm uppercase tracking-wide hover:bg-[#dcd4c3] transition-colors duration-200 block mt-3"
                >
                  Continue Shopping
                </Link>

                {/* Security Note */}
                <div className="mt-6 text-xs text-[#5f493b] text-center">
                  <p>🔒 Secure checkout with 256-bit SSL encryption</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <h3 className="text-lg font-medium mb-6">Why Shop With LEIA</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-medium mb-2">Free Shipping</h4>
                <p className="text-sm text-[#5f493b]">On orders over $150</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">30-Day Returns</h4>
                <p className="text-sm text-[#5f493b]">Easy returns and exchanges</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Expert Care</h4>
                <p className="text-sm text-[#5f493b]">Handcrafted with attention to detail</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 