# Folder-Based Image Management Examples

## Easy Product Image Management

With the new image helper utilities, you can manage product images much more easily by organizing them in folders and using simple conventions.

## Method 1: Auto-Generate from Folder Structure

```javascript
// In your products.js file
import { getProductImages, createImageConfig } from '../utils/imageHelpers';

// Example product with folder-based images
{
  id: 'newProduct',
  name: 'Beautiful Arrangement',
  // Instead of manually listing each image:
  images: getProductImages('newProduct'),
  // This automatically generates:
  // ['/assets/newProduct/main.jpg', '/assets/newProduct/detail.jpg', '/assets/newProduct/side.jpg', '/assets/newProduct/closeup.jpg']
}
```

## Method 2: Specify Folder and Image Names

```javascript
// For custom image names in a folder
{
  id: 'customProduct',
  name: 'Custom Arrangement',
  images: getProductImages('customProduct', {
    names: ['hero', 'lifestyle', 'detail1', 'detail2']
  }),
  // Generates: ['/assets/customProduct/hero.jpg', '/assets/customProduct/lifestyle.jpg', ...]
}
```

## Method 3: Simple Folder + Count

```javascript
{
  id: 'simpleProduct',
  name: 'Simple Arrangement',
  images: getProductImages('simpleProduct', { count: 3 }),
  // Generates: ['/assets/simpleProduct/main.jpg', '/assets/simpleProduct/detail.jpg', '/assets/simpleProduct/side.jpg']
}
```

## Method 4: Different Folder Structure

```javascript
{
  id: 'specialProduct',
  name: 'Special Arrangement',
  images: createImageConfig.folder('/assets/special-collection/product1/', ['main', 'alt1', 'alt2']),
  // Generates: ['/assets/special-collection/product1/main.jpg', '/assets/special-collection/product1/alt1.jpg', ...]
}
```

## Recommended Folder Structure

Organize your assets like this for maximum efficiency:

```
/assets/
├── products/
│   ├── solene/
│   │   ├── main.jpg
│   │   ├── detail.jpg
│   │   ├── side.jpg
│   │   └── closeup.jpg
│   ├── amea/
│   │   ├── main.jpg
│   │   ├── detail.jpg
│   │   └── lifestyle.jpg
│   └── zia/
│       ├── main.jpg
│       ├── detail.jpg
│       └── side.jpg
├── vases/
│   ├── ceramic-white.jpg
│   ├── glass-clear.jpg
│   └── terracotta.jpg
└── placeholder.jpg
```

## Adding New Products - Super Easy!

1. **Create a folder** in `/assets/` with your product ID
2. **Add images** following the naming convention (main.jpg, detail.jpg, side.jpg, closeup.jpg)
3. **Use the helper** in your product definition:

```javascript
{
  id: 'myNewProduct',
  name: 'My New Product',
  price: 195,
  featured: true,
  images: getProductImages('myNewProduct'), // That's it! Auto-generates from folder
  description: '...',
  // ... rest of product data
}
```

## Vase Images Made Easy Too

```javascript
// In your product's availableVases array:
availableVases: [
  {
    id: 'ceramic-white',
    name: 'Ceramic White',
    image: getVaseImagePath('ceramic-white'), // Auto-generates: '/assets/vases/ceramic-white.jpg'
    price: 35
  }
]
```

## Backward Compatibility

The system works with your existing image paths too:

```javascript
{
  id: 'existingProduct',
  images: createImageConfig.legacy(['/assets/old-path.jpg', '/assets/another-old-path.jpg'])
}
```

## Benefits

✅ **Less typing** - Just specify folder, images auto-generate  
✅ **Consistent naming** - Standard conventions across all products  
✅ **Easy to add products** - Drop images in folder, update one line  
✅ **Organized assets** - Clean folder structure  
✅ **Flexible** - Works with any naming convention you prefer  
✅ **Backward compatible** - Existing products keep working  

This system makes it much easier to manage your product images while keeping your codebase clean and organized! 