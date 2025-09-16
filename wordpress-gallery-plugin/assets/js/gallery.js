jQuery(document).ready(function($) {
    'use strict';
    
    // Initialize galleries
    $('.superway-gallery').each(function() {
        const gallery = $(this);
        const items = gallery.find('.superway-gallery-item');
        
        if (items.length === 0) return;
        
        // Add click handlers to gallery items
        items.on('click', function() {
            const index = items.index(this);
            openLightbox(gallery, index);
        });
        
        // Add keyboard navigation
        items.on('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const index = items.index(this);
                openLightbox(gallery, index);
            }
        });
    });
    
    function openLightbox(gallery, startIndex) {
        const items = gallery.find('.superway-gallery-item');
        const images = items.find('img');
        
        if (images.length === 0) return;
        
        // Create lightbox modal
        let lightbox = $('#superway-lightbox-modal');
        if (lightbox.length === 0) {
            lightbox = $('<div id="superway-lightbox-modal" class="superway-lightbox-modal"></div>');
            $('body').append(lightbox);
        }
        
        // Create lightbox content
        const content = $(`
            <div class="superway-lightbox-content">
                <button class="superway-lightbox-close">&times;</button>
                <button class="superway-lightbox-nav superway-lightbox-prev">‹</button>
                <button class="superway-lightbox-nav superway-lightbox-next">›</button>
                <div class="superway-lightbox-image-container"></div>
                <div class="superway-lightbox-counter"></div>
            </div>
        `);
        
        lightbox.html(content);
        
        let currentIndex = startIndex;
        
        function showImage(index) {
            const image = images.eq(index);
            const imageSrc = image.attr('src');
            const imageAlt = image.attr('alt');
            
            const imageContainer = lightbox.find('.superway-lightbox-image-container');
            imageContainer.html(`<img src="${imageSrc}" alt="${imageAlt}" />`);
            
            const counter = lightbox.find('.superway-lightbox-counter');
            counter.text(`${index + 1} / ${images.length}`);
            
            // Update navigation buttons
            lightbox.find('.superway-lightbox-prev').toggle(index > 0);
            lightbox.find('.superway-lightbox-next').toggle(index < images.length - 1);
        }
        
        function nextImage() {
            if (currentIndex < images.length - 1) {
                currentIndex++;
                showImage(currentIndex);
            }
        }
        
        function prevImage() {
            if (currentIndex > 0) {
                currentIndex--;
                showImage(currentIndex);
            }
        }
        
        // Event handlers
        lightbox.find('.superway-lightbox-close').on('click', function() {
            lightbox.removeClass('active');
        });
        
        lightbox.find('.superway-lightbox-prev').on('click', prevImage);
        lightbox.find('.superway-lightbox-next').on('click', nextImage);
        
        lightbox.on('click', function(e) {
            if (e.target === this) {
                lightbox.removeClass('active');
            }
        });
        
        // Keyboard navigation
        $(document).on('keydown.lightbox', function(e) {
            switch(e.key) {
                case 'Escape':
                    lightbox.removeClass('active');
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    prevImage();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    nextImage();
                    break;
            }
        });
        
        // Clean up keyboard events when lightbox is closed
        lightbox.on('click', '.superway-lightbox-close', function() {
            $(document).off('keydown.lightbox');
        });
        
        // Show the lightbox
        showImage(currentIndex);
        lightbox.addClass('active');
        
        // Focus management
        lightbox.find('.superway-lightbox-close').focus();
    }
    
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        $('.superway-gallery img[data-src]').each(function() {
            imageObserver.observe(this);
        });
    }
    
    // Smooth scrolling for gallery items
    $('.superway-gallery-item').on('click', function(e) {
        e.preventDefault();
    });
    
    // Add loading states
    $('.superway-gallery img').on('load', function() {
        $(this).closest('.superway-gallery-item').addClass('loaded');
    });
    
    $('.superway-gallery img').on('error', function() {
        $(this).closest('.superway-gallery-item').addClass('error');
    });
});