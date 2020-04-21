const calculator = require('./calculator');

var addResult = calculator.add(1, 3, 5, 7);
console.log("add result : ", addResult);

var subResult = calculator.substract(5, 1);
console.log("substract result : ", subResult);

var multiplyResult = calculator.multiply(3, 3);
console.log("multiply result : ", multiplyResult);

var divideResult = calculator.divide(9, 3, 3);
console.log("divide result : ", divideResult);