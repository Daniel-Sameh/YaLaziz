from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from .models import User, Recipe, Favorite, Ingredient, Instruction
from django.urls import reverse
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
import json
from django.shortcuts import get_object_or_404
from django.db.models import Q


def index(request):
    template= loader.get_template('index.html')
    context = {
        'isAdmin': request.user.is_authenticated and request.user.isAdmin,
        'isSigned': request.user.is_authenticated,
        'trending': Recipe.objects.order_by('-visit_count')[:4],
        'newRecipes': Recipe.objects.order_by('-id')[:3],
    }
    return HttpResponse(template.render(context,request))

def recipes(request):
    template = loader.get_template('recipes.html')
    if request.user.is_authenticated:
        recipes=Recipe.objects.all()
        fav= Favorite.objects.filter(userId=request.user.id).values_list('recipeId', flat=True)
        print(fav.values())
        context={
            'title' : "All Laziz Recipes",
            'Recipes': Recipe.objects.all(),
            'isAdmin': request.user.is_authenticated and request.user.isAdmin,
            'isSigned': request.user.is_authenticated,
            'Favorites':list(fav),
        }
        return HttpResponse(template.render(context, request))
    else:
        context= {
            'title' : "All Laziz Recipes",
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
    if request.user.is_authenticated:
        recipes=Recipe.objects.filter(category="breakfast"),
        fav= Favorite.objects.filter(userId=request.user.id).values_list('recipeId', flat=True)
        print(fav.values())
        context={
            'title' : "breakfast Recipes",
            'Recipes': Recipe.objects.filter(category="breakfast"),
            'isAdmin': request.user.is_authenticated and request.user.isAdmin,
            'isSigned': request.user.is_authenticated,
            'Favorites':list(fav),
        }
        return HttpResponse(template.render(context, request))
    else:
        context= {
            'title' : "breakfast Recipes",
            'Recipes': Recipe.objects.filter(category="breakfast"),
            'isAdmin': request.user.is_authenticated and request.user.isAdmin,
            'isSigned': request.user.is_authenticated,
        }
        return HttpResponse(template.render(context, request))

def lunch(request):
    template= loader.get_template('recipes.html')
    if request.user.is_authenticated:
        recipes=Recipe.objects.filter(category="lunch"),
        fav= Favorite.objects.filter(userId=request.user.id).values_list('recipeId', flat=True)
        print(fav.values())
        context={
            'title' : "lunch Recipes",
            'Recipes': Recipe.objects.filter(category="lunch"),
            'isAdmin': request.user.is_authenticated and request.user.isAdmin,
            'isSigned': request.user.is_authenticated,
            'Favorites':list(fav),
        }
        return HttpResponse(template.render(context, request))
    else:
        context= {
            'title' : "lunch Recipes",
            'Recipes': Recipe.objects.filter(category="breakfast"),
            'isAdmin': request.user.is_authenticated and request.user.isAdmin,
            'isSigned': request.user.is_authenticated,
        }
        return HttpResponse(template.render(context, request))

def dinner(request):
    template= loader.get_template('recipes.html')
    if request.user.is_authenticated:
        recipes=Recipe.objects.filter(category="dinner"),
        fav= Favorite.objects.filter(userId=request.user.id).values_list('recipeId', flat=True)
        print(fav.values())
        context={
            'title' : "dinner Recipes",
            'Recipes': Recipe.objects.filter(category="dinner"),
            'isAdmin': request.user.is_authenticated and request.user.isAdmin,
            'isSigned': request.user.is_authenticated,
            'Favorites':list(fav),
        }
        return HttpResponse(template.render(context, request))
    else:
        context= {
            'title' : "dinner Recipes",
            'Recipes': Recipe.objects.filter(category="dinner"),
            'isAdmin': request.user.is_authenticated and request.user.isAdmin,
            'isSigned': request.user.is_authenticated,
        }
        return HttpResponse(template.render(context, request))

def desserts(request):
    template= loader.get_template('recipes.html')
    if request.user.is_authenticated:
        recipes=Recipe.objects.filter(category="desserts"),
        fav= Favorite.objects.filter(userId=request.user.id).values_list('recipeId', flat=True)
        print(fav.values())
        context={
            'title' : "desserts Recipes",
            'Recipes': Recipe.objects.filter(category="desserts"),
            'isAdmin': request.user.is_authenticated and request.user.isAdmin,
            'isSigned': request.user.is_authenticated,
            'Favorites':list(fav),
        }
        return HttpResponse(template.render(context, request))
    else:
        context= {
            'title' : "desserts Recipes",
            'Recipes': Recipe.objects.filter(category="desserts"),
            'isAdmin': request.user.is_authenticated and request.user.isAdmin,
            'isSigned': request.user.is_authenticated,
        }
        return HttpResponse(template.render(context, request))

def drinks(request):
    template= loader.get_template('recipes.html')
    if request.user.is_authenticated:
        recipes=Recipe.objects.filter(category="drinks"),
        fav= Favorite.objects.filter(userId=request.user.id).values_list('recipeId', flat=True)
        print(fav.values())
        context={
            'title' : "drinks Recipes",
            'Recipes': Recipe.objects.filter(category="drinks"),
            'isAdmin': request.user.is_authenticated and request.user.isAdmin,
            'isSigned': request.user.is_authenticated,
            'Favorites':list(fav),
        }
        return HttpResponse(template.render(context, request))
    else:
        context= {
            'title' : "drinks Recipes",
            'Recipes': Recipe.objects.filter(category="drinks"),
            'isAdmin': request.user.is_authenticated and request.user.isAdmin,
            'isSigned': request.user.is_authenticated,
        }
        return HttpResponse(template.render(context, request))

def ramadan(request):
    template= loader.get_template('recipes.html')
    if request.user.is_authenticated:
        recipes=Recipe.objects.filter(season="ramadan"),
        fav= Favorite.objects.filter(userId=request.user.id).values_list('recipeId', flat=True)
        print(fav.values())
        context={
            'title' : "ramadan Recipes",
            'Recipes': Recipe.objects.filter(season="ramadan"),
            'isAdmin': request.user.is_authenticated and request.user.isAdmin,
            'isSigned': request.user.is_authenticated,
            'Favorites':list(fav),
        }
        return HttpResponse(template.render(context, request))
    else:
        context= {
            'title' : "ramadan Recipes",
            'Recipes': Recipe.objects.filter(season="ramadan"),
            'isAdmin': request.user.is_authenticated and request.user.isAdmin,
            'isSigned': request.user.is_authenticated,
        }
        return HttpResponse(template.render(context, request))

def christmas(request):
    template= loader.get_template('recipes.html')
    if request.user.is_authenticated:
        recipes=Recipe.objects.filter(season="christmas")
        fav= Favorite.objects.filter(userId=request.user.id).values_list('recipeId', flat=True)
        #print(recipes.values)
        context={
            'title' : "christmas Recipes",
            'Recipes': Recipe.objects.filter(season="christmas"),
            'isAdmin': request.user.is_authenticated and request.user.isAdmin,
            'isSigned': request.user.is_authenticated,
            'Favorites':list(fav),
        }
        #print('I am in christmas function')
        return HttpResponse(template.render(context, request))
    else:
        context= {
            'title' : "christmas Recipes",
            'Recipes': Recipe.objects.filter(season="christmas"),
            'isAdmin': request.user.is_authenticated and request.user.isAdmin,
            'isSigned': request.user.is_authenticated,
        }
        return HttpResponse(template.render(context, request))

def summer(request):
    template= loader.get_template('recipes.html')
    if request.user.is_authenticated:
        recipes=Recipe.objects.filter(season="summer"),
        fav= Favorite.objects.filter(userId=request.user.id).values_list('recipeId', flat=True)
        print(fav.values())
        context={
            'title' : "summer Recipes",
            'Recipes': Recipe.objects.filter(season="summer"),
            'isAdmin': request.user.is_authenticated and request.user.isAdmin,
            'isSigned': request.user.is_authenticated,
            'Favorites':list(fav),
        }
        return HttpResponse(template.render(context, request))
    else:
        context= {
            'title' : "summer Recipes",
            'Recipes': Recipe.objects.filter(season="summer"),
            'isAdmin': request.user.is_authenticated and request.user.isAdmin,
            'isSigned': request.user.is_authenticated,
        }
        return HttpResponse(template.render(context, request))

def recipeDetail(request, id):
    template= loader.get_template('recipe_detail.html')
    recipe = get_object_or_404(Recipe, id=id)
    recipe.visit_count += 1
    recipe.save()
    print(recipe.visit_count)
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
    #print('isSigned: ',request.user.is_authenticated)
    return HttpResponse(template.render(context,request))

    
@csrf_exempt
def addRecipe(request):
    if request.method == 'POST':
        recipe_name = request.POST.get('recipe_name')
        recipe_cover_image = request.FILES.get('recipe_cover_image')
        recipe_main_image = request.FILES.get('recipe_main_image')
        duration_from = request.POST.get('duration_from')
        duration_to = request.POST.get('duration_to')
        time_unit = request.POST.get('time_unit')
        duration = f"{duration_from} to {duration_to} {time_unit}"
        category = request.POST.get('meal')
        season = request.POST.get('occasion')
        
        # Create Recipe instance
        recipe = Recipe(
            name=recipe_name,
            coverPhoto=recipe_cover_image,
            mainPhoto=recipe_main_image,
            duration=duration,
            category=category,
            season=season,
            userId=request.user # Replace with actual user logic
        )
        recipe.save()

        # Create Ingredient instances
        ingredient_quantities = request.POST.getlist('ingredient_quantity[]')
        ingredient_units = request.POST.getlist('ingredient_unit[]')
        ingredient_names = request.POST.getlist('ingredient_name[]')
        for quantity, unit, name in zip(ingredient_quantities, ingredient_units, ingredient_names):
            Ingredient.objects.create(
                name=name,
                quantity=quantity,
                unit=unit,
                recipe=recipe
            )

        # Create Instruction instances
        instruction_details = request.POST.getlist('instruction_details[]')
        for details in instruction_details:
            Instruction.objects.create(
                details=details,
                recipe=recipe
            )

        return HttpResponseRedirect(reverse('recipes'))
    template = loader.get_template('add_recipe.html')
    context = {
        'isAdmin': request.user.is_authenticated and request.user.isAdmin,
        'isSigned': request.user.is_authenticated
    }
    #print('isSigned: ',request.user.is_authenticated)
    return HttpResponse(template.render(context,request))

def myAcc(request,Id):
    template= loader.get_template('my account.html')
    fav= Favorite.objects.filter(userId=request.user.id).values_list('recipeId', flat=True)
    context = {
        'isAdmin': request.user.is_authenticated and request.user.isAdmin,
        'isSigned': request.user.is_authenticated,
        'user': User.objects.get(id=Id),
        'recipes':Recipe.objects.filter(userId=request.user),
        'Favorites':list(fav),
        'allRec':Recipe.objects.all(),
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
@csrf_exempt
def get_all_recipes(request):
    if request.method == 'GET':
        # Fetch all recipes
        recipes = Recipe.objects.all()
        recipes_list = []

        for recipe in recipes:
            # Construct recipe data
            recipe_data = {
                'id': recipe.id,
                'name': recipe.name,
                'coverPhoto': recipe.coverPhoto.url if recipe.coverPhoto else '',
                'mainPhoto': recipe.mainPhoto.url if recipe.mainPhoto else '',
                'duration': recipe.duration,
                'category': recipe.category,
                'season': recipe.season,
                'userId': recipe.userId.id,
            }

            # Add to the recipe list
            recipes_list.append(recipe_data)

        return JsonResponse(recipes_list, safe=False)

@csrf_exempt
def addToFav(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        recipe_id = int(data.get('id'))
        user_id = int(data.get('userId'))
        print('recipe=', recipe_id, ' and userid= ',user_id)
        try:
            user = get_object_or_404(User, id=user_id)
            recipe = get_object_or_404(Recipe, id=recipe_id)
            favorite = Favorite(userId= user,recipeId=recipe)
            #print(favorite)
            favorite.save()
            return JsonResponse({'message': 'success'})
        except Exception as e:
            print(e)
            return JsonResponse({'message': 'failed', 'error': str(e)})
    else:
        return JsonResponse({'message': 'invalid request method'}, status=405)

@csrf_exempt
def delFromFav(request):
    if request.method == 'DELETE':
        recipe_id = request.GET.get('id')
        user_id = request.GET.get('userId')
        try:
            favorite = Favorite.objects.get(recipeId=recipe_id, userId=user_id)
            print(favorite)
            deletedCount, _= favorite.delete()
            return JsonResponse({'message': 'success'})
        except Favorite.DoesNotExist:
            return JsonResponse({'message': 'failed', 'error': 'Favorite not found'}, status=404)
        except Exception as e:  # Be specific in production
            print(str(e))
            return JsonResponse({'message': 'failed', 'error': str(e)})
    else:
        return JsonResponse({'message': 'invalid request method'}, status=405)
    
   
@csrf_exempt
def addIngredient(request):
    if request.method == 'POST':
        ingredient_name = None
        ingredient_quantity = None
        ingredient_unit = None
        last_recipe = Recipe.objects.order_by('-id').first()
        last_id = last_recipe.id
        try:
            data = json.loads(request.body)
            ingredients = data.get('ingredients', [])
            for ingredient in ingredients:
                if len(ingredient) == 3:
                    ingredient_quantity = ingredient[0]
                    ingredient_unit = ingredient[1]
                    ingredient_name = ingredient[2]
                ing = Ingredient(
                    unit = ingredient_unit,
                    quantity = ingredient_quantity,
                    name = ingredient_name,
                    recipe = Recipe.objects.get(id= last_id)
                )
                ing.save()  

            return JsonResponse({'message': 'Ingredients added successfully'}, status=200)
        except Exception as e:
            print(f"Error storing ingredients: {e}")
            return JsonResponse({'message': 'Error adding ingredients'}, status=500)
    else:
        return JsonResponse({'message': 'Invalid request method'}, status=400)


@csrf_exempt
def addInstructions(request):
    if request.method == 'POST':
        instructiontext = None
        last_recipe = Recipe.objects.order_by('-id').first()
        last_id = last_recipe.id 
        try:
            data = json.loads(request.body)
            instructions = data.get('instructions', [])
            for instruction in instructions:
                instructiontext = instruction
                ins = Instruction(
                    details = instructiontext,
                    recipe = Recipe.objects.get(id= last_id)
                )
                ins.save()
                
            return JsonResponse({'message': 'instructions added successfully'}, status=200)
        except Exception as e:
            print(f"Error storing instructions: {e}")
            return JsonResponse({'message': 'Error adding instructions'}, status=500)
    else:
        return JsonResponse({'message': 'Invalid request method'}, status=400)



@csrf_exempt
def deleterecipes(request):
    if request.method == 'POST':
        try:
            print("Raw request body:", request.body)  # Debugging statement
            data = json.loads(request.body)
            RECID = data.get('RECID')
            print("Parsed RECID:", RECID)  # Debugging statement
            if RECID is not None:
                recipe = Recipe.objects.get(id=RECID)
                recipe.delete()
                return JsonResponse({'message': 'Recipe deleted successfully'}, status=200)
            else:
                return JsonResponse({'message': 'RECID is missing'}, status=400)
        except Recipe.DoesNotExist:
            return JsonResponse({'message': 'Recipe not found'}, status=404)
        except Exception as e:
            print(f"Error deleting recipe: {e}")
            return JsonResponse({'message': f'Error deleting recipe: {e}'}, status=500)
    else:
        return JsonResponse({'message': 'Invalid request method'}, status=400)

def search(request):
    print('I am here')
    print(request.GET)

    query = request.GET.get('q', '')
    if request.user.is_authenticated:
        recipes = Recipe.objects.filter(
            Q(name__icontains=query) |
            Q(ingredients__name__icontains=query) |
            Q(instructions__details__icontains=query)
        ).distinct() if query else Recipe.objects.all()  # Include all recipes if no query

        fav = Favorite.objects.filter(userId=request.user.id).values_list('recipeId', flat=True)
        print(list(fav))
        context = {
            'title': f"Search Results For \"{query}\"",
            'Recipes': recipes,
            'isAdmin': request.user.is_authenticated and request.user.isAdmin,
            'isSigned': request.user.is_authenticated,
            'Favorites': list(fav),
        }
    else:
        recipes = Recipe.objects.filter(
            Q(name__icontains=query) |
            Q(ingredients__name__icontains=query) |
            Q(instructions__details__icontains=query)
        ).distinct() if query else Recipe.objects.all()  # Include all recipes if no query

        context = {
            'title': "Search Results",
            'Recipes': recipes,
            'isAdmin': request.user.is_authenticated and request.user.isAdmin,
            'isSigned': request.user.is_authenticated,
        }

    return render(request, 'recipes.html', context)
