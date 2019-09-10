var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;

if(!isMobile){
	var html = '';
	var $ = jQuery;

	html += '<div class="closedCaptionsCard">'//Opening div

	html += 	'<section class="CaptionsSection">'; 
	html += 		'<div id="headerContainer">'; //Start header
	html += 				'<h1>Closed Captioning Settings</h1>'; // Header Title
	html += 				'<div><input type="checkbox" id="onOff" name="language" class="onOff"><label for="onOff"></label></div>';
	html += 		'</div>'; // End header
	html += 		'<span class="preview">Preview</span><br/>';
	html += 		'<div class="sampleDiv">'; // Start Sample Text Section
	html += 			'<span class="sampleText">This is a sample text</span><br/>';
	html += 		'</div>'; // End Sample Text Section
	html += 		'<br/>'; // Make some space.. With HR!
	html += 	'</section>';

	html += 	'<section id="FontsSection">';
	html += 		'<div class="fontContainer">';
	html += 			'<div class="column1">'; // Start Row 1
	html += 				'<div class="fontSize">';
	html += 					'<span>1. Captions Size</span><br/>'; // small font size
	html += 					'<div class="sizeSlider"></div>';
	html += 					'<span class="fontSizeInput"></span>';
	html += 				'</div>';
	html += 				'<div class="font">';
	html += 					'<span>2. Captions Font Family</span><br/>'; // Small font
	html += 					'<select>'; // Font Selector
	html += 						'<option value="archer">Archer</option>';
	html += 						'<option value="arial">Arial</option>';
	html += 						'<option value="arial black">Arial Black</option>';
	html += 						'<option value="courier new">Courier New</option>';
	html += 						'<option value="georgia">Georgia</option>';
	html += 						'<option value="impact">Impact</option>';
	html += 						'<option value="Lucida Sans Unicode">Lucida Sans Unicode</option>';
	html += 						'<option value="palatino">Palatino</option>';
	html += 						'<option value="tahoma">Tahoma</option>';
	html += 						'<option value="times new roman">Times New Roman</option>';
	html += 					'</select>'; // End Font Color Selector
	html += 				'</div>';
	html += 				'<div class="edgeAttr">';
	html += 					'<span>3. Edge Style</span><br/>'; // small font size
	html += 					'<select>'; // Edge Attributes selector
	html +=							'<option id="None" value="none">None</option>'
	html +=							'<option id="Raised" value="-1px -1px 0px">Raised</option>'
	html +=							'<option id="Depressed" value="0 1px 0">Depressed</option>'
	html +=							'<option id="Dropshadow" value="2px 2px">Dropshadow</option>'
	html += 					'</select>'; // End Font Color Selector
	html += 				'</div>';
	html += 			'</div>'; // End row 1
	html += 			'<div class="column2">'; // Start Row 2
	html += 				'<div class="fontColor">';
	html += 					'<span>4. Captions Color</span><br/>';
	html += 					'<div class="fontColor-btn-grp">'; // Start radio buttons div
	html += 						'<input type="radio" id="fontblack" name="fontColor" value="#000000" /><label for=fontblack></label>';
	html += 						'<input type="radio" id="fontblue" name="fontColor" value="#307CC0" /><label for=fontblue></label>';
	html += 						'<input type="radio" id="fontgreen" name="fontColor" value="#AED250" /><label for=fontgreen></label>';
	html += 						'<input type="radio" id="fontred" name="fontColor" value="#EA4444" /><label for=fontred></label>';
	html += 						'<input type="radio" id="fontpink" name="fontColor" value="#ED5D81" /><label for=fontpink></label>';
	html += 						'<input type="radio" id="fontorange" name="fontColor" value="#FFC813" /><label for=fontorange></label>';
	html += 						'<input type="radio" id="fontwhite" name="fontColor" value="#ffffff" /><label for="fontwhite"></label>';
	html += 					'</div>'; // End radio buttons div
	html += 				'</div>';
	html += 				'<div class="backgroundColor">';
	html += 					'<span>5. Background Color</span><br/>';
	html += 					'<div class="backgroundColor-btn-grp">'; // Start radio buttons div

	html += 						'<input type="radio" id="backgroundblack" name="backgroundColor" value="#000000" /><label for=backgroundblack></label>';
	html += 						'<input type="radio" id="backgroundblue" name="backgroundColor" value="#307CC0" /><label for=backgroundblue></label>';
	html += 						'<input type="radio" id="backgroundgreen" name="backgroundColor" value="#AED250" /><label for=backgroundgreen></label>';
	html += 						'<input type="radio" id="backgroundred" name="backgroundColor" value="#EA4444" /><label for=backgroundred></label>';
	html += 						'<input type="radio" id="backgroundpink" name="backgroundColor" value="#ED5D81" /><label for=backgroundpink></label>';
	html += 						'<input type="radio" id="backgroundorange" name="backgroundColor" value="#FFC813" /><label for=backgroundorange></label>';
	html += 						'<input type="radio" id="backgroundwhite" name="backgroundColor" value="#ffffff" /><label for="backgroundwhite"></label>';
	html += 					'</div>'; // End radio buttons div
	html += 				'</div>';
	html += 				'<div class="edgeColor">';
	html += 					'<span>6. Edge Color</span><br/>'; // Small font
	html += 					'<div class="edgeColor-btn-grp">'; // Start radio buttons div

	html += 						'<input type="radio" id="edgeblack" name="edgeColor" value="#000000" /><label for=edgeblack></label>';
	html += 						'<input type="radio" id="edgeblue" name="edgeColor" value="#307CC0" /><label for=edgeblue></label>';
	html += 						'<input type="radio" id="edgegreen" name="edgeColor" value="#AED250" /><label for=edgegreen></label>';
	html += 						'<input type="radio" id="edgered" name="edgeColor" value="#EA4444" /><label for=edgered></label>';
	html += 						'<input type="radio" id="edgepink" name="edgeColor" value="#ED5D81" /><label for=edgepink></label>';
	html += 						'<input type="radio" id="edgeorange" name="edgeColor" value="#FFC813" /><label for=edgeorange></label>';
	html += 						'<input type="radio" id="edgewhite" name="edgeColor" value="#ffffff" /><label for="edgewhite"></label>';
	html += 					'</div>'; // End radio buttons div
	html += 				'</div>';
	html += 			'</div>';
	html += 			'<div class="column3">';
	html += 				'<div class="fontOpacity">';
	html += 					'<span>7. Text Opacity</span><br/>';
	html += 					'<div class="fontOpacitySlider"></div>'; // Number Font Opa input
	html += 					'<span class="fontOpacityInput">100%</span>'; // Number Font Opa input
	html += 				'</div>';
	html += 				'<div class="backgroundOpacity">';
	html += 					'<span>8. Background Opacity</span><br/>';
	html += 					'<div class="backgroundOpacitySlider"></div>'; // Number Font Opa input
	html += 					'<span class="backgroundOpacityInput">100%</span>'; // Number Font Opa input
	html += 				'</div>';
	html += 			'</div>';
	html += 		'</div>';
	html += 	'</section>';
	html += 	'<br/>';
	html += 	'<section class="buttons">';
	html += 		'<span class="defaults"></span>';
	html += 		'<span class="doneButton"></span>';
	html += 	'</section>';
	html += '</div>' //Closing div

	var listeners = {};
	var defaults = {};

	var hexToRgb = function(hex) {
	    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	    return result ? {
	        r: parseInt(result[1], 16),
	        g: parseInt(result[2], 16),
	        b: parseInt(result[3], 16)
	    } : null;
	}

	$pdk.controller.addPlayerCard("forms", "sproutClosedCaptionsCard", html);


	$pdk.controller.addEventListener("OnGetSubtitleStyle", listeners.style = function (e) { loadStyles(e) });

	var loadStyles = function(e){
		if(e.data){
			defaults = e;
		}else{
			defaults.data = {
				fontColor : "#000000",
				backgroundColor: "#ffffff",
				fontEdgeColor: "#ffffff",
				opacity: 1,
				backgroundOpacity: 1,
				fontFamily: "archer",
				fontEdge: "none",
				fontSize: "1"
			}
		}
	}

	var language = '';

	$pdk.controller.addEventListener("OnGetSubtitleLanguage", function(e){
		language = e.data.langCode;
	});

	var resetSampleText = function(){

		$fontColor = $('.fontColor');
		$font = $('.font');
		$edgeAttr = $('.edgeAttr');
		$edgeColor = $('.edgeColor');
		$backgroundColor = $('.backgroundColor');
		$fontSize = $('.sizeSlider');
		$fontOpacity = $('.fontOpacitySlider');
		$backgroundOpacity = $('.backgroundOpacitySlider');

		
		$(".backgroundOpacityInput" ).html('100%');

		$(".fontOpacityInput" ).html('100%');

		var fontColor = hexToRgb('#000000');
		var backgroundColor = hexToRgb('#ffffff');
		$('.sampleText').css({
			color: 'rgba('+fontColor.r+','+fontColor.g+','+fontColor.b+',1)',
			backgroundColor: 'rgba('+backgroundColor.r+','+backgroundColor.g+','+backgroundColor.b+',1)',
			fontSize: '2vw',
			textShadow: 'none',
			fontFamily: 'archer'
		});

		$fontOpacity.slider('value', 100);
		$backgroundOpacity.slider('value', 100);
	}

	$pdk.controller.addEventListener("OnPlayerLoaded", function(e){ //Event seems to fire at the right time.. Take advantage of this.

		$pdk.controller.getSubtitleStyle();

		var resetDefaults = function(){
			$('input[name="fontColor"][value="#000000"]').prop('checked', true);
			$('.font').find('select')[0].value = "archer";
			$('.edgeAttr').find('select')[0].value = "none";
			$('input[name="edgeColor"][value="#ffffff"]').prop('checked', true);
			$('input[name="backgroundColor"][value="#ffffff"]').prop('checked', true);
			$('.sizeSlider').slider('value', 1.0);
			$('.fontSizeInput').html(1.0);
			$('.fontOpacitySlider').slider('value', 1.0);
			$('.backgroundOpacitySlider').slider('value', 1.0 );
			$(".backgroundOpacityInput" ).html(100 + '%');
			$(".fontOpacityInput" ).html(100 + '%');

			resetSampleText();
		}

		var style = {
			globalDataType: "com.theplatform.pdk.data::SubtitleStyle"
		}

		$pdk.controller.addEventListener("OnMediaStart", function(){
			$pdk.controller.removeEventListener('OnGetSubtitleLanguage');
			$pdk.controller.addEventListener('OnGetSubtitleLanguage', function(e){

				if($('.closedCaptionsCard').length !== 0){
			        return;
			   }

			   $pdk.controller.showPlayerCard('forms', 'sproutClosedCaptionsCard');
				
				if(language == 'en'){
					language = 'none';
				}else if(language == 'none'){
					language = 'en';
				}

				$pdk.controller.setSubtitleLanguage(language);



				$fontColor = $('.fontColor');
				$font = $('.font');
				$edgeAttr = $('.edgeAttr');
				$edgeColor = $('.edgeColor');
				$backgroundColor = $('.backgroundColor');
				$fontSize = $('.sizeSlider');
				$fontOpacity = $('.fontOpacitySlider');
				$backgroundOpacity = $('.backgroundOpacitySlider');

				$('.defaults').click(function(e){
					resetDefaults();
				});

				$fontSize.slider({
					value:1,
					min: 0.25,
					max: 1.0,
					step: 0.25,
					slide: function(event, ui){
						$(".fontSizeInput" ).html(ui.value );
						$('.sampleText').css('fontSize', ui.value * 2 + 'vw');
					}
				});
				$( ".fontSizeInput" ).html($(".sizeSlider").slider( "value" ));

				$fontOpacity.slider({
					value:1,
					min: 0,
					max: 1,
					step: 0.01,
					slide: function(event, ui){
						var i = 100;
						var value = ui.value.toFixed(2);
			
						if(value != 1.00){
				
							if(value.toString().indexOf('0.0') == true){
					
								i = value.toString().split('0.0')[1];
							}else{
								i = value.toString().split('.')[1];
							}
						}

						if(ui.value == 0.0) i = 0;
						$(".fontOpacityInput" ).html(i + '%');
						var fontColor = $('input[name=fontColor]:checked').val();
						var color = hexToRgb(fontColor);
						$('.sampleText').css('color', 'rgba('+ color.r + ','+color.g+', '+color.b+','+ui.value+' )');
					}
				});
				$( ".fontOpacityInput" ).html($(".fontOpacitySlider").slider( "value" ));

				$backgroundOpacity.slider({
					value:1,
					min: 0,
					max: 1,
					step: 0.01,
					slide: function(event, ui){
						var i = 100;
						var value = ui.value.toFixed(2);
			
						if(value != 1.00){
				
							if(value.toString().indexOf('0.0') == true){
					
								i = value.toString().split('0.0')[1];
							}else{
								i = value.toString().split('.')[1];
							}
						}

						if(ui.value == 0.0) i = 0;
						$(".backgroundOpacityInput" ).html(i + '%');
						$('.sampleText').css('background-color', 'rgba(255,255,255,' + ui.value + ')');
						var backgroundColor = $('input[name=backgroundColor]:checked').val();
						var color = hexToRgb(backgroundColor);
						$('.sampleText').css('background-color', 'rgba('+ color.r + ','+color.g+', '+color.b+','+ui.value+' )');
					}
				});
				$( ".backgroundOpacityInput" ).html($( ".backgroundOpacitySlider" ).slider( "value" ));

				//Get the player settings and show em.
				
				$('input[name="fontColor"][value="'+ defaults.data.fontColor+ '"]').prop('checked', true);
				$font.find('select')[0].value = (defaults.data.fontFamily ? defaults.data.fontFamily : "archer");
				$edgeAttr.find('select option[id="'+defaults.data.fontEdge+'"]').prop('selected', true);
				$('input[name="edgeColor"][value="'+ defaults.data.fontEdgeColor+ '"]').prop('checked', true);
				$('input[name="backgroundColor"][value="'+ defaults.data.backgroundColor + '"]').prop('checked', true);
				$fontSize.slider('value', defaults.data.fontSize);
				$('.fontSizeInput').html(defaults.data.fontSize);
				
				var i = 100;
				var value = defaults.data.backgroundOpacity.toFixed(2);
				if(value != 1.00){
					if(value.toString().indexOf('0.0') == true){
						i = value.toString().split('0.0')[1];
					}else{
						i = value.toString().split('.')[1];
					}
				}
				if(defaults.data.backgroundOpacity == 0.0) i = 0;
				$(".backgroundOpacityInput" ).html(i + '%');

				var b = 100;
				var value = defaults.data.opacity.toFixed(2);
				if(value != 1.00){
					if(value.toString().indexOf('0.0') == true){
						b = value.toString().split('0.0')[1];
					}else{
						b = value.toString().split('.')[1];
					}
				}

				if(defaults.data.opacity == 0.0) b = 0;
				$(".fontOpacityInput" ).html(b + '%');

				var fontColor = hexToRgb(defaults.data.fontColor);
				var backgroundColor = hexToRgb(defaults.data.backgroundColor);
				$('.sampleText').css({
					color: 'rgba('+fontColor.r+','+fontColor.g+','+fontColor.b+','+defaults.data.opacity+')',
					backgroundColor: 'rgba('+backgroundColor.r+','+backgroundColor.g+','+backgroundColor.b+','+defaults.data.backgroundOpacity+')',
					fontSize: (defaults.data.fontSize * 2) + 'vw',
					textShadow: $edgeAttr.find('select option:selected').val() + defaults.data.fontEdgeColor,
					fontFamily: defaults.data.fontFamily
				});

				$fontOpacity.slider('value', (isNaN(defaults.data.opacity) || defaults.data.opacity === null ? "100" : defaults.data.opacity));
				$backgroundOpacity.slider('value', (isNaN(defaults.data.backgroundOpacity) || defaults.data.backgroundOpacity === null ? "100" : defaults.data.backgroundOpacity));

				if(language == 'en'){
					$('input[name="language"]').prop('checked', true);
				}else{
					$('input[name="language"]').prop('checked', false);
				}
				

				$('.doneButton').click(function(e){
					//Gather up the styles.. add em!

					var style = {
						globalDataType: "com.theplatform.pdk.data::SubtitleStyle"
					}

					var subtitleLanguage = 'en';
					var backgroundColor = $('input[name=backgroundColor]:checked').val();
					var fontEdge = $edgeAttr.find('select option:selected').text();
					var edgeColor = $('input[name=edgeColor]:checked').val();
					var fontColor = $('input[name=fontColor]:checked').val();
					var fontSize = $fontSize.slider('value');
					var font = $font.find('select')[0].value;
					var backgroundOpacity = $backgroundOpacity.slider('value');
					var fontOpacity = $fontOpacity.slider('value');
					var captions = $('input[name="language"]');

					if(!captions.is(':checked')) subtitleLanguage = 'none';

					$pdk.controller.setSubtitleLanguage(subtitleLanguage);

					style.backgroundColor = backgroundColor;
					style.fontEdge = fontEdge;
					style.fontEdgeColor = edgeColor;
					style.fontColor = fontColor;
					style.fontSize = parseFloat(fontSize);
					style.fontFamily = font;
					style.backgroundOpacity = parseFloat(backgroundOpacity);
					style.opacity = parseFloat(fontOpacity);

					$pdk.controller.setSubtitleStyle(style); // Set final styles when the card is closed.
					$pdk.controller.hidePlayerCard('forms', 'sproutClosedCaptionsCard');
				});

				//Setup event listeners for when the vlaues are changed
				$font.find('select').change(function(e){
					$('.sampleText').css('fontFamily', $(e.target).find('option:selected').val());
				});

				$('input[name="backgroundColor"]').change(function(e){
					var color = hexToRgb(e.target.value);
					$('.sampleText').css('background-color', 'rgba('+ color.r + ','+color.g+', '+color.b+','+$backgroundOpacity.slider('value')+' )');
				});

				$('input[name="fontColor"]').change(function(e){
					var color = hexToRgb(e.target.value);
					$('.sampleText').css('color', 'rgba('+ color.r + ','+color.g+', '+color.b+','+$fontOpacity.slider('value')+' )');
				});

				$('input[name="edgeColor"]').change(function(e){
					$('.sampleText').css('text-shadow', $edgeAttr.find('select option:selected').val() + e.target.value);
				});

				$edgeAttr.find('select').change(function(e){
		
					$('.sampleText').css('text-shadow', $(e.target).find('option:selected').val() + $('input[name="edgeColor"]:checked').val());
				});
			});
		});
	});
}