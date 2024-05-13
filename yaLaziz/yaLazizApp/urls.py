from django.urls import path
from . import views

urlpatterns = [
    path('',views.index, name='index'),
    path('recipes/', views.recipes, name='recipes'),
    path('about/', views.about, name='about'),
    path('login/', views.login, name='login'),
    path('signup/', views.signup, name='signup'),
    path('signup/signupUser/', views.signupUser, name='signupUser'),
    path('ramadan/', views.ramadan, name='ramadan'),
    path('christmas/', views.christmas, name='christmas'),
    path('summer/', views.summer, name='summer'),
    path('breakfast/', views.breakfast, name='breakfast'),
    path('lunch/', views.lunch, name='lunch'),
    path('dinner/', views.dinner, name='dinner'),
    path('drinks/', views.drinks, name='drinks'),
    path('desserts/', views.desserts, name='desserts'),
    path('recipe_detail/<int:id>', views.recipeDetail, name="recipeDetail"),
    path('add_recipe/', views.addRecipePage, name="addRecipePage"),
    path('add_recipe/addRecipe/', views.addRecipe, name="addRecipe")
]
