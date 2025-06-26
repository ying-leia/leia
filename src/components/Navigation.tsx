"use client";
import React, { useState, useEffect } from 'react';
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHomePage) return;
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

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
      <header className={`fixed top-0 left-0 w-full z-[100] md:hidden ${isHomePage ? (scrolled ? 'bg-white border-b border-[#dcd4c3]' : 'bg-transparent') : 'bg-white'}`} style={{ fontFamily: 'Playfair Display, serif', pointerEvents: 'auto', zIndex: 100 }}>
        <div className="flex items-center justify-between px-4 py-2 min-h-[48px]">
          {/* Hamburger Menu */}
          <button
            onClick={toggleMenu}
            className={`p-2 ${isHomePage ? (scrolled ? 'text-[#2f1c11]' : 'text-white drop-shadow-sm') : 'text-[#2f1c11]'}`}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
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
            className={`text-2xl font-medium tracking-[0.35em] logo-mobile ${isHomePage ? (scrolled ? 'text-[#2f1c11]' : 'text-white drop-shadow-sm') : 'text-[#2f1c11]'}`}
            style={{ letterSpacing: '0.35em' }}
          >
            LEIA
          </Link>

          {/* Cart Icon */}
          <div className="relative">
            <button 
              onClick={toggleCart}
              className={`p-2 relative ${isHomePage ? (scrolled ? 'text-[#2f1c11]' : 'text-white drop-shadow-sm') : 'text-[#2f1c11]'}`}
            >
              {cartItemsCount > 0 ? (
                <div className="w-6 h-6 border border-current rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium leading-none" style={{fontFamily: 'inherit'}}>
                    {cartItemsCount}
                  </span>
                </div>
              ) : (
                <svg
                  className="w-6 h-6"
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

      {/* Side Drawer Overlay with medium opacity */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Side Drawer */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-64 bg-[#F8F5F2] z-50 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full">
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
              <li>
                <Link
                  href="/sign-in"
                  className="block hover:text-[#5F493B] transition-colors"
                  onClick={toggleMenu}
                >
                  Account
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
      <header className={`hidden md:block fixed top-0 left-0 w-full z-[100]`} style={{ fontFamily: 'Playfair Display, serif', pointerEvents: 'auto', zIndex: 100 }}>
        <div className={`flex items-center justify-between px-10 py-6 uppercase tracking-wide ${isHomePage ? (scrolled ? 'bg-white border-b border-[#dcd4c3]' : 'bg-transparent') : 'bg-white border-b border-[#dcd4c3]'}`}>
          <nav className="flex gap-8 text-sm items-center flex-1 justify-start">
            <a 
              href="/shop" 
              className={`hover:underline ${currentPage === 'shop' ? 'font-medium' : ''} ${isHomePage ? (scrolled ? 'text-[#2f1c11]' : 'text-white drop-shadow-sm') : 'text-[#2f1c11]'}`}
            >
              Shop
            </a>
            <a 
              href="/our-story" 
              className={`hover:underline ${currentPage === 'about' ? 'font-medium' : ''} ${isHomePage ? (scrolled ? 'text-[#2f1c11]' : 'text-white drop-shadow-sm') : 'text-[#2f1c11]'}`}
            >
              About
            </a>
            <a 
              href="/services" 
              className={`hover:underline ${currentPage === 'services' ? 'font-medium' : ''} ${isHomePage ? (scrolled ? 'text-[#2f1c11]' : 'text-white drop-shadow-sm') : 'text-[#2f1c11]'}`}
            >
              Services
            </a>
          </nav>
          <div className="flex-0 flex justify-center w-full absolute left-1/2 -translate-x-1/2 pointer-events-none">
            <Link 
              href="/" 
              className={`text-3xl font-medium tracking-[0.4em] logo-desktop ${isHomePage ? (scrolled ? 'text-[#2f1c11]' : 'text-white drop-shadow-sm') : 'text-[#2f1c11]'} pointer-events-auto`}
              style={{ letterSpacing: '0.4em' }}
            >
              LEIA
            </Link>
          </div>
          <nav className="flex gap-8 text-sm items-center flex-1 justify-end">
            <a 
              href="/contact" 
              className={`hover:underline ${currentPage === 'contact' ? 'font-medium' : ''} ${isHomePage ? (scrolled ? 'text-[#2f1c11]' : 'text-white drop-shadow-sm') : 'text-[#2f1c11]'}`}
            >
              Contact
            </a>
            <a 
              href="/sign-in" 
              className={`hover:underline ${isHomePage ? (scrolled ? 'text-[#2f1c11]' : 'text-white drop-shadow-sm') : 'text-[#2f1c11]'}`}
            >
              Account
            </a>
            <a 
              href="/cart" 
              className={`hover:underline flex items-center gap-1 ${isHomePage ? (scrolled ? 'text-[#2f1c11]' : 'text-white drop-shadow-sm') : 'text-[#2f1c11]'}`}
            >
              Cart
              {cartItemsCount > 0 && (
                <span className={`text-sm font-medium rounded-full w-5 h-5 flex items-center justify-center leading-none ${isHomePage ? (scrolled ? 'bg-[#5F493B] text-white' : 'bg-white text-[#2f1c11]') : 'bg-[#5F493B] text-white'}`} style={{fontFamily: 'inherit'}}>
                  {cartItemsCount}
                </span>
              )}
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}