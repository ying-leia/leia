import { getProductImages, getAvailableVases } from './imageRegistry';

export const products = [
  {
    id: 'solene',
    name: 'Solène',
    price: 185,
    featured: true,
    images: getProductImages('solene'),
    description: 'A minimalist arrangement inspired by Japanese ikebana principles, featuring carefully selected eternal roses and eucalyptus in perfect harmony.',
    details: 'Handcrafted with preserved Ecuadorian roses, natural eucalyptus, and delicate baby\'s breath. Each stem is individually selected and treated with our proprietary preservation process.',
    care: 'Keep away from direct sunlight and humid areas. Dust gently with a soft brush monthly. With proper care, your arrangement will maintain its beauty for 2-3 years.',
    footnote: 'eternal roses, eucalyptus, baby\'s breath',
    availableVases: getAvailableVases(),
    category: 'minimalist',
    tags: ['roses', 'eucalyptus', 'minimalist'],
    suggestedProducts: ['amea', 'liora', 'celestine']
  },
  {
    id: 'amea',
    name: 'Améa',
    price: 225,
    featured: true,
    images: getProductImages('amea'),
    description: 'A lush, romantic bouquet featuring deep burgundy roses, soft blush peonies, and trailing eucalyptus for a timeless elegance.',
    details: 'Composed of premium preserved roses in burgundy and blush tones, eternal peonies, eucalyptus, and accenting foliage. Each bloom retains its natural texture and beauty.',
    care: 'Display in a cool, dry environment away from direct sunlight. Handle gently and dust with a clean, dry brush as needed. Expected lifespan: 2-4 years.',
    footnote: 'burgundy roses, blush peonies, eucalyptus',
    availableVases: getAvailableVases(),
    category: 'romantic',
    tags: ['roses', 'peonies', 'burgundy', 'romantic'],
    suggestedProducts: ['solene', 'liora', 'seraphine']
  },
  {
    id: 'liora',
    name: 'Liora',
    price: 165,
    featured: true,
    images: getProductImages('liora'),
    description: 'Warm sunset hues capture the golden hour in this arrangement of preserved sunflowers, orange roses, and dried wheat grass.',
    details: 'Features preserved sunflowers, eternal roses in warm amber and orange tones, natural wheat grass, and dried oak leaves. Sourced from sustainable farms.',
    care: 'Best displayed in moderate lighting, away from humidity. The natural elements may gently fade over time, adding to the rustic charm. Lifespan: 2-3 years.',
    footnote: 'sunflowers, orange roses, wheat grass',
    availableVases: getAvailableVases(),
    category: 'warm',
    tags: ['sunflowers', 'roses', 'wheat', 'rustic'],
    suggestedProducts: ['amea', 'solene', 'aurelia']
  },
  {
    id: 'celestine',
    name: 'Célestine',
    price: 145,
    featured: false,
    images: getProductImages('celestine'),
    description: 'Ethereal whites and soft blues create a cloud-like arrangement with preserved hydrangeas, white roses, and silvery dusty miller.',
    details: 'Delicate preserved hydrangeas, eternal white roses, dusty miller, and blue delphinium. Each element chosen for its serene beauty and lasting quality.',
    care: 'Keep in a stable environment with minimal temperature fluctuations. Dust delicately with a soft brush. Avoid touching the hydrangea petals directly.',
    footnote: 'white roses, hydrangeas, dusty miller',
    availableVases: getAvailableVases(),
    category: 'ethereal',
    tags: ['white', 'blue', 'hydrangeas', 'ethereal'],
    suggestedProducts: ['seraphine', 'solene', 'aurelia']
  },
  {
    id: 'seraphine',
    name: 'Séraphine',
    price: 195,
    featured: false,
    images: getProductImages('seraphine'),
    description: 'Rich jewel tones come together in this dramatic arrangement featuring deep purple roses, burgundy dahlias, and dark foliage.',
    details: 'Premium preserved roses in deep purple, eternal burgundy dahlias, dark eucalyptus, and black berries for dramatic contrast and depth.',
    care: 'Display away from bright lights to preserve the rich color intensity. Handle with care as dark preserved flowers can be more delicate.',
    footnote: 'purple roses, burgundy dahlias, dark eucalyptus',
    availableVases: getAvailableVases(),
    category: 'dramatic',
    tags: ['purple', 'burgundy', 'dramatic', 'dahlias'],
    suggestedProducts: ['amea', 'aurelia', 'celestine']
  },
  {
    id: 'aurelia',
    name: 'Aurélia',
    price: 175,
    featured: false,
    images: getProductImages('aurelia'),
    description: 'Golden warmth radiates from this arrangement of preserved yellow roses, cream peonies, and natural branch accents.',
    details: 'Luminous yellow eternal roses, cream preserved peonies, golden solidago, and natural birch branches create warmth and texture.',
    care: 'Position in moderate light to maintain the golden tones. The natural branches may develop character over time, enhancing the organic appeal.',
    footnote: 'yellow roses, cream peonies, birch branches',
    availableVases: getAvailableVases(),
    category: 'warm',
    tags: ['yellow', 'cream', 'warm', 'branches'],
    suggestedProducts: ['liora', 'celestine', 'solene']
  },
  {
    id: 'zia',
    name: 'Zia',
    price: 195,
    featured: true,
    images: getProductImages('zia'),
    description: 'A vibrant celebration of spring\'s most cherished blooms, combining exotic orchids with classic garden favorites in soft pinks and pristine whites.',
    details: 'Mauve cymbidium orchids, white preserved ranunculus, coral-striped tulips, soft pink peonies, and fresh eucalyptus leaves create a luxurious garden-inspired arrangement.',
    care: 'Keep away from direct sunlight to preserve the delicate pink tones. Gently dust orchid petals monthly. The natural leaves will develop character over time.',
    footnote: 'orchids, ranunculus, tulips, peonies',
    availableVases: getAvailableVases(),
    category: 'luxury',
    tags: ['orchids', 'pink', 'white', 'spring', 'premium'],
    suggestedProducts: ['aurelia', 'celestine', 'liora']
  }
];

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category);
};

