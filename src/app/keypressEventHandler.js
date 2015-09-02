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



/******************************************************************************
***
***
Legacy
***
***
*******************************************************************************

javaSnippets = {
    0 : "for(int i = 0; i < length; i++){ ` total += i; ` }",
    1 : "if(variable > constant){ ` variable % 12 ` }else{ ` variable++ ` }",
    2 : "public static void main (String args[]){ ` ` }",
    3 : "public class ClassName(){ ` ` }",
    4 : "public static int sum(int n, int k){ ` return n + k ` }"
}

javascriptSnippets = {
    0 : "document.querySelector('.start').addEventListener('click', start);",
    1 : "document.querySelector('.start').addEventListener('click', start);"
}
coffeescriptSnippets = {
    0 : "f"
}

jadeSnippets = {
    0 : "+flex-keyboard();"
}
cssSnippets = {
    0 : "nav ul li ul li { ` width:100%; ` padding:0px 3px 3px; ` }"
}
lessSnippets = {
    0 : ".box-shadow(@style, @c) when (iscolor(@c)) { -webkit-box-shadow: @style @c; box-shadow: @style @c; }"
}
sassSnippets = {
    0 : "a { &:hover { text-decoration: underline; } body.firefox & { font-weight: normal; } }"
}


languages = {
    "Java" : javaSnippets,
    "JavaScript" : javascriptSnippets,
    "CoffeScript" : coffeescriptSnippets,
    "Jade" : jadeSnippets,
    "CSS" : cssSnippets,
    "LESS" : lessSnippets,
    "SASS" : sassSnippets
}

commands = [8, 9,13,16,17,18,19,20,46];
keyboard = {
    8   : -1, //backspace
    9   : -2, //tab
    13  : -3, //enter
    16  : -4, //shift
    17  : -5, //ctrl
    18  : -6, //alt
    19  : -7, //pause
    20  : -8, //cap locks
    46  : -9, //delete
    32  : ' ',
    48  : '0',
    49  : '1',
    50  : '2',
    51  : '3',
    52  : '4',
    53  : '5',
    54  : '6',
    55  : '7',
    56  : '8',
    57  : '9',
    65  : 'a',
    66  : 'b',
    67  : 'c',
    68  : 'd',
    69  : 'e',
    70  : 'f',
    71  : 'g',
    72  : 'h',
    73  : 'i',
    74  : 'j',
    75  : 'k',
    76  : 'l',
    77  : 'm',
    78  : 'n',
    79  : 'o',
    80  : 'p',
    81  : 'q',
    82  : 'r',
    83  : 's',
    84  : 't',
    85  : 'u',
    86  : 'v',
    87  : 'w',
    88  : 'x',
    89  : 'y',
    90  : 'z',
    109 : '-',
    186 : ';',
    187 : '=',
    188 : ',',
    189 : '-',
    190 : '.',
    191 : '/',
    192 : '`',
    219 : '[',
    220 : '\\',
    221 : ']',
    222 : '\''
}

shiftKeyboard = {
    219 : '{',
    221 : '}',
    55  : '&',
    57  : '(',
    48  : ')',
    49  : '!',
    50  : '@',
    51  : '#',
    52  : '$',
    53  : '%',
    54  : '^',
    55  : '&',
    56  : '*',
    65  : 'A',
    66  : 'B',
    67  : 'C',
    68  : 'D',
    69  : 'E',
    70  : 'F',
    71  : 'G',
    72  : 'H',
    73  : 'I',
    74  : 'J',
    75  : 'K',
    76  : 'L',
    77  : 'M',
    78  : 'N',
    79  : 'O',
    80  : 'P',
    81  : 'Q',
    82  : 'R',
    83  : 'S',
    84  : 'T',
    85  : 'U',
    86  : 'V',
    87  : 'W',
    88  : 'X',
    89  : 'Y',
    90  : 'Z',
    186 : ':',
    187 : '+',
    188 : '<',
    189 : '_',
    190 : '>',
    191 : '?',
    192 : '~',
    220 : '|',
    222 : '"'
}

finger_l_pinky = ['1','!','q','a','z'];
finger_l_ring = ['2','@','w','s','x'];
finger_l_middle = ['3','#','e','d','c'];
finger_l_index = ['4','$','r','f','v','5','%','t','g','b'];

finger_l_thumb = [" "];


finger_r_index = ['6','^','y','h','n','7','&','u','j','m'];
finger_r_middle = ['8','*','i','k',',','<'];
finger_r_ring = ['9','(','o','l','.','>'];
finger_r_pinky = ['0',')','p',';',':','/','?','-','_','[','{','\'','"','=','+',']','}','\\','|'];

finger_r_thumb = [];

fingers = [finger_l_pinky, finger_l_ring, finger_l_middle, finger_l_index, finger_l_thumb, finger_r_pinky, finger_r_ring, finger_r_middle, finger_r_index, finger_r_thumb];
//fingers = [finger_l_index, finger_l_middle, finger_l_ring, finger_l_pinky, finger_r_index, finger_r_middle, finger_r_ring, finger_r_pinky];

var language = "";
var snippet = "";
var length = 0;
var index = 0;
var typos = [];

var hasStarted = false;
var isTiming = false;
var beginTime = 0;
var backspaceFrequency = 0;

$(document).keydown(function(event) {

    var $selection = $('#startLang');
    var isOpen = $selection.hasClass('open');
    console.log(isOpen);
    if(isOpen){
        reset();
    }else{
        if(hasStarted){
            if(isTiming == false){
                isTiming = true;
                beginTime = (new Date).getTime();
            }
            console.log(event.keyCode);
            var code = event.keyCode;
            var isShift = event.shiftKey ? true : false;
            var isCommand = isACommand(code);

            if(isCommand){
                if(code == 8 && index > 0){
                    toggleCharacterStyle(index, 'black');
                    index--;
                    hideKeys(snippet.charAt(index-1));
                    suggestKeys(snippet.charAt(index));
                    typos[index] = false;
                    backspaceFrequency++;
                }
            }else{
                if(isShift){
                    $('.letter').toggleClass('uppercase');
                    $('.symbol span').toggle();
                    if(code == 16){
                        index--;
                    }else{
                        if(shiftKeyboard[code] == snippet.charAt(index)){
                            //emit correct sound
                            toggleCharacterStyle(index+1, 'green');
                        }else{
                            //emit incorrect sound
                            toggleCharacterStyle(index+1, 'red');
                            typos[index] = true;
                        }
                    }
                }else{
                    if(keyboard[code] == snippet.charAt(index)){
                        //emit correct sound
                        toggleCharacterStyle(index+1, 'green');
                    }else{
                        //emit incorrect sound
                        toggleCharacterStyle(index+1, 'red');
                        typos[index] = true;
                    }
                }
                index++;
                var wpm = getWPM(length, beginTime);
                var accuracy = Math.round(getAccuracy(length)*100);
                $('#nav-meter a').replaceWith("<a href='#'>" + wpm + " WPM/" + " " + accuracy + "%</a>");

                if(index == length){
                    index = 0;
                    isTiming = false;
                    hasStarted = false;
                    hideKeys(snippet.charAt(index));
                }else{
                    hideKeys(snippet.charAt(index-1));
                    suggestKeys(snippet.charAt(index));
                }
            }
        }else{
            if(event.keyCode == 13){
                start();

            }
        }
    }
});

var isACommand = function (code){
    for (var command in commands){
        if(command == code){
            return true;
        }
    }
    return false;
}

var getWPM = function (length, beginTime) {
    var currentTime = (new Date).getTime();
    var totalTime = currentTime - beginTime;
    return Math.round(length/totalTime * 7500);
}

var getAccuracy = function (length) {
    return 1 - (countTypos()/length);
}

var countTypos = function(){
    var numberTypos = 0;
    for(var i = 0; i < typos.length; i++){
        if(typos[i] == true){
            numberTypos++;
        }
    }
    return numberTypos;
}

var wrapSnippetCharacters = function(snippet) {
    var newInner = '<p>';
    for(var i = 0; i < snippet.length; i++){
        newInner += '<b>'+snippet.charAt(i)+'</b>';
        typos[i] = false;
    }
    newInner += '</p>';
    return newInner;
}

var toggleCharacterStyle = function(index, color){
    //b:nth-of-type(index) replace the current selector with this one when br elements are added for formatting.
    $('.snippet b:nth-of-type('+ index +')')[0].style.color = color;
}

var suggestKeys = function(currentCharacter){
    for(var i = 0; i < $fingers.length; i++){
        $fingers[i].style.fill = "black";
    }
    var currentFinger;
    for(var i = 0; i < fingers.length; i++){
        var finger = fingers[i];
        for(var k = 0; k < finger.length; k++){
            if(currentCharacter == finger[k]){
                currentFinger = finger;
                $fingers[i].style.fill = "green";
            }
        }
    }
    if(currentFinger){
        $(".key span").each(function(){
            for(var k = 0; k < currentFinger.length; k++){
                if($(this).html() == currentFinger[k]){
                    $(this).parent().css("opacity","1");
                }
            }
        });
        $(".letter").each(function(){
            for(var k = 0; k < currentFinger.length; k++){
                if($(this).html() == currentFinger[k]){
                    $(this).css("opacity","1");
                }
            }
        });
    }
}

var hideKeys = function(currentCharacter){
    $('.key span').each(function(){
        $(this).parent().css('opacity', '0.4');
    })
    $('.letter').each(function(){
        $(this).css('opacity','0.4');
    })
}

function playSound(soundFile, isCorrect) {
    if(isCorrect){
       $(".sound").innerHTML= "<embed src=\"correct"+ soundFile+"\" hidden=\"true\" autostart=\"true\" loop=\"false\" />";
    }else{
        $(".sound").innerHTML= "<embed src=\"incorrect"+ soundFile+"\" hidden=\"true\" autostart=\"true\" loop=\"false\" />";
    }
}

function start() {
   reset();

    $fingers = $('path[id^="finger"]');
    for(var i = 0; i < $fingers.length; i++){
        $fingers[i].style.fill = 'black';
    }
    //Save options from modal
    language = $('button.selectpicker').attr('title');

    randNum = (Math.round(Math.random())) % Object.keys(languages[language]).length;
    var randSnippet = '<p>' + languages[language][randNum] + '</p>';
    $('.snippet p').replaceWith(randSnippet);

    //populate variables
    snippet = $('.snippet p').html();
    snippetString = snippet;
    //numberOfBreaks =  (snippet.split(/`/g).length - 1);
    snippet = snippet.replace(/`/g, "");

    length = snippet.length; // - numberOfBreaks;
    typos = new Array (length);

    //wrap each character of snippet with span
    $('.snippet p').replaceWith(wrapSnippetCharacters(snippetString));

     var formattedSnippet = $('.snippet p').html();
     var element = document.createElement("br");
     var elemContainer = document.createElement('div');
     elemContainer.appendChild(element);
     elementHtml = elemContainer.innerHTML;
     formattedSnippet = formattedSnippet.replace(/<b>`<\/b>/g, elementHtml);

     $('.snippet p').replaceWith("<p>" + formattedSnippet + "</p>" );

    //Suggest keys and start
    var currentCharacter = snippet.charAt(0);
    suggestKeys(currentCharacter);
    hasStarted = true;
}

function reset(){
    hideKeys(null);
    language = "";
    snippet = "";
    length = 0;
    index = 0;
    typos = [];

    hasStarted = false;
    isTiming = false;
    beginTime = 0;
    backspaceFrequency = 0;
}

function navSettings(e){
    e.stopPropagation();
    $('#settingsModal').modal('show');
}
function navKeyboard(e){
    e.stopPropagation();
    $('.keyboard').toggleClass('hidden');
}
function navHands(e){
    e.stopPropagation();
    var $hands = $('#layer1');
    var visibility = $hands[0].style.visibility;
    if(visibility === "hidden"){
        $hands[0].style.visibility = "visible";
    }else{
        $hands[0].style.visibility = "hidden";
    }
}

document.addEventListener('DOMContentLoaded', function () {
    $('.selectpicker').selectpicker();
    document.querySelector('#nav-start').addEventListener('click', start);
    document.querySelector('#nav-settings-preferences').addEventListener('click', navSettings);
    document.querySelector('#nav-settings-keyboard').addEventListener('click', navKeyboard);
    document.querySelector('#nav-settings-hands').addEventListener('click', navHands);
});

*******************************************************************************
***
***
***
End Legacy
***
***
*******************************************************************************/
