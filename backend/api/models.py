from django.db import models

class Cart(models.Model):
    email=models.EmailField(unique=True)
    prods=models.JSONField()
    quantity=models.IntegerField()
    def __str__(self) -> str:
        return self.email+"\t"+str(self.quantity)
    
    def toJson(self) -> dict:
        return self.prods

class ProductDetails(models.Model):
    data=models.JSONField()

    def __str__(self) -> str:
        return self.data['title']
    def toJson(self) -> dict:
        return self.data

class Product(models.Model):
    title=models.CharField(max_length=100)
    image=models.ImageField(upload_to="images")
    price=models.IntegerField()
    rating=models.FloatField()
    ratingStrength=models.IntegerField()

    def __str__(self) -> str:
        
        return self.title
    def toJson(self) -> dict:
        return {"ratingStrength": self.ratingStrength,"rating": self.rating,"price":self.price,"title":self.title,"image":self.image.name}


class EUsers(models.Model):
    email=models.EmailField(unique=True)
    name=models.CharField(max_length=24)
    password=models.CharField(max_length=100)
    pfPhoto=models.ImageField(upload_to="images")

    def __str__(self) -> str:
        display:str=self.name
        return display
    def toJson(self) -> dict:
        return {"user":{"name": self.name,"email":self.email,"pfPhoto":self.pfPhoto.name}}
    