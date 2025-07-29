# Superway Group - Premium Airbnb Properties & Tyre Distribution

A modern, responsive website showcasing Superway Group's premium Airbnb properties and comprehensive tyre distribution services across South Africa.

## Features

### 🏠 **Premium Airbnb Properties**
- Prime locations across South Africa
- Fully furnished & equipped accommodations
- Professional management services
- High occupancy rates
- 24/7 guest support

### 🚗 **Tyre Distribution**
- All major tyre brands available
- Small to large vehicle coverage
- Industrial & commercial solutions
- Bulk supply capabilities
- Nationwide distribution network

### 🎨 **Dynamic Gallery System**
- **True Masonry Layout**: Images of any dimensions flow naturally without forced grid constraints
- **Responsive Columns**: Automatically adjusts from 3 columns (desktop) to 2 (tablet) to 1 (mobile)
- **Category Filtering**: Filter images by Properties, Tyres, Operations, or view All
- **Lightbox Viewer**: Full-screen image viewing with navigation
- **Google Drive Integration**: Pull images directly from Google Drive folders
- **Lazy Loading**: Optimized performance with progressive image loading
- **Smooth Animations**: Beautiful hover effects and transitions
- **Dynamic Layout**: Automatically adjusts layout when images load or window resizes

## Gallery Setup

### 🎯 **Automatic Image Detection (Recommended)**

The gallery now automatically detects and loads **any images** you put in the `./images/` folder, regardless of their filenames!

#### **Super Simple Setup**

1. **Just Drop Images**: Copy any images to the `./images/` folder
2. **Any Filename**: Works with any image names (WhatsApp, camera, custom names, etc.)
3. **Any Format**: Supports JPG, JPEG, PNG, GIF, WebP, BMP
4. **Auto-Categorization**: Images are automatically categorized as Properties, Tyres, or Operations
5. **Auto-Titles**: Meaningful titles are generated from filenames

#### **Quick Start**

1. **Install Dependencies** (one-time setup):
   ```bash
   npm install
   ```

2. **Start the Server**:
   ```bash
   npm start
   ```

3. **Add Images**: Simply copy any images to the `./images/` folder

4. **View Gallery**: Open http://localhost:3000 in your browser

#### **Current Status**

- ✅ **40 WhatsApp images** already detected and loaded
- ✅ **Automatic categorization** working
- ✅ **Masonry layout** handling different image dimensions
- ✅ **Responsive design** for all devices

### **How It Works**

The gallery uses multiple detection methods:

1. **API Detection**: Server provides a list of all images in the folder
2. **Directory Listing**: Falls back to directory listing if API unavailable
3. **Pattern Matching**: Tries common image naming patterns
4. **Smart Fallbacks**: Multiple fallback methods ensure images are found

### **Image Processing**

- **Auto-Titles**: Filenames are converted to readable titles
- **Auto-Categories**: Images are categorized based on filename keywords
- **Auto-Descriptions**: Professional descriptions are generated for each category
- **Smart Distribution**: If no keywords found, images are evenly distributed across categories

### **Supported Formats**

- ✅ JPG/JPEG
- ✅ PNG
- ✅ GIF
- ✅ WebP
- ✅ BMP

### **Example Usage**

Just drop these files in `./images/` and they'll work automatically:

```
./images/
├── my-property-photo.jpg
├── tyre-warehouse.png
├── office-team.jpeg
├── WhatsApp Image 2025-07-27 at 7.22.20 PM.jpeg
├── IMG_001.jpg
├── photo1.png
└── any-other-image.webp
```

### **Benefits**

- 🚀 **Zero Configuration**: Just drop images and they appear
- 🎯 **Smart Categorization**: Automatic category assignment
- 📱 **Responsive**: Works on all devices
- 🎨 **Masonry Layout**: Beautiful layout for any image dimensions
- ⚡ **Fast Loading**: Optimized performance
- 🔄 **Dynamic**: Add/remove images anytime

### **Manual Override (Optional)**

If you want to customize titles, categories, or descriptions:

```javascript
// In script.js, you can modify the auto-generation functions:
function generateTitleFromFilename(filename) {
    // Custom title logic
}

function autoCategorizeImage(filename, id) {
    // Custom categorization logic
}
```

The gallery is now **completely automatic** - just add images to the folder and they'll appear in your beautiful masonry gallery! 🎉

## Gallery Features

### 📱 **Responsive Design**
- **Desktop**: 3 columns masonry layout
- **Tablet**: 2 columns masonry layout
- **Mobile**: Single column masonry layout
- **Natural Flow**: Images maintain their natural dimensions and flow organically
- **Auto-adjustment**: Layout automatically adjusts when images load or window resizes

### 🎯 **Filtering System**
- **All**: Shows all images
- **Properties**: Airbnb and accommodation images
- **Tyres**: Tyre distribution and warehouse images
- **Operations**: Office and team images

### 🔍 **Lightbox Features**
- **Full-screen viewing**: Click any image to open in lightbox
- **Navigation**: Use arrow keys or click navigation buttons
- **Keyboard shortcuts**: 
  - `Escape`: Close lightbox
  - `Arrow Left/Right`: Navigate between images
- **Touch support**: Swipe gestures on mobile devices

### ⚡ **Performance Optimizations**
- **Lazy loading**: Images load as they come into view
- **Progressive loading**: Smooth loading states
- **Optimized images**: Responsive image sizes
- **Caching**: Browser caching for faster subsequent loads

## Technical Implementation

### CSS Masonry Layout
The gallery uses CSS Columns for true masonry layout:
```css
.gallery-grid {
    column-count: 3;
    column-gap: 20px;
}

.gallery-item {
    break-inside: avoid;
    margin-bottom: 20px;
}
```

### JavaScript Architecture
- **State Management**: Centralized gallery state
- **Event Handling**: Efficient event delegation
- **API Integration**: Ready for Google Drive API
- **Error Handling**: Graceful fallbacks and error states

### Animation System
- **Staggered animations**: Items animate in sequence
- **Hover effects**: Smooth transitions on interaction
- **Loading states**: Professional loading indicators
- **Smooth scrolling**: Integrated with page navigation

## Customization

### Adding New Categories
1. Add filter button in HTML:
```html
<button class="gallery-filter" data-filter="newcategory">New Category</button>
```

2. Add images with the new category:
```javascript
{
    id: 13,
    src: 'path/to/image.jpg',
    title: 'New Image',
    category: 'newcategory',
    description: 'Description'
}
```

### Styling Customization
Modify the CSS variables in `styles.css`:
```css
:root {
    --gallery-primary-color: #e74c3c;
    --gallery-secondary-color: #333;
    --gallery-background: #f8f9fa;
}
```

### Layout Adjustments
- **Grid columns**: Modify `grid-template-columns` in `.gallery-grid`
- **Image heights**: Adjust `height` in `.gallery-item img`
- **Spacing**: Modify `gap` and `padding` values

## Browser Support
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips
1. **Optimize images**: Use WebP format when possible
2. **Compress images**: Keep file sizes under 500KB
3. **Use CDN**: Host images on a content delivery network
4. **Lazy load**: Images load only when needed
5. **Cache headers**: Set appropriate cache headers for images

## Contact Information

**Superway Group (Pty) Ltd**
- **Address**: Unit 267, The Polofields, Polofields Drive, Waterfall City, 1685
- **Phone**: +27 83 555 3743 / +27 81 035 9546
- **Email**: info@superwaygroup.online

## License
This project is proprietary to Superway Group (Pty) Ltd. All rights reserved.

---

*Built with modern web technologies for optimal performance and user experience.*
