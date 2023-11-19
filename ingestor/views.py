import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from concurrent.futures import ThreadPoolExecutor
from django.views.decorators.http import require_GET
from ingestor.models import LogEntry
from ingestor.utils import match_query

# api to ingest logs
@csrf_exempt
@require_POST
def ingest_logs(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
        def process_log(log_data):
            log_entry = LogEntry(
                level=log_data['level'],
                message=log_data['message'],
                resourceId=log_data['resourceId'],
                timestamp=log_data['timestamp'],
                traceId=log_data['traceId'],
                spanId=log_data['spanId'],
                commit=log_data['commit'],
                parentResourceId=log_data['metadata']['parentResourceId']
            )
            log_entry.save()
        
        logs = data if isinstance(data, list) else [data]
        
        with ThreadPoolExecutor() as executor:
            executor.map(process_log, logs)

        return JsonResponse({'status': 'success'}, status=201)
    except Exception as e:
        return JsonResponse({'status': 'error', 'error_message': str(e)}, status=400)


# api to query logs
@require_GET
def query_logs(request):
    try:
        query_params = json.loads(request.body.decode('utf-8'))

        # Build a filter based on the query parameters
        filter_kwargs = {key: value for key, value in query_params.items() if value not in [None, '']}
        
        # Query the database using the constructed filter
        matched_logs_list = match_query(filter_kwargs)

        return JsonResponse({'status': 'success', 'logs': matched_logs_list})
    except Exception as e:
        return JsonResponse({'status': 'error', 'error_message': str(e)})

# api to clear all the database : dev purpose
# @csrf_exempt
# @require_POST
# def clear_logs(request):
#     try:
#         LogEntry.objects.all().delete()
#         return JsonResponse({'status': 'success'})
#     except Exception as e:
#         return JsonResponse({'status': 'error', 'error_message': str(e)})
