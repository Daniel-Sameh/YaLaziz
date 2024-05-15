from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from .models import User, Recipe, Favorite, Ingredient
from django.urls import reverse
from django.views.decorators.csrf import csrf_protect


def index(request):
    template= loader.get_template('index.html')
    # if request.method=='POST':
    #     context= {
    #         'Account':request.POST.get('account'),
    #         'id':request.POST.get('id')
    #     }
    #     return 
    # else:
    #     context= {
    #         'Account':'Account',
    #         'id':'loginFirst'
    #     }
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

@csrf_protect
def login(request):
    template= loader.get_template('login.html')
    return HttpResponse(template.render({}, request))

@csrf_protect
def signup(request):
    template= loader.get_template('sign.html')
    return HttpResponse(template.render({}, request))

@csrf_protect
def signupUser(request):
    username= request.POST['username']
    email= request.POST['Email']
    password= request.POST['password']
    confirmPassword= request.POST['confirmPassword']
    userType= request.POST.get('type')
    IsAdmin = False
    if userType == 'Admin':
        IsAdmin = True
    if password== confirmPassword:
        newUser= User(username=username, email=email,password=password, isAdmin = IsAdmin)
        newUser.save()
        return HttpResponseRedirect(reverse('login'))
    
    # template= loader.get_template('index.html')
    # return HttpResponse(template.render({}, request))

@csrf_protect
def loginUser(request):
    username= request.POST.get('username')
    password= request.POST.get('password')
    usernameResult= User.objects.filter(username=username)
    passResult= User.objects.filter(username=username,password=password) #the problem is here!
    if not usernameResult.exists():
        return JsonResponse({'message':'wrongUsername'})
    elif passResult.exists():
        return JsonResponse({'message':'success','username':username,'id':passResult.id})
    else:
        return JsonResponse({'message':'wrongPassword'})
    
    


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
        'Recipe': Recipe.objects.get(id=id),
        # 'ingredients' : Recipe.ingredients.all().order_by('id'),
    }
    return HttpResponse(template.render(context, request))

def addRecipePage(request):
    template = loader.get_template('add_recipe.html')
    return HttpResponse(template.render({}, request))

@csrf_protect
def addRecipe(request):
    recipeName = request.POST['recipe name']
    recipeCoverPhoto = "static/Photos/" + request.POST['recipe cover image']
    recipeMainPhoto = "static/Photos/" + request.POST['recipe main image']
    recipeDurationFrom = request.POST['duration from']
    recipeDurationTo = request.POST['duration to']
    recipeTimeUnit = request.POST.get('time-unit')
    recipeDuration = recipeDurationFrom + " to " + recipeDurationTo + " " + recipeTimeUnit
    recipeCategory = request.POST.get('meal')
    recipeSeason = request.POST.get('occasion')
    recipe = Recipe(name = recipeName, 
                    coverPhoto = recipeCoverPhoto,
                    mainPhoto = recipeMainPhoto,
                    duration = recipeDuration,
                    category = recipeCategory,
                    season = recipeSeason,
                    userId = User.objects.get(id=1))
    recipe.save()
    return HttpResponseRedirect(reverse('recipes'))

def myAcc(request):
   template= loader.get_template('my account.html')
   return HttpResponse(template.render({}, request))

@csrf_protect
def editAcc(request):
  template= loader.get_template('edit acc.html')
  return HttpResponse(template.render({}, request))  

@csrf_protect
def editedAcc(request):
    pass

