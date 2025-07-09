<?php
/**
 * Plugin Name:       EMA Modal Plugin
 * Description:       Integrates the interactive EMA Modal into any WordPress site with voice-activated customer assistance.
 * Version:           1.0.8
 * Author:            Solace Technology
 * Author URI:        https://solace.technology/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       ema-modal
 * Requires at least: 5.0
 * Tested up to:      6.4
 * Requires PHP:      7.4
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

// Define plugin constants
define( 'EMA_MODAL_VERSION', '1.0.8' );
define( 'EMA_MODAL_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'EMA_MODAL_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );

// 1. Plugin activation hook
function ema_modal_activate() {
    // Set default options
    $default_options = array(
        'ema_url' => '',
        'theme_color' => '#0066ff',
        'modal_title' => 'EMA – Etkileşimli Müşteri Asistanı',
        'modal_subtitle' => 'Ürünleri bulmanın, sorularınızı sormanın en kolay yolu',
        'brand_name' => get_bloginfo( 'name' ),
    );
    
    if ( ! get_option( 'ema_modal_settings' ) ) {
        add_option( 'ema_modal_settings', $default_options );
    }
}
register_activation_hook( __FILE__, 'ema_modal_activate' );

// 2. Create the Admin Menu item
function ema_modal_options_page_html() {
    if ( ! current_user_can( 'manage_options' ) ) {
        return;
    }

    // Check if settings were saved
    if ( isset( $_GET['settings-updated'] ) ) {
        add_settings_error( 'ema_modal_messages', 'ema_modal_message', __( 'Settings Saved', 'ema-modal' ), 'updated' );
    }

    // Show error messages
    settings_errors( 'ema_modal_messages' );
    
    $options = get_option( 'ema_modal_settings' );
    $ema_url = isset( $options['ema_url'] ) ? $options['ema_url'] : '';
    ?>
    <div class="wrap">
        <h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
        
        <?php if ( empty( $ema_url ) ) : ?>
            <div class="notice notice-warning">
                <p><strong><?php _e( 'EMA Modal is not configured yet!', 'ema-modal' ); ?></strong></p>
                <p><?php _e( 'Please enter your EMA URL below to start using the modal on your website.', 'ema-modal' ); ?></p>
            </div>
        <?php else : ?>
            <div class="notice notice-success">
                <p><strong><?php _e( 'EMA Modal is active!', 'ema-modal' ); ?></strong></p>
                <p><?php _e( 'The EMA modal is now displayed on your website. You can customize the settings below.', 'ema-modal' ); ?></p>
            </div>
        <?php endif; ?>

        <form action="options.php" method="post">
            <?php
            settings_fields( 'ema_modal_options' );
            do_settings_sections( 'ema_modal' );
            submit_button( __( 'Save Settings', 'ema-modal' ) );
            ?>
        </form>
        
        <hr>
        <h2><?php _e( 'How to Use', 'ema-modal' ); ?></h2>
        <p><?php _e( 'Once you enter your EMA URL above, the modal will automatically appear on all pages of your website.', 'ema-modal' ); ?></p>
        <ul>
            <li><?php _e( '• Visitors will see a floating EMA button with the text "💬 Ne arıyorsan, konuş yeter."', 'ema-modal' ); ?></li>
            <li><?php _e( '• The modal automatically opens when users scroll 75% down the page or when they try to leave', 'ema-modal' ); ?></li>
            <li><?php _e( '• Users can click the button to open the modal anytime', 'ema-modal' ); ?></li>
            <li><?php _e( '• The modal provides voice-activated customer assistance through EMA', 'ema-modal' ); ?></li>
        </ul>
    </div>
    <?php
}

function ema_modal_options_page() {
    add_options_page(
        __( 'EMA Modal Settings', 'ema-modal' ),
        __( 'EMA Modal', 'ema-modal' ),
        'manage_options',
        'ema_modal',
        'ema_modal_options_page_html'
    );
}
add_action( 'admin_menu', 'ema_modal_options_page' );

// 3. Register Settings, Sections, and Fields
function ema_modal_register_settings() {
    register_setting( 'ema_modal_options', 'ema_modal_settings', 'ema_modal_sanitize_settings' );

    add_settings_section(
        'ema_modal_section_main',
        __( 'Main Configuration', 'ema-modal' ),
        'ema_modal_section_main_cb',
        'ema_modal'
    );

    add_settings_field(
        'ema_modal_field_url',
        __( 'EMA URL', 'ema-modal' ),
        'ema_modal_field_url_cb',
        'ema_modal',
        'ema_modal_section_main'
    );
    
    add_settings_field(
        'ema_modal_field_themecolor',
        __( 'Theme Color', 'ema-modal' ),
        'ema_modal_field_color_cb',
        'ema_modal',
        'ema_modal_section_main'
    );

    add_settings_field(
        'ema_modal_field_title',
        __( 'Modal Title', 'ema-modal' ),
        'ema_modal_field_title_cb',
        'ema_modal',
        'ema_modal_section_main'
    );

    add_settings_field(
        'ema_modal_field_subtitle',
        __( 'Modal Subtitle', 'ema-modal' ),
        'ema_modal_field_subtitle_cb',
        'ema_modal',
        'ema_modal_section_main'
    );

    add_settings_field(
        'ema_modal_field_brand_name',
        __( 'Brand Name', 'ema-modal' ),
        'ema_modal_field_brand_name_cb',
        'ema_modal',
        'ema_modal_section_main'
    );

    add_settings_field(
        'ema_modal_field_position',
        __( 'Button Position', 'ema-modal' ),
        'ema_modal_field_position_cb',
        'ema_modal',
        'ema_modal_section_main'
    );

    add_settings_field(
        'ema_modal_field_debug_mode',
        __( 'Debug Mode', 'ema-modal' ),
        'ema_modal_field_debug_mode_cb',
        'ema_modal',
        'ema_modal_section_main'
    );

    // Add new section for localization
    add_settings_section(
        'ema_modal_section_localization',
        __( 'Localization for Floating Text', 'ema-modal' ),
        'ema_modal_section_localization_cb',
        'ema_modal'
    );

    $supported_languages = array(
        'en' => 'English',
        'tr' => 'Turkish (Türkçe)',
        'de' => 'German (Deutsch)',
        'ar' => 'Arabic (العربية)',
        'ru' => 'Russian (Русский)',
    );

    foreach ( $supported_languages as $code => $name ) {
        add_settings_field(
            'ema_modal_field_floating_text_' . $code,
            $name,
            'ema_modal_field_localized_text_cb',
            'ema_modal',
            'ema_modal_section_localization',
            array( 'lang_code' => $code ) // Pass language code to the callback
        );
    }
}
add_action( 'admin_init', 'ema_modal_register_settings' );

function ema_modal_section_main_cb() {
    echo '<p>' . __( 'Configure your EMA Modal settings below:', 'ema-modal' ) . '</p>';
}

function ema_modal_field_url_cb() {
    $options = get_option( 'ema_modal_settings' );
    $url = isset( $options['ema_url'] ) ? esc_attr( $options['ema_url'] ) : '';
    echo '<input type="url" name="ema_modal_settings[ema_url]" value="' . $url . '" class="regular-text" placeholder="https://your-ema-instance.com" required>';
    echo '<p class="description">' . __( 'Enter the URL where your EMA instance is hosted. This is required for the modal to work.', 'ema-modal' ) . '</p>';
}

function ema_modal_field_color_cb() {
    $options = get_option( 'ema_modal_settings' );
    $color = isset( $options['theme_color'] ) ? esc_attr( $options['theme_color'] ) : '#0066ff';
    echo '<input type="color" name="ema_modal_settings[theme_color]" value="' . $color . '">';
    echo '<p class="description">' . __( 'Choose the primary color for the EMA button and modal elements.', 'ema-modal' ) . '</p>';
}

function ema_modal_field_title_cb() {
    $options = get_option( 'ema_modal_settings' );
    $title = isset( $options['modal_title'] ) ? esc_attr( $options['modal_title'] ) : 'EMA – Etkileşimli Müşteri Asistanı';
    echo '<input type="text" name="ema_modal_settings[modal_title]" value="' . $title . '" class="regular-text">';
    echo '<p class="description">' . __( 'The main title displayed in the modal.', 'ema-modal' ) . '</p>';
}

function ema_modal_field_subtitle_cb() {
    $options = get_option( 'ema_modal_settings' );
    $subtitle = isset( $options['modal_subtitle'] ) ? esc_attr( $options['modal_subtitle'] ) : 'Ürünleri bulmanın, sorularınızı sormanın en kolay yolu';
    echo '<input type="text" name="ema_modal_settings[modal_subtitle]" value="' . $subtitle . '" class="large-text">';
    echo '<p class="description">' . __( 'The subtitle displayed in the modal. You can use {{brand}} to include your brand name.', 'ema-modal' ) . '</p>';
}

function ema_modal_field_brand_name_cb() {
    $options = get_option( 'ema_modal_settings' );
    $brand_name = isset( $options['brand_name'] ) ? esc_attr( $options['brand_name'] ) : get_bloginfo( 'name' );
    echo '<input type="text" name="ema_modal_settings[brand_name]" value="' . $brand_name . '" class="regular-text">';
    echo '<p class="description">' . __( 'Your brand name, used in modal text and customization.', 'ema-modal' ) . '</p>';
}

function ema_modal_field_position_cb() {
    $options = get_option( 'ema_modal_settings' );
    $position = isset( $options['button_position'] ) ? esc_attr( $options['button_position'] ) : 'auto';
    
    echo '<select name="ema_modal_settings[button_position]">';
    echo '<option value="auto"' . selected( $position, 'auto', false ) . '>' . __( 'Auto-detect (Recommended)', 'ema-modal' ) . '</option>';
    echo '<option value="bottom-right"' . selected( $position, 'bottom-right', false ) . '>' . __( 'Bottom Right (Default)', 'ema-modal' ) . '</option>';
    echo '<option value="bottom-right-high"' . selected( $position, 'bottom-right-high', false ) . '>' . __( 'Bottom Right (Higher Position)', 'ema-modal' ) . '</option>';
    echo '<option value="bottom-left"' . selected( $position, 'bottom-left', false ) . '>' . __( 'Bottom Left', 'ema-modal' ) . '</option>';
    echo '<option value="top-right"' . selected( $position, 'top-right', false ) . '>' . __( 'Top Right', 'ema-modal' ) . '</option>';
    echo '</select>';
    echo '<p class="description">' . __( 'Choose button position. Auto-detect will avoid conflicts with WhatsApp and other floating buttons.', 'ema-modal' ) . '</p>';
}

function ema_modal_field_debug_mode_cb() {
    $options = get_option( 'ema_modal_settings' );
    $debug_mode = isset( $options['debug_mode'] ) ? $options['debug_mode'] : false;
    
    echo '<input type="checkbox" name="ema_modal_settings[debug_mode]" value="1"' . checked( 1, $debug_mode, false ) . '>';
    echo '<p class="description">' . __( 'Enable this to log diagnostic information to the browser console. This is useful for troubleshooting issues.', 'ema-modal' ) . '</p>';
}

function ema_modal_section_localization_cb() {
    echo '<p>' . __( 'Enter the text for the floating button for each language. The plugin will automatically display the correct text based on the site\'s active language.', 'ema-modal' ) . '</p>';
}

function ema_modal_field_localized_text_cb( $args ) {
    $options = get_option( 'ema_modal_settings' );
    $lang_code = $args['lang_code'];
    $field_name = 'floating_text_' . $lang_code;
    $value = isset( $options[$field_name] ) ? esc_attr( $options[$field_name] ) : '';

    // Set default placeholder text
    $placeholders = array(
        'en' => '💬 Whatever you are looking for, just say it.',
        'tr' => '💬 Ne arıyorsan, konuş yeter.',
        'de' => '💬 Was auch immer Sie suchen, sagen Sie es einfach.',
        'ar' => '💬 مهما كان ما تبحث عنه ، فقط قله.',
        'ru' => '💬 Что бы вы ни искали, просто скажите это.',
    );
    $placeholder = isset( $placeholders[$lang_code] ) ? $placeholders[$lang_code] : '';

    echo '<input type="text" name="ema_modal_settings[' . $field_name . ']" value="' . $value . '" class="large-text" placeholder="' . $placeholder . '">';
}

// Sanitize settings
function ema_modal_sanitize_settings( $input ) {
    $sanitized = array();
    
    if ( isset( $input['ema_url'] ) ) {
        $sanitized['ema_url'] = esc_url_raw( $input['ema_url'] );
    }
    
    if ( isset( $input['theme_color'] ) ) {
        $sanitized['theme_color'] = sanitize_hex_color( $input['theme_color'] );
    }
    
    if ( isset( $input['modal_title'] ) ) {
        $sanitized['modal_title'] = sanitize_text_field( $input['modal_title'] );
    }
    
    if ( isset( $input['modal_subtitle'] ) ) {
        $sanitized['modal_subtitle'] = sanitize_text_field( $input['modal_subtitle'] );
    }
    
    if ( isset( $input['brand_name'] ) ) {
        $sanitized['brand_name'] = sanitize_text_field( $input['brand_name'] );
    }
    
    if ( isset( $input['button_position'] ) ) {
        $allowed_positions = array('auto', 'bottom-right', 'bottom-right-high', 'bottom-left', 'top-right');
        $sanitized['button_position'] = in_array( $input['button_position'], $allowed_positions ) 
            ? $input['button_position'] 
            : 'auto';
    }

    if ( isset( $input['debug_mode'] ) ) {
        $sanitized['debug_mode'] = (bool) $input['debug_mode'];
    }

    $supported_languages = array('en', 'tr', 'de', 'ar', 'ru');
    foreach ($supported_languages as $code) {
        $field_name = 'floating_text_' . $code;
        if ( isset( $input[$field_name] ) ) {
            $sanitized[$field_name] = sanitize_text_field( $input[$field_name] );
        }
    }
    
    return $sanitized;
}

// 4. Enqueue Scripts and Styles for the Frontend
function ema_modal_enqueue_assets() {
    // Only enqueue on the public-facing site, not in the admin area
    if ( is_admin() ) {
        return;
    }

    $settings = get_option( 'ema_modal_settings' );
    
    // Don't load if no EMA URL is configured
    if ( empty( $settings['ema_url'] ) ) {
        return;
    }

    $asset_path = EMA_MODAL_PLUGIN_PATH . 'dist/';
    $asset_uri = EMA_MODAL_PLUGIN_URL . 'dist/';

    // Check if compiled assets exist
    if ( ! file_exists( $asset_path . 'ema-modal.css' ) || ! file_exists( $asset_path . 'ema-modal.js' ) ) {
        return;
    }

    // Enqueue CSS
    wp_enqueue_style(
        'ema-modal-style',
        $asset_uri . 'ema-modal.css',
        array(),
        filemtime( $asset_path . 'ema-modal.css' )
    );

    // Enqueue JS
    wp_enqueue_script(
        'ema-modal-script',
        $asset_uri . 'ema-modal.js',
        array(),
        filemtime( $asset_path . 'ema-modal.js' ),
        true // Load in footer
    );

    // Prepare props for React component
    
    // Determine the floating text based on the current locale
    $locale = get_locale(); // e.g., 'tr_TR', 'en_US'
    $lang_code = substr( $locale, 0, 2 ); // e.g., 'tr', 'en'
    
    $floating_text_key = 'floating_text_' . $lang_code;
    
    // Fallback logic: use specific language text, or EN text, or a default
    $default_en_text = isset($settings['floating_text_en']) && !empty($settings['floating_text_en']) ? $settings['floating_text_en'] : '💬 Whatever you are looking for, just say it.';
    $default_tr_text = '💬 Ne arıyorsan, konuş yeter.';

    $floating_text = isset($settings[$floating_text_key]) && !empty($settings[$floating_text_key]) 
        ? $settings[$floating_text_key] 
        : ($lang_code === 'tr' ? $default_tr_text : $default_en_text);

    $props = array(
        'emaUrl'       => $settings['ema_url'],
        'themeColor'   => isset( $settings['theme_color'] ) ? $settings['theme_color'] : '#0066ff',
        'title'        => isset( $settings['modal_title'] ) ? $settings['modal_title'] : 'EMA – Etkileşimli Müşteri Asistanı',
        'subtitle'     => isset( $settings['modal_subtitle'] ) ? $settings['modal_subtitle'] : 'Ürünleri bulmanın, sorularınızı sormanın en kolay yolu',
        'brandName'    => isset( $settings['brand_name'] ) ? $settings['brand_name'] : get_bloginfo( 'name' ),
        'logoSrc'      => EMA_MODAL_PLUGIN_URL . 'assets/ema_logo.png',
        'floatingButtonText' => $floating_text,
        'buttonPosition' => isset( $settings['button_position'] ) ? $settings['button_position'] : 'auto',
        'debugMode'    => isset( $settings['debug_mode'] ) ? (bool) $settings['debug_mode'] : false,
        'ctaLabel'     => 'EMA yı Başlat',
        'socialProof'  => '+1 200 kişi bugün EMA yı kullandı',
    );
    
    wp_localize_script( 'ema-modal-script', 'emaModalProps', $props );
}
add_action( 'wp_enqueue_scripts', 'ema_modal_enqueue_assets' );

// 5. Add the root element for React to mount onto
function ema_modal_add_root_element() {
    // Only on the public-facing site
    if ( is_admin() ) {
        return;
    }
    
    $settings = get_option( 'ema_modal_settings' );
    
    // Don't add if no EMA URL is configured
    if ( empty( $settings['ema_url'] ) ) {
        return;
    }
    
    echo '<div id="ema-modal-root"></div>';
}
add_action( 'wp_footer', 'ema_modal_add_root_element' );

// 6. Admin notices for configuration
function ema_modal_admin_notices() {
    $settings = get_option( 'ema_modal_settings' );
    
    if ( empty( $settings['ema_url'] ) ) {
        $class = 'notice notice-warning';
        $message = sprintf(
            __( 'EMA Modal plugin is installed but not configured. <a href="%s">Configure it now</a> to start using voice-activated customer assistance.', 'ema-modal' ),
            admin_url( 'options-general.php?page=ema_modal' )
        );
        
        printf( '<div class="%1$s"><p>%2$s</p></div>', esc_attr( $class ), $message );
    }
}
add_action( 'admin_notices', 'ema_modal_admin_notices' );

// 7. Plugin deactivation cleanup
function ema_modal_deactivate() {
    // Clean up any transients or cache if needed
    delete_transient( 'ema_modal_cache' );
}
register_deactivation_hook( __FILE__, 'ema_modal_deactivate' );

// 8. Add plugin action links
function ema_modal_action_links( $links ) {
    $settings_link = '<a href="' . admin_url( 'options-general.php?page=ema_modal' ) . '">' . __( 'Settings', 'ema-modal' ) . '</a>';
    array_unshift( $links, $settings_link );
    return $links;
}
add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), 'ema_modal_action_links' ); 