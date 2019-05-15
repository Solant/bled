function normalize(name) {
    return name.toLowerCase();
}

module.exports = function parse(tokenList) {
    let current = 0;
    const ast = {
        type: 'Program',
        body: [],
    };

    function walk() {
        const token = tokenList[current];
        const { type, value } = token;

        // Simple values
        if (['NumberLiteral', 'StringLiteral', 'CharLiteral', 'StringLiteral'].includes(type)) {
            current++;
            return { type, value };
        }

        if (type === 'Symbol') {
            current++;
            return { type, value: normalize(value) };
        }

        // call expressions
        if (type === 'Keyword') {
            const node = {
                type: 'CallExpression',
                name: normalize(value),
                arguments: [],
            };
            current++;

            let currentToken = tokenList[current];
            while (currentToken && currentToken.type !== 'Token' && currentToken.value !== 'EOL') {
                node.arguments.push(walk());
                currentToken = tokenList[current];
            }
            current++;

            return node;
        }
    }

    while (current < tokenList.length) {
        ast.body.push(walk());
    }

    return ast;
};
