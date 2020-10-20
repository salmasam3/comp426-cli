/**
 *
 * @param {number} a
 * @param {number} b
 * @returns {string} 'a + b = (a + b)'
 *
 * example: sumToString(3, 4)
 * returns: '3 + 4 = 7'
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 */
export function sumToString(a, b) {
    return ''+ a + ' + ' + b + ' = ' + (a+b); 
}
console.log(sumToString(3,4));


/**
 *
 * @param {number} startNumber
 * @param {number} endNumber
 * @returns {number[]}
 *
 * example: getIncreasingArray(3, 7)
 * returns: [ 3, 4, 5, 6, 7 ]
 *
 */
export function getIncreasingArray(startNumber, endNumber) {
    let result = [];
    let length = endNumber-startNumber;
    for(let i = 0; i < length+1;i++) {
        result[i] = startNumber;
        startNumber++;
    }
    return result;
}
console.log(getIncreasingArray(3,7));

/**
 *
 * @param {number[]} numbers
 * @return {{min: number, max: number}}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
 * and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
 */
export function maxAndMin(numbers) {
    let mini = Math.min(...numbers);
    let maxi = Math.max(...numbers);
    return {min: mini, max: maxi};
}

console.log(maxAndMin([1,2,3]));

/**
 *
 * @param array - An array of any primitive type
 * @returns {object} Object where the keys are the values that were passed in
 * and the value was the number of times it occurred.
 *
 * example: countArray([3, 6, 3, 2, 2, 3, 'some', 'hello', 'some', [1, 2]])
 * returns: {'2': 2, '3': 3, '6': 1, some: 2, hello: 1, '1,2': 1}
 *
 */
export function countArray(array) {
    let result = { };
    for(let i = 0; i < array.length; i++) {
        if(!result[array[i]]) {
            result[array[i]] = 0; 
        }
        result[array[i]]++;
    }
    return result;
}
console.log(countArray([3, 6, 3, 2, 2, 3, 'some', 'hello', 'some', [1, 2]]))
