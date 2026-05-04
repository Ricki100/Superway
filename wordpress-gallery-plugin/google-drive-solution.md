# Google Drive Images Not Loading - Solutions

## The Problem
Google Drive images often don't load directly in web galleries due to:
- Access restrictions and authentication requirements
- CORS (Cross-Origin Resource Sharing) policies
- Dynamic URL changes
- Rate limiting

## Solutions

### Option 1: Use Direct Image URLs (Recommended)
Instead of using the Google Drive folder URL, get the direct image URLs:

1. **Right-click each image in Google Drive**
2. **Select "Get link" or "Share"**
3. **Change the sharing to "Anyone with the link can view"**
4. **Copy the direct image URL**
5. **Use comma-separated URLs in your plugin settings:**

```
https://drive.google.com/uc?export=view&id=FILE_ID_1, https://drive.google.com/uc?export=view&id=FILE_ID_2, https://drive.google.com/uc?export=view&id=FILE_ID_3
```

### Option 2: Use Alternative Services

#### Dropbox
1. Upload images to Dropbox
2. Right-click each image → Share → Copy link
3. Use the Dropbox sharing URL in plugin settings

#### OneDrive
1. Upload images to OneDrive
2. Right-click each image → Share → Copy link
3. Use the OneDrive sharing URL in plugin settings

#### Your Website
1. Upload images to your WordPress media library
2. Get the direct URLs from the media library
3. Use those URLs in the plugin settings

### Option 3: Use Test Images (For Testing)
Use these test URLs to verify the plugin works:

```
https://picsum.photos/400/300, https://picsum.photos/400/301, https://picsum.photos/400/302, https://picsum.photos/400/303, https://picsum.photos/400/304
```

### Option 4: Convert Google Drive to Direct URLs

#### Method 1: Manual Conversion
1. Open your Google Drive folder
2. Right-click each image
3. Select "Get link"
4. Copy the link (it looks like: `https://drive.google.com/file/d/FILE_ID/view`)
5. Replace `/view` with `?export=view` to get: `https://drive.google.com/uc?export=view&id=FILE_ID`
6. Collect all these URLs and use them comma-separated

#### Method 2: Use Google Drive API (Advanced)
For developers, you can use the Google Drive API to get direct URLs programmatically.

## Quick Test
Try this test shortcode to verify the plugin works:
```
[superway_gallery_test]
```

If this shows 3 images, then the plugin is working correctly and the issue is with your Google Drive URL.

## Recommended Approach
1. **Test the plugin first** with `[superway_gallery_test]`
2. **If that works**, then use direct image URLs instead of the folder URL
3. **Upload your images** to a more web-friendly service like Dropbox or your website
4. **Use the direct URLs** in your plugin settings

This will give you a much more reliable gallery that works consistently.
