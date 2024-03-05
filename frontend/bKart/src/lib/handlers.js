const BACKEND_URL=import.meta.env['BACKEND_URL']

export class handlers {
  static async signUp(details) {
    
    return {}
  }

  static async singIn(email, pass) {

    let user = null;
    let Code = 200;
    let msg = "";
    try {
      const rawResponse = await fetch(BACKEND_URL+"/login/", {

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
      const rawResponse = await fetch("http://127.0.0.1:8000/cart/add/", {

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
      const rawResponse = await fetch("http://127.0.0.1:8000/cart/get/", {

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
      const rawResponse = await fetch("http://127.0.0.1:8000/cart/save/", {

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