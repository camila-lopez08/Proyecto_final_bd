from django.contrib import admin
from .models import DatabaseConnection, MigrationJob

admin.site.register(DatabaseConnection)
admin.site.register(MigrationJob)

