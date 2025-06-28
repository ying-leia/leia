"use client";
import React, { useState } from "react";
import Navigation from '../../components/Navigation';

export default function SignInRegister() {
  return (
    <div className="min-h-screen bg-[#F8F5F2] text-[#2f1c11]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&display=swap');
        body { font-family: 'Playfair Display', serif; }
      `}</style>
      <Navigation />
      <div className="max-w-md mx-auto pt-24 pb-12 px-4">
        <h1 className="text-2xl md:text-3xl font-extralight mb-4 text-center">Account</h1>
        <div className="text-center text-lg mt-8">
          Sign in and registration are now handled securely via our Shopify store.
        </div>
      </div>
    </div>
  );
} 