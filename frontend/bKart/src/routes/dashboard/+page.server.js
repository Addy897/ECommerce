import { redirect } from '@sveltejs/kit'
import { handlers } from '../../lib/handlers'

/** @type {import('./$types').PageServerLoad} */
export async function load({locals}) {
    if(!locals.user){
        throw redirect(301,'/login')
    }
   
        let cart=await handlers.getCart(locals.user.email)
        return{user:locals.user,cart:cart.cart}
    
    
}
/** @type {import('./$types').Actions} */
export const actions = {
    save: async ({request,locals})=>{
        let data=await request.formData();
       data=data.get('cart')
       let rawResponse=await handlers.saveCart(locals.user.email,data)
       if (rawResponse.Code !== 200) {
        return {error:true,msg:rawResponse.errorMessage}
       }
       return{sucess:true}
    },
    buy: async({request,locals})=>{
        let reader=await request.formData()
        if(Object.keys(reader.get('cart')).length){
            return {error:true,msg:"Nothing In Cart to Purchase"}
        }
       
        
    }
};
