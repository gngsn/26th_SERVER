var calculator = {
    add: (...args) => {
        return args.reduce((a, b) => {
            return a + b;
        });
    },
    substract: (...args) => {
        return args.reduce((a, b) => {
            return a - b;
        });
    },
    multiply: (...args) => {
        return args.reduce((a, b) => {
            return a * b;
        });
    },
    divide: (...args) => {
        return args.reduce((a, b) => {
            return a / b;
        });
    }
}

module.exports = calculator;