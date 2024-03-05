import { browser } from '$app/environment';
import { loginStore } from '../stores/loginstore';

/** @type {import('./$types').PageLoad} */
export async function load({data}) {
    if(browser){
        if(data.user){
            loginStore.set({isLogged:true,userName:data.user.fname})
        }
        else{
            loginStore.set({isLogged:false,userName:null})
        }
    }
    return data
}