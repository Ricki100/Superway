// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.about-text, .about-image, .product-card, .service-item, .contact-info, .contact-form');
    
    animateElements.forEach((el, index) => {
        if (index % 2 === 0) {
            el.classList.add('slide-in-left');
        } else {
            el.classList.add('slide-in-right');
        }
        observer.observe(el);
    });

    // Initialize gallery
    initGallery();

    // Set current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});



// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const elements = document.querySelectorAll('.element');
    
    if (hero) {
        const rate = scrolled * -0.5;
        elements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${rate * speed}px)`;
        });
    }
});

// Initialize EmailJS
(function() {
            emailjs.init("8EJ11hMm_Y23NTUuX");
})();

// Gallery Configuration
const GALLERY_CONFIG = {
    useLocalImages: true,
    imagesFolder: './images/',
    itemsPerLoad: 10, // Load 10 images at a time
    currentLoad: 0
};

// Gallery State
const galleryState = {
    images: [],
    loadedImages: [],
    isLoading: false
};

// Initialize Gallery
function initGallery() {
    loadGalleryImages();
    setupLightbox();
    setupInfiniteScroll();
    setupMasonryResize();
}

// Setup Masonry Resize Handler
function setupMasonryResize() {
    let resizeTimeout;
    
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            handleMasonryLayout();
        }, 250);
    });
}

// Load Gallery Images
async function loadGalleryImages() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;

    galleryState.isLoading = true;
    showLoadingState();

    try {
        if (GALLERY_CONFIG.useLocalImages) {
            await loadFromLocalImages();
        } else {
            // For demonstration, we'll use sample images
            galleryState.images = GALLERY_CONFIG.sampleImages;
            galleryState.filteredImages = [...galleryState.images];
        }
        
        renderGallery();
    } catch (error) {
        console.error('Error loading gallery images:', error);
        showErrorState();
    } finally {
        galleryState.isLoading = false;
        hideLoadingState();
    }
}

// Load Local Images
async function loadFromLocalImages() {
    try {
        // Dynamic image loading - automatically detect images in the folder
        const dynamicImages = await loadImagesDynamically();
        
        if (dynamicImages.length > 0) {
            galleryState.images = dynamicImages;
            
            // Load first batch of images
            const firstBatch = dynamicImages.slice(0, GALLERY_CONFIG.itemsPerLoad);
            galleryState.loadedImages = firstBatch;
            GALLERY_CONFIG.currentLoad = 1;
            
            console.log(`Loaded ${dynamicImages.length} images dynamically from ./images/ folder`);
        } else {
            console.log('No images found in ./images/ folder');
        }
        
    } catch (error) {
        console.error('Error loading local images:', error);
    }
}

// Dynamically load images from the images folder
async function loadImagesDynamically() {
    const images = [];
    let id = 1;
    
    try {
        // Method 1: Try to use the API endpoint (if server is running)
        const response = await fetch('/api/images');
        if (response.ok) {
            const data = await response.json();
            console.log(`Found ${data.images.length} images via API`);
            
            data.images.forEach(filename => {
                images.push(createImageObject(id++, filename));
            });
            
            return images;
        }
    } catch (error) {
        console.log('API not available, trying alternative methods');
    }
    
    // Method 2: Try to fetch directory listing
    try {
        const response = await fetch('./images/');
        if (response.ok) {
            const html = await response.text();
            const imageFiles = extractImageFilesFromHTML(html, ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp']);
            
            imageFiles.forEach(filename => {
                images.push(createImageObject(id++, filename));
            });
            
            if (images.length > 0) {
                console.log(`Found ${images.length} images via directory listing`);
                return images;
            }
        }
    } catch (error) {
        console.log('Directory listing not available, trying pattern matching');
    }
    
    // Method 3: Try common patterns
    const commonNames = generateCommonImageNames();
    for (const filename of commonNames) {
        const imageExists = await checkImageExists(`./images/${filename}`);
        if (imageExists) {
            images.push(createImageObject(id++, filename));
        }
    }
    
    if (images.length > 0) {
        console.log(`Found ${images.length} images via pattern matching`);
        return images;
    }
    
    // Method 4: Try WhatsApp patterns (for your specific case)
    const whatsappPatterns = generateWhatsAppPatterns();
    for (const filename of whatsappPatterns) {
        const imageExists = await checkImageExists(`./images/${filename}`);
        if (imageExists) {
            images.push(createImageObject(id++, filename));
        }
    }
    
    console.log(`Found ${images.length} images via WhatsApp pattern matching`);
    return images;
}

// Create image object with clean title from filename
function createImageObject(id, filename) {
    // Generate a clean title from filename
    const title = generateCleanTitleFromFilename(filename);
    
    return {
        id: id,
        src: `./images/${filename}`,
        title: title,
        filename: filename
    };
}

// Generate clean title from filename
function generateCleanTitleFromFilename(filename) {
    // Remove extension
    let name = filename.replace(/\.[^/.]+$/, "");
    
    // Handle WhatsApp naming pattern
    if (name.includes('WhatsApp Image')) {
        const timeMatch = name.match(/at (\d+\.\d+\.\d+)/);
        if (timeMatch) {
            return `Image ${timeMatch[1]}`;
        }
    }
    
    // Handle common patterns
    if (name.includes('image') || name.includes('img')) {
        const numMatch = name.match(/(\d+)/);
        if (numMatch) {
            return `Image ${numMatch[1]}`;
        }
    }
    
    // Remove common prefixes and clean up
    name = name.replace(/^(IMG_|DSC_|PIC_|image_|img_)/i, '');
    name = name.replace(/[-_]/g, ' ');
    name = name.replace(/\s+/g, ' ').trim();
    
    // Capitalize first letter of each word
    name = name.replace(/\b\w/g, l => l.toUpperCase());
    
    return name || `Image ${id}`;
}



// Check if an image exists
async function checkImageExists(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        return false;
    }
}

// Extract image files from HTML directory listing
function extractImageFilesFromHTML(html, extensions) {
    const files = [];
    const regex = new RegExp(`href="([^"]*\\.(${extensions.join('|')}))"`, 'gi');
    let match;
    
    while ((match = regex.exec(html)) !== null) {
        files.push(match[1]);
    }
    
    return files;
}

