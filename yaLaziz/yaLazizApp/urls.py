from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('',views.index, name='index'),
    path('recipes/', views.recipes, name='recipes'),
    path('deleteRecipe/', views.deleterecipes, name='deleterecipes'),
    path('about/', views.about, name='about'),
    path('login/', views.loginView, name='login'),
    path('signup/', views.signup, name='signup'),
    path('signup/signupUser/', views.signupUser, name='signupUser'),
    path('login/loginUser/',views.loginUser,name='loginUser'),
    path('logout/',views.logoutUser, name='logout'),
    path('ramadan/', views.ramadan, name='ramadan'),
    path('christmas/', views.christmas, name='christmas'),
    path('summer/', views.summer, name='summer'),
    path('breakfast/', views.breakfast, name='breakfast'),
    path('lunch/', views.lunch, name='lunch'),
    path('dinner/', views.dinner, name='dinner'),
    path('drinks/', views.drinks, name='drinks'),
    path('desserts/', views.desserts, name='desserts'),
    path('recipe_detail/<int:id>', views.recipeDetail, name="recipeDetail"),
    path('add_recipe/', views.addRecipe, name='add_recipe'),
    path('add_recipe/addIngredient/', views.addIngredient, name="addIngredient"),
    path('add_recipe/addInstructions/', views.addInstructions, name="addInstructions"),
    path('myaccount/',views.myAcc,name="myAcc"),
    path('edit_account/',views.editedAcc,name="editAcc"),
    path('api/favorites/add/',views.addToFav,name='addToFav'),
    path('api/favorites/delete/',views.delFromFav,name='delFromFav'),
    path('api/recipes/', views.get_all_recipes, name='get-all-recipes'),
    path('edit_recipe/<int:Id>', views.editRecipe, name='editRecipe'),
    path('search/',views.search,name='search'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
