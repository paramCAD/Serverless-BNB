import base64
import json
from pprint import pprint

from pubsub import publish
from service import add_user_billing, prepare_room_booking_notification_details

def main(event, context):
    message = json.loads(base64.b64decode(event['data']).decode('utf-8'))
    pprint(message)
    messageType = message["type"]

    if messageType == "room_booking":
        response = add_user_billing(messageType, message["payload"])
        publish(messageType, prepare_room_booking_notification_details(message["payload"]))
        return response
    elif messageType == "food":
        return add_user_billing(messageType, message["payload"])
    else:
        return {"message": "Something went wrong! message type not found"}