// Generate common image names to try
function generateCommonImageNames() {
    const names = [];
    
    // Common patterns
    for (let i = 1; i <= 50; i++) {
        names.push(`image${i}.jpg`);
        names.push(`image${i}.jpeg`);
        names.push(`image${i}.png`);
        names.push(`img${i}.jpg`);
        names.push(`img${i}.jpeg`);
        names.push(`img${i}.png`);
        names.push(`photo${i}.jpg`);
        names.push(`photo${i}.jpeg`);
        names.push(`photo${i}.png`);
    }
    
    return names;
}

// Generate WhatsApp naming patterns
function generateWhatsAppPatterns() {
    const patterns = [];
    
    // WhatsApp Image patterns for July 27, 2025
    for (let hour = 7; hour <= 7; hour++) {
        for (let minute = 20; minute <= 31; minute++) {
            for (let second = 20; second <= 31; second++) {
                patterns.push(`WhatsApp Image 2025-07-27 at ${hour.toString().padStart(2, '0')}.${minute.toString().padStart(2, '0')}.${second.toString().padStart(2, '0')} PM.jpeg`);
                patterns.push(`WhatsApp Image 2025-07-27 at ${hour.toString().padStart(2, '0')}.${minute.toString().padStart(2, '0')}.${second.toString().padStart(2, '0')} PM (1).jpeg`);
                patterns.push(`WhatsApp Image 2025-07-27 at ${hour.toString().padStart(2, '0')}.${minute.toString().padStart(2, '0')}.${second.toString().padStart(2, '0')} PM (2).jpeg`);
            }
        }
    }
    
    return patterns;
}

