'use strict';

var javaSnippets = [
    "for(int i = 0; i < length; i++){ ` total += i; ` }",
    "if(variable > constant){ ` variable % 12 ` }else{ ` variable++ ` }",
    "public static void main (String args[]){ ` ` }",
    "public class ClassName(){ ` ` }",
    "public static int sum(int n, int k){ ` return n + k ` }"
]

var javascriptSnippets = [
    "document.querySelector('.start').addEventListener('click', start);",
    "document.querySelector('.start').addEventListener('click', start);"
]


export default {
    "Java" : javaSnippets,
    "JavaScript" : javascriptSnippets
}
