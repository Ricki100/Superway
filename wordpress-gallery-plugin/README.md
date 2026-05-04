# Superway Gallery WordPress Plugin

A WordPress plugin that creates beautiful, responsive galleries from your WordPress media library. Create multiple galleries with different shortcodes for different sets of images.

## Features

- **WordPress Media Integration**: Uses your existing WordPress media library
- **Multiple Galleries**: Create unlimited galleries with different shortcodes
- **Easy Image Selection**: Select images directly from WordPress media library
- **Responsive Design**: Automatically adapts to different screen sizes
- **Lightbox Functionality**: Click images to view them in a full-screen lightbox
- **Customizable Columns**: Choose from 1-6 columns per gallery
- **Admin Interface**: Easy gallery management through WordPress admin
- **Shortcode Support**: Use different shortcodes for different galleries
- **Lazy Loading**: Images load as they come into view for better performance
- **Test Gallery**: Built-in test shortcode to verify the plugin works

## Installation

1. Upload the `wordpress-gallery-plugin` folder to your `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Go to Settings > Superway Gallery to create your galleries

## Usage

### Creating Galleries
1. Go to **Settings > Superway Gallery** in your WordPress admin
2. Enter a gallery name (e.g., "portfolio", "products", "events")
3. Click "Select Images from Media Library" to choose your images
4. Set the number of columns and lightbox options
5. Click "Create Gallery"

### Using Galleries
Use the shortcode anywhere on your site:
```
[superway_gallery name="portfolio"]
[superway_gallery name="products"]
[superway_gallery name="events"]
```

### Customizing Galleries
You can override gallery settings in the shortcode:
```
[superway_gallery name="portfolio" columns="4" lightbox="false"]
```

### Parameters

- `name` - Gallery name (required)
- `columns` - Number of columns (1-6, overrides gallery default)
- `lightbox` - Enable/disable lightbox (true/false, overrides gallery default)

### Test Gallery
Test the plugin with sample images:
```
[superway_gallery_test]
```

## How It Works

The plugin works with your WordPress media library:
1. **Upload Images**: Upload images to your WordPress media library
2. **Create Galleries**: Use the admin interface to create named galleries
3. **Select Images**: Choose which images belong to each gallery
4. **Configure Settings**: Set columns, lightbox, and other options per gallery
5. **Use Shortcodes**: Display galleries anywhere with simple shortcodes
6. **Responsive Display**: Galleries automatically adapt to different screen sizes
7. **Lightbox Viewing**: Click images to view them in full-screen lightbox

## Supported Media Formats

### Images
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)
- SVG (.svg)

### Videos
- MP4 (.mp4)
- WebM (.webm)
- OGG (.ogg)
- MOV (.mov)
- AVI (.avi)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Internet Explorer 11+

## Customization

The plugin includes CSS classes that you can customize:
- `.superway-gallery` - Main gallery container
- `.superway-gallery-item` - Individual image container
- `.superway-lightbox-modal` - Lightbox modal

## Troubleshooting

**No images showing?**
- Make sure you've uploaded images to your WordPress media library
- Check that you've created a gallery and selected images for it
- Verify the gallery name in your shortcode matches the created gallery
- Use the test shortcode `[superway_gallery_test]` to verify the plugin works

**Gallery not found error?**
- Check that the gallery name in your shortcode is correct
- Make sure you've created the gallery in the admin settings
- Gallery names are case-sensitive

**Images not loading?**
- Check that the images exist in your WordPress media library
- Verify the images are in supported formats (JPEG, PNG, GIF, WebP, SVG)
- Check browser console for any error messages

**Admin interface not working?**
- Make sure you have administrator permissions
- Check that the plugin is activated
- Try refreshing the admin page

## Changelog

### Version 2.0.0
- **Complete Rewrite**: Now uses WordPress media library instead of external URLs
- **Multiple Galleries**: Create unlimited galleries with different shortcodes
- **Easy Image Selection**: Select images directly from WordPress media library
- **Improved Admin Interface**: Better gallery management with visual interface
- **WordPress Integration**: Full integration with WordPress media system
- **Better Performance**: Uses WordPress native image handling
- **Simplified Usage**: Much easier to create and manage galleries

### Version 1.1.0
- Added Google Drive shared folder support
- Added Dropbox and OneDrive integration
- Added support for direct image URLs (comma-separated)
- Added built-in URL testing functionality
- Enhanced admin interface with better instructions
- Added video support (MP4, WebM, OGG, MOV, AVI)
- Improved error handling and user feedback

### Version 1.0.0
- Initial release
- Remote image loading
- Responsive grid layout
- Lightbox functionality
- Admin settings page
- Shortcode support

## Support

For support and feature requests, please visit the plugin's GitHub repository.

## License

This plugin is licensed under the GPL v2 or later.
