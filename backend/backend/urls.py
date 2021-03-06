"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django.contrib import admin
# from django.urls import path

# urlpatterns = [
#     path('admin/', admin.site.urls),
# ]

from django.contrib import admin
from django.urls import path, include
# from rest_framework import routers
from management_site_backend import views

# router = routers.DefaultRouter()
# router.register(r'info', views.InfoPageView, 'info')
# router.register(r'config', views.ConfigPageView, 'config')
# router.register(r'loginaddress', views.LoginAddressPageView, 'loginaddress')

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/', include(router.urls)),
    path('api/config/', views.ConfigPageView, name='config'),
    path('api/info/', views.InfoPageView, name='info'),
    path('api/running/', views.RunningView, name="running"),
    path('api/login/', views.LoginView, name="login"),
    path('api/logincredentials/', views.LoginCredentials, name="logincredentials"),
    path('api/history/', views.HistoryView, name="history")
]

