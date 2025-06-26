'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../contexts/CartContext';
import Navigation from '../../components/Navigation';
import { loadStripe } from '@stripe/stripe-js';
import { useSearchParams } from 'next/navigation';

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
    removeItem,
    clearCart
  } = useCart();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const searchParams = useSearchParams();
  const success = searchParams.get('success') === 'true';

  React.useEffect(() => {
    if (success) {
      clearCart();
    }
  }, [success, clearCart]);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    console.log('BACKEND_URL:', process.env.NEXT_PUBLIC_BACKEND_URL);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create checkout session');
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      if (!stripe) throw new Error('Stripe.js failed to load');
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Checkout failed');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#F8F5F2] flex flex-col items-center justify-center">
        <Navigation currentPage="checkout" />
        <div className="max-w-md mx-auto bg-white border border-[#dcd4c3] rounded-lg p-8 mt-20 text-center shadow">
          <h1 className="text-2xl md:text-3xl font-extralight text-[#2f1c11] mb-4">Thank you for your purchase!</h1>
          <p className="text-[#5f493b] mb-6">Your order has been received and is being processed. You will receive a confirmation email shortly.</p>
          <Link href="/shop" className="inline-block bg-[#5F493B] text-white px-6 py-3 rounded hover:bg-[#2f1c11] transition-colors duration-200">Continue Shopping</Link>
        </div>
      </div>
    );
  }

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
                    <div className="flex flex-col items-center gap-3 mb-2">
                      <Image
                        src="https://stripe.com/img/v3/home/twitter.png"
                        alt="Stripe"
                        height={32}
                        width={100}
                        className="h-8 w-auto mb-1 grayscale"
                      />
                      <p className="text-[#2f1c11] text-base font-medium">Pay securely with Stripe</p>
                      <p className="text-[#5f493b] text-xs">All major cards accepted. You&apos;ll be redirected to Stripe&apos;s secure checkout to complete your purchase.</p>
                    </div>
                    <button
                      className="w-full bg-[#635bff] text-white py-3 md:py-4 text-base font-semibold rounded shadow-sm uppercase tracking-wide hover:bg-[#2f1c11] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      disabled={cartItems.length === 0 || loading}
                      onClick={handleCheckout}
                    >
                      <svg height="20" viewBox="0 0 40 40" width="20" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><rect fill="#635bff" height="40" rx="8" width="40"/><path d="M28.5 15.5c-.3-2.1-2.1-3.5-4.7-3.5h-7.6c-.2 0-.4.2-.4.4v15.2c0 .2.2.4.4.4h2.7c.2 0 .4-.2.4-.4v-4.7h3.2c2.9 0 4.7-1.5 4.7-4 0-1.7-1-2.9-2.7-3.2zm-4.3 4.2h-3.2v-4.1h3.2c1.5 0 2.3.7 2.3 2 0 1.3-.8 2.1-2.3 2.1z" fill="#fff"/></g></svg>
                      {loading ? 'Redirecting to Stripe...' : 'Pay with Stripe'}
                    </button>
                    {error && <div className="text-red-600 text-sm mt-2 text-center">{error}</div>}
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