<?php
	/**
	 * Plugin Name: Effect Maker
	 * Plugin URI: http://www.effectmaker.com/
	 * Description: The Effect Maker allows you to customize JavaScript effects like scrollers, slide shows and messengers with your own texts, fonts and images. No JavaScript development skills are needed. With a few clicks you can start creating your own effects. You can have several customizations of one type of effect in your site. All standard web fonts are supported and if you like you can specify your own custom font if you support it by your HTML/CSS3 setup or template. To see the effects in action <a href="http://www.effectmaker.com/effectgallery/" target="_blank">look in our gallery</a>. Get the <a href="http://www.effectmaker.com/buyit.html" target="_blank">Pro edition</a> for even more effects.

	 * Version: 1.2
	 * Author: Anibal Wainstein, Mandomartis
	 * Author URI: http://www.mandomartis.com/
	 * License: See license.txt
	 */
	
	add_action( 'admin_menu', 'effect_maker_admin_menu' );
	
	$dir = plugin_dir_path( __FILE__ );
	db_install();
	
	add_action( 'wp_enqueue_scripts', 'load_frontend_scripts' );
	function load_frontend_scripts() {
		wp_enqueue_script( 'jquery' );
		wp_enqueue_script( 'jquery-effects-core' );
		wp_enqueue_script( 'effect-runner', plugins_url().'/'. dirname(plugin_basename(__FILE__)).'/'.'effectrunner.js');
	}

	function db_install () {
		global $wpdb;
		$table_name = $wpdb->prefix . "effectmakeruserconfigurations"; 
		$sql = "CREATE TABLE $table_name (
		  id mediumint(9) NOT NULL AUTO_INCREMENT,
		  name text NOT NULL,
		  effectname text NOT NULL,
		  configuration MEDIUMTEXT,
		  UNIQUE KEY id (id)
		);";
		require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
		dbDelta( $sql );
		$table_name = $wpdb->prefix . "effectmakerparameters"; 
		$sql = "CREATE TABLE $table_name (
		  id mediumint(9) NOT NULL AUTO_INCREMENT,
		  name text NOT NULL,
		  value text NOT NULL,
		  UNIQUE KEY id (id)
		);";
		dbDelta( $sql );
		add_option( "effectmaker_db_version", "1.0" );
		$result = $wpdb->get_results( 'SELECT * FROM '.$table_name);
	    if (count($result)==0) {
			$rows_affected = $wpdb->insert( $table_name, array( 'name' => 'defaultimagesselectable', 'value' => '1'));
			$rows_affected = $wpdb->insert( $table_name, array( 'name' => 'showconsole', 'value' => '0'));
			$rows_affected = $wpdb->insert( $table_name, array( 'name' => 'galleryvertical', 'value' => '1'));
	    }
		//setup add effect editor button
		add_action('media_buttons_context', 'add_editor_effect_button');

	}

	function add_editor_effect_button() {
		global $wpdb;
   		$table_name = $wpdb->prefix . "effectmakeruserconfigurations"; 
   		$results = $wpdb->get_results( 'SELECT * FROM '.$table_name);
		$count=0;
		$effectmakerpluginfolder=plugins_url().'/'. dirname(plugin_basename(__FILE__)).'/';
		$upload_dir = wp_upload_dir();
		$effectmakerworkfolder=$upload_dir['baseurl'].'/';
		$context="<SELECT id=\"effectmaker_configurations\">";
		foreach ( $results as $result ) 
		{
			$context.="<option value=\"".$result->name."\">".$result->name."</option>";
			$count++;
		}
		$context.="</SELECT>";
		$container_id = 'effectmaker_container';
		$title='Add an effect configuration from the list';
		$scriptinsertion="<div><img class=\"effectmaker_icon\" src=\"".$effectmakerpluginfolder."images/AppIcon.png\"/>";
		$scriptinsertion.="<script type=\"text/JavaScript\">loadConfiguration(\"'+jQuery('#effectmaker_configurations').val()+'\");</scr'+'ipt></div>";
		$context.="<script>\r\nfunction insertEffectIntoCurrentSelection(){\r\n";
		$context.="if (tinymce.activeEditor!=null && tinymce.activeEditor!=undefined) {\r\n";
		$context.="tinymce.activeEditor.insertContent('".$scriptinsertion."');";
		$context.="} else alert('You must use the visual editor mode in order to insert effects. Use the text mode to delete them.');";
		$context.="\r\n};\r\n</script>";
		$context.="<a title='Add an effect from Effect Maker' onClick='javascript:insertEffectIntoCurrentSelection(); return false;' class='button'>Add Effect</a>";
		return $context;
	}

	function effect_maker_admin_menu() {
			add_menu_page(__('Effect Maker','menu-test'), __('Effect Maker','menu-test'), 'manage_options', 'mt-top-level-handle', 'show_configuration_dialog' );
	}

	function show_configuration_dialog() {		
		wp_enqueue_script( 'jquery' );
		wp_enqueue_script( 'jquery-effects-core' );
		wp_enqueue_script( 'jquery-ui-core' );
		wp_enqueue_script( 'jquery-ui-widget' );
		wp_enqueue_script( 'jquery-ui-tooltip' );
		wp_enqueue_script( 'jquery-ui-tabs' );
		wp_enqueue_script( 'jquery-ui-autocomplete' );
		wp_enqueue_script( 'jquery-ui-accordion' );
		wp_register_style( 'jquery-ui-css', plugins_url('css/jquery-ui-1.10.3.custom.min.css',__FILE__));
		wp_enqueue_style( 'jquery-ui-css' );
		wp_register_style( 'colpick-css', plugins_url('css/colpick.css',__FILE__));
		wp_enqueue_style( 'colpick-css' );
		wp_register_style( 'app-css', plugins_url('css/App.css',__FILE__));
		wp_enqueue_style( 'app-css' );
		wp_register_script( 'colpick', plugins_url('js/colpick.js',__FILE__));
		wp_enqueue_script( 'colpick' );
		wp_register_script( 'effectmaker', plugins_url('js/script-bundle.min.js',__FILE__));
		wp_enqueue_script( 'effectmaker' );
		wp_register_script( 'effectmaker-app', plugins_url('App.js',__FILE__));
		wp_enqueue_script( 'effectmaker-app' );
		$effectmakerpluginfolder=plugins_url().'/'. dirname(plugin_basename(__FILE__)).'/';
		$upload_dir = wp_upload_dir();
		$effectmakerworkfolder=$upload_dir['baseurl'].'/';
		?>
    <script type="text/javascript">
		//general EM stuff
        var runnerMode = false;
        var EM_environment = 1; //Wordpress environment
		var pluginsUrl='<?php echo $effectmakerpluginfolder; ?>';
        var uploadsURL='<?php echo $effectmakerworkfolder; ?>';
		var userImageFolder=uploadsURL;
    </script>
    <div id="initmessage" style="width:700px; text-align:center">
            <h3 style="text-align:center" >Mandomartis Effect Maker</h3><br /><br />
            <img style="text-align:center" src="<?php echo $effectmakerpluginfolder; ?>images/mmlogo.png" /><br /><br />
            <div style="text-align:center" id="initializationmessage">Initializing, please wait...</div>
            <p style="font-style:italic; font-size:10px;">&copy; Mandomartis 2014-2015</p>
    </div>
    <div id="mainscreen" style="display:none">
        <img id="galleryflipper2" src="<?php echo $effectmakerpluginfolder; ?>images/iconflipleft.png"  onClick="AM.flipGallery(true);" style="display:none; float:left; cursor:pointer"/>
        <div id="gallery" style="overflow:auto; width:700px; height:260px; display:none;" class="tabs-min">

        </div>
        <div id="animation">

        </div><br /><br />
        <img id="galleryflipper1" src="<?php echo $effectmakerpluginfolder; ?>images/iconflipright.png" onClick="AM.flipGallery(false);" style="cursor:pointer"/>
        <div id="galleryvertical" style="overflow:auto; width:250px; height:600px; float:left; padding-right:20px;" class="tabs-min">

        </div>
        <div style="display:inline-block">
        <div id="configuration" style="width:700px;" class="tabs-nohdr">

        </div>
        <br /><br />      
         <div id="bottombuttonbar" style="display:none">
            <button id="applybutton" name="applybutton" onclick="AM.applyClicked(); return false;" style="vertical-align:middle;" title="Save your configuration to the wordpress database"><img src="<?php echo  $effectmakerpluginfolder; ?>images/applyicon.png" />&nbsp;&nbsp;Apply&nbsp;</button>
            <button id="restorebutton" name="restorebutton" onclick="AM.restoreClicked(); return false;" style="vertical-align:middle;" title="Restore your previous saved configuration from the wordpress database"><img src="<?php echo $effectmakerpluginfolder; ?>images/restoreicon.png" />&nbsp;&nbsp;Restore&nbsp;</button>
            <button id="debugbutton" name="debugbutton" onclick="javascript:AM.toggleConsole(); return false;" style="vertical-align:middle;" title="Display the debug console to see possible errors"><img src="<?php echo $effectmakerpluginfolder;?>images/icondebug.png" />&nbsp;&nbsp;Show console&nbsp;</button>
            <button id="helpbutton" name="helpbutton" onclick="window.open('<?php echo $effectmakerpluginfolder; ?>help.html','helppage'); return false;" style="vertical-align:middle;" title="Read the tutorial or the FAQ"><img src="<?php echo $effectmakerpluginfolder; ?>images/iconhelp.png" />&nbsp;&nbsp;Help&nbsp;</button>
        </div>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /></div>
     <div id="errormessage" style="overflow:auto; width:700px; height:200px; display:none">
     </div>
		<?php
	}
	
	//unfortunately we need to add the user configurations to the header as a javascript variable
	//in order to avoid using separate php files for this. Since we don't know which configuration the user
	//is going to use, we need to add all of them.
	add_action('wp_head','add_user_configurations_in_header');

	function add_user_configurations_in_header()
	{
		?><script language="javascript">var em_userconfs=new Array();<?php
	   	global $wpdb;
	   	$table_name = $wpdb->prefix . "effectmakeruserconfigurations"; 
		$results = $wpdb->get_results( 'SELECT * FROM '.$table_name);
		$count=0;
		foreach ( $results as $result ) 
		{
				?>em_userconfs['<?php echo $result->name;?>']={name:'<?php echo $result->name;?>', effectname:'<?php echo $result->effectname;?>', configuration:'<?php echo $result->configuration;?>'};<?php
			$count++;
		}
		$effectmakerpluginfolder=plugins_url().'/'. dirname(plugin_basename(__FILE__)).'/';
		$upload_dir = wp_upload_dir();
		$effectmakerworkfolder=$upload_dir['baseurl'].'/';
		?>
        var pluginsUrl='<?php echo $effectmakerpluginfolder; ?>';
		var uploadsURL='<?php echo $effectmakerworkfolder; ?>';
		var userImageFolder=uploadsURL;
		var hostUrl = pluginsUrl;
		var defaultImageFolder = hostUrl + 'workspace/';
		var systemImageFolder = hostUrl + 'images/';
		var effectFolder = hostUrl + 'js/effects/';
		</script><?php
	}
	
	//these are actions called by JavaScript
	add_action('wp_ajax_load_effect_data', 'load_effect_data_callback');
	add_action('wp_ajax_load_parameters', 'load_parameters_callback');
	add_action('wp_ajax_load_user_configuration', 'load_user_configuration_callback');
	add_action('wp_ajax_load_user_workspace', 'load_user_workspace_callback');
	add_action('wp_ajax_store_parameter', 'store_parameter_callback');
	add_action('wp_ajax_store_user_configuration', 'store_user_configuration_callback');
	add_action('wp_ajax_delete_user_configuration', 'delete_user_configuration_callback');
	
	function load_effect_data_callback() {
		?><effects><?php
		$xmlString = file_get_contents(plugin_dir_path( __FILE__ ).'effectconfiguration.xml');
        libxml_use_internal_errors(true);
		$xml =  simplexml_load_string($xmlString);
		foreach ($xml->ListInstance->Data->Rows->Row as $element) {
		?>
	<effect>
		<name><?php echo $element->Field[0]; ?></name>
		<content><?php echo $element->Field[1]; ?></content>
		<configuration><?php echo $element->Field[2]; ?></configuration>
		<defaultvalues><?php echo $element->Field[3]; ?></defaultvalues>
		<category><?php echo $element->Field[4]; ?></category>
		<descriptivename><?php echo $element->Field[5]; ?></descriptivename>
		<icon><?php echo $element->Field[6]; ?></icon>
		<description><?php echo $element->Field[7]; ?></description>
		<browsersupport><?php echo $element->Field[8]; ?></browsersupport>
	</effect>
		<?php
		}
?></effects><?php
		die();
	}
	
	
	function load_parameters_callback() {
	   global $wpdb;
	   $table_name = $wpdb->prefix . "effectmakerparameters"; 
	   ?><items><?php
	   if (!empty($_POST["name"]))
	   {
			$results = $wpdb->get_results( 'SELECT * FROM '.$table_name.' WHERE name=\''+name+'\'');
			foreach ( $results as $result ) 
			{
			?><item name="0">
<id><?php echo $result->id; ?></id>
<name><?php echo $result->name; ?></name>
<value><?php echo $result->value; ?></value>
</item><?php
			}
	   }
	   else
	   {
			$results = $wpdb->get_results( 'SELECT * FROM '.$table_name);
			$count=0;
			foreach ( $results as $result ) 
			{
				?><item name="<?php echo $count; ?>">
<id><?php echo $result->id; ?></id>
<name><?php echo $result->name; ?></name>
<value><?php echo $result->value; ?></value>
</item><?php
				$count++;
			}
	   }
	   
	?></items><?php		
		die();
	}
	
	
	function load_user_configuration_callback() {
	   global $wpdb;
	   $table_name = $wpdb->prefix . "effectmakeruserconfigurations"; 
	   ?><items><?php
	   if (!empty($_POST["name"]))
	   {
			$results = $wpdb->get_results( 'SELECT * FROM '.$table_name.' WHERE name=\''+name+'\'');
			foreach ( $results as $result ) 
			{
				?><item name="0">
<id><?php echo $result->id; ?></id>
<name><?php echo $result->name; ?></name>
<effectname><?php echo $result->effectname; ?></effectname>
<configuration ><?php echo $result->configuration; ?></configuration>
</item><?php
			}
	   }
	   else
	   {
			$results = $wpdb->get_results( 'SELECT * FROM '.$table_name);
			$count=0;
			foreach ( $results as $result ) 
			{
				?><item name="<?php echo $count; ?>">
<id><?php echo $result->id; ?></id>
<name><?php echo $result->name; ?></name>
<effectname><?php echo $result->effectname; ?></effectname>
<configuration ><?php echo $result->configuration; ?></configuration>
</item><?php
				$count++;
			}
	   }
	   
	?>
</items><?php
		die();
	}
	
	
	function load_user_workspace_callback() {
	   global $wpdb;
	   ?><items><?php
	   $postmeta = $wpdb->prefix . "postmeta"; 
	   $posts = $wpdb->prefix . "posts"; 
		$results = $wpdb->get_results( 'SELECT meta_value FROM '.$postmeta.' INNER JOIN '.$posts.' ON '.$postmeta.'.post_id='.$posts.'.ID WHERE '.$posts.'.post_mime_type LIKE \'%image%\' AND '.$postmeta.'.meta_key=\'_wp_attached_file\'');
		$count=0;
		foreach ( $results as $result ) 
		{
				?><item name="<?php echo $count; ?>">
	<name><?php echo $result->meta_value; ?></name>
	</item><?php
			$count++;
		}
	
	?>
	</items><?php
		die();
	}

	
	function store_parameter_callback() {
	   global $wpdb;
	   $table_name = $wpdb->prefix . "effectmakerparameters";
	   $result = $wpdb->get_results( 'SELECT * FROM '.$table_name.' WHERE name=\''.$_POST['name'].'\'');
	   if (count($result)>0) {
		   $wpdb->update ( $table_name, array( 'name' => $_POST['name'], 'value' => $_POST['value']), array('name' => $_POST['name']));
		   ?>Configuration updated...<?php
	   } else {
			$rows_affected = $wpdb->insert( $table_name, array( 'name' => $_POST['name'], 'value' => $_POST['value']));
		   ?>Configuration added...<?php
	   }

		die();
	}

	
	function store_user_configuration_callback() {
	  global $wpdb;
	   $table_name = $wpdb->prefix . "effectmakeruserconfigurations";
	   $result = $wpdb->get_results( 'SELECT * FROM '.$table_name.' WHERE name=\''.$_POST['name'].'\'');
	   if (count($result)>0) {
		   $wpdb->update ( $table_name, array( 'name' => $_POST['name'], 'effectname' => $_POST['effectname'], 'configuration' => $_POST['configuration']), array('name' => $_POST['name']));
		   ?>Configuration updated...<?php
	   } else {
			$rows_affected = $wpdb->insert( $table_name, array( 'name' => $_POST['name'], 'effectname' => $_POST['effectname'], 'configuration' => $_POST['configuration']));
		   ?>Configuration added...<?php
	   }	
		die();
	}

	
	function delete_user_configuration_callback() {
	   global $wpdb;
	   $table_name = $wpdb->prefix . "effectmakeruserconfigurations";
	   $wpdb->delete( $table_name,array( 'name' => $_POST['name']));
		?>Configuration deleted...<?php
		die();
	}

?>