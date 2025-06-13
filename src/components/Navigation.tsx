"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../contexts/CartContext';
import { usePathname } from 'next/navigation';
import CartDropdown from './CartDropdown';

interface NavigationProps {
  currentPage?: string;
}

export default function Navigation({ currentPage }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getCartItemsCount } = useCart();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const cartItemsCount = getCartItemsCount();

  return (
    <>
      {/* Mobile Header */}
      <header className={`fixed top-0 left-0 w-full z-50 md:hidden ${isHomePage ? 'bg-transparent' : 'bg-white'}`}>
        <div className="flex items-center justify-between px-6 py-4">
          {/* Hamburger Menu */}
          <button
            onClick={toggleMenu}
            className={`p-2 ${isHomePage ? 'text-white drop-shadow-sm' : 'text-[#2f1c11]'}`}
            aria-label="Toggle menu"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Logo */}
          <Link 
            href="/" 
            className={`text-3xl font-medium tracking-wide ${isHomePage ? 'text-white drop-shadow-sm' : 'text-[#2f1c11]'}`}
          >
            leia
          </Link>

          {/* Cart Icon */}
          <div className="relative">
            <button 
              onClick={toggleCart}
              className={`p-2 relative ${isHomePage ? 'text-white drop-shadow-sm' : 'text-[#2f1c11]'}`}
            >
              {cartItemsCount > 0 ? (
                <div className="w-7 h-7 border border-current rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium leading-[1]">
                    {cartItemsCount}
                  </span>
                </div>
              ) : (
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              )}
            </button>
            <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          </div>
        </div>
      </header>

      {/* Side Drawer */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      />

      <div
        className={`fixed top-0 left-0 bottom-0 w-64 bg-[#F8F5F2] z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-[#dcd4c3]">
            <Link href="/" className="text-3xl font-medium tracking-wide text-[#2f1c11]">
              leia
            </Link>
          </div>
          
          <nav className="flex-1 px-6 py-8">
            <ul className="space-y-6 text-[#2f1c11] uppercase tracking-wide">
              <li>
                <Link
                  href="/shop"
                  className={`block hover:text-[#5F493B] transition-colors ${
                    currentPage === 'shop' ? 'font-medium' : ''
                  }`}
                  onClick={toggleMenu}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/our-story"
                  className={`block hover:text-[#5F493B] transition-colors ${
                    currentPage === 'about' ? 'font-medium' : ''
                  }`}
                  onClick={toggleMenu}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className={`block hover:text-[#5F493B] transition-colors ${
                    currentPage === 'services' ? 'font-medium' : ''
                  }`}
                  onClick={toggleMenu}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`block hover:text-[#5F493B] transition-colors ${
                    currentPage === 'contact' ? 'font-medium' : ''
                  }`}
                  onClick={toggleMenu}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="p-6 border-t border-[#dcd4c3]">
            <div className="flex gap-4 text-sm text-[#5f493b]">
              <Link href="#" className="hover:underline">Instagram</Link>
              <Link href="#" className="hover:underline">Pinterest</Link>
              <Link href="#" className="hover:underline">TikTok</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <header className={`hidden md:block ${isHomePage ? 'absolute' : 'relative'} top-0 left-0 w-full z-50`}>
        <div className={`flex justify-between items-center px-10 py-6 uppercase tracking-wide ${isHomePage ? 'bg-transparent' : 'bg-white border-b border-[#dcd4c3]'}`}>
          <Link 
            href="/" 
            className={`text-3xl font-medium tracking-wide ${isHomePage ? 'text-white drop-shadow-sm' : 'text-[#2f1c11]'}`}
          >
            leia
          </Link>
          <nav className="flex gap-8 text-sm items-center">
            <Link 
              href="/shop" 
              className={`hover:underline ${currentPage === 'shop' ? 'font-medium' : ''} ${isHomePage ? 'text-white drop-shadow-sm' : 'text-[#2f1c11]'}`}
            >
              Shop
            </Link>
            <Link 
              href="/our-story" 
              className={`hover:underline ${currentPage === 'about' ? 'font-medium' : ''} ${isHomePage ? 'text-white drop-shadow-sm' : 'text-[#2f1c11]'}`}
            >
              About
            </Link>
            <Link 
              href="/services" 
              className={`hover:underline ${currentPage === 'services' ? 'font-medium' : ''} ${isHomePage ? 'text-white drop-shadow-sm' : 'text-[#2f1c11]'}`}
            >
              Services
            </Link>
            <Link 
              href="/contact" 
              className={`hover:underline ${currentPage === 'contact' ? 'font-medium' : ''} ${isHomePage ? 'text-white drop-shadow-sm' : 'text-[#2f1c11]'}`}
            >
              Contact
            </Link>
            <Link 
              href="/cart" 
              className={`hover:underline flex items-center gap-1 ${isHomePage ? 'text-white drop-shadow-sm' : 'text-[#2f1c11]'}`}
            >
              Cart
              {cartItemsCount > 0 && (
                <span className={`text-sm font-medium rounded-full w-5 h-5 flex items-center justify-center leading-none ${isHomePage ? 'bg-white text-[#2f1c11]' : 'bg-[#5F493B] text-white'}`}>
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
} 