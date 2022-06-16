from django.shortcuts import render
from yaml import serialize_all
from .serializers import ConfigSerializer, InfoSerializer, LoginAddressSerializer
from .models import Info, Config, LoginAddress
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import viewsets


class InfoPageView(viewsets.ModelViewSet):
    serializer_class = InfoSerializer
    queryset = Info.objects.all()

class ConfigPageView(viewsets.ModelViewSet):
    serializer_class = ConfigSerializer
    queryset = Config.objects.all()

class LoginAddressPageView(viewsets.ModelViewSet):
    serializer_class = LoginAddressSerializer
    queryset = LoginAddress.objects.all()




