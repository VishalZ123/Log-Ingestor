
from ingestor.models import LogEntry

def match_query(filter_kwargs):
    keyword = filter_kwargs.pop('message', None)
    if keyword:
            filter_kwargs['message__icontains'] = keyword

    metadata = filter_kwargs.pop('metadata', None)
    if metadata:
        for key, value in metadata.items():
            filter_kwargs[key] = value

    matched_logs = LogEntry.objects.filter(**filter_kwargs).values()
    matched_logs_list = list(matched_logs)
    return matched_logs_list
