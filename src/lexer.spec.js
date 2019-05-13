const Lexer = require('./lexer');

describe('Lexer', () => {
    test('Number rules', () => {
        const l = new Lexer('1 2 3 4 55');
        const result = [];
        l.addRule(/[0-9]+/, lexem => result.push(lexem));
        l.addRule(/\s+/, () => {});

        l.lex();

        expect(result).toEqual(['1', '2', '3', '4', '55']);
    });

    test('String literals', () => {
        const l = new Lexer('"my string 1","my string 2"');
        const result = [];
        l.addRule(/"(.+?)"/, lexem => result.push(lexem));
        l.addRule(/,/, () => {});

        l.lex();

        expect(result).toEqual(['my string 1', 'my string 2']);
    });

    test('Unknown tokens', () => {
        const l = new Lexer('1 2, 3 4 55');
        const result = [];
        l.addRule(/[0-9]+/, lexem => result.push(lexem));
        l.addRule(/\s+/, () => {});

        expect(() => l.lex()).toThrow();
    });
});
