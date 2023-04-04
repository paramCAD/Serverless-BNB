import uuid
import time

def generate_uuid():
    return str(uuid.uuid4())

def now_in_milli():
    return round(time.time() * 1000)
