from .serializers import ConfigSerializer, InfoSerializer, LoginAddressSerializer
from .models import Info, Config, LoginAddress
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
import json


@api_view(['GET','POST'])
def InfoPageView(request):
    if request.method == 'POST':
        f = open('management_site_backend/json/info.json', 'w')
        f.write(request.data)
        f.close()
        return Response()
    elif request.method == 'GET':
        f = open('management_site_backend/json/info.json', 'r')
        data = json.load(f)
        return Response(data)
    else:
        pass


@api_view(['GET', 'POST'])
def ConfigPageView(request):
    if request.method == 'POST':

        stringData = str(request.data)
        cleanList = stringData.split("'")
        cleanData = cleanList[1]

        f = open('management_site_backend/json/config.json', 'w')
        f.write(cleanData)
        f.close()

        return Response()
    elif request.method == 'GET':
        f = open('management_site_backend/json/config.json', 'r')
        data = json.load(f)
        return Response(data)
    else:
        pass

@api_view(['GET', "POST"])
def RunningView(request):
    if request.method == 'POST':

        stringData = str(request.data)
        cleanList = stringData.split("'")
        cleanData = cleanList[1]

        f = open('management_site_backend/json/running.json', 'w')
        f.write(cleanData)
        f.close()

        return Response()
    elif request.method == 'GET':
        f = open('management_site_backend/json/running.json', 'r')
        data = json.load(f)
        return Response(data)
    else:
        pass


@api_view(['GET','POST'])
def LoginView(request):
    if request.method == 'POST':

        stringData = str(request.data)
        cleanList = stringData.split("'")
        cleanData = cleanList[1]

        f = open('management_site_backend/json/login.json', 'w')
        f.write(cleanData)
        f.close()

        return Response()
    elif request.method == 'GET':
        f = open('management_site_backend/json/login.json', 'r')
        data = json.load(f)
        return Response(data)
    else:
        pass




