<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              http://voronsoft.com
 * @since             1.0.0
 * @package           Voronsoft_Due_Date_Calculator
 *
 * @wordpress-plugin
 * Plugin Name:       Voronsoft Due Date Calculator
 * Plugin URI:        http://voronsoft.com
 * Description:       This is a short description of what the plugin does. It's displayed in the WordPress admin area.
 * Version:           1.0.0
 * Author:            Alex K.
 * Author URI:        http://voronsoft.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       voronsoft-due-date-calculator
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-voronsoft-due-date-calculator-activator.php
 */
function activate_voronsoft_due_date_calculator() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-voronsoft-due-date-calculator-activator.php';
	Voronsoft_Due_Date_Calculator_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-voronsoft-due-date-calculator-deactivator.php
 */
function deactivate_voronsoft_due_date_calculator() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-voronsoft-due-date-calculator-deactivator.php';
	Voronsoft_Due_Date_Calculator_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_voronsoft_due_date_calculator' );
register_deactivation_hook( __FILE__, 'deactivate_voronsoft_due_date_calculator' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-voronsoft-due-date-calculator.php';

require_once plugin_dir_path( __FILE__ ) . 'public/shortcode.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_voronsoft_due_date_calculator() {

	$plugin = new Voronsoft_Due_Date_Calculator();
	$plugin->run();

}
run_voronsoft_due_date_calculator();
