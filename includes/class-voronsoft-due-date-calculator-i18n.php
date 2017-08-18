<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       http://voronsoft.com
 * @since      1.0.0
 *
 * @package    Voronsoft_Due_Date_Calculator
 * @subpackage Voronsoft_Due_Date_Calculator/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Voronsoft_Due_Date_Calculator
 * @subpackage Voronsoft_Due_Date_Calculator/includes
 * @author     Alex K. <alexander.katkov@outlook.com>
 */
class Voronsoft_Due_Date_Calculator_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'voronsoft-due-date-calculator',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
