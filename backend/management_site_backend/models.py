from django.db import models
import jsonfield

class Info(models.Model):
    data = jsonfield.JSONField()

class Config(models.Model):
    running = models.BooleanField(default=False)
    max_allocations = models.IntegerField(default=1000)
    view_password = models.CharField(max_length=40)

    def _status_(self):
        return self.running

class LoginAddress(models.Model):
    nickname = models.TextField(max_length=60)
    address = models.CharField(max_length=60)



