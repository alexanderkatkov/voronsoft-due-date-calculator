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
	var form = $( ".vsc__wrapper" ),
		inputWeeks = form.find( ".vsc__weeks" ),
		sendText = form.find( ".vsc__post" );

	$( ".calendar" ).pignoseCalendar( {
		theme: "blue",
		modal: true,
		buttons: true,
		maxDate: moment( new Date() ),
		minDate: moment( new Date() ).subtract( 301, "days" ),
		apply: function( date ) {

			//Clear div's

			$( ".vsc__date" ).empty();
			$( ".vsc__todate" ).empty();
			$( ".vsc__birthday" ).empty();

			//Variables

			var dateNow, sip, weeks, days, current, text, birthday, birthOutput, b;

			//Get date from Calendar
			
			b = moment( date[ 0 ]._i );
			$( ".vsc__date" ).append( b.format( "MMMM DD, YYYY" ) );
			dateNow = moment( new Date() );
			sip = dateNow.diff( b, "d" );
			$( ".vsc__error" ).fadeOut();
			weeks = Math.floor( sip / 7 );
			days = weeks * 7;
			current = sip - days;
			text = "You are <span>" + weeks + " weeks</span> and <span>" + current + " days</span> pregnant";
			birthday = b.add( 301, "days" ).format( "MMMM DD, YYYY" );
			birthOutput = "The baby will be born in <span>" + birthday + "</span>";

			//Append values to elements

			$( ".vsc__todate" ).append( text );
			$( ".vsc__birthday" ).append( birthOutput );
			$( ".vsc__weeks" ).val( weeks );
			$( ".vsc__wprapper_info" ).fadeIn();
			sendForm();
		}
	} );

	function sendForm() {
		var sendWeeks;
		$( sendText ).empty();
		sendWeeks = inputWeeks.val();
		var weekHandler = $.ajax( {
			type: "POST",
			url: flatpyramid_l10n.ajax_url,
			data: {
				action: "handle_request",
				vs_action: "formFilter",
				weekCount: sendWeeks
			},
			success: function( response ) {
				$( sendText ).append( response.data.form );
			}
		} );
	};

} );
} )( jQuery );
