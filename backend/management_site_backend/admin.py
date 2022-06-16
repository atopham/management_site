from django.contrib import admin

# Register your models here.

from .models import Info, Config, LoginAddress
admin.site.register(Info)
admin.site.register(Config)
admin.site.register(LoginAddress)