export const getSuggestedProducts = (productId: string) => {
  const product = getProductById(productId);
  if (!product || !product.suggestedProducts) return [];
  
  return product.suggestedProducts
    .map(id => getProductById(id))
    .filter(Boolean);
};

// Occasions data structure for the home page carousel
export const occasions = [
  {
    id: 'wedding',
    name: 'Weddings',
    description: 'Eternal beauty for your most precious moments',
    productId: 'amea',
    image: '/assets/products/amea/bouquet.jpg'
  },
  {
    id: 'anniversary',
    name: 'Anniversaries',
    description: 'Celebrate enduring love with timeless arrangements',
    productId: 'seraphine',
    image: '/assets/products/seraphine/blush.jpg'
  },
  {
    id: 'housewarming',
    name: 'Housewarmings',
    description: 'Welcome home with lasting natural beauty',
    productId: 'solene',
    image: '/assets/products/solene/ikebana.jpg'
  },
  {
    id: 'birthday',
    name: 'Birthdays',
    description: 'Bright celebrations that last beyond the day',
    productId: 'liora',
    image: '/assets/products/liora/sunet-front.jpg'
  },
  {
    id: 'sympathy',
    name: 'Sympathy',
    description: 'Gentle comfort in times of remembrance',
    productId: 'celestine',
    image: '/assets/products/celestine/celestine-2.jpg'
  },
  {
    id: 'graduation',
    name: 'Graduations',
    description: 'Honor achievements with golden moments',
    productId: 'aurelia',
    image: '/assets/products/aurelia/tulip-gradient.jpg'
  },
  {
    id: 'new-baby',
    name: 'New Baby',
    description: 'Welcome new life with delicate blossoms',
    productId: 'zia',
    image: '/assets/products/zia/zia-1.jpg'
  }
];

export const getOccasions = () => {
  return occasions;
}; 