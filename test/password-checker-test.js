(function($) {
	module('password-checker: strength');
	
	test('level: 1', function() {
		expect(1);
		
		var level = $.fn.passwordChecker.strength.getLevel('aaaaa', 6);
		
		equal(level, 0, 'short password');
	});
	
	test('level: 2', function() {
		expect(4);
		
		var level;
		
		level = $.fn.passwordChecker.strength.getLevel('11111111', 6);
		equal(level, 1, 'numbers, weak password');
		
		level = $.fn.passwordChecker.strength.getLevel('aaaaaaaa', 6);
		equal(level, 1, 'lowercase letters, weak password');
		
		level = $.fn.passwordChecker.strength.getLevel('AAAAAAAA', 6);
		equal(level, 1, 'uppercase letters, weak password');
		
		level = $.fn.passwordChecker.strength.getLevel('!!!!!!!!', 6);
		equal(level, 1, 'special characters, weak password');
	});
	
	test('level: 3', function() {
		expect(9);
		
		var level;
		
		level = $.fn.passwordChecker.strength.getLevel('1111aaaa', 6);
		equal(level, 2, 'less than 10, numbers and lowercase letters, normal password');
		
		level = $.fn.passwordChecker.strength.getLevel('1111AAAA', 6);
		equal(level, 2, 'less than 10, numbers and uppercase letters, normal password');
		
		level = $.fn.passwordChecker.strength.getLevel('1111!!!!', 6);
		equal(level, 2, 'less than 10, numbers and special characters, normal password');
		
		level = $.fn.passwordChecker.strength.getLevel('aaaaAAAA', 6);
		equal(level, 2, 'less than 10, lowercase letters and uppercase letters, normal password');
		
		level = $.fn.passwordChecker.strength.getLevel('aaaa!!!!', 6);
		equal(level, 2, 'less than 10, lowercase letters and special characters, normal password');
		
		level = $.fn.passwordChecker.strength.getLevel('AAAA!!!!', 6);
		equal(level, 2, 'less than 10, uppercase letters and special characters, normal password');
		
		level = $.fn.passwordChecker.strength.getLevel('111111aaaaaa', 6);
		equal(level, 2, 'more than 10, numbers and lowercase letters, normal password');
		
		level = $.fn.passwordChecker.strength.getLevel('111111AAAAAA', 6);
		equal(level, 2, 'more than 10, numbers and uppercase letters, normal password');
		
		level = $.fn.passwordChecker.strength.getLevel('111111!!!!!!', 6);
		equal(level, 2, 'more than 10, numbers and special characters, normal password');
		
	});
	
	test('level: 4', function() {
		expect(6);
		
		var level;
		
		level = $.fn.passwordChecker.strength.getLevel('111aaaAAA', 6);
		equal(level, 3, 'numbers, lowercase letters, uppercase letters, strong password');
		
		level = $.fn.passwordChecker.strength.getLevel('111aaa!!!', 6);
		equal(level, 3, 'numbers, lowercase letters, special characters, strong password');
		
		level = $.fn.passwordChecker.strength.getLevel('111AAA!!!', 6);
		equal(level, 3, 'numbers, uppercase letters, special characters, strong password');
		
		level = $.fn.passwordChecker.strength.getLevel('aaaaaaAAAAAA', 6);
		equal(level, 3, 'more than 10, lowercase and uppercase, strong password');
		
		level = $.fn.passwordChecker.strength.getLevel('aaaaaa!!!!!!', 6);
		equal(level, 3, 'more than 10, lowercase and specials, strong password');
		
		level = $.fn.passwordChecker.strength.getLevel('AAAAAA!!!!!!', 6);
		equal(level, 3, 'more than 10, uppercase and specials, strong password');
	});
	
	test('level: 5', function() {
		expect(2);
		
		var level;
		
		level = $.fn.passwordChecker.strength.getLevel('111aaaAAA!!!', 6);
		equal(level, 4, '4 kinds of characters, very strong password');
		
		level = $.fn.passwordChecker.strength.getLevel('aaaAAA!!!', 6);
		equal(level, 4, 'lowercase letters, uppercase letters and special characters, very strong password');
		
	});
}(jQuery));
