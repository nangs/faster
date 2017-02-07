const javaSnippets = [
    'for(int i = 0; i < length; i++){\n\ttotal += i;\n}',
    'if(constiable > constant){\n\tconstiable % 12\n}else{\n\tconstiable++\n}',
    'public static void main (String args[]){\n\n}',
    'public static int sum(int n, int k){\n\treturn n + k\n}'
];

const javascriptSnippets = [
    'document.querySelector(\'.start\').addEventListener(\'click\', start);'
];

export const LANGUAGES = [
  'Java',
  'JavaScript'
];

export const SNIPPETS = {
    Java : javaSnippets,
    JavaScript : javascriptSnippets
};
