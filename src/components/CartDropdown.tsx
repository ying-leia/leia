'use client';
import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../contexts/CartContext';

interface CartDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

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

export default function CartDropdown({ isOpen, onClose }: CartDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { 
    cartItems, 
    getCartSubtotal, 
    getCartVasesTotal,
    formatPrice,
    removeItem
  } = useCart();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={dropdownRef}
      className="fixed right-0 top-16 w-[calc(100%-2rem)] mx-4 bg-white rounded-lg shadow-lg border border-[#dcd4c3] z-50 md:hidden"
    >
      <div className="p-4">
        <h3 className="text-lg font-medium text-[#2f1c11] mb-4">Shopping Cart</h3>
        
        {cartItems.length === 0 ? (
          <p className="text-[#5f493b] text-sm py-4">Your cart is empty</p>
        ) : (
          <>
            <div className="max-h-[calc(100vh-16rem)] overflow-y-auto">
              {cartItems.map((item: CartItem) => (
                <div key={item.cartId} className="flex gap-3 py-3 border-b border-[#dcd4c3] last:border-0">
                  <div className="w-16 h-16 relative flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-medium text-[#2f1c11]">{item.name}</h4>
                        <p className="text-xs text-[#5f493b]">Qty: {item.quantity}</p>
                        {item.selectedVase && (
                          <p className="text-xs text-[#5f493b]">+ {item.selectedVase.name}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.cartId)}
                        className="text-[#5f493b] hover:text-[#2f1c11] text-xs"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="text-sm text-[#2f1c11] mt-1">
                      {formatPrice((item.price + (item.selectedVase?.price || 0)) * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-[#dcd4c3]">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#5f493b]">Subtotal</span>
                <span className="text-[#2f1c11] font-medium">{formatPrice(getCartSubtotal())}</span>
              </div>
              {getCartVasesTotal() > 0 && (
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#5f493b]">Vases</span>
                  <span className="text-[#2f1c11] font-medium">{formatPrice(getCartVasesTotal())}</span>
                </div>
              )}
              <div className="flex justify-between text-sm mb-4">
                <span className="text-[#5f493b]">Shipping</span>
                <span className="text-[#2f1c11]">Calculated at checkout</span>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-[#5F493B] text-white py-3 text-center text-sm uppercase tracking-wide hover:bg-[#2f1c11] transition-colors duration-200"
                onClick={onClose}
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 