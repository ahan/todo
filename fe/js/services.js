'use strict';

/* Services */
angular.module('TD.services', [])
/*
.factory('Base64', [
	function(){

		var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

		var base64_utf8_encode = function(string){
			string = string.replace(/\r\n/g, "\n");
			var utftext = "";

			for (var n = 0; n < string.length; n++) {

				var c = string.charCodeAt(n);

				if (c < 128) {
					utftext += String.fromCharCode(c);
				}
				else if ((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				}
				else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}

			}

			return utftext;
		};

		return {
			encode: function(input){

				var output = "";
				var chr1,
					chr2,
					chr3,
					enc1,
					enc2,
					enc3,
					enc4;
				var i = 0;

				input = base64_utf8_encode(input);

				while (i < input.length) {

					chr1 = input.charCodeAt(i++);
					chr2 = input.charCodeAt(i++);
					chr3 = input.charCodeAt(i++);

					enc1 = chr1 >> 2;
					enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
					enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
					enc4 = chr3 & 63;

					if (isNaN(chr2)) {
						enc3 = enc4 = 64;
					} else if (isNaN(chr3)) {
						enc4 = 64;
					}

					output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
				}

				return output;
			}
		};
	}
])
*/
.factory('log', [
	function(){
		var win;

		return function(output, type){
			type = type || 'success';
			/*
<div class="alert alert-success">...</div>
<div class="alert alert-info">...</div>
<div class="alert alert-warning">...</div>
<div class="alert alert-danger">...</div>
*/
			if(!win){
				win = $('<div/>').appendTo($('body'));
			}

			win.attr('class', 'alert alert-global alert-' + type)
				.text(output);

			var height = win.outerHeight(true);

			win.css({
					left: ($(window).width() - win.width()) / 2,
					'top': -1 * height
				})
				.animate({
					'top': 0
				}, 700, function(){
					setTimeout(function(){
						win.animate({
							'top': -1 * height
						}, 1200);
					}, 2000);
				})
				;
		};
	}
])
;
