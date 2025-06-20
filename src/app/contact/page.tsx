"use client";
import React, { useState } from "react";
import Link from "next/link";
import Navigation from '../../components/Navigation';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F5F2] text-[#2f1c11]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&display=swap');
        body { font-family: 'Playfair Display', serif; }
      `}</style>

      <Navigation />

      <div className="px-6 md:px-10 pt-24 pb-12">
        <main className="flex-1 flex flex-col items-center justify-center px-4">
          <h1 className="text-2xl md:text-3xl font-extralight mb-4 text-center">Contact Us</h1>
          <p className="text-[#5f493b] mb-12 max-w-2xl mx-auto leading-relaxed">
            We&apos;d love to hear from you. Whether you have a question about our arrangements, 
            need help with an order, or want to discuss a custom project, we&apos;re here to help.
          </p>
          <div className="w-full max-w-xl bg-white rounded-lg shadow p-8">
            {submitted ? (
              <div className="text-center py-12">
                <h2 className="text-2xl mb-4">Thank you!</h2>
                <p className="text-[#5f493b]">Your message has been received. We&apos;ll be in touch soon.</p>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#dcd4c3] bg-[#F8F5F2] text-[#2f1c11] focus:outline-none focus:border-[#5F493B]"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#dcd4c3] bg-[#F8F5F2] text-[#2f1c11] focus:outline-none focus:border-[#5F493B]"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-[#dcd4c3] bg-[#F8F5F2] text-[#2f1c11] focus:outline-none focus:border-[#5F493B]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#5F493B] text-white py-3 text-sm uppercase tracking-wide hover:bg-[#2f1c11] transition-colors duration-200"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
          <div className="mt-12 text-center text-[#5f493b] text-sm">
            <div className="mb-2">Email: <Link href="mailto:hello@leiaflowers.com" className="underline">hello@leiaflowers.com</Link></div>
            <div>Instagram: <Link href="#" className="underline">@leiaflowers</Link></div>
          </div>
        </main>
      </div>
    </div>
  );
} 