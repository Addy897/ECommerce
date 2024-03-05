from django.contrib import admin 

from .models import EUsers
from .models import Product,ProductDetails,Cart
admin.site.register(EUsers)
admin.site.register(Product)
admin.site.register(ProductDetails)
admin.site.register(Cart)
