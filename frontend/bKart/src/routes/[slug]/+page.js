import { goto } from '$app/navigation'

/** @type {import('./$types').PageLoad} */
export async function load({data}) {
    if(data && data.prod){
    return{product:data.prod,content:data.content}
    }
}