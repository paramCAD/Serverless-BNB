import uuid
from datetime import datetime

def generate_uuid():
    return str(uuid.uuid4())

def timestamp_from_milli(ms):
    return datetime.fromtimestamp(ms/1000.0)

def date_format(dt):
    return dt.strftime("%A, %d %B %Y")