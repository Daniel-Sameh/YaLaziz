from django.db import models

class User(models.Model):
    username= models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    password = models.CharField(max_length=100)
    isAdmin = models.BooleanField(default=False)
    # def __str__(self) -> str:
    #     return f"{self.username}"
    

