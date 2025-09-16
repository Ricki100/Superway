# Superway Gallery Plugin - Example Usage

## Quick Start Examples

### 1. Google Drive Shared Folder
```
URL: https://drive.google.com/drive/folders/1ABC123DEF456GHI789JKL
Shortcode: [superway_gallery]
```

### 2. Direct Image URLs
```
URL: https://example.com/image1.jpg, https://example.com/image2.png, https://example.com/image3.gif
Shortcode: [superway_gallery]
```

### 3. Directory Listing
```
URL: https://example.com/images/
Shortcode: [superway_gallery]
```

### 4. Dropbox Link
```
URL: https://dropbox.com/s/abc123/photo.jpg
Shortcode: [superway_gallery]
```

## Advanced Shortcode Examples

### Custom Columns and Lightbox
```
[superway_gallery columns="4" lightbox="true"]
```

### Override URL for Specific Gallery
```
[superway_gallery url="https://drive.google.com/drive/folders/1XYZ789" columns="2"]
```

### Disable Lightbox
```
[superway_gallery lightbox="false" columns="5"]
```

## Testing Your URLs

1. Go to **Settings > Superway Gallery** in WordPress admin
2. Enter your URL in the "Images URL" field
3. Click "Test URL" to verify it works
4. The tester will show you how many images were found
5. Save your settings when satisfied

## Common Use Cases

### Real Estate Website
- Upload property photos to Google Drive
- Share the folder publicly
- Use the folder URL in the plugin
- Display beautiful gallery on property pages

### Portfolio Website
- Store images in Dropbox
- Use Dropbox sharing links
- Create multiple galleries for different projects

### Blog with External Images
- Use direct image URLs
- Separate multiple URLs with commas
- Perfect for curated content

## Troubleshooting Tips

1. **Google Drive not working?**
   - Make sure folder is set to "Anyone with the link can view"
   - Use folder URL, not individual file URLs
   - Try the URL tester first

2. **Images not loading?**
   - Check sharing permissions
   - Verify URLs are correct
   - Use the built-in URL tester

3. **Need help?**
   - Check the plugin settings page for detailed instructions
   - Use the URL tester to diagnose issues
   - Review the README.md for complete documentation
