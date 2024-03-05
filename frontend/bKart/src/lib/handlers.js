import {BACKEND_URL} from "$env/static/private"
export class handlers {

  static async signUp(details) {
    
    let user = null;
    let Code = 200;
    let msg = "";
    try {
      const rawResponse = await fetch(BACKEND_URL+"users/register/", {

        method: "Post",
        headers: {
          'Accept': 'application/json',
          'api-token': 'random',
        },
        body: JSON.stringify({
          "email": details.email,
          "password": details.password,
          "name": details.name
        })
      });
      user = await rawResponse.json();
      console.log(user)
    } catch (error) {
      console.log("Error: ",error)
      Code = 404;
      msg = error;
    }
    if (Code !== 200 || !user) {
      return ({ "Code": Code, "errorMessage": msg });
    } else {
      return ({ Code: Code, user: user.user })
    }
  }

  static async singIn(email, pass) {

    let user = null;
    let Code = 200;
    let msg = "";
    try {
      const rawResponse = await fetch(BACKEND_URL+"users/login/", {

        method: "Post",
        headers: {
          'Accept': 'application/json',
          'api-token': 'random',
        },
        body: JSON.stringify({
          "email": email,
          "password": pass
        })
      });
      user = await rawResponse.json();
    } catch (error) {
      Code = 404;
      msg = error;
    }
    if (Code !== 200 || !user) {
      return ({ "Code": Code, "errorMessage": msg });
    } else {
      return ({ Code: Code, user: user.user })
    }
  }
  static async addToCart(email,prod) {
    let res = null;
    let Code = 200;
    let msg = "";
    try {
      const rawResponse = await fetch(BACKEND_URL+"cart/add/", {

        method: "Post",
        headers: {
          'Accept': 'application/json',
          'api-token': 'random',
        },
        body: JSON.stringify({
          "email": email,
          "prod":prod,
          
        })
      });
       res= await rawResponse.json();
    } catch (error) {
      Code = 404;
      msg = error;
    }
    if (Code !== 200 || res.error) {
      if(res && res.errorMessage){
        msg=res.errorMessage;
      }
      return ({ "Code": Code, "errorMessage": msg });
    } else {
      return ({ Code: Code})
    }


  }
  static async getCart(email) {
    let res = null;
    let Code = 200;
    let msg = "";
    try {
      const rawResponse = await fetch(BACKEND_URL+"cart/get/", {

        method: "Post",
        headers: {
          'Accept': 'application/json',
          'api-token': 'random',
        },
        body: JSON.stringify({
          "email": email,
        })
      });
       res= await rawResponse.json();
    } catch (error) {
      Code = 404;
      msg = error;
    }
    if (Code !== 200 || res.error) {
      if(res && res.errorMessage){
        msg=res.errorMessage;
      }
      return ({ "Code": Code, "errorMessage": msg });
    } else {
      let response=Buffer.from(res.response,"base64").toString()
      response=JSON.parse(response)
      return ({ Code: Code,cart:response})
    }


  }
  static async saveCart(email,cart) {
    let res = null;
    let Code = 200;
    let msg = "";
    try {
      cart = Buffer.from(cart).toString("base64")
      const rawResponse = await fetch(BACKEND_URL+"cart/save/", {

        method: "Post",
        headers: {
          'Accept': 'application/json',
          'api-token': 'random',
        },
        body: JSON.stringify({
          "email":email,
          "cart": cart,
        })
      });
       res= await rawResponse.json();
    } catch (error) {
      Code = 404;
      msg = error;
    }
    if (Code !== 200 || res.error) {
      if(res && res.errorMessage){
        msg=res.errorMessage;
      }
      return ({ "Code": Code, "errorMessage": msg });
    } 
    return ({ "Code": Code });

  }
}