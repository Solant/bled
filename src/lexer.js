class Lexer {
    constructor(source) {
        this.source = source;
        this.index = 0;

        this.rules = [];
    }

    addRule(regexRule, cb) {
        this.rules.push({ rule: regexRule, callback: cb });
    }

    lex() {
        while (this.index !== this.source.length) {
            let currentIndex = this.index;

            for (let i = 0; i < this.rules.length; i++) {
                const match = this.rules[i].rule.exec(this.source.substring(this.index));

                if (match !== null && match.index === 0) {
                    const lexemBody = match[match.length - 1];
                    this.rules[i].callback.call(undefined, lexemBody);
                    this.index += match[0].length;
                }
            }

            if (currentIndex === this.index) {
                throw Error(`No lexem rules found for string "${this.source.substring(this.index, 10)}"`);
            }
        }
    }
}

module.exports = Lexer;
