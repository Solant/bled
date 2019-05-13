const tokenize = require('./tokenizer');

describe('Numbers', () => {
    test('positive', () => {
        expect(tokenize('123')).toEqual([{ type: 'NumberLiteral', value: 123 }]);
    });

    test('negative', () => {
        expect(tokenize('-123')).toEqual([{ type: 'NumberLiteral', value: -123 }]);
    });
});

describe('whitespace', () => {
    test('whitespace', () => {
        expect(tokenize('1 2')).toEqual([
            { type: 'NumberLiteral', value: 1 },
            { type: 'NumberLiteral', value: 2 },
        ]);
    });
});

describe('Strings', () => {
    test('simple strings', () => {
        expect(tokenize('"my string"')).toEqual([{ type: 'StringLiteral', value: 'my string' }]);
    });
});

describe('Chars', () => {
    test('simple char', () => {
        expect(tokenize("'a'")).toEqual([{ type: 'CharLiteral', value: 'a' }]);
    });
});

describe('Keywords', () => {
    test('generic test', () => {
        expect(tokenize('msg "Hello World"')).toEqual([
            { type: 'Keyword', value: 'msg' },
            { type: 'StringLiteral', value: 'Hello World' },
        ]);
    });
});

describe('Sources', () => {
    test('', () => {
        const result = tokenize(`
            var A B
            sEt A 'a'
		    msg a B
        `.trim());

        expect(result).toEqual([
            { type: 'Keyword', value: 'var' },
            { type: 'Symbol', value: 'A' },
            { type: 'Symbol', value: 'B' },
            { type: 'Token', value: 'EOL' },

            { type: 'Keyword', value: 'sEt' },
            { type: 'Symbol', value: 'A' },
            { type: 'CharLiteral', value: 'a' },
            { type: 'Token', value: 'EOL' },

            { type: 'Keyword', value: 'msg' },
            { type: 'Symbol', value: 'a' },
            { type: 'Symbol', value: 'B' },
        ]);
    });
});
