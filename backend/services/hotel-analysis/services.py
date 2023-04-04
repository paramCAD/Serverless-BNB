from pprint import pprint
from firestore import db


"""
    @author Harsh Shah
    @function get_hotel_booking_details
    @description Get hotel booking lists
    @returns booking (list)
"""


def get_hotel_booking_details():
    bookings = []
    try:
        docs = db.collection(u'booking').stream()
        for doc in docs:
            booking = doc.to_dict()
            booking["id"] = doc.id
            bookings.append(booking)
    except Exception as e:
        pprint(e)

    return bookings


"""
    @author Harsh Shah
    @function get_hotel_billing_details
    @description Get hotel billing details
    @returns billing (list)
"""


def get_hotel_billing_details():
    billings = []
    try:
        docs = db.collection(u'billing').stream()
        for doc in docs:
            billing = doc.to_dict()
            billing["id"] = doc.id
            billings.append(billing)
    except Exception as e:
        pprint(e)

    return billings


