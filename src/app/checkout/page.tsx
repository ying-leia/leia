'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../contexts/CartContext';

interface CustomerInfo {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

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

export default function Checkout() {
  const { cartItems, getCartTotal, formatPrice } = useCart();
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement payment processing with Stripe
    alert('Order submitted! Payment integration coming soon.');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F5F2] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-light mb-4">Your cart is empty</h1>
          <Link href="/shop" className="text-[#5F493B] underline">Return to shop</Link>
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

      {/* Header */}
      <header className="flex justify-between items-center px-6 md:px-10 py-6 text-[#2f1c11] uppercase tracking-wide border-b border-[#dcd4c3]">
        <Link href="/" className="text-2xl md:text-3xl font-medium">leia</Link>
        <nav className="flex gap-4 md:gap-8 text-sm">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/shop" className="hover:underline">Shop</Link>
          <Link href="/cart" className="hover:underline">Cart</Link>
        </nav>
      </header>

      <div className="px-6 md:px-10 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-light mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Customer Information Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-xl font-medium mb-4">Contact Information</h2>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-[#dcd4c3] bg-white text-[#2f1c11] focus:outline-none focus:border-[#5F493B]"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-medium mb-4">Shipping Address</h2>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={customerInfo.firstName}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 border border-[#dcd4c3] bg-white text-[#2f1c11] focus:outline-none focus:border-[#5F493B]"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={customerInfo.lastName}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 border border-[#dcd4c3] bg-white text-[#2f1c11] focus:outline-none focus:border-[#5F493B]"
                    />
                  </div>
                  
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-[#dcd4c3] bg-white text-[#2f1c11] focus:outline-none focus:border-[#5F493B] mb-4"
                  />
                  
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={customerInfo.city}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 border border-[#dcd4c3] bg-white text-[#2f1c11] focus:outline-none focus:border-[#5F493B]"
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={customerInfo.state}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 border border-[#dcd4c3] bg-white text-[#2f1c11] focus:outline-none focus:border-[#5F493B]"
                    />
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="ZIP code"
                      value={customerInfo.zipCode}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 border border-[#dcd4c3] bg-white text-[#2f1c11] focus:outline-none focus:border-[#5F493B]"
                    />
                  </div>
                  
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#dcd4c3] bg-white text-[#2f1c11] focus:outline-none focus:border-[#5F493B]"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-medium mb-4">Payment</h2>
                  <div className="bg-[#e7e2d5] p-6 text-center">
                    <p className="text-[#5f493b] mb-2">🔒 Secure payment processing</p>
                    <p className="text-sm">Payment integration with Stripe coming soon</p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#5F493B] text-white py-4 text-sm uppercase tracking-wide hover:bg-[#2f1c11] transition-colors duration-200"
                >
                  Complete Order
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <div className="border border-[#dcd4c3] p-6 bg-white sticky top-6">
                <h2 className="text-xl font-medium mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {cartItems.map((item: CartItem) => (
                    <div key={item.cartId} className="flex gap-3">
                      <div className="w-16 h-16 relative flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        {item.selectedVase && (
                          <p className="text-xs text-[#5f493b]">
                            Vase: {item.selectedVase.name}
                          </p>
                        )}
                        <p className="text-xs">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">
                          {formatPrice((item.price + (item.selectedVase?.price || 0)) * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#dcd4c3] pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(getCartTotal())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg border-t border-[#dcd4c3] pt-2">
                    <span>Total</span>
                    <span>{formatPrice(getCartTotal())}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 