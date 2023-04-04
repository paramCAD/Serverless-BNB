import base64
import json
from pprint import pprint

from service import add_notification, send_email


def main(event, context):
    message = json.loads(base64.b64decode(event['data']).decode('utf-8'))
    pprint(message)
    messageType = message["type"]

    if messageType == "room_booking":
        response = add_notification(messageType, message["payload"])
        send_email(messageType, message["payload"])
        return response
    else:
        return {"message": "Something went wrong! message type not found"}
