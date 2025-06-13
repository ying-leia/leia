'use client';
import React from 'react';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  featured: boolean;
  images: string[];
  description: string;
  details: string;
  care: string;
  footnote: string;
  availableVases: Array<{
    id: string;
    name: string;
    image: string;
    price: number;
  }>;
  category: string;
  tags: string[];
  suggestedProducts: string[];
}

interface ProductGridProps {
  products?: Product[];
  columns?: string;
  spacing?: string;
  className?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products = [], 
  columns = 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  spacing = 'gap-6 md:gap-8',
  className = ''
}) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#5f493b] text-lg italic">No products available at the moment.</p>
        <p className="text-[#5f493b] text-sm mt-2">Please check back soon for new arrivals.</p>
      </div>
    );
  }

  return (
    <div className={`grid ${columns} ${spacing} ${className}`}>
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductGrid; 