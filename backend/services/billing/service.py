from pprint import pprint
from utils import generate_uuid, date_format, timestamp_from_milli
from firestore import db

"""
    @author Harsh Shah
    @function add_user_billing
    @description Add user billing information
    @params messageType, payload, 
    @returns billing_id (str)
"""


def add_user_billing(messageType, payload):
    billingId = generate_uuid()
    data = {"type": messageType, "payload": payload}
    try:
        db.collection(u'billing').document(billingId).set(data)
        return {"billing_id": billingId}
    except Exception as e:
        pprint(e)

    return {"billing_id": None}


def prepare_room_booking_notification_details(payload):

    start_date = int(payload["start_date"])
    end_date = int(payload["end_date"])

    stay_duration = (end_date - start_date) / (1000*60*60*24)

    start_date = date_format(timestamp_from_milli(start_date))
    end_date = date_format(timestamp_from_milli(end_date))

    return {
        "user_id": payload["user_id"],
        "room_type": payload["room"]["type"],
        "price": payload["room"]["price"],
        "total_price": payload["total_price"],
        "stay_duration": stay_duration,
        "start_date": start_date,
        "end_date": end_date
    }