import { writable } from 'svelte/store'
 
export { default as img } from '$lib/components/html/img.svelte'
export { default as p } from '$lib/components/html/p.svelte'
export const hasGallery = writable( null )
