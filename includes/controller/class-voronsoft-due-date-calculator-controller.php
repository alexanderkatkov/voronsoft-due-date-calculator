<?php

/**
 * Class for displaying different HTML elements
 *
 * @package Voronsoft Due Date Calculator
 * @since 1.0.0
 */
class Fp_vsc_Controller {

	public function get_product_data( ) {

		wp_send_json_success( array(
			'post' => 'hi',
			'period' => 'period',
			'text' => 'texter',
		) );
	}
}
