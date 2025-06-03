/**
 * Image Registry - Maps all actual images in the assets folders
 * This ensures we only reference images that actually exist
 */

// Product images mapped from actual folder contents
export const PRODUCT_IMAGES = {
  solene: [
    '/assets/products/solene/ikebana.jpg',
    '/assets/products/solene/dragon.jpg', 
    '/assets/products/solene/ikebana-flat.jpg'
  ],
  amea: [
    '/assets/products/amea/bouquet.jpg'
  ],
  liora: [
    '/assets/products/liora/sunet-front.jpg',
    '/assets/products/liora/sunset-side.jpg',
    '/assets/products/liora/sunset-back.jpeg',
    '/assets/products/liora/sunset-closeup.jpeg',
    '/assets/products/liora/sunset-dining.jpg'
  ],
  celestine: [
    '/assets/products/celestine/celestine-1.jpg',
    '/assets/products/celestine/celestine-2.jpg',
    '/assets/products/celestine/celestine-3.jpg'
  ],
  seraphine: [
    '/assets/products/seraphine/blush.jpg'
  ],
  aurelia: [
    '/assets/products/aurelia/tulip-gradient.jpg'
  ],
  zia: [
    '/assets/products/zia/zia-1.jpg',
    '/assets/products/zia/zia-2.jpg'
  ],
  thalia: [
    '/assets/products/thalia/sunflower.jpg'
  ],
  kaia: [
    '/assets/products/kaia/kaia-1.jpg'
  ],
  isla: [
    '/assets/products/isla/eucalyptus.jpg'
  ],
  amara: [
    '/assets/products/amara/malaika.jpg',
    '/assets/products/amara/malaika-2.jpg'
  ]
};

// Vase images mapped from actual vases folder
export const VASE_IMAGES = {
  'forest': '/assets/vases/forest.jpg',
  'ball': '/assets/vases/ball.jpg', 
  'stone': '/assets/vases/stone.jpg'
};

// Standalone images in main assets folder that could be used for missing products
export const STANDALONE_IMAGES = {
  'fire': '/assets/fire.jpg',
  'peony': '/assets/peony.jpg',
  'mama': '/assets/mama.jpg',
  'rags': '/assets/rags.jpg',
  'bianca': '/assets/bianca.jpeg',
  'graduation': '/assets/graduation.jpg'
};

/**
 * Get images for a product, ensuring they exist
 * @param {string} productId - Product identifier
 * @returns {string[]} Array of existing image paths
 */
export const getProductImages = (productId) => {
  const images = PRODUCT_IMAGES[productId];
  
  if (images && images.length > 0) {
    return images;
  }
  
  // Fallback to standalone images if no product-specific images
  const fallbackImages = Object.values(STANDALONE_IMAGES);
  console.warn(`No images found for product ${productId}, using fallback images`);
  return fallbackImages.slice(0, 3); // Use first 3 as fallback
};

/**
 * Get vase image path
 * @param {string} vaseId - Vase identifier  
 * @returns {string} Vase image path
 */
export const getVaseImage = (vaseId) => {
  return VASE_IMAGES[vaseId] || '/assets/vases/stone.jpg'; // Default to stone vase
};

/**
 * Get available vases with real images
 * @returns {Array} Array of vase objects with real image paths
 */
export const getAvailableVases = () => {
  return [
    {
      id: 'forest',
      name: 'Forest Green',
      image: getVaseImage('forest'),
      price: 35
    },
    {
      id: 'ball', 
      name: 'Ceramic Ball',
      image: getVaseImage('ball'),
      price: 40
    },
    {
      id: 'stone',
      name: 'Stone Grey', 
      image: getVaseImage('stone'),
      price: 38
    }
  ];
};

/**
 * Check if product has images available
 * @param {string} productId - Product identifier
 * @returns {boolean} Whether product has images
 */
export const hasProductImages = (productId) => {
  const images = PRODUCT_IMAGES[productId];
  return images && images.length > 0;
};

/**
 * Get all products that have images available
 * @returns {string[]} Array of product IDs that have images
 */
export const getProductsWithImages = () => {
  return Object.keys(PRODUCT_IMAGES).filter(productId => hasProductImages(productId));
};

/**
 * Helper to add new product images (for easy expansion)
 * @param {string} productId - Product identifier
 * @param {string[]} imagePaths - Array of image paths
 */
export const registerProductImages = (productId, imagePaths) => {
  PRODUCT_IMAGES[productId] = imagePaths;
};

/**
 * Helper to add new vase images
 * @param {string} vaseId - Vase identifier  
 * @param {string} imagePath - Vase image path
 */
export const registerVaseImage = (vaseId, imagePath) => {
  VASE_IMAGES[vaseId] = imagePath;
}; 