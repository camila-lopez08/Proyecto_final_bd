from django.db import models

class DatabaseConnection(models.Model):
    name = models.CharField(max_length=100)
    db_type = models.CharField(max_length=20, choices=[('mysql', 'MySQL'), ('mongodb', 'MongoDB'), ('cassandra', 'Cassandra')])
    host = models.CharField(max_length=255)
    port = models.IntegerField()
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    database_name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} ({self.db_type})"

class MigrationJob(models.Model):
    source = models.ForeignKey(DatabaseConnection, on_delete=models.CASCADE, related_name='source_jobs')
    destination = models.ForeignKey(DatabaseConnection, on_delete=models.CASCADE, related_name='destination_jobs')
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('in_progress', 'In Progress'), ('completed', 'Completed'), ('failed', 'Failed')])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Migration from {self.source.name} to {self.destination.name} ({self.status})"

