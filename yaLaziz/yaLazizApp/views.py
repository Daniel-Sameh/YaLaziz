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
    context= {
        'title' : "All Laziz",
        'Recipes': Recipe.objects.all()
    }
    return HttpResponse(template.render(context, request))

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
    template= loader.get_template('recipes.html')
    context= {
        'title':"breakfast",
        'Recipes': Recipe.objects.filter(category="breakfast")
    }
    return HttpResponse(template.render(context, request))

def lunch(request):
    template= loader.get_template('recipes.html')
    context= {
        'title':"lunch",
        'Recipes': Recipe.objects.filter(category="lunch")
    }
    return HttpResponse(template.render(context, request))

def dinner(request):
    template= loader.get_template('recipes.html')
    context= {
        'title':"dinner",
        'Recipes': Recipe.objects.filter(category="dinner")
    }
    return HttpResponse(template.render(context, request))

def desserts(request):
    template= loader.get_template('recipes.html')
    context= {
        'title':"desserts",
        'Recipes': Recipe.objects.filter(category="desserts")
    }
    return HttpResponse(template.render(context, request))

def drinks(request):
    template= loader.get_template('recipes.html')
    context= {
        'title':"drinks",
        'Recipes': Recipe.objects.filter(category="drinks")
    }
    return HttpResponse(template.render(context, request))

def ramadan(request):
    template= loader.get_template('recipes.html')
    context= {
        'title':"ramadan",
        'Recipes': Recipe.objects.filter(season="ramadan")
    }
    return HttpResponse(template.render(context, request))

def christmas(request):
    template= loader.get_template('recipes.html')
    context= {
        'title':"christmas",
        'Recipes': Recipe.objects.filter(season="christmas")
    }
    return HttpResponse(template.render(context, request))

def summer(request):
    template= loader.get_template('recipes.html')
    context= {
        'title':"summer",
        'Recipes': Recipe.objects.filter(season="summer")
    }
    return HttpResponse(template.render(context, request))

def recipeDetail(request, id):
    template= loader.get_template('recipe_detail.html')
    context= {
        'Recipe': Recipe.objects.get(id=id)
    }
    return HttpResponse(template.render(context, request))