from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    # username= models.CharField(max_length=255)
    # email = models.EmailField(max_length=255)
    # password = models.CharField(max_length=100)
    isAdmin = models.BooleanField(default=False)
    userphoto=models.ImageField(upload_to='Photos/', default='Photos/acc pic.png')
    last_login = models.DateTimeField(null=True, blank=True)

    # def __str__(self) -> str:
    #     return f"{self.username}"

class Recipe(models.Model):
    name= models.CharField(max_length=255)
    coverPhoto= models.ImageField(upload_to='Photos/') 
    mainPhoto= models.ImageField(upload_to='Photos/')
    duration = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    season= models.CharField(max_length=100)
    userId= models.ForeignKey(User, on_delete=models.CASCADE)
    visit_count = models.PositiveIntegerField(default=0)

class Favorite(models.Model):
    userId= models.ForeignKey(User, on_delete=models.CASCADE)
    recipeId= models.ForeignKey(Recipe, on_delete=models.CASCADE)

class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    unit = models.CharField(max_length=20)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='ingredients')

class Instruction(models.Model):
    details= models.CharField(max_length=255)
    recipe= models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='instructions')
