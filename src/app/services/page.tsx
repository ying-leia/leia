"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../../contexts/CartContext";
import Navigation from '../../components/Navigation';

export default function Services() {
  const { getCartItemsCount } = useCart();

  return (
    <div className="min-h-screen bg-[#F8F5F2] text-[#2f1c11]">
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&display=swap");
        body {
          font-family: "Playfair Display", serif;
        }
      `}</style>

      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-6 md:px-10 text-center">
        <h1 className="text-4xl md:text-6xl font-light mb-6">Our Services</h1>
        <p className="text-lg text-[#5f493b] max-w-3xl mx-auto leading-relaxed">
          From intimate celebrations to grand corporate spaces, we create bespoke eternal 
          flower arrangements that transform moments into lasting memories.
        </p>
      </section>

      {/* Consumer Services Section */}
      <section className="px-6 md:px-10 pb-20">
        <div className="max-w-7xl mx-auto">
          
          {/* Consumer Services Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light uppercase tracking-wide mb-4">Personal Celebrations</h2>
            <p className="text-[#5f493b] max-w-2xl mx-auto leading-relaxed">
              Mark life&apos;s most precious moments with arrangements designed to last as long as the memories they represent.
            </p>
          </div>

          {/* Consumer Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            
            {/* Weddings */}
            <div className="group">
              <div className="aspect-[4/5] relative overflow-hidden mb-4">
                <Image
                  src="/assets/peony.jpg"
                  alt="Wedding arrangements"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-medium mb-2">Weddings</h3>
              <p className="text-sm text-[#5f493b] leading-relaxed mb-3">
                Bridal bouquets, ceremony arrangements, and reception centerpieces that preserve the beauty of your special day forever.
              </p>
              <ul className="text-xs text-[#5f493b] space-y-1">
                <li>• Bridal & bridesmaids bouquets</li>
                <li>• Ceremony arches & aisle arrangements</li>
                <li>• Reception centerpieces</li>
                <li>• Boutonnières & corsages</li>
              </ul>
            </div>

            {/* Anniversaries & Celebrations */}
            <div className="group">
              <div className="aspect-[4/5] relative overflow-hidden mb-4">
                <Image
                  src="/assets/graduation.jpg"
                  alt="Anniversary celebrations"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-medium mb-2">Anniversaries & Milestones</h3>
              <p className="text-sm text-[#5f493b] leading-relaxed mb-3">
                Commemorate achievements and celebrations with arrangements that honor the significance of the moment.
              </p>
              <ul className="text-xs text-[#5f493b] space-y-1">
                <li>• Anniversary arrangements</li>
                <li>• Graduation celebrations</li>
                <li>• Birthday commemoratives</li>
                <li>• Achievement honors</li>
              </ul>
            </div>

            {/* Memorial & Sympathy */}
            <div className="group">
              <div className="aspect-[4/5] relative overflow-hidden mb-4">
                <Image
                  src="/assets/mama.jpg"
                  alt="Memorial arrangements"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-medium mb-2">Memorial & Sympathy</h3>
              <p className="text-sm text-[#5f493b] leading-relaxed mb-3">
                Gentle arrangements that offer comfort and serve as lasting tributes to cherished memories.
              </p>
              <ul className="text-xs text-[#5f493b] space-y-1">
                <li>• Sympathy arrangements</li>
                <li>• Memorial services</li>
                <li>• Remembrance pieces</li>
                <li>• Condolence expressions</li>
              </ul>
            </div>
          </div>

          {/* Corporate Services Header */}
          <div className="text-center mb-16 pt-16 border-t border-[#dcd4c3]">
            <h2 className="text-3xl font-light uppercase tracking-wide mb-4">Corporate & Commercial</h2>
            <p className="text-[#5f493b] max-w-2xl mx-auto leading-relaxed">
              Elevate professional spaces with sophisticated arrangements that reflect your brand&apos;s commitment to quality and elegance.
            </p>
          </div>

          {/* Corporate Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            
            {/* Office Spaces */}
            <div>
              <div className="aspect-[3/2] relative overflow-hidden mb-6">
                <Image
                  src="/assets/bianca.jpeg"
                  alt="Office arrangements"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-light mb-4">Office & Corporate Spaces</h3>
              <p className="text-[#5f493b] leading-relaxed mb-4">
                Transform professional environments with low-maintenance arrangements that maintain their beauty year-round, creating inspiring workspaces without the ongoing cost and upkeep of fresh flowers.
              </p>
              <ul className="text-sm text-[#5f493b] space-y-2">
                <li>• Reception & lobby displays</li>
                <li>• Conference room centerpieces</li>
                <li>• Executive office arrangements</li>
                <li>• Corporate event styling</li>
                <li>• Seasonal installations</li>
              </ul>
            </div>

            {/* Hospitality */}
            <div>
              <div className="aspect-[3/2] relative overflow-hidden mb-6">
                <Image
                  src="/assets/rags.jpg"
                  alt="Hospitality arrangements"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-light mb-4">Hospitality & Retail</h3>
              <p className="text-[#5f493b] leading-relaxed mb-4">
                Create memorable guest experiences with elegant arrangements that reinforce your brand aesthetic while eliminating the operational challenges of traditional florals.
              </p>
              <ul className="text-sm text-[#5f493b] space-y-2">
                <li>• Hotel lobby installations</li>
                <li>• Restaurant table arrangements</li>
                <li>• Retail space displays</li>
                <li>• Boutique styling</li>
                <li>• Event venue partnerships</li>
              </ul>
            </div>
          </div>

          {/* Consultation CTA */}
          <div className="text-center py-16 bg-[#e7e2d5] -mx-6 md:-mx-10">
            <div className="px-6 md:px-10">
              <h2 className="text-3xl font-light mb-6">Let&apos;s Create Something Beautiful Together</h2>
              <p className="text-[#5f493b] mb-8 max-w-2xl mx-auto leading-relaxed">
                Whether you&apos;re planning an intimate celebration or designing a commercial space, 
                our team will work with you to create arrangements that perfectly capture your vision.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/shop"
                  className="inline-block bg-[#5F493B] text-white px-8 py-3 text-sm uppercase tracking-wide hover:bg-[#2f1c11] transition-colors duration-200"
                >
                  Browse Collection
                </Link>
                <Link 
                  href="/contact"
                  className="inline-block bg-transparent border-2 border-[#5F493B] text-[#5F493B] px-8 py-3 text-sm uppercase tracking-wide hover:bg-[#5F493B] hover:text-white transition-all duration-200"
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#F8F5F2] py-12 px-6 md:px-10 border-t border-[#dcd4c3]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-medium mb-3 uppercase text-sm tracking-wide cursor-pointer" onClick={() => window.location.href = '/contact'}>Stay Connected</h4>
              <div className="space-y-2 text-sm text-[#5f493b]">
                <div><Link href="#" className="hover:underline">Instagram</Link></div>
                <div><Link href="#" className="hover:underline">Pinterest</Link></div>
                <div><Link href="#" className="hover:underline">Newsletter</Link></div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3 uppercase text-sm tracking-wide">Support</h4>
              <div className="space-y-2 text-sm text-[#5f493b]">
                <div><Link href="/care" className="hover:underline">Flower Care</Link></div>
                <div><Link href="/contact" className="hover:underline">Contact Us</Link></div>
                <div><Link href="/faq" className="hover:underline">FAQ</Link></div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3 uppercase text-sm tracking-wide">Company</h4>
              <div className="space-y-2 text-sm text-[#5f493b]">
                <div><Link href="/our-story" className="hover:underline">Our Story</Link></div>
                <div><Link href="/services" className="hover:underline">Services</Link></div>
                <div><Link href="/privacy" className="hover:underline">Privacy</Link></div>
              </div>
            </div>
          </div>
          <div className="border-t border-[#dcd4c3] pt-6 text-sm text-[#5f493b]">
            &copy; {new Date().getFullYear()} LEIA. Crafted with intention.
          </div>
        </div>
      </footer>
    </div>
  );
} 