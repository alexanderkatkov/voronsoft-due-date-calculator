( function( $ ) {
	"use strict";

	/**
	 * All of the code for your public-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */
$( document ).ready( function() {
	var form = $( "#calculator" ),
		submit = form.find( "input[type='submit']" ),
		inputWeeks = form.find( ".form__weeks" ),
		sendText = form.find( ".post" );

	// $.datepicker.setDefaults({
	// 	showOn: "button",
	// 	buttonImage: "/img/calendar.svg",
	// 	dateFormat: 'dd-mm-yy',
	// 	firstDay: 1,
	// 	showAnim: 'slideDown',
	// 	isRTL: false,
	// 	showMonthAfterYear: false,
	// 	yearSuffix: ''
	// } );

	// $( ".date, .datepicker" ).datepicker( { dateFormat: "dd/mm/yy" } );
	$( "#calendar" ).pignoseCalendar( {
		modal: true,
		buttons: true,
		apply: function( date ) {
			var b = date[ 0 ];
			var date = moment( new Date() );			
			var sip = date.diff( b, "d");
			var weeks = Math.floor(sip/7);
			var days = weeks*7;
			var current = sip - days;
			var text = weeks + " week and " + current + " days";
			console.log( text );
			var birthday = b.add(281, "days").format("MMMM DD, YYYY");

			console.log( birthday );

			$( ".form__todate" ).append( text );
			$( ".form__birthday" ).val( birthday );
			$( ".form__weeks" ).val( weeks );
		}
	} );

	submit.click( function( e ) {
		e.preventDefault();
		$( sendText ).empty();
		var weeks = inputWeeks.val();
		console.log( weeks );
		var weekHandler = $.ajax( {
			type: "POST",
			url: flatpyramid_l10n.ajax_url,
			data: {
				action: "handle_request",
				vs_action: "formFilter",
				weekCount: weeks
			},
			success: function( response ) {
				console.log( response );
				$( sendText ).append( response.data.form );
			}
		} );
	} );

} );
} )( jQuery );
//# sourceMappingURL=voronsoft-due-date-calculator-public.js.map
