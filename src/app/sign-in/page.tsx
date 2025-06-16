"use client";
import React, { useState } from "react";
import Link from "next/link";
import Navigation from '../../components/Navigation';

export default function SignInRegister() {
  const [tab, setTab] = useState<'signIn' | 'register'>('signIn');
  const [signInForm, setSignInForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInForm({ ...signInForm, [e.target.name]: e.target.value });
  };
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };
  const handleForgotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForgotEmail(e.target.value);
  };
  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSubmitted(true);
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add sign in logic
    alert('Sign in functionality coming soon!');
  };
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add register logic
    alert('Registration functionality coming soon!');
  };

  return (
    <div className="min-h-screen bg-[#F8F5F2] text-[#2f1c11]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&display=swap');
        body { font-family: 'Playfair Display', serif; }
      `}</style>
      <Navigation />
      <div className="max-w-md mx-auto pt-24 pb-12 px-4">
        <h1 className="text-2xl md:text-3xl font-extralight mb-4 text-center">Account</h1>
        <div className="flex justify-center gap-4 mb-8">
          <button
            className={`px-4 py-2 text-sm uppercase tracking-wide border-b-2 transition-all duration-200 ${tab === 'signIn' ? 'border-[#5F493B] text-[#5F493B]' : 'border-transparent text-[#2f1c11]'}`}
            onClick={() => { setTab('signIn'); setShowForgot(false); }}
          >
            Sign In
          </button>
          <button
            className={`px-4 py-2 text-sm uppercase tracking-wide border-b-2 transition-all duration-200 ${tab === 'register' ? 'border-[#5F493B] text-[#5F493B]' : 'border-transparent text-[#2f1c11]'}`}
            onClick={() => { setTab('register'); setShowForgot(false); }}
          >
            Register
          </button>
        </div>
        {tab === 'signIn' && showForgot ? (
          <form className="space-y-6" onSubmit={handleForgotSubmit}>
            <div>
              <label htmlFor="forgotEmail" className="block text-sm mb-2">Enter your email to reset your password</label>
              <input
                type="email"
                id="forgotEmail"
                name="forgotEmail"
                value={forgotEmail}
                onChange={handleForgotChange}
                required
                className="w-full px-4 py-3 border border-[#dcd4c3] bg-[#F8F5F2] text-[#2f1c11] focus:outline-none focus:border-[#5F493B]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#5F493B] text-white py-3 text-sm uppercase tracking-wide hover:bg-[#2f1c11] transition-colors duration-200"
            >
              Send Reset Link
            </button>
            <div className="text-xs text-[#5f493b] text-center mt-4">
              <button type="button" className="underline" onClick={() => setShowForgot(false)}>Back to Sign In</button>
            </div>
            {forgotSubmitted && (
              <div className="text-xs text-[#5f493b] text-center mt-4">
                If an account with that email exists, a reset link will be sent.
              </div>
            )}
          </form>
        ) : tab === 'signIn' ? (
          <form className="space-y-6" onSubmit={handleSignInSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={signInForm.email}
                onChange={handleSignInChange}
                required
                className="w-full px-4 py-3 border border-[#dcd4c3] bg-[#F8F5F2] text-[#2f1c11] focus:outline-none focus:border-[#5F493B]"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={signInForm.password}
                onChange={handleSignInChange}
                required
                className="w-full px-4 py-3 border border-[#dcd4c3] bg-[#F8F5F2] text-[#2f1c11] focus:outline-none focus:border-[#5F493B]"
              />
            </div>
            <div className="text-right">
              <button type="button" className="text-xs text-[#5f493b] underline" onClick={() => { setShowForgot(true); setForgotSubmitted(false); }}>Forgot password?</button>
            </div>
            <button
              type="submit"
              className="w-full bg-[#5F493B] text-white py-3 text-sm uppercase tracking-wide hover:bg-[#2f1c11] transition-colors duration-200"
            >
              Sign In
            </button>
            <div className="text-xs text-[#5f493b] text-center mt-4">
              Don&apos;t have an account?{' '}
              <button type="button" className="underline" onClick={() => setTab('register')}>Register</button>
            </div>
          </form>
        ) : (
          <form className="space-y-6" onSubmit={handleRegisterSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={registerForm.name}
                onChange={handleRegisterChange}
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
                value={registerForm.email}
                onChange={handleRegisterChange}
                required
                className="w-full px-4 py-3 border border-[#dcd4c3] bg-[#F8F5F2] text-[#2f1c11] focus:outline-none focus:border-[#5F493B]"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={registerForm.password}
                onChange={handleRegisterChange}
                required
                className="w-full px-4 py-3 border border-[#dcd4c3] bg-[#F8F5F2] text-[#2f1c11] focus:outline-none focus:border-[#5F493B]"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm mb-2">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={registerForm.confirmPassword}
                onChange={handleRegisterChange}
                required
                className="w-full px-4 py-3 border border-[#dcd4c3] bg-[#F8F5F2] text-[#2f1c11] focus:outline-none focus:border-[#5F493B]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#5F493B] text-white py-3 text-sm uppercase tracking-wide hover:bg-[#2f1c11] transition-colors duration-200"
            >
              Register
            </button>
            <div className="text-xs text-[#5f493b] text-center mt-4">
              Already have an account?{' '}
              <button type="button" className="underline" onClick={() => setTab('signIn')}>Sign In</button>
            </div>
          </form>
        )}
        <div className="mt-8 text-xs text-[#5f493b] text-center">
          After signing in, you&apos;ll have access to your account overview, saved address(es), and order history.
        </div>
      </div>
    </div>
  );
} 