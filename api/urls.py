from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DatabaseConnectionViewSet, MigrationJobViewSet, StoredProcedureViewSet

router = DefaultRouter()
router.register(r'connections', DatabaseConnectionViewSet)
router.register(r'migrations', MigrationJobViewSet)
router.register(r'stored-procedures', StoredProcedureViewSet, basename='stored-procedures')

urlpatterns = [
    path('', include(router.urls)),
]

