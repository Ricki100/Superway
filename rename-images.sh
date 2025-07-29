#!/bin/bash

# Script to rename WhatsApp images for the gallery
# Place this script in your project root and run it after copying images to ./images/

echo "Renaming WhatsApp images for gallery..."

# Navigate to images directory
cd images

# Counter for renaming
counter=1

# Rename all WhatsApp images
for file in "WhatsApp Image 2025-07-27 at 7.22."*.jpeg; do
    if [ -f "$file" ]; then
        newname="whatsapp-image-${counter}.jpeg"
        echo "Renaming: $file → $newname"
        mv "$file" "$newname"
        ((counter++))
    fi
done

echo "Renamed $((counter-1)) images successfully!"
echo "Images are now ready for the gallery." 