from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from core.models import DatabaseConnection, MigrationJob
from .serializers import DatabaseConnectionSerializer, MigrationJobSerializer
from .utils import migrate_data, execute_stored_procedure

class DatabaseConnectionViewSet(viewsets.ModelViewSet):
    queryset = DatabaseConnection.objects.all()
    serializer_class = DatabaseConnectionSerializer

class MigrationJobViewSet(viewsets.ModelViewSet):
    queryset = MigrationJob.objects.all()
    serializer_class = MigrationJobSerializer

    @action(detail=True, methods=['post'])
    def start_migration(self, request, pk=None):
        job = self.get_object()
        migrate_data(job)
        return Response({'status': 'migration started'})

class StoredProcedureViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['post'])
    def execute(self, request):
        connection_id = request.data.get('connection_id')
        procedure_name = request.data.get('procedure_name')
        parameters = request.data.get('parameters', [])

        try:
            connection = DatabaseConnection.objects.get(id=connection_id)
            result = execute_stored_procedure(connection, procedure_name, parameters)
            return Response({'result': result})
        except DatabaseConnection.DoesNotExist:
            return Response({'error': 'Database connection not found'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=400)

