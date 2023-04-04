from google.cloud.firestore_v1.field_path import FieldPath
from pprint import pprint
from pubsub import publish
from utils import generate_uuid, now_in_milli
from firestore import db
from datetime import datetime


"""
    @author Harsh Shah
    @function get_all_hotels
    @description return hotel lists
    @returns hotels (list)
"""


def get_all_hotels():
    hotels = []
    try:
        docs = db.collection(u'hotels').stream()
        for doc in docs:
            hotel = doc.to_dict()
            hotel["id"] = doc.id
            hotels.append(hotel)
    except Exception as e:
        pprint(e)

    return hotels


"""
    @author Harsh Shah
    @function get_all_rooms
    @description Get all room details of specific hotel
    @params hotel_id
    @returns rooms (list)
"""


def get_all_rooms(hotel_id, start_date, end_date):
    rooms = []
    booking = set()
    start_date = int(start_date)
    end_date = int(end_date)
    try:
        bookingDocs = db.collection(u'booking').where(u'hotel_id', u"==", hotel_id).stream()
        for doc in bookingDocs:
            doc = doc.to_dict()
            if(doc["end_date"] >= start_date and doc["end_date"] <= end_date):
                booking.add(doc["room_id"])

        roomDocs = db.collection(u'rooms').where(
            u'hotel_id', u'==', hotel_id).stream()

        print(booking)
        for doc in roomDocs:
            room = doc.to_dict()
            room["id"] = doc.id

            if room["id"] in booking:
                room["status"] = "reserved"
            else:
                room["status"] = "available"

            rooms.append(room)
    except Exception as e:
        pprint(e)

    return rooms


"""
    @author Harsh Shah
    @function book_hotel_room
    @description Book room for the user
    @params hotel_id, room_id, user_id, start_date, end_date, 
    @returns rooms (list)
"""


def book_hotel_room(hotel_id, room_id, user_id, start_date, end_date):
    bookingId = generate_uuid()
    start_date = int(start_date)
    end_date = int(end_date)
    payload = {
        "hotel_id": hotel_id,
        "room_id": room_id,
        "user_id": user_id,
        "start_date": start_date,
        "end_date": end_date,
        "booked_on": now_in_milli()
    }
    try:
        db.collection(u'booking').document(bookingId).set(payload)

        room = db.collection(u'rooms').document(room_id).get().to_dict()

        total_price = room["price"] * (end_date - start_date) / (1000*60*60*24)
        payload["room"] = room
        payload["total_price"] = total_price
        publish("room_booking", payload)
        
        return {"booking_id": bookingId}
    except Exception as e:
        pprint(e)

    return {"booking_id": None}


"""
    @author Harsh Shah
    @function get_user_booking_history
    @description fetch the booking history of user
    @params user_id 
    @returns bookings (list)
"""


def get_user_booking_history(user_id):
    bookings = []
    hotels = set()
    rooms = set()
    hotelMap = {}
    roomMap = {}
    try:
        bookingDocs = db.collection(u'booking').where(
            u"user_id", u"==", user_id).stream()
        for doc in bookingDocs:
            booking = doc.to_dict()
            booking["id"] = doc.id

            hotels.add(booking["hotel_id"])
            rooms.add(booking["room_id"])

            bookings.append(booking)

        if len(bookings) == 0:
            return {"history": []}

        hotelDocs = db.collection(u'hotels').where(

            FieldPath.document_id(), u'in', list(hotels)).stream()
        for doc in hotelDocs:
            itr = doc.to_dict()
            itr["id"] = doc.id
            pprint(itr)
            hotelMap[itr["id"]] = itr

        roomDocs = db.collection(u'rooms').where(
            FieldPath.document_id(), u'in', list(rooms)).stream()
        for doc in roomDocs:
            itr = doc.to_dict()
            itr["id"] = doc.id
            pprint(itr)
            roomMap[itr["id"]] = itr

        for booking in bookings:
            booking["hotel"] = hotelMap[booking["hotel_id"]]
            booking["room"] = roomMap[booking["room_id"]]

            booking.pop('hotel_id', None)
            booking.pop('room_id', None)

        return {"history": bookings}
    except Exception as e:
        pprint(e)

    return {"history": None}
