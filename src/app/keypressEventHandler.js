'use strict';

import Keyboard from './constants/keyboard';
import KeyCode from './constants/keyCode';

var isACommand = function (code){
    for (var command in Keyboard.commands){
        if(command == code){
            return true;
        }
    }
    return false;
}

export default function handleKeyDown(event){
  var hasStarted = false;
  var index = 0;

	console.log(event.keyCode);

	var code = event.keyCode;
	var isShift = event.shiftKey ? true : false;
	var isCommand = isACommand(code);

  if(!hasStarted && event.keyCode === KeyCode.Enter){
		//start();
	}
	else if(isCommand && code === KeyCode.BackSpace && index > 0){

	}
	else{
		if(isShift){
				//$('.letter').toggleClass('uppercase');
				//$('.symbol span').toggle();
				if(code === KeyCode.Shift){
						//index--;
				}else{
						//if(shiftKeyboard[code] == snippet.charAt(index)){
						//		toggleCharacterStyle(index+1, 'green');
						//}else{
						//	toggleCharacterStyle(index+1, 'red');
						//		typos[index] = true;
						//}
				}
		}else{
				//if(keyboard[code] == snippet.charAt(index)){
						//toggleCharacterStyle(index+1, 'green');
				//}else{
						//toggleCharacterStyle(index+1, 'red');
						//typos[index] = true;
				//}
		}
		//index++;
		if(index == length){
				//index = 0;
				//isTiming = false;
				//hasStarted = false;
				//hideKeys(snippet.charAt(index));
		}else{
				//hideKeys(snippet.charAt(index-1));
				//suggestKeys(snippet.charAt(index));
		}
	}
}
