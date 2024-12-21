from rest_framework import serializers
from core.models import DatabaseConnection, MigrationJob

class DatabaseConnectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatabaseConnection
        fields = '__all__'

class MigrationJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = MigrationJob
        fields = '__all__'