// Render Gallery
function renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;

    // Clear existing content
    galleryGrid.innerHTML = '';

    // Get current loaded items
    const currentItems = galleryState.loadedImages;

    if (currentItems.length === 0) {
        galleryGrid.innerHTML = `
            <div class="gallery-empty" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                <i class="fas fa-images" style="font-size: 48px; color: #ccc; margin-bottom: 20px;"></i>
                <p style="color: #666; font-size: 18px;">No images found</p>
            </div>
        `;
        return;
    }

    // Create gallery items with staggered animation
    currentItems.forEach((image, index) => {
        const galleryItem = createGalleryItem(image, index);
        galleryGrid.appendChild(galleryItem);
        
        // Add staggered animation delay
        setTimeout(() => {
            galleryItem.style.opacity = '1';
            galleryItem.style.transform = 'translateY(0)';
        }, index * 100); // 100ms delay between each image
    });

    // Trigger masonry layout after images load
    setTimeout(() => {
        handleMasonryLayout();
    }, 100);
}

// Handle Masonry Layout
function handleMasonryLayout() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;

    // Force a reflow to ensure proper masonry layout
    galleryGrid.style.display = 'none';
    galleryGrid.offsetHeight; // Trigger reflow
    galleryGrid.style.display = 'block';
}

// Create Gallery Item
function createGalleryItem(image, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.setAttribute('data-index', index);
    
    item.innerHTML = `
        <img src="${image.src}" alt="${image.title}" loading="lazy" onload="handleImageLoad(this)">
    `;

    // Add click event for lightbox
    item.addEventListener('click', () => openLightbox(index));

    return item;
}

// Handle Image Load for Masonry
function handleImageLoad(img) {
    // Trigger masonry layout adjustment when image loads
    setTimeout(() => {
        handleMasonryLayout();
    }, 50);
}





// Setup Lightbox
function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');

    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => navigateLightbox(-1));
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => navigateLightbox(1));
    }

    // Close on background click
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        
        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                navigateLightbox(-1);
                break;
            case 'ArrowRight':
                navigateLightbox(1);
                break;
        }
    });
}

// Open Lightbox
function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    if (!lightbox || !lightboxImage) return;

    galleryState.currentIndex = index;
    const image = galleryState.images[index]; // Use galleryState.images directly
    
    lightboxImage.src = image.src;
    lightboxImage.alt = image.title;
    lightboxCaption.textContent = ''; // No caption text
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Navigate Lightbox
function navigateLightbox(direction) {
    const newIndex = galleryState.currentIndex + direction;
    
    if (newIndex >= 0 && newIndex < galleryState.images.length) { // Use galleryState.images directly
        openLightbox(newIndex);
    }
}



// Show Loading State
function showLoadingState() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (galleryGrid) {
        galleryGrid.innerHTML = `
            <div class="gallery-loading">
                <div class="loading-spinner"></div>
                <p>Loading gallery...</p>
            </div>
        `;
    }
}

// Hide Loading State
function hideLoadingState() {
    // Loading state is cleared in renderGallery()
}

// Show Error State
function showErrorState() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (galleryGrid) {
        galleryGrid.innerHTML = `
            <div class="gallery-error" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                <i class="fas fa-exclamation-triangle" style="font-size: 48px; color: #e74c3c; margin-bottom: 20px;"></i>
                <p style="color: #666; font-size: 18px;">Failed to load gallery images</p>
                <button class="btn btn-primary" onclick="loadGalleryImages()" style="margin-top: 20px;">Try Again</button>
            </div>
        `;
    }
}

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Prepare email template parameters
        const templateParams = {
            from_name: data.name,
            from_email: data.email,
            phone: data.phone,
            service: data.service,
            message: data.message,
            to_email: 'info@superwaygroup.online'
        };
        
        // Send email using EmailJS
        emailjs.send('service_i71xf3h', 'template_s0gj98c', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
            }, function(error) {
                console.log('FAILED...', error);
                showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
            })
            .finally(function() {
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification styles to head
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(notificationStyles);

// Hover effects for product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Service items hover effects
document.querySelectorAll('.service-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const icon = item.querySelector('.service-icon');
        icon.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    item.addEventListener('mouseleave', () => {
        const icon = item.querySelector('.service-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Logo animation on page load
document.addEventListener('DOMContentLoaded', () => {
    const logoCircle = document.querySelector('.logo-circle');
    const logoLines = document.querySelectorAll('.line');
    
    // Animate logo lines
    logoLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.transform = line.style.transform.replace('scaleX(0)', 'scaleX(1)');
        }, index * 200);
    });
    
    // Add pulse animation to logo
    logoCircle.style.animation = 'pulse 2s ease-in-out infinite';
});

// Add pulse animation
const pulseAnimation = document.createElement('style');
pulseAnimation.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    .line {
        transform-origin: center;
        transform: scaleX(0);
        transition: transform 0.5s ease;
    }
`;
document.head.appendChild(pulseAnimation);

// Scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #e74c3c, #c0392b);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
};

createScrollProgress();

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Enhanced button interactions
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousedown', () => {
        btn.style.transform = 'scale(0.95)';
    });
    
    btn.addEventListener('mouseup', () => {
        btn.style.transform = '';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// Add floating particles to hero section
const createParticles = () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: float-particle ${3 + Math.random() * 4}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
    }
};

// Add particle animation
const particleAnimation = document.createElement('style');
particleAnimation.textContent = `
    @keyframes float-particle {
        0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
        }
        50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
        }
    }
