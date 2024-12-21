from django.shortcuts import render
from .models import MySQLTable
import mysql.connector

def mysql_tables(request):
    tables = MySQLTable.objects.all()
    return render(request, 'mysql_connector/tables.html', {'tables': tables})

def mysql_data(request, table_name):

    conn = mysql.connector.connect(
        host="localhost",
        user="admin",
        password="1234",
        database="proyecto_migracion_bd"
    )
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM {table_name}")
    data = cursor.fetchall()
    conn.close()
    return render(request, 'mysql_connector/data.html', {'data': data, 'table_name': table_name})

