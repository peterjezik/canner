# Canner - jQuery Canned Messages Plugin

A jQuery plugin for creating canned messages functionality in `input` and `textarea` elements.

## Usage

Just pass an object with `"shortcut" : "message"` pairs, e.g.

    var messages = {

			"h" : "Hi, how can I help you?",
			"e" : "Everything will be OK",
			"th" : "Thank you very much for your attention"

	};

into the `canner()` method invoked on elements of your choice, e.g.

	$("textarea").canner(messages);

When you type one of the shortcuts and press `TAB` key, the shortcut will be replaced by the given message.

## License

Copyright (c) 2012 Peter Jezik under the [MIT License](http://www.opensource.org/licenses/mit-license.php)