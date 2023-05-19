import { writable } from 'svelte/store';
import { tweened } from 'svelte/motion';

let mapLoaded = writable(false);

let loadProgress = tweened(0);

export default { mapLoaded, loadProgress}