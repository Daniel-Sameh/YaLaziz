from django.urls import path
from . import views

urlpatterns = [
    path('',views.index, name='index'),
    path('recipes/', views.recipes, name='recipes'),
    path('about/', views.about, name='about'),
    path('login/', views.login, name='login'),
    path('signup/', views.signup, name='signup'),
    path('signupUser/', views.signupUser, name='signupUser'),
    path('breakfast/', views.breakfast, name='breakfast'),
    path('ramadan/', views.ramadan, name='ramadan'),
    
    
]
