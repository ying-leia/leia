"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navigation from '../../components/Navigation';

export default function OurStory() {
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
        <h1 className="text-4xl md:text-6xl font-light mb-6">Our Story</h1>
        <p className="text-lg text-[#5f493b] max-w-3xl mx-auto leading-relaxed">
          Born from a childhood dream of flowers that never fade, leia preserves the quiet joy 
          of bringing something beautiful into your world — with no expiry date.
        </p>
      </section>

      {/* Story Content with Non-uniform Image Layout */}
      <section className="px-6 md:px-10 pb-20">
        <div className="max-w-7xl mx-auto">
          
          {/* First Section - Large Image Left, Text Right */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 mb-20 items-center">
            <div className="lg:col-span-3">
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src="/assets/products/liora/sunset-side.jpg"
                  alt="Sunset arrangement side view"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-3xl font-light uppercase tracking-wide">The Beginning</h2>
              <p className="text-[#5f493b] leading-relaxed">
                I&apos;ve loved flowers for as long as I can remember.
              </p>
              <p className="text-[#5f493b] leading-relaxed">
                When I was just nine years old, I&apos;d save up my pocket money to buy grocery store blooms on my walk home from school — no occasion, no reason, just for the quiet joy of bringing something beautiful into my room. But as much as I adored them, there was always a moment I dreaded: when the petals began to wilt, the water turned murky, and mould took over what was once something soft and radiant.
              </p>
              <p className="text-[#5f493b] leading-relaxed">
                Watching them decay felt a little like losing a piece of light I had held onto.
              </p>
            </div>
          </div>

          {/* Second Section - Text Left, Smaller Image Right */}
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 lg:gap-12 mb-20 items-start">
            <div className="lg:col-span-4 space-y-6">
              <h2 className="text-3xl font-light uppercase tracking-wide">The Dream</h2>
              <p className="text-[#5f493b] leading-relaxed">
                That&apos;s where the dream of eternal flowers was born.
              </p>
              <p className="text-[#5f493b] leading-relaxed">
                Back then, in Singapore around 2010, preserved flowers were nearly impossible to find — and when I did see them online, they were either far too expensive or locked in boxes of stiff rose heads that didn&apos;t feel romantic or real to me. I didn&apos;t want something that looked artificial. I wanted something that felt alive.
              </p>
              <p className="text-[#5f493b] leading-relaxed">
                I dreamed of bouquets that looked just as wild, soft, and magical as fresh blooms — but ones I could keep without watching them fade.
              </p>
              <p className="text-[#5f493b] leading-relaxed">
                As I grew older, that childhood dream stayed with me. And now, at 25, with a deeper understanding of the environmental cost of floristry — the short lifespan of fresh-cut flowers, the carbon footprint of constant imports, the waste that piles up week after week — I felt an even stronger pull to bring leia to life.
              </p>
            </div>
            <div className="lg:col-span-3">
              <div className="aspect-[3/4] relative overflow-hidden">
                <Image
                  src="/assets/products/celestine/celestine-2.jpg"
                  alt="Celestine ethereal arrangement"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Third Section - Central Small Image with Text Blocks */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light uppercase tracking-wide mb-8">Our Philosophy</h2>
              <div className="max-w-md mx-auto aspect-square relative overflow-hidden">
                <Image
                  src="/assets/products/solene/ikebana.jpg"
                  alt="Solene ikebana arrangement"
                  fill
                  sizes="(max-width: 768px) 80vw, 384px"
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div className="space-y-4">
                <h3 className="text-xl font-medium uppercase tracking-wide">Intention</h3>
                <p className="text-[#5f493b] leading-relaxed">
                  So I began leia from that seed of longing — to create the kind of floral arrangements I always wished existed. Ones that feel dreamlike, intentional, and lasting. I design each piece the way I used to imagine them when I was nine — not just for how they look, but for what they make you feel.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-medium uppercase tracking-wide">Promise</h3>
                <p className="text-[#5f493b] leading-relaxed">
                  And I hope that when they find a place in your home or your hands, they bring the same quiet joy I felt all those years ago — only now, with no expiry date.
                </p>
                <div className="mt-6 pt-4 border-t border-[#dcd4c3]">
                  <p className="text-[#5f493b] leading-relaxed italic">
                    With love,<br/>
                    Ying Yeo<br/>
                    Founder of leia
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center py-16 bg-[#e7e2d5] text-[#2f1c11] -mx-6 md:-mx-10">
            <div className="px-6 md:px-10">
              <h2 className="text-3xl font-light mb-6">Experience Eternal Beauty</h2>
              <p className="text-[#5f493b] mb-8 max-w-2xl mx-auto leading-relaxed">
                Discover arrangements that honor both the fleeting nature of flowers and the 
                enduring power of beauty. Each piece is a promise that some things, when cherished 
                with intention, truly can last forever.
              </p>
              <Link 
                href="/shop"
                className="inline-block bg-[#5F493B] text-white px-8 py-3 text-sm uppercase tracking-wide hover:bg-[#2f1c11] transition-colors duration-200"
              >
                Explore Our Collection
              </Link>
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
                <div><Link href="/sustainability" className="hover:underline">Sustainability</Link></div>
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