const Lexer = require('./lexer');

const noop = () => {};

function tokenize(source) {
    const lexer = new Lexer(source);

    const result = [];

    const keywords = [
        'var',
        'set',
        'inc',
        'dec',
        'add',
        'sub',
        'mul',
        'divmod',
        'div',
        'mod',
        'cmp',
        'a2b',
        'b2a',
        'lset',
        'lget',
        'ifeq',
        'ifneq',
        'wneq',
        'proc',
        'end',
        'call',
        'read',
        'msg',
        'rem',
    ];
    const keywordRegex = new RegExp(`(${keywords.join('|')})`, 'i');
    lexer.addRule(keywordRegex, (value) => {
        result.push({ type: 'Keyword', value });
    });

    lexer.addRule(/-?[0-9]+/, (value) => {
        result.push({ type: 'NumberLiteral', value: Number.parseInt(value, 10) });
    });

    lexer.addRule(/"(.+?)"/, (value) => {
        result.push({ type: 'StringLiteral', value });
    });

    lexer.addRule(/'(.+?)'/, (value) => {
        result.push({ type: 'CharLiteral', value });
    });

    lexer.addRule(/[a-zA-Z]+/, (value) => {
        result.push({ type: 'Symbol', value });
    });

    lexer.addRule(/\n/, () => result.push({ type: 'Token', value: 'EOL' }));

    lexer.addRule(/[ \t]+/, noop);

    lexer.lex();

    return result;
}

module.exports = tokenize;
