<?php
/*
* Plugin Name: Voronsoft Due Date Calculator ShortCode
* Description: Create your WordPress shortcode.
* Version: 1.0
* Author: VoronSoft
* Author URI: https://voronsoft.com
*/

// Example 1 : WP Shortcode to display form on any page or post.

    function form_creation(){
    ?>

    
    <div class="vsc__wrapper">
        <form id="calculator">
            <h3>
                <?php  _e( 'Select the date of the first day of your last menstrual period (LMP):', 'voronsoft-due-date-calculator' ); ?>
            </h3>
            <div class="vsc__error">
                <?php  _e( 'Invalid Date', 'voronsoft-due-date-calculator' ); ?>
            </div>
            <div class="vsc__input_wrapper">
                <div class="calendar">
                    <img src="<?php echo plugin_dir_url(dirname(__FILE__)) ?>/img/icons8-Calendar.svg">
                    <div class="vsc__date">
                    <?php  _e( ' Day/Month/Year', 'voronsoft-due-date-calculator' ); ?>
                    </div>
                </div>
                <input type="text" class="vsc__weeks hide">
            </div>
        </form>
        <div class="vsc__wprapper_info">
            <div class="vsc__todate vsc_item"></div>
            <div class="vsc__birthday vsc_item"></div> 
            <div class="vsc__post"></div>
        </div>
    </div>
    <?php
    }
    add_shortcode('pregnancy_calculator', 'form_creation');
    ?>