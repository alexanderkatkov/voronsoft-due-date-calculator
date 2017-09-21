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
        $top = get_option( 'voronsoft_due_date_calc_option' );
        foreach ($top as $key => $value) {
            var_dump($value["Weeks"]); 
        }
        
    ?>
    <form>
    Неделя: <input type="text" name="firstname"><br>
            <input type="submit" value="Jmi">
    Пост    <div class="post"></div>
    </form>
    <?php
    }
    add_shortcode('test', 'form_creation');
    ?>