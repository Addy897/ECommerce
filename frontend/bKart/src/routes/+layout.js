import { browser } from '$app/environment';
import { loginStore } from '../stores/loginstore';

/** @type {import('./$types').LayoutLoad} */
export async function load({data}) {
    if(browser){
        if(data && data.user){
            loginStore.set({isLogged:true,userName:data.user.fname})
        }
        else{
            loginStore.set({isLogged:false,userName:null})
        }
    }
    return data
}