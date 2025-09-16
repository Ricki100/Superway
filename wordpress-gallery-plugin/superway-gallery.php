<?php
/**
 * Plugin Name: Superway Gallery
 * Plugin URI: https://github.com/yourusername/superway-gallery
 * Description: Simple gallery plugin with mosaic layout and multiple shortcodes - just like 10Web Photo Gallery
 * Version: 3.0.0
 * Author: Your Name
 * License: GPL v2 or later
 * Text Domain: superway-gallery
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('SUPERWAY_GALLERY_VERSION', '3.0.0');
define('SUPERWAY_GALLERY_PLUGIN_URL', plugin_dir_url(__FILE__));
define('SUPERWAY_GALLERY_PLUGIN_PATH', plugin_dir_path(__FILE__));

class SuperwayGallery {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_shortcode('superway_gallery', array($this, 'gallery_shortcode'));
        
        // AJAX handlers
        add_action('wp_ajax_superway_create_gallery', array($this, 'ajax_create_gallery'));
        add_action('wp_ajax_superway_delete_gallery', array($this, 'ajax_delete_gallery'));
        add_action('wp_ajax_superway_get_gallery', array($this, 'ajax_get_gallery'));
    }
    
    public function init() {
        load_plugin_textdomain('superway-gallery', false, dirname(plugin_basename(__FILE__)) . '/languages');
    }
    
    public function enqueue_scripts() {
        wp_enqueue_style('superway-gallery-style', SUPERWAY_GALLERY_PLUGIN_URL . 'assets/css/gallery.css', array(), SUPERWAY_GALLERY_VERSION);
        wp_enqueue_script('superway-gallery-script', SUPERWAY_GALLERY_PLUGIN_URL . 'assets/js/gallery.js', array('jquery'), SUPERWAY_GALLERY_VERSION, true);
        
        if (is_admin()) {
            wp_enqueue_media();
            wp_enqueue_script('superway-gallery-admin', SUPERWAY_GALLERY_PLUGIN_URL . 'assets/js/admin.js', array('jquery', 'media-upload'), SUPERWAY_GALLERY_VERSION, true);
            wp_localize_script('superway-gallery-admin', 'superway_ajax', array(
                'ajax_url' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('superway_gallery_nonce')
            ));
        }
    }
    
    public function add_admin_menu() {
        add_menu_page(
            'Superway Gallery',
            'Gallery',
            'manage_options',
            'superway-gallery',
            array($this, 'admin_page'),
            'dashicons-format-gallery',
            30
        );
    }
    
    public function admin_page() {
        $galleries = get_option('superway_galleries', array());
        ?>
        <div class="wrap">
            <h1>Superway Gallery</h1>
            
            <div class="superway-dashboard">
                <div class="superway-header">
                    <h2>Your Galleries</h2>
                    <button id="create-gallery-btn" class="button button-primary">
                        <span class="dashicons dashicons-plus"></span> Create New Gallery
                    </button>
                </div>
                
                <div class="superway-galleries-grid">
                    <?php if (empty($galleries)): ?>
                        <div class="superway-empty-state">
                            <div class="superway-empty-icon">
                                <span class="dashicons dashicons-format-gallery"></span>
                            </div>
                            <h3>No galleries yet</h3>
                            <p>Create your first gallery to get started</p>
                            <button id="create-first-gallery" class="button button-primary">Create Gallery</button>
                        </div>
                    <?php else: ?>
                        <?php foreach ($galleries as $id => $gallery): ?>
                            <div class="superway-gallery-card" data-gallery-id="<?php echo esc_attr($id); ?>">
                                <div class="superway-gallery-preview">
                                    <?php if (!empty($gallery['images'])): ?>
                                        <?php 
                                        $first_image = wp_get_attachment_image_src($gallery['images'][0], 'medium');
                                        if ($first_image): ?>
                                            <img src="<?php echo esc_url($first_image[0]); ?>" alt="Gallery Preview" />
                                        <?php endif; ?>
                                    <?php else: ?>
                                        <div class="superway-no-images">
                                            <span class="dashicons dashicons-format-image"></span>
                                        </div>
                                    <?php endif; ?>
                                    <div class="superway-gallery-overlay">
                                        <button class="superway-edit-gallery" data-gallery-id="<?php echo esc_attr($id); ?>">
                                            <span class="dashicons dashicons-edit"></span>
                                        </button>
                                        <button class="superway-delete-gallery" data-gallery-id="<?php echo esc_attr($id); ?>">
                                            <span class="dashicons dashicons-trash"></span>
                                        </button>
                                    </div>
                                </div>
                                <div class="superway-gallery-info">
                                    <h3><?php echo esc_html($gallery['name']); ?></h3>
                                    <p><?php echo count($gallery['images']); ?> images</p>
                                    <div class="superway-gallery-shortcode">
                                        <code>[superway_gallery id="<?php echo esc_attr($id); ?>"]</code>
                                        <button class="superway-copy-shortcode" data-shortcode='[superway_gallery id="<?php echo esc_attr($id); ?>"]'>
                                            <span class="dashicons dashicons-clipboard"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </div>
            </div>
        </div>
        
        <!-- Create/Edit Gallery Modal -->
        <div id="superway-gallery-modal" class="superway-modal" style="display: none;">
            <div class="superway-modal-content">
                <div class="superway-modal-header">
                    <h2 id="modal-title">Create New Gallery</h2>
                    <button class="superway-modal-close">&times;</button>
                </div>
                <div class="superway-modal-body">
                    <form id="superway-gallery-form">
                        <input type="hidden" id="gallery-id" name="gallery_id" value="">
                        <table class="form-table">
                            <tr>
                                <th scope="row">
                                    <label for="gallery-name">Gallery Name</label>
                                </th>
                                <td>
                                    <input type="text" id="gallery-name" name="gallery_name" class="regular-text" placeholder="Enter gallery name" required />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <label for="gallery-images">Images</label>
                                </th>
                                <td>
                                    <button type="button" id="select-images" class="button">
                                        <span class="dashicons dashicons-format-image"></span> Select Images
                                    </button>
                                    <div id="selected-images" class="superway-selected-images"></div>
                                    <input type="hidden" id="gallery-images" name="gallery_images" value="">
                                </td>
                            </tr>
                        </table>
                        <div class="superway-modal-footer">
                            <button type="button" class="button superway-modal-close">Cancel</button>
                            <button type="submit" class="button button-primary">Save Gallery</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
        <style>
        .superway-dashboard {
            max-width: 1200px;
        }
        .superway-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid #ddd;
        }
        .superway-galleries-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
        }
        .superway-gallery-card {
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            transition: transform 0.2s;
        }
        .superway-gallery-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        .superway-gallery-preview {
            position: relative;
            height: 200px;
            overflow: hidden;
        }
        .superway-gallery-preview img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .superway-no-images {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            background: #f9f9f9;
            color: #999;
        }
        .superway-no-images .dashicons {
            font-size: 48px;
        }
        .superway-gallery-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            opacity: 0;
            transition: opacity 0.2s;
        }
        .superway-gallery-card:hover .superway-gallery-overlay {
            opacity: 1;
        }
        .superway-gallery-overlay button {
            background: #fff;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background 0.2s;
        }
        .superway-gallery-overlay button:hover {
            background: #f0f0f0;
        }
        .superway-gallery-info {
            padding: 20px;
        }
        .superway-gallery-info h3 {
            margin: 0 0 10px 0;
            font-size: 18px;
        }
        .superway-gallery-info p {
            margin: 0 0 15px 0;
            color: #666;
        }
        .superway-gallery-shortcode {
            display: flex;
            align-items: center;
            gap: 10px;
            background: #f9f9f9;
            padding: 10px;
            border-radius: 4px;
        }
        .superway-gallery-shortcode code {
            flex: 1;
            background: none;
            padding: 0;
            font-size: 12px;
        }
        .superway-copy-shortcode {
            background: #0073aa;
            color: #fff;
            border: none;
            border-radius: 4px;
            padding: 5px;
            cursor: pointer;
        }
        .superway-empty-state {
            text-align: center;
            padding: 60px 20px;
            grid-column: 1 / -1;
        }
        .superway-empty-icon {
            font-size: 64px;
            color: #ddd;
            margin-bottom: 20px;
        }
        .superway-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 100000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .superway-modal-content {
            background: #fff;
            border-radius: 8px;
            width: 90%;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
        }
        .superway-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid #ddd;
        }
        .superway-modal-close {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
        }
        .superway-modal-body {
            padding: 20px;
        }
        .superway-selected-images {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 10px;
        }
        .superway-selected-image {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 4px;
            border: 2px solid #ddd;
        }
        .superway-modal-footer {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            padding: 20px;
            border-top: 1px solid #ddd;
        }
        </style>
        <?php
    }
    
    public function gallery_shortcode($atts) {
        $atts = shortcode_atts(array(
            'id' => '',
            'columns' => 3
        ), $atts);
        
        if (empty($atts['id'])) {
            return '<p style="color: red;">Gallery ID is required. Use: [superway_gallery id="gallery_id"]</p>';
        }
        
        $galleries = get_option('superway_galleries', array());
        
        if (!isset($galleries[$atts['id']])) {
            return '<p style="color: red;">Gallery not found. Please check the gallery ID.</p>';
        }
        
        $gallery = $galleries[$atts['id']];
        $images = $gallery['images'];
        
        if (empty($images)) {
            return '<p style="color: red;">No images found in this gallery.</p>';
        }
        
        $columns = intval($atts['columns']);
        $columns_class = 'superway-columns-' . $columns;
        
        $output = '<div class="superway-gallery superway-mosaic ' . $columns_class . '">';
        
        foreach ($images as $image_id) {
            $image = wp_get_attachment_image_src($image_id, 'large');
            $image_alt = get_post_meta($image_id, '_wp_attachment_image_alt', true);
            $image_title = get_the_title($image_id);
            
            if ($image) {
                $output .= '<div class="superway-gallery-item">';
                $output .= '<img src="' . esc_url($image[0]) . '" alt="' . esc_attr($image_alt ?: $image_title) . '" loading="lazy" />';
                $output .= '<div class="superway-gallery-overlay">';
                $output .= '<span class="superway-gallery-zoom">🔍</span>';
                $output .= '</div>';
                $output .= '</div>';
            }
        }
        
        $output .= '</div>';
        
        return $output;
    }
    
    public function ajax_create_gallery() {
        if (!wp_verify_nonce($_POST['nonce'], 'superway_gallery_nonce') || !current_user_can('manage_options')) {
            wp_die('Unauthorized');
        }
        
        $gallery_name = sanitize_text_field($_POST['gallery_name']);
        $gallery_images = sanitize_text_field($_POST['gallery_images']);
        $gallery_id = sanitize_text_field($_POST['gallery_id']);
        
        if (empty($gallery_name) || empty($gallery_images)) {
            wp_send_json_error('Gallery name and images are required');
        }
        
        $galleries = get_option('superway_galleries', array());
        
        if (empty($gallery_id)) {
            $gallery_id = 'gallery_' . time() . '_' . wp_generate_password(6, false);
        }
        
        $galleries[$gallery_id] = array(
            'name' => $gallery_name,
            'images' => explode(',', $gallery_images),
            'created' => current_time('mysql')
        );
        
        update_option('superway_galleries', $galleries);
        
        wp_send_json_success(array(
            'gallery_id' => $gallery_id,
            'message' => 'Gallery created successfully'
        ));
    }
    
    public function ajax_delete_gallery() {
        if (!wp_verify_nonce($_POST['nonce'], 'superway_gallery_nonce') || !current_user_can('manage_options')) {
            wp_die('Unauthorized');
        }
        
        $gallery_id = sanitize_text_field($_POST['gallery_id']);
        $galleries = get_option('superway_galleries', array());
        
        if (isset($galleries[$gallery_id])) {
            unset($galleries[$gallery_id]);
            update_option('superway_galleries', $galleries);
            wp_send_json_success('Gallery deleted successfully');
        } else {
            wp_send_json_error('Gallery not found');
        }
    }
    
    public function ajax_get_gallery() {
        if (!wp_verify_nonce($_POST['nonce'], 'superway_gallery_nonce') || !current_user_can('manage_options')) {
            wp_die('Unauthorized');
        }
        
        $gallery_id = sanitize_text_field($_POST['gallery_id']);
        $galleries = get_option('superway_galleries', array());
        
        if (isset($galleries[$gallery_id])) {
            wp_send_json_success($galleries[$gallery_id]);
        } else {
            wp_send_json_error('Gallery not found');
        }
    }
}

// Initialize the plugin
new SuperwayGallery();