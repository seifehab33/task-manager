from django.contrib import admin, sites
from . import models
admin.site.register(models.User)
admin.site.register(models.Task)
