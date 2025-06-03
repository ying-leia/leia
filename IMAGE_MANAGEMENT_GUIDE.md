# 📸 Image Management Guide

## Overview

Your website now uses a **real image system** that eliminates broken images and makes adding new products super easy! All images are organized in folders and automatically mapped to ensure everything displays correctly.

## 🗂️ Current Folder Structure

```
/assets/
├── products/
│   ├── solene/          (3 images: ikebana.jpg, dragon.jpg, ikebana-flat.jpg)
│   ├── amea/            (1 image: bouquet.jpg)
│   ├── liora/           (5 images: sunet-front.jpg, sunset-side.jpg, etc.)
│   ├── celestine/       (3 images: celestine-1.jpg, celestine-2.jpg, celestine-3.jpg)
│   ├── seraphine/       (1 image: blush.jpg)
│   ├── aurelia/         (1 image: tulip-gradient.jpg)
│   ├── zia/             (2 images: zia-1.jpg, zia-2.jpg)
│   ├── thalia/          (1 image: sunflower.jpg)
│   ├── kaia/            (1 image: kaia-1.jpg)
│   ├── isla/            (1 image: eucalyptus.jpg)
│   └── amara/           (2 images: malaika.jpg, malaika-2.jpg)
├── vases/
│   ├── forest.jpg       (Forest Green vase)
│   ├── ball.jpg         (Ceramic Ball vase)
│   └── stone.jpg        (Stone Grey vase)
└── standalone images/   (fire.jpg, peony.jpg, mama.jpg, etc.)
```

## ✅ What's Fixed

- **No more broken images** - All products now use real images
- **Automatic image mapping** - System finds all images in product folders
- **Real vase images** - Vase selector now shows actual vase photos
- **Fallback system** - If product has no images, uses standalone images
- **Easy expansion** - Simple process to add new products

## 🚀 Adding New Products

### Method 1: Simple Folder Addition

1. **Create folder:** `/assets/products/[new-product-id]/`
2. **Add images:** Drop your product images in the folder
3. **Update registry:** Add your product to `imageRegistry.js`:

```javascript
// In /src/data/imageRegistry.js - add to PRODUCT_IMAGES:
newproduct: [
  '/assets/products/newproduct/main.jpg',
  '/assets/products/newproduct/detail.jpg',
  '/assets/products/newproduct/side.jpg'
]
```

4. **Add product:** Create product object in `products.js`:

```javascript
{
  id: 'newproduct',
  name: 'New Product Name', 
  price: 195,
  featured: true,
  images: getProductImages('newproduct'), // Automatically gets your images!
  description: '...',
  availableVases: getAvailableVases(), // Uses real vase images
  // ... rest of product data
}
```

### Method 2: Using the Helper Utility

1. **Create folder and add images** (same as above)
2. **Use the helper:**

```javascript
import { addProductImages } from '../utils/addNewProduct';

// This automatically registers the images
const images = addProductImages('newproduct', ['main.jpg', 'detail.jpg', 'side.jpg']);

// Use in your product object
const newProduct = {
  id: 'newproduct',
  images: images, // Already registered!
  // ... rest of product data
};
```

## 🎨 Adding New Vases

1. **Add vase image** to `/assets/vases/new-vase.jpg`
2. **Update registry:**

```javascript
// In imageRegistry.js - add to VASE_IMAGES:
'new-vase': '/assets/vases/new-vase.jpg'
```

3. **Update getAvailableVases()** function to include your new vase

## 📝 Image Naming Best Practices

### Recommended Naming Patterns:
- `main.jpg` - Primary product photo
- `detail.jpg` - Close-up detail shot  
- `side.jpg` - Side angle view
- `lifestyle.jpg` - Lifestyle/context shot
- `closeup.jpg` - Macro detail shot

### Alternative Patterns:
- `[product-id].jpg`
- `[product-id]-1.jpg`, `[product-id]-2.jpg`
- `[descriptive-name].jpg`

The system is flexible and works with any naming convention!

## 🔧 Technical Details

### How It Works:
1. **Image Registry** (`imageRegistry.js`) maps all real images
2. **Products** (`products.js`) uses registry functions to get images  
3. **Components** automatically display all available images
4. **Fallback system** handles missing images gracefully

### Key Functions:
- `getProductImages(productId)` - Gets all images for a product
- `getAvailableVases()` - Gets all vase options with real images
- `hasProductImages(productId)` - Checks if product has images
- `addProductImages(productId, imageNames)` - Helper to add new product

## 🎯 Benefits

✅ **Zero broken images** - Only real files are referenced  
✅ **Easy product addition** - Drop images in folder, update one file  
✅ **Automatic gallery** - All product images show in detail page  
✅ **Real vase previews** - Customers see actual vase photos  
✅ **Flexible naming** - Works with any image naming convention  
✅ **Future-proof** - Easy to extend and maintain  

## 🔄 Image Display Flow

1. **Homepage Hero** → `/assets/products/liora/sunset-side.jpg`
2. **Featured Products** → Uses each product's first image from registry
3. **Signature Pieces** → Real product images (ikebana.jpg, bouquet.jpg, sunet-front.jpg)
4. **Product Detail Pages** → All images from product folder
5. **Vase Selector** → Real vase images from `/assets/vases/`
6. **Shopping Cart** → Product's first image
7. **Checkout** → Product's first image

## 📊 Current Image Status

| Product   | Images Available | Status |
|-----------|------------------|--------|
| Solène    | 3 images        | ✅ Complete |
| Améa      | 1 image         | ✅ Complete |  
| Liora     | 5 images        | ✅ Complete |
| Célestine | 3 images        | ✅ Complete |
| Séraphine | 1 image         | ✅ Complete |
| Aurélia   | 1 image         | ✅ Complete |
| Zia       | 2 images        | ✅ Complete |
| Thalia    | 1 image         | ✅ Complete |
| Kaia      | 1 image         | ✅ Complete |
| Isla      | 1 image         | ✅ Complete |
| Amara     | 2 images        | ✅ Complete |

**All products now have real images and display correctly!**

## 🚨 Important Notes

- **Product ID must match folder name** in `/assets/products/`
- **Update both** `imageRegistry.js` and `products.js` when adding products
- **Test images load** by checking the website after updates
- **Vase images** must be added to both `/assets/vases/` and registry
- **Image extensions** can be .jpg, .jpeg, .png (system handles all)

Your image management system is now **bulletproof** and **super easy to extend**! 🎉 