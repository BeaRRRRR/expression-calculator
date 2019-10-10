const operators = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => {
        if (y == 0) throw new Error('TypeError: Division by zero.');
        return x / y
    }
};

String.prototype.isNumeric = function () {
    return !isNaN(parseFloat(this)) && isFinite(this);
};

function calculatePriority(char) {
    if (char == '*' || char == '/') return 3;
    else if (char == '(') return 1;
    else return 2;
}

function eval() {
    // Do not use eval!!!
    return;
}


function expressionCalculator(expr) {
    let chars = expr.trim().replace(/ /g, '').split('');
    // let chars = expr.split('');
    let stack = [];
    let string = '';
    let num = '';
    let bool;
    for (let i = 0; i < chars.length; i++) {
        let char = chars[i];
        if (char.isNumeric()) {
            num += char;
            bool = true;
            if (i === chars.length - 1) string += num + ' ';
        } else {
            if (bool) {
                string += num + ' ';
                bool = false;
                num = '';
            }
            if (char in operators) {
                let priority = calculatePriority(char);
                while (stack.length != 0) {
                    let pop = stack[stack.length - 1];
                    if (calculatePriority(pop) >= priority) {
                        string += stack.pop() + ' ';
                    } else break;
                }
                stack.push(char);
            } else if (char == '(') {
                stack.push(char);
            } else if (char == ')') {
                let elem = stack.pop();
                let found = false;
                if(elem == '(') found = true;
                while (stack.length > 0) {
                    if (elem == '(') {
                        found = true;
                        break;
                    }
                    string += elem + ' ';
                    elem = stack.pop();

                }
                if (stack.length == 0 && !found) {
                    throw 'ExpressionError: Brackets must be paired';
                }
            }
        }
    }
    if (stack.includes('(') || stack.includes(')')) throw 'ExpressionError: Brackets must be paired';
    let temp = stack.length;
    for (let i = 0; i < temp; i++) {
        string += stack.pop() + ' ';
    }
    return evaluate(string.trim())
    // return string;
}

let evaluate = (expr) => {
    let stack = [];

    expr.split(' ').forEach((token) => {
        if (token in operators) {
            let [y, x] = [stack.pop(), stack.pop()];
            stack.push(operators[token](x, y));
        } else {
            stack.push(parseFloat(token));
        }
    });

    return stack.pop();
};

console.log(expressionCalculator('1 + 2) * 3'));
// console.log(evaluate(expressionCalculator('( 6 + 10 - 4 ) / ( 1 + 1 * 2 ) + 1').trim()));

module.exports = {
    expressionCalculator
}
