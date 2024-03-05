import { error, redirect } from '@sveltejs/kit';
import { handlers } from '../../lib/handlers';
import { verifyJWT } from '../../lib/jwtHadlers';
/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {

  if (params.slug) {
    try {

      let keyword = Buffer.from(params.slug).toString("base64")
      
      const rawResponse = await fetch('http://127.0.0.1:8000/product/get/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Api-Token': 'random',
          'Keyword': keyword,
        },
      });
      
      let prod = await rawResponse.json();
      prod = Buffer.from(prod.response, "base64").toString()
      prod = JSON.parse(prod)
      
      if (prod) {
       
        const rawResponse = await fetch('http://127.0.0.1:8000/items/get/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Api-Token': 'random',
            'Keyword': keyword,
          },
        });

        let content = await rawResponse.json();
        content = Buffer.from(content.response, "base64").toString()
        
        content = JSON.parse(content)
        if (content.length) {
          return { prod: prod, content: content[0] }
        }

      }
      return error(404, "Not Found");
    } catch (err) {
      console.log(err)
    }

  }
}

/** @type {import('./$types').Actions} */
export const actions = {
      cart: async ({url,cookies})=>{
        
        let user=cookies.get("user");
        if(!user){
          throw redirect(301,"/login")
        }
        user= await verifyJWT(user);
        if(!user){
          cookies.delete('user');
          throw redirect(301,"/login")
        }
        user=user.user
        let res=await handlers.addToCart(user.email,url.pathname);
        if(res.Code===404){
          return {error:true,msg:"Something Went Wrong!"}
        }else{
          return{sucess:true}
        }

        
      }
};