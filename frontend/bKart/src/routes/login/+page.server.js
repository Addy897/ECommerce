
import { handlers } from "$lib/handlers";
import { signJWT } from "$lib/jwtHadlers";
import { fail, redirect } from "@sveltejs/kit";
/** @type {import('./$types').PageServerLoad} */
export async function load({locals}) {
    
    if(locals.user){
       
        throw redirect(303,"/")
    }
    
    
}
/** @type {import('./$types').Actions} */
export const actions = {
    login: async ({ request, cookies }) => {
        let formData = await request.formData();
        let email = formData.get('email')?.toString();
        let password = formData.get('password')?.toString();
        if (email && password) {
            let user = await handlers.singIn(email, password)

            if (!user.user || user.Code !== 200) {
                if (user.errorMessage) {
                    return fail(400, { errormsg: user.errorMessage, serror: true });
                }
                return fail(400, { errormsg: "Invalid Id Or Password", serror: true });

            }
            let token = null
            try{
                token= await signJWT({user:user.user})
            }catch(e){
                console.log(e)
                throw redirect(303,"/login")
            }
            if(!token){
                throw redirect(303,"/login")
            }
            cookies.set("user",token,{ httpOnly: true,
                sameSite: 'strict',
                secure: false,
                path: '/',
                maxAge: 60 * 60*24*7}) 
    
        }
        },
    signup: async ({ request, cookies }) => {
            let formData = await request.formData();
            let email = formData.get('email')?.toString();
            let password = formData.get('password')?.toString();
            let cpassword = formData.get('cpassword')?.toString();
            let name = formData.get('name')?.toString();
            if (email && password) {
                if (password!==cpassword) {
                    return fail(400, { errormsg:"Passwords are not same", serror: true });
                }
                let user = await  handlers.signUp({email:email, password:password,name:name})

                if (!user.user || user.Code !== 200) {
                    if (user.errorMessage) {
                        return fail(400, { errormsg: user.errorMessage, serror: true });
                    }
                    return fail(400, { errormsg: "Invalid Id Or Password", serror: true });

                }
                let token = null
                try{
                    token= await signJWT({user:user.user})
                }catch(e){
                    console.log(e)
                    throw redirect(303,"/login")
                }
                if(!token){
                    throw redirect(303,"/login")
                }
                cookies.set("user",token,{ httpOnly: true,
                    sameSite: 'strict',
                    secure: false,
                    path: '/',
                    maxAge: 60 * 60*24*7}) 
        
            }
            }
};
