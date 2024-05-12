from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse, HttpResponseRedirect
from .models import User, Recipe, Favorite
from django.urls import reverse

def index(request):
    template= loader.get_template('index.html')
    return HttpResponse(template.render())

def recipes(request):
    template = loader.get_template('recipes.html')
    return HttpResponse(template.render())

def about(request):
    template= loader.get_template('about.html')
    return HttpResponse(template.render())

def login(request):
    template= loader.get_template('login.html')
    return HttpResponse(template.render())

def signup(request):
    template= loader.get_template('sign.html')
    return HttpResponse(template.render())

def signupUser(request):
    username= request.POST['username']
    email= request.POST['Email']
    password= request.POST['password']
    confirmPassword= request.POST['confirmPassword']
    # isAdmin= request.POST['type']
    if password== confirmPassword:
        newUser= User(username=username, email=email,password=password )
        newUser.save()
        return HttpResponseRedirect(reverse('login'))
    
    template= loader.get_template('index.html')
    return HttpResponse(template.render())


    # print(request)
    # template= loader.get_template('login.html')
    # return HttpResponse(template.render())

def breakfast(request):
    template= loader.get_template('catagories.html')
    context= {
        'category':"breakfast",
        'recipes': [25,36,11,0,1]
    }
    return HttpResponse(template.render(context, request))

def ramadan(request):
    template= loader.get_template('catagories.html')
    context= {
        'category':"ramadan",
        'recipes': [25,36,11,0,1]
    }
    return HttpResponse(template.render(context, request))
