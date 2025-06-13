'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../contexts/CartContext';
import Navigation from '../../components/Navigation';

interface CartItem {
  cartId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  selectedVase?: {
    name: string;
    price: number;
  };
}

export default function Checkout() {
  const { 
    cartItems, 
    getCartSubtotal, 
    getCartVasesTotal,
    formatPrice,
    removeItem 
  } = useCart();

  return (
    <div className="min-h-screen bg-[#F8F5F2]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&display=swap');
        body {
          font-family: 'Playfair Display', serif;
        }
      `}</style>

      <Navigation currentPage="checkout" />

      <main className="w-full max-w-[100vw] overflow-x-hidden">
        <div className="pt-20 md:pt-24 px-4 sm:px-6 md:px-8 lg:px-10 pb-12 md:pb-16">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-extralight text-[#2f1c11] mb-6 md:mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-16">
              {/* Order Summary */}
              <div>
                <h2 className="text-2xl md:text-3xl font-extralight text-[#2f1c11] mb-4 md:mb-6">Order Summary</h2>
                
                <div className="bg-white border border-[#dcd4c3] rounded-lg p-4 sm:p-5 md:p-6">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-6 md:py-8">
                      <p className="text-[#5f493b] mb-3 md:mb-4">Your cart is empty</p>
                      <Link 
                        href="/shop" 
                        className="text-[#5F493B] hover:text-[#2f1c11] underline"
                      >
                        Continue Shopping
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4 md:space-y-6">
                        {cartItems.map((item: CartItem) => (
                          <div key={item.cartId} className="flex gap-3 md:gap-4 pb-4 md:pb-6 border-b border-[#dcd4c3] last:border-0 last:pb-0">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 relative flex-shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
                                className="object-cover rounded"
                              />
                            </div>
                            <div className="flex-grow min-w-0">
                              <div className="flex justify-between items-start">
                                <div className="min-w-0 pr-2">
                                  <h3 className="text-[#2f1c11] font-medium truncate">{item.name}</h3>
                                  <p className="text-sm text-[#5f493b]">Qty: {item.quantity}</p>
                                  {item.selectedVase && (
                                    <p className="text-sm text-[#5f493b] truncate">+ {item.selectedVase.name}</p>
                                  )}
                                </div>
                                <button
                                  onClick={() => removeItem(item.cartId)}
                                  className="text-[#5f493b] hover:text-[#2f1c11] text-sm flex-shrink-0 ml-2"
                                >
                                  Remove
                                </button>
                              </div>
                              <p className="text-[#2f1c11] font-medium mt-1 md:mt-2">
                                {formatPrice((item.price + (item.selectedVase?.price || 0)) * item.quantity)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-[#dcd4c3]">
                        <div className="space-y-2 md:space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-[#5f493b]">Subtotal</span>
                            <span className="text-[#2f1c11] font-medium">{formatPrice(getCartSubtotal())}</span>
                          </div>
                          {getCartVasesTotal() > 0 && (
                            <div className="flex justify-between text-sm">
                              <span className="text-[#5f493b]">Vases</span>
                              <span className="text-[#2f1c11] font-medium">{formatPrice(getCartVasesTotal())}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-sm">
                            <span className="text-[#5f493b]">Shipping</span>
                            <span className="text-[#2f1c11]">Calculated at checkout</span>
                          </div>
                          <div className="flex justify-between text-base font-medium pt-2 md:pt-3 border-t border-[#dcd4c3]">
                            <span className="text-[#2f1c11]">Total</span>
                            <span className="text-[#2f1c11]">{formatPrice(getCartSubtotal() + getCartVasesTotal())}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Payment Details */}
              <div>
                <h2 className="text-2xl md:text-3xl font-extralight text-[#2f1c11] mb-4 md:mb-6">Payment Details</h2>
                
                <div className="bg-white border border-[#dcd4c3] rounded-lg p-4 sm:p-5 md:p-6">
                  <div className="space-y-4 md:space-y-6">
                    {/* Placeholder for payment form */}
                    <div className="p-4 sm:p-6 md:p-8 border-2 border-dashed border-[#dcd4c3] rounded-lg text-center">
                      <p className="text-[#5f493b]">Payment form will be implemented here</p>
                    </div>

                    <button
                      className="w-full bg-[#5F493B] text-white py-3 md:py-4 text-sm uppercase tracking-wide hover:bg-[#2f1c11] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={cartItems.length === 0}
                    >
                      Complete Purchase
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 