`;
document.head.appendChild(particleAnimation);

createParticles();

// Add smooth reveal animations for sections
const revealSections = () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        sectionObserver.observe(section);
    });
};

revealSections();



// Add smooth hover effects to contact form
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'scale(1)';
    });
});

// Add counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

// Initialize all animations when page is fully loaded
window.addEventListener('load', () => {
    // Add any additional initialization here
    console.log('Superway Group website loaded successfully!');
});

// Set current year in footer
document.addEventListener('DOMContentLoaded', () => {
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
}); 

// Setup Infinite Scroll
function setupInfiniteScroll() {
    // Use Intersection Observer for better performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadMoreImages();
            }
        });
    }, {
        rootMargin: '100px' // Start loading when user is 100px away from the bottom
    });

    // Create a sentinel element at the bottom of the gallery
    const sentinel = document.createElement('div');
    sentinel.id = 'scroll-sentinel';
    sentinel.style.height = '1px';
    sentinel.style.width = '100%';
    
    const galleryContainer = document.querySelector('.gallery-container');
    if (galleryContainer) {
        galleryContainer.appendChild(sentinel);
        observer.observe(sentinel);
    }
}

// Load More Images (Infinite Scroll)
async function loadMoreImages() {
    // Prevent multiple simultaneous loads
    if (galleryState.isLoading) return;
    
    const totalImages = galleryState.images.length;
    const loadedCount = galleryState.loadedImages.length;
    
    // Check if all images are already loaded
    if (loadedCount >= totalImages) return;
    
    galleryState.isLoading = true;

    // Calculate next batch of images
    const startIndex = loadedCount;
    const endIndex = Math.min(startIndex + GALLERY_CONFIG.itemsPerLoad, totalImages);
    const nextBatch = galleryState.images.slice(startIndex, endIndex);

    if (nextBatch.length > 0) {
        // Add new images to loaded images
        galleryState.loadedImages.push(...nextBatch);
        GALLERY_CONFIG.currentLoad++;

        // Render new images with smooth animation
        renderNewImages(nextBatch, startIndex);
    }

    galleryState.isLoading = false;
}

// Render new images with smooth animation
function renderNewImages(newImages, startIndex) {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;

    // Add new images to the grid
    newImages.forEach((image, index) => {
        const galleryItem = createGalleryItem(image, startIndex + index);
        
        // Set initial state for animation
        galleryItem.style.opacity = '0';
        galleryItem.style.transform = 'translateY(30px)';
        
        galleryGrid.appendChild(galleryItem);
        
        // Animate in with delay
        setTimeout(() => {
            galleryItem.style.opacity = '1';
            galleryItem.style.transform = 'translateY(0)';
        }, index * 50); // Faster staggered animation for scroll
    });

    // Move sentinel to the bottom after new images are added
    const sentinel = document.getElementById('scroll-sentinel');
    const galleryContainer = document.querySelector('.gallery-container');
    if (sentinel && galleryContainer) {
        galleryContainer.appendChild(sentinel);
    }

    // Trigger masonry layout
    setTimeout(() => {
        handleMasonryLayout();
    }, newImages.length * 50 + 100);
} 