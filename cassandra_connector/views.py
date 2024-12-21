from django.shortcuts import render
from .models import CassandraTable
from cassandra.cluster import Cluster

def cassandra_tables(request):
    tables = CassandraTable.objects.all()
    return render(request, 'cassandra_connector/tables.html', {'tables': tables})

def cassandra_data(request, table_name):

    cluster = Cluster(['127.0.0.1'])
    session = cluster.connect('your_keyspace')
    rows = session.execute(f"SELECT * FROM {table_name}")
    data = [row for row in rows]
    return render(request, 'cassandra_connector/data.html', {'data': data, 'table_name': table_name})

