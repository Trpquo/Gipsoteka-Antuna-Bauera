import { writable, readable } from 'svelte/store'

export const site = writable( null )

export const imageRoot = readable("/img")