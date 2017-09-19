jQuery( function( $ ) {
  "use strict";

  /**
   * All of the code for your admin-facing JavaScript source
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
$( function() {
  var optObj = [],
  formLine = $( "#vddc-settings-form tbody" ),
  result = $( "#form__option_saved h2" ),
  error = $( ".error-wrap" ),
  resultWrapper = $( "#form__option_saved" ),
  clone = $( ".form__line_clone" ),
  cloneField = $( clone ).find( "input[type='text']" ),
  t = $( "#productrow" ).html(),
  tr = $( t ),
  btn = $( "#form-button__clone" );

  function applyMCE() {
    tinymce.init({
      mode : "textareas",
      editor_selector : "field_text_new",
      entity_encoding: "raw",
      fix_list_elements : true,
      element_format : 'html',
      remove_linebreaks: false,
      forced_root_block : 'p',
      skin: "gradient",
      plugins: [
        "wordpress lists image charmap hr ",
        "fullscreen",
        "imageuploader",
        "media directionality",
        "paste textcolor colorpicker hr"
      ],
      toolbar1: "formatselect | bold italic  strikethrough  forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat | image | imageuploader"
    } );
  }
  function AddRemoveTinyMce( editorId ) {
    if ( tinyMCE.get( editorId ) )  {
      tinyMCE.EditorManager.execCommand( "mceFocus", false, editorId );
      tinyMCE.EditorManager.execCommand( "mceRemoveEditor", true, editorId );
    } else {
      tinymce.EditorManager.execCommand( "mceAddEditor", false, editorId );
    }
  }

  applyMCE();
  btn.off( "click" ).on( "click", function( e ) {
    e.preventDefault();
    var element = null;
    for ( var i = 0; i < 1; i++ ) {
        element = tr.clone();
        var divId = "id_" + $.now();
        element.attr( "id", divId );
        element.find( "#minus" ).attr( "targetDiv", divId );
        element.find( ".field_text_new" ).attr( "id", "txt_" + divId );
        element.appendTo( formLine );
        AddRemoveTinyMce( "txt_" + divId );
    }
  } );


  $( window ).load( function() {
    var updateHandler = $.ajax( {
      type: "POST",
      url: ajaxurl,
      data: {
        action: "handle_request",
        vs_action: "sendDb"
      },
      success: function( response ) {
        console.log( response );
        if ( response.data.var ) {
          var d = response.data.var;
          var bitch = d.map( function( a ) {
            var html;
            console.log( a.Text );
            html = "<tr class='form__line_clone bitch'>";
            html += '<td>';
            html += '<input class="field_date form__field_validation"  name="vddc_period_dates[]" type="text"' +
              ' value="' + a.Weeks + '">';
            html += '</td>';
            html += '<td>';
            html += '<textarea class="field_text_new form__field_validation"  name="vddc_period_text[]" value="">' + a.Text + '</textarea>';
            html += '</td>';
            html += '<td>';            
            html += "<a class='button_delete minus' href='#minus'>";
            html += "<span class='bg' id='minus'></span>";
            html += "<span class='symbol'></span>";
            html += "<a/>";
            html += '</td>';
            html += '</tr>';
            formLine.append( html );
          } );
      } else {
        tr.clone().appendTo( formLine );
      }
    },
    complete: function() {
      applyMCE();
    }
  } );
} );

  $( "#vddc-settings-form" ).on( "click", ".minus", function( e ) {
    e.preventDefault();
    $( this ).closest( "tr" ).fadeTo( 400, 0, function() {
      $( this ).remove();
      console.log( $( this ) );
    } );
  } );

  //Save settings
  $( "#js-vddc-submit" ).click( function( e ) {
    e.preventDefault();
    Validate();
    optObj = [];
    $( resultWrapper ).fadeOut();
    $( result ).empty(); var row = {};
    $( ".form__line_clone" ).each( function() {
      var date = $( this ).find( ".field_date" ).val();
      var togo = $( this ).find( ".field_text_new" ).attr( "id" );
      var tyVal = tinyMCE.get( togo ).getContent( );
      console.log( tyVal );
      row = {
        "Weeks": date,
        "Text": tyVal
      };
      optObj.push( row );
    } );
    if ( $( "input[type='text']" ).hasClass( "error" ) || $( "textarea" ).hasClass( "error" ) ) {
      $( ".error" ).next( error ).text( "Поле не должно быть пустым" );
      return;
    } else {
      var optionHandler = $.ajax( {
        type: "POST",
        url: ajaxurl,
        data: {
          action: "handle_request",
          vs_action: "wpa_49691",
          whatever: optObj
        },
        success: function( response ) {
          $( result ).append( response.data.message );
          console.log( response );
        },
        complete: function() {
          $( resultWrapper ).fadeIn();
        }
      } );
    }
  } );

//Validation fields

  function Validate() {
    $( ".form__field_validation" ).each( function() {
      if ( $( this ).val() === "" ) {

        $( this ).addClass( "error" );
        $( this ).next( error ).fadeIn();

      } else {
        $( this ).removeClass( "error" );
        $( this ).next( error ).fadeOut();
      }
    } );
  };
} );
} );
