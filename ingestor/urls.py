# log_ingestor/urls.py
from django.urls import path
from .views import ingest_logs, query_logs #, clear_logs

urlpatterns = [
    path('', ingest_logs, name='ingest_logs'),
    path('query', query_logs, name='query_logs'),
    # path('clear', clear_logs, name='clear_logs'),
]
