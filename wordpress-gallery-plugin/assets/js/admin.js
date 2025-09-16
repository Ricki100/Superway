jQuery(document).ready(function($) {
    'use strict';
    
    let mediaUploader;
    
    // Create gallery button
    $('#create-gallery-btn, #create-first-gallery').on('click', function() {
        $('#modal-title').text('Create New Gallery');
        $('#gallery-id').val('');
        $('#gallery-name').val('');
        $('#gallery-images').val('');
        $('#selected-images').empty();
        $('#superway-gallery-modal').show();
    });
    
    // Edit gallery button
    $(document).on('click', '.superway-edit-gallery', function() {
        const galleryId = $(this).data('gallery-id');
        
        $.post(superway_ajax.ajax_url, {
            action: 'superway_get_gallery',
            nonce: superway_ajax.nonce,
            gallery_id: galleryId
        }, function(response) {
            if (response.success) {
                const gallery = response.data;
                $('#modal-title').text('Edit Gallery');
                $('#gallery-id').val(galleryId);
                $('#gallery-name').val(gallery.name);
                $('#gallery-images').val(gallery.images.join(','));
                
                // Show selected images
                const selectedImages = $('#selected-images');
                selectedImages.empty();
                
                gallery.images.forEach(function(imageId) {
                    const image = wp.media.attachment(imageId);
                    image.fetch().done(function() {
                        const imageData = image.toJSON();
                        selectedImages.append('<img src="' + imageData.sizes.thumbnail.url + '" class="superway-selected-image" data-id="' + imageId + '" />');
                    });
                });
                
                $('#superway-gallery-modal').show();
            }
        });
    });
    
    // Delete gallery button
    $(document).on('click', '.superway-delete-gallery', function() {
        if (confirm('Are you sure you want to delete this gallery?')) {
            const galleryId = $(this).data('gallery-id');
            
            $.post(superway_ajax.ajax_url, {
                action: 'superway_delete_gallery',
                nonce: superway_ajax.nonce,
                gallery_id: galleryId
            }, function(response) {
                if (response.success) {
                    location.reload();
                } else {
                    alert('Error: ' + response.data);
                }
            });
        }
    });
    
    // Copy shortcode button
    $(document).on('click', '.superway-copy-shortcode', function() {
        const shortcode = $(this).data('shortcode');
        navigator.clipboard.writeText(shortcode).then(function() {
            // Show success message
            const button = $(this);
            const originalText = button.html();
            button.html('<span class="dashicons dashicons-yes"></span>');
            setTimeout(function() {
                button.html(originalText);
            }, 2000);
        }.bind(this));
    });
    
    // Select images button
    $('#select-images').on('click', function(e) {
        e.preventDefault();
        
        if (mediaUploader) {
            mediaUploader.open();
            return;
        }
        
        mediaUploader = wp.media({
            title: 'Select Images for Gallery',
            button: {
                text: 'Add to Gallery'
            },
            multiple: true,
            library: {
                type: 'image'
            }
        });
        
        mediaUploader.on('select', function() {
            const selection = mediaUploader.state().get('selection');
            const images = [];
            const selectedImages = $('#selected-images');
            
            selectedImages.empty();
            
            selection.map(function(attachment) {
                const image = attachment.toJSON();
                images.push(image.id);
                selectedImages.append('<img src="' + image.sizes.thumbnail.url + '" class="superway-selected-image" data-id="' + image.id + '" />');
            });
            
            $('#gallery-images').val(images.join(','));
        });
        
        mediaUploader.open();
    });
    
    // Gallery form submission
    $('#superway-gallery-form').on('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            action: 'superway_create_gallery',
            nonce: superway_ajax.nonce,
            gallery_name: $('#gallery-name').val(),
            gallery_images: $('#gallery-images').val(),
            gallery_id: $('#gallery-id').val()
        };
        
        $.post(superway_ajax.ajax_url, formData, function(response) {
            if (response.success) {
                location.reload();
            } else {
                alert('Error: ' + response.data);
            }
        });
    });
    
    // Close modal
    $('.superway-modal-close, .superway-modal').on('click', function(e) {
        if (e.target === this) {
            $('#superway-gallery-modal').hide();
        }
    });
    
    // Prevent modal close when clicking inside
    $('.superway-modal-content').on('click', function(e) {
        e.stopPropagation();
    });
});