from rest_framework import serializers
from .models import Config, Info, LoginAddress

class InfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Info
        fields = '__all__'

class ConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = Config
        fields = '__all__'

class LoginAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoginAddress
        fields = '__all__'