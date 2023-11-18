# log_ingestor/urls.py
from django.urls import path
from .views import clear_logs, ingest_logs, query_logs

urlpatterns = [
    path('', ingest_logs, name='ingest_logs'),
    path('clear', clear_logs, name='clear_logs'),
    path('query', query_logs, name='query_logs'),
]
