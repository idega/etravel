// JavaScript Document
jQuery.noConflict();

jQuery(document).ready(function(){
	addNavigationStyles('#topContent ul li a');

	rotateImage('#banner img');
    //setInterval(rotateImage,10000); //time in milliseconds
    
    jQuery('.productPrices table.priceTable tbody tr:first').addClass('first');
    jQuery('.productPrices table.priceTable tbody tr:last').addClass('last');
});

function addNavigationStyles(query) {
	jQuery(query + ':eq(0)').addClass('first');
	
	/*jQuery(query).each(function() {
		jQuery(this).click(function() {
			jQuery(query + '.current').removeClass('current');
			jQuery(query + '.beforeCurrent').removeClass('beforeCurrent');
			jQuery(query + '.afterCurrent').removeClass('afterCurrent');

			jQuery(this).addClass('current');
			addBeforeAndAfterStyles(query);
		});
	});*/

	addBeforeAndAfterStyles(query);
}

function addBeforeAndAfterStyles(query) {
	jQuery(query + '.current, ' + query + '.currentAncestor').each(function() {
		var links = jQuery(query);
		var index = jQuery(links).index(this);
		jQuery(this).addClass('current').removeClass('currentAncestor');
		if (index == 0) {
			jQuery(this).addClass('firstCurrent');
		}
	
		if (!jQuery(this).parent('li').hasClass('hiddenPageInNavigationMenu')) {
			var beforeIndex = index - 1;
			if (beforeIndex >= 0) {
				jQuery(query + ':eq(' + beforeIndex + ')').addClass('beforeCurrent');
			}
			
			var afterIndex = index + 1;
			if (afterIndex < links.size()) {
				jQuery(query + ':eq(' + afterIndex + ')').addClass('afterCurrent');	
			}
		}
	});
}

var currentImage = 0;

function rotateImage(query) {
	var index = currentImage;
	while (index == currentImage) {
		index = getRandomNumber(9);
	}

	var obj = jQuery('#banner img');
	obj.hide();
	
	var src = obj.attr('src');
	src = src.substring(0, src.indexOf('.jpg') - 1) + index + '.jpg';

	if (currentImage > 0) {
		obj.fadeOut('slow', function() { 
			obj.attr('src', src).fadeIn('slow');
		});	
	}
	else {
		obj.attr('src', src).show();
	}
	currentImage = index;
}

function getRandomNumber(count) {
	return Math.floor(Math.random() * count) + 1;
}