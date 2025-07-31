const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static('.'));

// API endpoint to get list of images
app.get('/api/images', (req, res) => {
    const imagesDir = path.join(__dirname, 'images');
    
    try {
        if (fs.existsSync(imagesDir)) {
            const files = fs.readdirSync(imagesDir);
            const imageFiles = files.filter(file => {
                const ext = path.extname(file).toLowerCase();
                return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'].includes(ext);
            });
            
            res.json({ 
                success: true, 
                images: imageFiles,
                count: imageFiles.length 
            });
        } else {
            res.json({ 
                success: false, 
                error: 'Images directory not found',
                images: [],
                count: 0 
            });
        }
    } catch (error) {
        res.json({ 
            success: false, 
            error: error.message,
            images: [],
            count: 0 
        });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`API endpoint: http://localhost:${PORT}/api/images`);
}); 