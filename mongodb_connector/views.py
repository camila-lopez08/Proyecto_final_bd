from django.shortcuts import render
from .models import MongoDBCollection
from pymongo import MongoClient

def mongodb_collections(request):
    collections = MongoDBCollection.objects.all()
    return render(request, 'mongodb_connector/collections.html', {'collections': collections})

def mongodb_data(request, collection_name):

    client = MongoClient('mongodb://localhost:27017/')
    db = client['database']
    collection = db[collection_name]
    data = list(collection.find())
    return render(request, 'mongodb_connector/data.html', {'data': data, 'collection_name': collection_name})

