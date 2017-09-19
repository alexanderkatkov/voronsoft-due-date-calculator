<?php

/**
 * Create plugin options page
 *
 * @link       http://voronsoft.com
 * @since      1.0.0
 *
 * @package    Voronsoft_Due_Date_Calculator
 * @subpackage Voronsoft_Due_Date_Calculator/includes/admin/options
 */

/**
 * Fired during plugin activation.
 *
 * This class defines methods & properties which handle options page logic
 *
 * @since      1.0.0
 * @package    Voronsoft_Due_Date_Calculator
 * @subpackage Voronsoft_Due_Date_Calculator/includes/admin/options
 * @author     Alex K. <alexander.katkov@outlook.com>
 */
class Voronsoft_Due_Date_Calculator_Options_Page {

	/**
	 * Holds the values to be used in the fields callbacks.
	 *
	 * @since   1.0.0
	 * @access  private
	 * @var		array   $options    Holds array of value options.
	 */
	private $options;

	/**
	 * Initialize options page.
	 *
	 * @since   1.0.0
	 */
	public function __construct() {
		add_action( 'admin_menu', array( $this, 'add_plugin_page' ) );
		add_action( 'admin_init', array( $this, 'page_init' ) );
	}

	/**
	 * Add options page
	 *
	 * @since 1.0.0
	 */
	public function add_plugin_page() {
		// This page will be under "Settings".
		add_options_page(
			'Settings Admin',
			__( 'Due Date Calculator','voronsoft-due-date-calculator' ),
			'manage_options',
			'voronsoft-due-date-calculator-settings',
			array( $this, 'create_admin_page' )
		);

	}


	/**
	 * Options page callback
	 *
	 * @since 1.0.0
	 */
	public function create_admin_page() {
		$this->options = get_option( 'voronsoft_due_date_calc_option' );
		
		?>

		<div class="wrap">

			<h1><?php _e( 'Due Date Calculator Settings', 'voronsoft-due-date-calculator' ) ?></h1>
            <div id="hello"></div>


            <template id="productrow" class="hide">
				<tr class="form__line_clone type-row">
					<td>
						<input class="field_date form__field_validation"  name="vddc_period_dates[]" type="text" value="">
						<div class="error-wrap"></div>
					</td>
					<td>
						<textarea class="field_text_new"  id="" name="post_text"></textarea>
						<div class="error-wrap"></div>
					</td>
					<td>
						<a class="button_delete minus" href="#minus" targetDiv="" data-id="0">
							<span class="bg" id="minus"></span>
							<span class="symbol"></span>
						</a>
					</td>
				</tr>
            </template>
            <button id="form-button__clone" class="button button-primary">Add Row</button>

			
			<form id="vddc-settings-form" method="post" action="options.php">
                <div id="form__option_saved"><h2></h2></div>
				<?php

				// This prints out all hidden setting fields.
				settings_fields( 'voronsoft_due_date_calc_option_group' ); ?>

				<table id="js-vddc-setting-table" class="form-table">
					<thead>
						<tr class="form__line_header">
							<th>Period</th>
							<th>Period Text</th>
						</tr>
					</thead>
					<tbody>
						<?php // @todo Fields must be rendered via AJAX ! ?>
						<!-- Table demo -->
						
					</tbody>

				</table>
				<button id="js-vddc-submit" class="button button-primary">
                    <?php _e( 'Save Settings', 'voronsoft-due-date-calculator' ); ?>
                </button>
			</form>

		</div>
		<?php
	}

	/**
	 * Register and add settings
	 *
	 * @since 1.0.0
	 */
	public function page_init() {
		// No need for sanitize. Options will be processed via ajax.
		register_setting(
			'voronsoft_due_date_calc_option_group',
			'voronsoft_due_date_calc_option'
		);

		// Let's introduce a section to be rendered on the options page.
		add_settings_section(
			'voronsoft_due_date_calc_option_group',
			__( 'Due date post to date assotioation', 'voronsoft-due-date-calculator' ),
			array( $this, 'print_section_info' ),
			'voronsoft-due-date-calculator-settings'
		);

		add_settings_field(
			'vddc_period_dates', // ID
			__( 'Period', 'voronsoft-due-date-calculator' ), 	// Title.
			array( $this, 'vddc_period_dates_callback' ), 		// Callback.
			'voronsoft-due-date-calculator-settings', 			// Page.
			'voronsoft_due_date_calc_option_group' 				// Section.
		);

		add_settings_field(
			'vddc_posts_ids', // ID
			__( 'Posts', 'voronsoft-due-date-calculator' ), 	// Title.
			array( $this, 'vddc_posts_ids_callback' ), 			// Callback.
			'voronsoft-due-date-calculator-settings', 			// Page.
			'voronsoft_due_date_calc_option_group' 				// Section.
		);

		add_settings_field(
			'vddc_period_text', // ID
			__( 'Period Text', 'voronsoft-due-date-calculator' ), 	// Title.
			array( $this, 'vddc_period_text_callback' ), 			// Callback.
			'voronsoft-due-date-calculator-settings', 				// Page.
			'voronsoft_due_date_calc_option_group' 					// Section.
		);
	}

	// This functions dont make any sense as all settings will be rendered via ajax.
	public function vddc_period_dates_callback() {}
	public function vddc_posts_ids_callback() {}
	public function vddc_period_text_callback() {}

	/**
	 * Print the Section text
	 *
	 * @since 1.0.0
	 */
	public function print_section_info() {
		_e( 'Enter your settings below:', 'voronsoft-due-date-calculator' );
	}

	/**
	 * Init options page
	 *
	 * @since 1.0.0
	 */
	public static function init() {
		return new static();
	}

}
