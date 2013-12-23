# Password Checker

Password Checker is a jQuery plugin to detect the strength of the password entered by the user.

**Current version:** [0.2.0](https://github.com/nicolaszhao/password-checker/archive/v0.2.0.tar.gz)

## Usage
Include jQuery and the plugin on your page. Then select a password input and call the passwordChecker method on DOM ready.

	<script src="jquery.js"></script>
	<script src="jquery.password-checker.js"></script>
	<script>
		$(function() {
			$(':password').passwordChecker();
		});
	</script>
	<input type="password" name="password" />

## Settable Options
**minlength** (default: 6)   
Type: Number   
The minimum character length.

***

**texts** (default: ['Too short', 'Weak', 'Normal', 'Strong', 'Very strong'])   
Type: Array   
The tip texts of strength level.

***

**colors** (default: ['#900', '#960', '#c60', '#993', '#2A7726'])   
Type: Array   
The colors of strength level.

## Theming
If paging button and paging numbers specific styling is needed, the following CSS class names can be used:
* `.password-checker`: The outer container of the password checker.
	* `.password-checker-text`: The text of the password checker.
	* `.password-checker-value`: The color of the password checker.
	
## Password strength rules
* 1 - short:
	* Less than the specified minimum character length.

* 2 - weak:
	* Greater than the specified minimum character length;
	* Single characters (numbers, lowercase letters, uppercase letters or special characters).

* 3 - normal:
	* Greater than the specified minimum character length;
	* Less than 10 characters two kinds of combinations of character types;
	* More than 10 characters two kinds of combinations of character types, but must include numbers.

* 4 - strong:
	* Greater than the specified minimum character length;
	* 3 kinds of combinations of character types, but must include numbers;
	* More than 10 characters two kinds of combinations of character types, but can not include numbers.

* 5 - very strong:
	* Greater than the specified minimum character length;
	* 4 kinds of combinations of character types;
 	* 3 kinds of combinations of character types, but can not include numbers.
 		
## Dependencies
### Required
[jQuery, tested with 1.10.2](http://jquery.com)

## License
Copyright (c) 2013 Nicolas Zhao; Licensed MIT