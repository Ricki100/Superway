# Superway Gallery Plugin - Troubleshooting Guide

## Quick Debug Steps

### 1. Check Plugin Settings
1. Go to **Settings > Superway Gallery** in WordPress admin
2. Make sure you have entered a URL in the "Images URL" field
3. Use the "Test URL" button to verify your URL works
4. Save your settings

### 2. Check What's Displayed
When you use `[superway_gallery]` shortcode, you should see one of these:

**If you see a red error message:**
- "Please configure the images URL" = No URL is set in settings
- "No media files found at the specified URL" = URL is set but no images found

**If you see a green debug box (admin users only):**
- Shows how many images were found and the URL being used

**If you see nothing:**
- Check if the shortcode is being processed correctly
- Make sure the page/post is published
- Check for JavaScript errors in browser console

### 3. Test with Direct Image URLs
Try this as a test URL in your settings:
```
https://picsum.photos/400/300, https://picsum.photos/400/301, https://picsum.photos/400/302
```

This should show 3 random images if the plugin is working.

### 4. Common Issues and Solutions

#### Issue: "Please configure the images URL"
**Solution:** Go to Settings > Superway Gallery and enter a URL

#### Issue: "No media files found at the specified URL"
**Possible causes:**
- URL is incorrect or inaccessible
- Server doesn't allow directory listing
- No images in the specified location
- CORS restrictions

**Solutions:**
- Use the URL tester in admin settings
- Try a different URL type (Google Drive, direct URLs, etc.)
- Check if the URL is publicly accessible

#### Issue: Images load but don't display properly
**Possible causes:**
- CSS not loading
- JavaScript errors
- Theme conflicts

**Solutions:**
- Check browser console for errors
- Try switching to a default WordPress theme temporarily
- Make sure the plugin is activated

#### Issue: Google Drive not working
**Requirements:**
- Use folder URL, not individual file URLs
- Folder must be set to "Anyone with the link can view"
- URL format: `https://drive.google.com/drive/folders/FOLDER_ID`

### 5. Debug Mode
The plugin includes debug information for admin users. Look for green boxes that show:
- Number of images found
- URL being used
- Any error messages

### 6. Browser Console Check
1. Open your page with the gallery
2. Press F12 to open developer tools
3. Go to Console tab
4. Look for any red error messages
5. Check Network tab to see if images are loading

### 7. Test Different URL Types

**Direct Image URLs (comma-separated):**
```
https://example.com/image1.jpg, https://example.com/image2.png
```

**Google Drive Folder:**
```
https://drive.google.com/drive/folders/1ABC123DEF456GHI789JKL
```

**Directory Listing:**
```
https://example.com/images/
```

**Test Images (for testing only):**
```
https://picsum.photos/400/300, https://picsum.photos/400/301, https://picsum.photos/400/302
```

### 8. Still Not Working?
1. Check WordPress error logs
2. Try deactivating other plugins temporarily
3. Switch to a default theme
4. Make sure WordPress is up to date
5. Check server error logs

### 9. Getting Help
If you're still having issues:
1. Note what error message you see
2. Check what the URL tester shows
3. Try the test image URLs above
4. Check browser console for errors
5. Note your WordPress version and theme
