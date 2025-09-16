# Superway Gallery Plugin - Usage Guide

## Quick Start

### 1. Upload Images
1. Go to **Media > Library** in your WordPress admin
2. Click **Add New** to upload images
3. Upload all the images you want to use in your galleries

### 2. Create a Gallery
1. Go to **Settings > Superway Gallery** in your WordPress admin
2. Enter a gallery name (e.g., "portfolio", "products", "events")
3. Click **Select Images from Media Library**
4. Choose the images you want in this gallery
5. Set the number of columns (1-6)
6. Enable or disable lightbox
7. Click **Create Gallery**

### 3. Use the Gallery
Use the shortcode anywhere on your site:
```
[superway_gallery name="portfolio"]
```

## Examples

### Portfolio Gallery
```
[superway_gallery name="portfolio"]
```

### Product Gallery with 4 Columns
```
[superway_gallery name="products" columns="4"]
```

### Event Gallery without Lightbox
```
[superway_gallery name="events" lightbox="false"]
```

### Test Gallery
```
[superway_gallery_test]
```

## Creating Multiple Galleries

You can create as many galleries as you want:

1. **Portfolio Gallery**: `[superway_gallery name="portfolio"]`
2. **Product Gallery**: `[superway_gallery name="products"]`
3. **Event Gallery**: `[superway_gallery name="events"]`
4. **Team Gallery**: `[superway_gallery name="team"]`
5. **Testimonial Gallery**: `[superway_gallery name="testimonials"]`

Each gallery can have:
- Different images
- Different number of columns
- Different lightbox settings
- Different styling (if you customize the CSS)

## Managing Galleries

### View All Galleries
Go to **Settings > Superway Gallery** to see all your created galleries with:
- Gallery name
- Shortcode to use
- Number of images
- Column settings
- Lightbox settings

### Edit Galleries
Currently, you need to delete and recreate galleries to edit them. Edit functionality is coming in future updates.

### Delete Galleries
Click the **Delete** button next to any gallery to remove it permanently.

## Tips and Best Practices

### Image Optimization
- Upload images in the size you want them displayed
- Use JPEG for photos, PNG for graphics with transparency
- Keep file sizes reasonable for faster loading

### Gallery Organization
- Use descriptive gallery names (e.g., "homepage-hero", "product-catalog")
- Group related images together
- Consider the number of columns based on your content

### Performance
- The plugin uses lazy loading for better performance
- Images are served through WordPress's optimized image system
- Lightbox only loads when needed

### Responsive Design
- Galleries automatically adapt to different screen sizes
- On mobile, galleries will show fewer columns
- Test your galleries on different devices

## Troubleshooting

### Gallery Not Showing
1. Check that the gallery name in your shortcode is correct
2. Make sure you've created the gallery in admin settings
3. Verify that the gallery has images selected

### Images Not Loading
1. Check that images exist in your WordPress media library
2. Verify images are in supported formats
3. Check browser console for errors

### Test the Plugin
Use the test shortcode to verify everything works:
```
[superway_gallery_test]
```

If this shows 3 sample images, the plugin is working correctly.

## Customization

### CSS Classes
The plugin uses these CSS classes that you can customize:
- `.superway-gallery` - Main gallery container
- `.superway-gallery-item` - Individual image container
- `.superway-lightbox-modal` - Lightbox modal

### Adding Custom Styles
Add custom CSS to your theme's style.css or use a custom CSS plugin to modify the appearance.

## Need Help?

1. Check the troubleshooting section above
2. Use the test shortcode to verify the plugin works
3. Check that your WordPress version is up to date
4. Make sure the plugin is activated
