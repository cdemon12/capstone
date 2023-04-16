import { tweened } from 'svelte/motion';
import { get } from 'svelte/store';

async function applyTween(obj, tweened, visited = new Set()) {
    if (visited.has(obj)) {
      return obj; // return the object if it has already been visited
    }
    visited.add(obj); // mark the object as visited
  
    for (const key in obj) {
      if (obj[key] === 'nodes' || obj[key] === 'links') {
        await applyTween(obj[key], tweened, visited); // recursively apply the function to nested objects
      } else if (typeof obj[key] === 'number' || typeof obj[key] === 'object') {
        obj[key] = tweened(obj[key]); // apply the tweened function to number values
      }
    }
    return obj;
}

async function applySet(objOne, objTwo, visited = new Set()) {
    if (visited.has(objOne)) {
      return objOne; // return the object if it has already been visited
    }
    visited.add(objOne); // mark the object as visited
  
    for (const key in objOne) {
      if (typeof objOne[key] === 'object' && typeof objOne[key].set == "function") {
        objOne[key].set(objTwo[key]);
      } else if (typeof objOne[key] === 'object') {
        await applySet(objOne[key], objTwo[key], visited); // recursively apply the function to nested objects
      }
    }
    return objOne;
}

async function removeStores(obj, visited=new Set()) {
    if (visited.has(obj)) {
        return obj; // return the object if it has already been visited
    }
    visited.add(obj); // mark the object as visited

    for (const key in obj) {
        if (typeof obj[key] === 'object' && typeof obj[key].set == "function") {
            obj[key] = get(obj[key]); // remove the store
        } else if (typeof obj[key] === 'object') {
            await removeStores(obj[key], visited); // recursively apply the function to nested objects
        }
    }
    return obj;
}

export { applyTween, applySet, removeStores };