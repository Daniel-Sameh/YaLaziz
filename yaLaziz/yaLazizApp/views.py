from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from .models import User, Recipe, Favorite, Ingredient
from django.urls import reverse
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt

def index(request):
    template= loader.get_template('index.html')
    context = {
        'isAdmin': request.user.is_authenticated and request.user.isAdmin,
        'isSigned': request.user.is_authenticated,
    }
    return HttpResponse(template.render(context,request))

def recipes(request):
    template = loader.get_template('recipes.html')
    context= {
        'title' : "All Laziz",
        'Recipes': Recipe.objects.all(),
        'isAdmin': request.user.is_authenticated and request.user.isAdmin,
        'isSigned': request.user.is_authenticated,
    }
    return HttpResponse(template.render(context, request))

def about(request):
    template= loader.get_template('about.html')
    context = {
        'isAdmin': request.user.is_authenticated and request.user.isAdmin,
        'isSigned': request.user.is_authenticated,
    }
    return HttpResponse(template.render(context,request))

@csrf_protect
def loginView(request):
    if request.user.is_authenticated:
        return HttpResponse("You are not authorized to access this page", status=401)
    template= loader.get_template('login.html')
    context = {
        'isAdmin': request.user.is_authenticated and request.user.isAdmin,
        'isSigned': request.user.is_authenticated,
    }
    return HttpResponse(template.render(context,request))

@csrf_protect
def signup(request):
    if request.user.is_authenticated:
        return HttpResponse("You are not authorized to access this page", status=401)
    template= loader.get_template('sign.html')
    context = {
        'isAdmin': request.user.is_authenticated and request.user.isAdmin,
        'isSigned': request.user.is_authenticated
    }
    return HttpResponse(template.render(context,request))

def signupUser(request):
    print('Hurray! I am in sign up user now!')
    print(request.method)
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirmPassword')
        user_type = request.POST.get('type')
        is_admin = (user_type == 'Admin')
        print(is_admin)
        if password == confirm_password:
            # Create the user
            new_user = User.objects.create_user(username=username, email=email, password=password, isAdmin=is_admin)
            print(new_user)
            return JsonResponse({'message':'User created successfully'})
        else:
            # Passwords don't match
            return JsonResponse({'message': 'Passwords do not match'}, status=200)
    else:
        # Invalid request method
        return JsonResponse({'message': 'Invalid request method'}, status=405)

# @csrf_exempt
def loginUser(request):
    print('I am in loginUser')
    print(request.method)
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            # User authentication successful
            login(request, user)
            return JsonResponse({'message': 'success', 'username': username, 'id': user.id, 'admin': user.isAdmin})
        else:
            # Authentication failed
            return JsonResponse({'message': 'Invalid credentials'}, status=400)
    else:
        # Invalid request method
        return JsonResponse({'message': 'Invalid request method'}, status=405)

def logoutUser(request):
    logout(request)
    print(request)
    return HttpResponseRedirect(reverse('index'))

def breakfast(request):
    template= loader.get_template('recipes.html')
    context= {
        'title':"breakfast",
        'Recipes': Recipe.objects.filter(category="breakfast"),
        'isAdmin': request.user.is_authenticated and request.user.isAdmin,
        'isSigned': request.user.is_authenticated
    }
    return HttpResponse(template.render(context, request))

def lunch(request):
    template= loader.get_template('recipes.html')
    context= {
        'title':"lunch",
        'Recipes': Recipe.objects.filter(category="lunch"),
        'isAdmin': request.user.is_authenticated and request.user.isAdmin,
        'isSigned': request.user.is_authenticated
    }
    return HttpResponse(template.render(context, request))

def dinner(request):
    template= loader.get_template('recipes.html')
    context= {
        'title':"dinner",
        'Recipes': Recipe.objects.filter(category="dinner"),
        'isAdmin': request.user.is_authenticated and request.user.isAdmin,
        'isSigned': request.user.is_authenticated
    }
    return HttpResponse(template.render(context, request))

def desserts(request):
    template= loader.get_template('recipes.html')
    context= {
        'title':"desserts",
        'Recipes': Recipe.objects.filter(category="desserts"),
        'isAdmin': request.user.is_authenticated and request.user.isAdmin,
        'isSigned': request.user.is_authenticated
    }
    return HttpResponse(template.render(context, request))

def drinks(request):
    template= loader.get_template('recipes.html')
    context= {
        'title':"drinks",
        'Recipes': Recipe.objects.filter(category="drinks"),
        'isAdmin': request.user.is_authenticated and request.user.isAdmin,
        'isSigned': request.user.is_authenticated
    }
    return HttpResponse(template.render(context, request))

def ramadan(request):
    template= loader.get_template('recipes.html')
    context= {
        'title':"ramadan",
        'Recipes': Recipe.objects.filter(season="ramadan"),
        'isAdmin': request.user.is_authenticated and request.user.isAdmin,
        'isSigned': request.user.is_authenticated
    }
    return HttpResponse(template.render(context, request))

def christmas(request):
    template= loader.get_template('recipes.html')
    context= {
        'title':"christmas",
        'Recipes': Recipe.objects.filter(season="christmas"),
        'isAdmin': request.user.is_authenticated and request.user.isAdmin,
        'isSigned': request.user.is_authenticated
    }
    return HttpResponse(template.render(context, request))

def summer(request):
    template= loader.get_template('recipes.html')
    context= {
        'title':"summer",
        'Recipes': Recipe.objects.filter(season="summer"),
        'isAdmin': request.user.is_authenticated and request.user.isAdmin,
        'isSigned': request.user.is_authenticated
    }
    return HttpResponse(template.render(context, request))

def recipeDetail(request, id):
    template= loader.get_template('recipe_detail.html')
    context= {
        'Recipe': Recipe.objects.get(id=id),
        'isAdmin': request.user.is_authenticated and request.user.isAdmin,
        'isSigned': request.user.is_authenticated
        # 'ingredients' : Recipe.ingredients.all().order_by('id'),
    }
    return HttpResponse(template.render(context, request))

def addRecipePage(request):
    template = loader.get_template('add_recipe.html')
    context = {
        'isAdmin': request.user.is_authenticated and request.user.isAdmin,
        'isSigned': request.user.is_authenticated
    }
    return HttpResponse(template.render(context,request))

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
    context = {
        'isAdmin': request.user.is_authenticated and request.user.isAdmin,
        'isSigned': request.user.is_authenticated
    }
    return HttpResponse(template.render(context,request))

@csrf_protect
def editAcc(request):
    template= loader.get_template('edit acc.html')
    context = {
        'isAdmin': request.user.is_authenticated and request.user.isAdmin,
        'isSigned': request.user.is_authenticated
    }
    return HttpResponse(template.render(context,request))

@csrf_protect
def editedAcc(request):
    pass

