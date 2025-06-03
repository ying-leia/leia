/**
 * Utility to help add new products with automatic image detection
 * Use this when adding new products to your catalog
 */

import { registerProductImages } from '../data/imageRegistry';

/**
 * Helper to generate product image paths based on folder structure
 * Call this function to register images for a new product
 * 
 * @param {string} productId - The product ID (should match folder name)
 * @param {string[]} imageNames - Array of image filenames in the product folder
 * @returns {string[]} Array of full image paths
 */
export const addProductImages = (productId, imageNames) => {
  const imagePaths = imageNames.map(imageName => {
    // Add extension if not provided
    const fullImageName = imageName.includes('.') ? imageName : `${imageName}.jpg`;
    return `/assets/products/${productId}/${fullImageName}`;
  });
  
  // Register the images in the registry
  registerProductImages(productId, imagePaths);
  
  return imagePaths;
};

/**
 * Template for adding a new product
 * Copy this structure and fill in your product details
 */
export const newProductTemplate = {
  id: 'your-product-id', // Should match folder name in /assets/products/
  name: 'Your Product Name',
  price: 195,
  featured: false, // Set to true for homepage display
  images: [], // Will be filled by addProductImages()
  description: 'Your product description here...',
  details: 'Detailed information about materials, construction, etc...',
  care: 'Care instructions for this product...',
  footnote: 'short description of key elements',
  availableVases: [], // Use getAvailableVases() from imageRegistry
  category: 'minimalist', // minimalist, romantic, warm, ethereal, dramatic, luxury
  tags: ['tag1', 'tag2', 'tag3'],
  suggestedProducts: ['product1', 'product2', 'product3'] // IDs of related products
};

/**
 * Example of how to add a new product
 * 
 * 1. Create folder: /assets/products/newproduct/
 * 2. Add images to the folder
 * 3. Use this helper:
 * 
 * const newProduct = {
 *   ...newProductTemplate,
 *   id: 'newproduct',
 *   name: 'New Product',
 *   images: addProductImages('newproduct', ['main.jpg', 'detail.jpg', 'side.jpg']),
 *   // ... fill in other details
 * };
 * 
 * 4. Add newProduct to the products array in products.js
 */

/**
 * Quick helper to scan common image patterns
 * Use this if you have standard naming conventions
 */
export const getStandardImages = (productId) => {
  const commonPatterns = [
    'main.jpg', 'main.jpeg',
    'detail.jpg', 'detail.jpeg', 
    'side.jpg', 'side.jpeg',
    'closeup.jpg', 'closeup.jpeg',
    `${productId}.jpg`, `${productId}.jpeg`,
    `${productId}-1.jpg`, `${productId}-1.jpeg`,
    `${productId}-2.jpg`, `${productId}-2.jpeg`,
    `${productId}-3.jpg`, `${productId}-3.jpeg`
  ];
  
  return commonPatterns;
};

/**
 * Instructions for adding new products:
 * 
 * METHOD 1 - If you know your image names:
 * 1. Create /assets/products/[productId]/ folder
 * 2. Add your images to the folder  
 * 3. Call: addProductImages('productId', ['image1.jpg', 'image2.jpg'])
 * 4. Add product object to products.js using the returned image array
 * 
 * METHOD 2 - Quick add with registry update:
 * 1. Add images to /assets/products/[productId]/
 * 2. Update PRODUCT_IMAGES in imageRegistry.js with your actual filenames
 * 3. Add product object to products.js using getProductImages('productId')
 * 
 * The system will automatically handle image loading and ensure no broken images!
 */ 