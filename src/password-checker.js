/*
 * password-checker
 * https://github.com/Nicolas/password-checker
 *
 * Copyright (c) 2013 Nicolas Zhao
 * Licensed under the MIT license.
 */

(function($) {

  // Collection method.
  $.fn.password_checker = function() {
    return this.each(function(i) {
      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

  // Static method.
  $.password_checker = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.password_checker.options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.password_checker.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].password_checker = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));
