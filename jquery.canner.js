 /*
 *
 * Copyright (c) 2012 Peter Jezik (twitter.com/peterjezik)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

(function($){

	$.fn.canner = function(data) {
		return this.each(function(){
			var el = $(this);
			el.keydown(function(e){

				//check if the "TAB" was pressed
				if(e.which == 9){
					var text = el.val();

					//find out which word was word_typed before the TAB was pressed
					var word_typed = "";
					var cursor_position = privateMethods.getCaretPosition(el[0]);
					var first_position = last_position = cursor_position-1;

					//start searching for the word until there is a space, end of the line or beginning of the text/input field					
					while(text[first_position] != " " && text[first_position] != "\n" && text[first_position] !="\r" && first_position >= 0){
						word_typed = text[first_position] + word_typed;
						first_position--;
					}

					if(word_typed !=""){

						//check if the word found is among the defined shortcuts
						for(shortcut in data){
							if(shortcut == word_typed){

								//if yes, stop the default behaviour of TAB (toggling between the page elements)
								if (e.preventDefault){ 
								    e.preventDefault(); 
								} else {
								    e.returnValue = false;
								}

								//and add the message instead of the shortcut into the field (and do not mess the rest of the text)
								var message_to_write = data[shortcut];
								var text_first_part = text.substring(0, first_position+1);
								var text_last_part = text.substring(last_position+1);
								var new_text = text_first_part + message_to_write + text_last_part;
								el.val(new_text);

								//finally add the caret at the end of the newly inserted message
								var new_cursor_position = first_position + message_to_write.length + 1;
								privateMethods.setCaretPosition(el[0], new_cursor_position);
								break;
							}
						}
					}

				}
			});
		});
	 }; 

	 privateMethods = {

	 	getCaretPosition: function(el){
			if (typeof el.selectionStart == "number") {
		        return el.selectionStart;
		    } else if (document.selection) { 
			    el.focus(); 

			    var r = document.selection.createRange(); 
			    if (r == null) { 
			      return 0; 
			    } 

			    var re = el.createTextRange(), 
			        rc = re.duplicate(); 
			    re.moveToBookmark(r.getBookmark()); 
			    rc.setEndPoint('EndToStart', re); 

			    return rc.text.length; 
			  } 

				return 0;
		},

		setCaretPosition: function(el, position){
			if (typeof el.selectionStart == "number") {
		        el.selectionStart = el.selectionEnd = position;
		    } else if (typeof el.createTextRange != "undefined") {
		        el.focus();
		        var range = el.createTextRange();
		        range.move('character', position);
		        range.collapse(false);
		        range.select();
		    }
		}

	 }

})(jQuery);