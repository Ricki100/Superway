const express = require('express');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('.'));

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com', // Replace with your Gmail
        pass: process.env.EMAIL_PASS || 'your-app-password'     // Use Gmail App Password
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, service, message } = req.body;
        
        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({ 
                success: false, 
                error: 'Name, email, and message are required' 
            });
        }
        
        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'info@superwaygroup.online',
            subject: `New Contact Form Submission - ${service || 'General Inquiry'}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                <p><strong>Service:</strong> ${service || 'Not specified'}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
                <hr>
                <p><em>Sent from Superway Group website contact form</em></p>
            `,
            replyTo: email
        };
        
        // Send email
        await transporter.sendMail(mailOptions);
        
        res.json({ 
            success: true, 
            message: 'Email sent successfully' 
        });
        
    } catch (error) {
        console.error('Email sending error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to send email. Please try again later.' 
        });
    }
});

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