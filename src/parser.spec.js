const parse = require('./parser');
const tokenize = require('./tokenizer');

function makeAst(source) {
    const tokens = tokenize(source.trim());
    return parse(tokens);
}

describe('Parser', function () {
    test('simple ast', function () {
        const ast = makeAst(`
            vAr a B
            iNc b a
        `);

        expect(ast.body).toEqual([
            {
                type: 'CallExpression',
                name: 'var',
                arguments: [{ type: 'Symbol', value: 'a' }, { type: 'Symbol', value: 'b' }],
            },
            {
                type: 'CallExpression',
                name: 'inc',
                arguments: [{ type: 'Symbol', value: 'b' }, { type: 'Symbol', value: 'a' }],
            },
        ])
    });
});
