import colorScheme from "./_data/colorScheme";
import { writable } from "svelte/store";


export const colors = writable(colorScheme.grays);