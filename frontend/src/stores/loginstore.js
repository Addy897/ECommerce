import { writable } from "svelte/store"


export const loginStore=writable({
    isLogged:false,
    userName:null
})