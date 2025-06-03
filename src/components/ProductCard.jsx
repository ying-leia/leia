'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ProductCard = ({ product, className = '' }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  if (!product) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(price);
  };

  const hasMultipleImages = product.images && product.images.length > 1;

  const handlePrevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const currentImage = product.images && product.images.length > 0 
    ? product.images[currentImageIndex] 
    : '/assets/fire.jpg'; // Fallback to a real image

  return (
    <Link href={`/products/${product.id}`} className={`group block ${className}`}>
      <div className="relative overflow-hidden">
        {/* Product Image */}
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src={currentImage}
            alt={`${product.name} - Image ${currentImageIndex + 1}`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.src = '/assets/fire.jpg';
            }}
          />
          
          {/* Image Navigation - Only show if multiple images */}
          {hasMultipleImages && (
            <>
              {/* Previous Image Button */}
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                aria-label="Previous image"
              >
                <svg className="w-4 h-4 text-[#2f1c11]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next Image Button */}
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                aria-label="Next image"
              >
                <svg className="w-4 h-4 text-[#2f1c11]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      index === currentImageIndex 
                        ? 'bg-white' 
                        : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                    }`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Product Information */}
        <div className="pt-4 text-center">
          <h3 className="text-lg font-light text-[#2f1c11] mb-1 group-hover:text-[#5f493b] transition-colors duration-200">
            {product.name}
          </h3>
          
          <p className="text-xs text-[#5f493b] mb-2 leading-relaxed italic">
            {product.footnote}
          </p>
          
          <p className="text-sm font-medium text-[#2f1c11]">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard; 