from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse

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
    print(request)
    template= loader.get_template('index.html')
    return HttpResponse(template.render())