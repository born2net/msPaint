/*
 * ext-server_moinsave.js
 *
 * Licensed under the Apache License, Version 2
 *
 * Copyright(c) 2010 Alexis Deveria
 *              2011 MoinMoin:ReimarBauer
 *                   adopted for moinmoins item storage. it sends in one post png and svg data
 *                   (I agree to dual license my work to additional GPLv2 or later)
 *
 */

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
};

methodDraw.addExtension("server_opensave", {
	callback: function() {

		var save_action = 'https://secure.digitalsignage.com:442/savePaint';
		
		// Create upload target (hidden iframe)
		var target = $('<iframe name="output_frame" src="#"/>').hide().appendTo('body');
	
		methodDraw.setCustomHandlers({
			save: function(win, data) {
				var svg = "<?xml version=\"1.0\"?>\n" + data;
				var qstr = $.param.querystring();
				var name = qstr.substr(9).split('/+get/')[1];
				var svg_data = svgedit.utilities.encode64(svg);
				if(!$('#export_canvas').length) {
					$('<canvas>', {id: 'export_canvas'}).hide().appendTo('body');
				}
				var c = $('#export_canvas')[0];
				c.width = svgCanvas.contentW;
				c.height = svgCanvas.contentH;
				$.getScript('lib/canvg/rgbcolor.js', function() {
					$.getScript('lib/canvg/canvg.js', function() {
						canvg(c, svg, {renderCallback: function() {
							var datauri = c.toDataURL('image/png');
							var uiStrings = methodDraw.uiStrings;
							var png_data = svgedit.utilities.encode64(datauri);
							var form = $('<form>').attr({
							method: 'post',
							action: save_action,
							target: 'output_frame'
						})	.append('<input type="hidden" name="png_data" value="' + png_data + '">')
							.append('<input type="hidden" name="filepath" value="' + svg_data + '">')
							.append('<input type="hidden" name="filename" value="' + 'drawing.svg">')
							.append('<input type="hidden" name="business_id" value="' + $.urlParam('business_id') + '">')
							.append('<input type="hidden" name="contenttype" value="application/x-svgdraw">')
							.appendTo('body')
							.submit().remove();
							}})
					});
				});
			},
		});
	
	}
});

