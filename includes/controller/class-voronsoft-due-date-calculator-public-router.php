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
		$option = $_POST['option'];
		update_option( 'voronsoft_due_date_calc_option', $option );
		wp_send_json_success(array(
			'message' => __( 'Settings Saved', 'voronsoft-due-date-calculator' ),
		));
	}

	public function wautop(&$item1, $key) {
		$item1["Text"] = wpautop( stripslashes ( $item1["Text"] ) );
	}

	public function sendDb() {
		$getOption = get_option('voronsoft_due_date_calc_option', $option);
		array_walk($getOption, array( $this, "wautop" ));
		wp_send_json_success(array(
			'var' => $getOption,
		));
	}

	public function formFilter() {
		$weekCount = $_POST['weekCount'];
		$form = get_option('voronsoft_due_date_calc_option');
		array_walk($form, array( $this, "wautop" ));
		$new = array_filter($form, function($v, $k) use ($weekCount) {			
			return $v["Weeks"] == $weekCount;
		}, ARRAY_FILTER_USE_BOTH );
		$new = array_values($new);
		$text = $new[0]["Text"];
		wp_send_json_success(array(
			'form' => $text,
		));
	}

	private function get_product_data() {
		$controller = new Fp_vsc_Controller();
		$controller->get_product_data( $this->request );
	}
}
