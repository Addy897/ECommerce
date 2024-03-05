
from django.contrib import admin
from django.urls import path
from . import views
urlpatterns = [
    
    path("", views.index),
    path("users/register/", views.register),
    path("users/login/", views.login),
    path("items/get/", views.item_get),
    path("product/get/", views.product_get),
    path("cart/add/", views.cart_add),
    path("cart/get/", views.cart_get),
    path("cart/save/", views.cart_save),
]
