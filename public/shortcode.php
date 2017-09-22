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
    <form id="calculator">
    <input type="text" id="calendar" class="calendar" />
    <div class="form__todate"></div>
    Weeks: <input class="form__weeks" type="text" name="firstname"><br>
    Birthday: <input class="form__birthday" type="text"><br> 
            <input type="submit" value="Jmi">
    Пост    <div class="post"></div>
    </form>
    <?php
    }
    add_shortcode('test', 'form_creation');
    ?>