// @flow

function myLog(message : string | number) {
  console.log(message)
}

type Triple = {a : number, b : number, c? : number}

/**
 * Adds the numbers in the given Triple.
 * @param {Triple} a The numbers to add.
 * @returns {Number} The sum of all numbers in a.
 */
function add(a : Triple) {
  return a.a + a.b + (a.c ? a.c : 0)
}

myLog(add({a: 5, b: 4}))
