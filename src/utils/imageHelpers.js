/**
 * Image management utilities for products
 * Allows specifying folder paths and automatically generates image arrays
 */

/**
 * Generate image paths from a folder path and image names/patterns
 * @param {string} folderPath - Base folder path (e.g., '/assets/solene/')
 * @param {string[]|number} images - Array of image names or number of images to auto-generate
 * @returns {string[]} Array of full image paths
 */
export const generateImagePaths = (folderPath, images) => {
  // Ensure folder path ends with /
  const cleanFolderPath = folderPath.endsWith('/') ? folderPath : `${folderPath}/`;
  
  // If images is a number, generate sequential paths
  if (typeof images === 'number') {
    return Array.from({ length: images }, (_, index) => {
      const imageNumber = index + 1;
      return `${cleanFolderPath}${imageNumber}.jpg`;
    });
  }
  
  // If images is an array of names, append to folder path
  if (Array.isArray(images)) {
    return images.map(imageName => {
      // Add extension if not present
      const fullImageName = imageName.includes('.') ? imageName : `${imageName}.jpg`;
      return `${cleanFolderPath}${fullImageName}`;
    });
  }
  
  // Fallback: return single image with folder name
  return [`${cleanFolderPath}main.jpg`];
};

/**
 * Generate image paths with common naming conventions
 * @param {string} productId - Product identifier
 * @param {Object} options - Configuration options
 * @returns {string[]} Array of image paths
 */
export const getProductImages = (productId, options = {}) => {
  const {
    folder = `/assets/${productId}/`,
    count = 4,
    names = null,
    mainImage = 'main',
    detailImages = ['detail', 'side', 'closeup'],
    extension = 'jpg'
  } = options;
  
  // If specific names provided, use those
  if (names) {
    return generateImagePaths(folder, names);
  }
  
  // Generate standard naming convention
  const imageNames = [mainImage, ...detailImages.slice(0, count - 1)];
  return generateImagePaths(folder, imageNames.map(name => `${name}.${extension}`));
};

/**
 * Generate vase image paths
 * @param {string} vaseId - Vase identifier
 * @param {string} baseFolder - Base vases folder
 * @returns {string} Vase image path
 */
export const getVaseImagePath = (vaseId, baseFolder = '/assets/vases/') => {
  const cleanFolder = baseFolder.endsWith('/') ? baseFolder : `${baseFolder}/`;
  return `${cleanFolder}${vaseId}.jpg`;
};

/**
 * Fallback image for missing products
 */
export const getFallbackImage = () => '/assets/placeholder.jpg';

/**
 * Helper to create product image configuration
 * This makes it very easy to set up images for new products
 */
export const createImageConfig = {
  // For products with standard naming (main.jpg, detail.jpg, side.jpg, closeup.jpg)
  standard: (productId, count = 4) => getProductImages(productId, { count }),
  
  // For products with custom image names
  custom: (productId, imageNames) => getProductImages(productId, { names: imageNames }),
  
  // For products with different folder structure
  folder: (folderPath, imageNames) => generateImagePaths(folderPath, imageNames),
  
  // For existing single images (backward compatibility)
  legacy: (imagePaths) => Array.isArray(imagePaths) ? imagePaths : [imagePaths]
};

/**
 * Auto-generate images based on your current asset structure
 * This function works with your existing image naming patterns
 */
export const autoGenerateProductImages = (productId, existingImages = []) => {
  // If you already have images defined, keep them
  if (existingImages && existingImages.length > 0) {
    return existingImages;
  }
  
  // Otherwise, try to generate based on common patterns
  const possibleImages = [
    `/assets/${productId}-main.jpg`,
    `/assets/${productId}-detail.jpg`, 
    `/assets/${productId}-side.jpg`,
    `/assets/${productId}-closeup.jpg`,
    `/assets/${productId}.jpg`,
    `/assets/${productId}-1.jpg`,
    `/assets/${productId}-2.jpg`,
    `/assets/${productId}-3.jpg`
  ];
  
  // In a real implementation, you'd check which files exist
  // For now, return the first few possibilities
  return possibleImages.slice(0, 3);
}; 