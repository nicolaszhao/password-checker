/*
 * password-checker
 * https://github.com/nicolaszhao/password-checker
 *
 * Copyright (c) 2013 Nicolas Zhao
 * Licensed under the MIT license.
 */

(function($) {
	
	var increments = 0;
	
	$.fn.passwordChecker = function(options) {
		
		options = $.extend({}, $.fn.passwordChecker.defaults, options);
		
		return this.each(function() {
			var checker = $.extend({}, $.fn.passwordChecker.checker);
			
			checker.create($(this), options);			
		});
	};
	
	$.fn.passwordChecker.defaults = {
		minlength: 6,
		
		// tips of strength level: 
		// 0 - too weak,
		// 1 - weak,
		// 2 - normal,
		// 3 - strong,
		// 4 - very strong
		texts: ['Too short', 'Weak', 'Normal', 'Strong', 'Very strong'],
		
		// colors of strength level
		colors: ['#900', '#960', '#c60', '#993', '#2A7726']
	};
	
	$.fn.passwordChecker.checker = {
		create: function($element, options) {
			var that = this;
			
			this.$element = $element;
			this.$checker = this._checker();
			this.options = options;
			this.inputTimeId = null;
			
			this.$element.on({
				focus: function() {
					that[that.value($(this).val()) ? 'show' : 'hide']();
				},
				blur: function() {
					that.hide();
				},
				keydown: function() {
					var $password = $(this);
					
					clearTimeout(that.inputTimeId);
					that.inputTimeId = setTimeout(function() {
						that[that.value($password.val()) ? 'show' : 'hide']();
					}, 200);
				}
			});
		},
		
		value: function(value) {
			var strength, text, color;
			
			if (value === '') {
				return false;
			}
			
			strength = $.fn.passwordChecker.strength.getLevel(value, this.options.minlength);
			text = this.options.texts[strength];
			color = this.options.colors[strength];
			
			this.$checker.find('.password-checker-text').text(text)
				.siblings('.password-checker-value').css('background', color);
			
			return true;
		},
		
		show: function() {
			if (this.$checker.is(':hidden')) {
				this.$checker.fadeIn(200);
				this._reposition();
			}
		},
		
		hide: function() {
			clearTimeout(this.inputTimeId);
			this.$checker.hide()
				.find('.password-checker-text').text('')
				.siblings('.password-checker-value').css('background', 'none');
		},
		
		_checker: function() {
			var id = 'password-checker-' + increments++,
				checker;
			
			checker = $('<div class="password-checker" />')
				.attr('id', id)
				.css({
					position: 'absolute',
					width: this.$element.outerWidth()
				})
				.appendTo('body')
				.append('<div class="password-checker-text" />')
				.append('<div class="password-checker-value" />')
				.hide();
				
			checker.find('.password-checker-value').css('min-height', 5);
			this._reposition(checker);
				
			return checker;
		},
		
		_reposition: function(div) {
			var passwordOffset = this.$element.offset();
			
			div = div ? div : this.$checker;
			div.offset({
				top: passwordOffset.top + this.$element.outerHeight(),
				left: passwordOffset.left
			});
		}
	};
	
	$.fn.passwordChecker.strength = {
		CHAR_TYPE: {
			NUMBER: 0,
			LOWERCASE: 1,
			UPPERCASE: 2,
			SPECIAL: 3
		},
		
		getChars: function(password, charType) {
			var regs = [/\d/g, 
					/[a-z]/g, 
					/[A-Z]/g, 
					/[^a-zA-Z0-9]/g], 
				ret;
			
			ret = password.match(regs[charType]);
			return ret ? ret.length : 0;
		},
		
		getLevel: function(password, minlength) {
			var len = password.length,
				types = 0,
				chars, strength;
			
			if (len < minlength) {
				return 0;
			}
			
			chars = {
				numbers: this.getChars(password, this.CHAR_TYPE.NUMBER),
				lowers: this.getChars(password, this.CHAR_TYPE.LOWERCASE),
				uppers: this.getChars(password, this.CHAR_TYPE.UPPERCASE),
				specials: this.getChars(password, this.CHAR_TYPE.SPECIAL)
			};
			
			$.each(chars, function(key, val) {
				if (val) {
					types++;
				}
			});
			
			if (types === 1) {
				strength = 1;
			} else if (types === 2) {
				if (len <= 10) {
					strength = 2;
				} else {
					strength = chars.numbers ? 2 : 3;
				}
			} else if (types === 3) {
				strength = chars.numbers ? 3 : 4;
			} else {
				strength = 4;
			}
			
			return strength;
		}
	};

}(jQuery));
