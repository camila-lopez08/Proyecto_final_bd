from django.db import models

class MongoDBCollection(models.Model):
    name = models.CharField(max_length=100)
    schema = models.TextField()

    def __str__(self):
        return self.name

