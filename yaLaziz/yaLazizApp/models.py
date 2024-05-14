from django.db import models

class User(models.Model):
    username= models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    password = models.CharField(max_length=100)
    isAdmin = models.BooleanField(default=False)
    userphoto=models.ImageField(upload_to='static/phototos/users/%y/%m/%d', null=True)
    # def __str__(self) -> str:
    #     return f"{self.username}"

class Recipe(models.Model):
    name= models.CharField(max_length=255)
    coverPhoto= models.ImageField(upload_to='static/Photos/') 
    mainPhoto= models.ImageField(upload_to='static/Photos/')
    duration = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    season= models.CharField(max_length=100)
    userId= models.ForeignKey(User, on_delete=models.CASCADE)

class Favorite(models.Model):
    userId= models.ForeignKey(User, on_delete=models.CASCADE)
    recipeId= models.ForeignKey(Recipe, on_delete=models.CASCADE)

class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.IntegerField()
    unit = models.CharField(max_length=20)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='ingredients')