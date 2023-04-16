import { tweened } from 'svelte/motion';

function applyTween(obj, tweened, visited = new Set()) {
    if (visited.has(obj)) {
      return obj; // return the object if it has already been visited
    }
    visited.add(obj); // mark the object as visited
  
    for (const key in obj) {
      if (obj[key] === 'nodes' || obj[key] === 'links') {
        applyTween(obj[key], tweened, visited); // recursively apply the function to nested objects
      } else if (typeof obj[key] === 'number' || typeof obj[key] === 'object') {
        obj[key] = tweened(obj[key]); // apply the tweened function to number values
      }
    }
    return obj;
}

function applySet(objOne, objTwo, visited = new Set()) {
    if (visited.has(objOne)) {
      return objOne; // return the object if it has already been visited
    }
    visited.add(objOne); // mark the object as visited
  
    for (const key in objOne) {
      if (typeof objOne[key] === 'object' && typeof objOne[key].set == "function") {
        objOne[key].set(objTwo[key]);
      } else if (typeof objOne[key] === 'object') {
        applySet(objOne[key], objTwo[key], visited); // recursively apply the function to nested objects
      }
    }
    return objOne;
}

let testDataOne = { nodes: {value: 1}, links: {value: 1, name: "test"}};
let testDataTwo = { nodes: {value: 2}, links: {value: 2, name: "test"}};

let value = testDataOne.links.value;

console.log("One: " + value);

testDataOne = applyTween(testDataOne, tweened);

value = testDataOne.links.value;

console.log("Two: ")
console.log(value);

testDataOne = applySet(testDataOne, testDataTwo);

value = testDataOne.links.value;

console.log("Three:")
console.log(value);