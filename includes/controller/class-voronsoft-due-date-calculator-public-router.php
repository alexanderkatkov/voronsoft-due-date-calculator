<?php

/**
 * Class Flatpyramid Public Router
 *
 * @package flatpyramid
 * @since 1.0.0
 */
class Flatpyramid_Public_Router {
	/**
	 * Array of allowed actions list.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      array $allowed_actions Allowed actions list.
	 */


	private $request = array();

	public function __construct() {
		add_action( 'wp_ajax_handle_request', array( $this, 'handle_request' ) );
		add_action( 'wp_ajax_nopriv_handle_request', array( $this, 'handle_request' ) );
	}

	public static function fp_public_router_register() {
		return new static();
	}

	public function handle_request() {
		$action        = $_POST['vs_action'];
		$this->request = $_POST['vs_data'];
		$this->$action();
	}

	public function wpa_49691(){
		$whatever = $_POST['whatever'];
		update_option( 'voronsoft_due_date_calc_option', $whatever );
		wp_send_json_success(array(
			'message' => __( 'Settings Saved', 'voronsoft-due-date-calculator' ),
		));
	}

	public function wautop(&$item1, $key) {
		$item1["Text"] = wpautop( stripslashes ( $item1["Text"] ) );
	}

	public function sendDb() {
		$hi = get_option('voronsoft_due_date_calc_option', $whatever);
		array_walk($hi, array( $this, "wautop" ));
		// var_dump($hi);
			wp_send_json_success(array(
				'var' => $hi,
			));
	}

	private function get_product_data() {
		$controller = new Fp_Woocommerce_Controller();
		$controller->get_product_data( $this->request );
	}
}
