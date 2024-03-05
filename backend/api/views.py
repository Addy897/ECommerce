from django.shortcuts import render
from django.http import HttpResponse,HttpRequest,JsonResponse,HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.db.utils import IntegrityError
from django.contrib.auth.hashers import make_password,check_password
import json
from urllib.parse import unquote_plus
import base64
from .validate import parseRegisterUser, parseLoginUser
from .models import EUsers,Product,ProductDetails,Cart
import random

from base64 import b64decode,b64encode
def index(request:HttpRequest):
    return HttpResponse("Hello World!!")

@csrf_exempt
def register(request:HttpRequest):
    
    if(request.method=="POST"):
        if(request.headers.get("api-token")==settings.API_TOKEN):
            data:dict=json.loads(request.body.decode())
           
            try:
                passHash=make_password(data.get("password"))
                user=EUsers(email=data.get("email"),name=data.get("name"),password=passHash)
                user.save()
            except IntegrityError as e:
                return(JsonResponse({"Error":True,"message":str(e)}))
            except ValueError as e:
                
                return(JsonResponse({"Error":True,"message":str(e)}))
            
            return JsonResponse(user.toJson())
        else:
            return JsonResponse({"Error":True,"message":"Invalid Token"})
    else:
        return HttpResponse("Invalid Method")
    
@csrf_exempt
def login(request:HttpRequest): 
    if(request.method=="POST"):
        if(request.headers.get("api-token")==settings.API_TOKEN):
            data:dict=json.loads(request.body.decode())
            if(not parseLoginUser(data)):
                return JsonResponse({"Error":True,"message":"Invalid Data"})
            try:
                user=EUsers.objects.filter(email=data.get("email"))
                if(len(user)!=1):
                    raise ValueError("No User Found")
                user=user[0]
                passHash=user.password
                if(not check_password(data.get("password"),passHash)):
                    raise ValueError("Invalid Password!!")
                
            except ValueError as e:
                
                return(JsonResponse({"Error":True,"message":str(e)}))
            
            return JsonResponse(user.toJson())
        else:
            return JsonResponse({"Error":True,"message":"Invalid Token"})
    else:
        return HttpResponse("Invalid Method")
@csrf_exempt
def product_get(request:HttpRequest):
    if(request.method=="POST"):
        if(request.headers.get("api-token")==settings.API_TOKEN):
            keyword=request.headers.get("keyword",None)
            keyword=base64.b64decode(keyword).decode()
            if(keyword):
                products=ProductDetails.objects.filter(data__title__icontains=keyword)
                if(len((products))):
                    
                    response=products[0].toJson()
                else:
                    response={"Error":"NO PRODUCT"}
                return JsonResponse({"response":b64encode(json.dumps(response).encode()).decode()})

    return HttpResponseNotFound()

@csrf_exempt
def cart_add(request:HttpRequest):
    if(request.method=="POST"):
        if(request.headers.get("api-token")==settings.API_TOKEN):
            data:dict=json.loads(request.body.decode())
           
            try:
                user=EUsers.objects.filter(email=data.get("email"))
                if(len(user)!=1):
                    raise ValueError("No User Found")
                cartData=Cart.objects.filter(email=user[0].email);
                if(len(cartData)!=1):
                    prod={1:data.get("prod")}
                    newCartData=Cart(email=user[0].email,prods=prod,quantity=1)
                    newCartData.save()
                else:

                    cartData[0].quantity+=1;
                    cartData[0].prods[cartData[0].quantity]=data.get("prod")
                    cartData[0].save()
                
                
            except ValueError as e:
                print(e)
                return(JsonResponse({"error":True,"errorMessage":str(e)}))
            
            return JsonResponse({"error":False})
        else:
            return JsonResponse({"error":True,"errorMessage":"Invalid Token"})
    else:
        return HttpResponse("Invalid Method")
    return HttpResponseNotFound()

@csrf_exempt
def cart_get(request:HttpRequest):
    if(request.method=="POST"):
        if(request.headers.get("api-token")==settings.API_TOKEN):
            data:dict=json.loads(request.body.decode())
            try:
                user=EUsers.objects.filter(email=data.get("email"))
                if(len(user)!=1):
                    raise ValueError("No User Found")
                cartData=Cart.objects.filter(email=user[0].email);
                if(len(cartData)!=1):
                    res=json.dumps({"cart":"Empty"}).encode()
                else:
                    it={}
                    for key ,value in cartData[0].prods.items():
                            value=unquote_plus(value)[1:]
                            product=Product.objects.filter(title__icontains=value)
                            if(len(product)):
                                if(product[0].image.name in it):
                                    it[product[0].image.name]['quantity']+=1
                                    continue
                                it[product[0].image.name]={"title":product[0].title,"quantity":1}
                            

                    res=json.dumps(it).encode()
                return JsonResponse({"response":base64.b64encode(res).decode()})
                
            except ValueError as e:
                print(e)
                return(JsonResponse({"error":True,"errorMessage":str(e)}))
            
            return JsonResponse({"error":False})
        else:
            return JsonResponse({"error":True,"errorMessage":"Invalid Token"})
    else:
        return HttpResponse("Invalid Method")
    return HttpResponseNotFound()

@csrf_exempt
def cart_save(request:HttpRequest):
    if(request.method=="POST"):
        if(request.headers.get("api-token")==settings.API_TOKEN):
            data:dict=json.loads(request.body.decode())
            try:
                user=EUsers.objects.filter(email=data.get("email"))
                if(len(user)!=1):
                    raise ValueError("No User Found")
                cartData=Cart.objects.filter(email=user[0].email);
                if(len(cartData)!=1):
                    raise ValueError("Nothing To Save")
                else:
                    it={}
                    j=1;
                    cart=base64.b64decode(data.get("cart"))
                    cart:dict=json.loads(cart)
                    for key,value in cart.items():
                        for _ in range(1,value['quantity']+1):
                            it[j]=value['title']
                            j+=1

                    cartData[0].prods=it;
                    cartData[0].quantity=j-1;
                    cartData[0].save()

                   
                            

                    
                return JsonResponse({"response":"success"})
                
            except ValueError as e:
                print(e)
                return(JsonResponse({"error":True,"errorMessage":str(e)}))
            
            return JsonResponse({"error":False})
        else:
            return JsonResponse({"error":True,"errorMessage":"Invalid Token"})
    else:
        return HttpResponse("Invalid Method")
    return HttpResponseNotFound()



@csrf_exempt
def item_get(request:HttpRequest):
    if(request.method=="POST"):
        if(request.headers.get("api-token")==settings.API_TOKEN):
            limit=request.headers.get("limit",10)
            keyword=request.headers.get("keyword",None)
            
            if(keyword):
                keyword=base64.b64decode(keyword).decode()

                products=Product.objects.filter(title__icontains=keyword)[:limit]
            else:
                products = list(Product.objects.all())
                products = random.sample(products, limit)
                
            products_list=[]

            for product in products:
                    
                    products_list.append(product.toJson())
            return JsonResponse({"response":base64.b64encode(json.dumps(products_list).encode()).decode()})
        else:
            return JsonResponse({"Error":True,"message":"Invalid Token"})
    else:
        return HttpResponseNotFound()