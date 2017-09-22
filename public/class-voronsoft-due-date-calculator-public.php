<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       http://voronsoft.com
 * @since      1.0.0
 *
 * @package    Voronsoft_Due_Date_Calculator
 * @subpackage Voronsoft_Due_Date_Calculator/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Voronsoft_Due_Date_Calculator
 * @subpackage Voronsoft_Due_Date_Calculator/public
 * @author     Alex K. <alexander.katkov@outlook.com>
 */
class Voronsoft_Due_Date_Calculator_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Voronsoft_Due_Date_Calculator_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Voronsoft_Due_Date_Calculator_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url(dirname(__FILE__)) . 'assets/css/voronsoft-due-date-calculator-public.css', array(), $this->version, 'all' );
		wp_enqueue_style( $this->plugin_name, plugin_dir_url(dirname(__FILE__)) . 'assets/css/voronsoft-due-date-calculator-public.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Voronsoft_Due_Date_Calculator_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Voronsoft_Due_Date_Calculator_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		 wp_enqueue_script( 'date-calculator-vendor', plugin_dir_url(dirname(__FILE__)) . 'assets/js/voronsoft-due-date-calculator-vendor.js', array( 'jquery' ), $this->version, true );
		 wp_enqueue_script( $this->plugin_name, plugin_dir_url(dirname(__FILE__)) . 'assets/js/voronsoft-due-date-calculator-public.js', array( 'date-calculator-vendor' ), $this->version, true );

		$flatpyramid_l10n = array(
			'ajax_url' => admin_url('admin-ajax.php'),
		);

		wp_localize_script('voronsoft-due-date-calculator', 'flatpyramid_l10n', $flatpyramid_l10n);

	}

}
