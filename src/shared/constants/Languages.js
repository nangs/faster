const javaSnippets = [
    'for(int i = 0; i < length; i++){\n\ttotal += i;\n}',
    'if(speed > constant){\n\speed % 12\n}else{\n\speed++\n}',
    'public static void main (String args[]){\n\n}',
    'public static int sum(int n, int k){\n\treturn n + k\n}'
];

const javascriptSnippets = [
    'var main = function() {\n\tdocument\n\t.querySelector(\'.start\')\n\t.addEventListener(\'click\', start);\n}'
];

const csharpSnippets = [
    'public virtual IGroupingStrategy GetGroupingStrategy(string name)'
];

export const LANGUAGES = [
  'Java',
  'JavaScript',
  'C#'
];

export const SNIPPETS = {
    Java : javaSnippets,
    JavaScript : javascriptSnippets,
    'C#': csharpSnippets
};
