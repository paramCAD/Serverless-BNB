import json
from pprint import pprint

import requests

from aws_client import dynamodb
from utils import generate_uuid, now_in_milli

notification = dynamodb.Table('notifications')

template = {
    "room_booking": {
        "title": "Confirmation of your booking",
        "body": "You have booked one {room_type} room."
        "\n\nStay duration is {start_date} to {end_date} ({stay_duration} days)"
        "\nTotal cost of booking is {price} (rate per day) x {stay_duration} (total stay duration) = {total_price}"}
}

"""
    @author Harsh Shah
    @function add_notification
    @description Add notification
    @params messageType, payload, 
    @returns notification (str)
"""


def add_notification(messageType, payload):
    notificationId = generate_uuid()
    data = template[messageType]
    model = {}
    model["id"] = notificationId
    model["type"] = messageType
    model["user_id"] = payload["user_id"]
    model["title"] = data["title"]
    model["message"] = data["body"].format(**payload)
    model["created_on"] = now_in_milli()
    pprint(model)
    try:
        response = notification.put_item(Item=model)
    except Exception as e:
        pprint(e)
        return {"status": False, id: ""}

    status = response["ResponseMetadata"]["HTTPStatusCode"] == 200
    return {"status": status, id: id if status else ""}


"""
    @author Harsh Shah
    @function send_email
    @description Send email
    @params messageType, payload, 
    @returns notification (str)
"""


def send_email(messageType, payload):

    data = template[messageType]

    messageBody = data["body"].format(**payload)
    subject = data["title"]

    print(messageBody)
    print(subject)

    body = {
        "email": payload["email"],
        "title": messageBody,
        "subject": subject
    }

    headers = {"Content-Type": "application/json"}
    pprint(f"Email Body: {body}")

    try:
        response = requests.post(
            url="https://68bua28vi6.execute-api.us-east-1.amazonaws.com/dev/sendemail2",
            json=body, headers=headers)
        pprint(response.json())
    except Exception as e:
        pprint(e)
