from .serializers import ConfigSerializer, InfoSerializer, LoginAddressSerializer
from .models import Info, Config, LoginAddress
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import api_view
import json

class InfoPageView(viewsets.ModelViewSet):
    serializer_class = InfoSerializer
    queryset = Info.objects.all()

# class ConfigPageView(viewsets.ModelViewSet):
#     serializer_class = ConfigSerializer
#     queryset = Config.objects.all()

# class ConfigPageView(APIView):
#     renderer_classes = [JSONRenderer]
#     def get(self, request, format=None):
#         # f = open('backend/management_site_backend/config.json', 'r')
#         # data = json.load(f)
#         # return Response(data)

#         # return Response({"data":"Some data"})

#         queryset = Config.objects.all()
#         return Response(queryset)

@api_view(['GET'])
def ConfigPageView(request):
    return Response({"data":"Here is some data"})


class LoginAddressPageView(viewsets.ModelViewSet):
    serializer_class = LoginAddressSerializer
    queryset = LoginAddress.objects.all()




