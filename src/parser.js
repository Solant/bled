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

        // Simple nodes
        const literals = [
            'NumberLiteral',
            'StringLiteral',
            'CharLiteral',
            'StringLiteral',
            'Comment',
        ];
        if (literals.includes(type)) {
            current++;
            return { type, value };
        }

        // Variables
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
            const isEol = t => t.type === 'Token' && t.value === 'EOL';
            const isComment = t => t.type === 'Comment';
            while (currentToken && !(isEol(currentToken) || isComment(currentToken))) {
                node.arguments.push(walk());
                currentToken = tokenList[current];
            }
            if (!currentToken || isEol(currentToken)) {
                current++;
            }

            return node;
        }
    }

    while (current < tokenList.length) {
        ast.body.push(walk());
    }

    return ast;
};
