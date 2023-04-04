from pprint import pprint
from services import get_all_hotels, get_all_rooms, book_hotel_room, get_user_booking_history

"""
    @author Harsh Shah
    @function main
    @returns flash.Response
"""


def main(request):
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return ('', 204, headers)

    request_json = request.get_json(silent=True)
    request_args = request.args
    path = request.path.split("/")

    headers = {
        'Access-Control-Allow-Origin': '*'
    }

    route = path[-1]
    try:
        if request.method == "GET":
            if route == "":
                print("fetching hotels...")
                return ({"data": get_all_hotels()}, 200, headers)
            elif route == "rooms":
                hotel_id = request_args["hotel_id"]
                start_date = request_args["start_date"]
                end_date = request_args["end_date"]
                print(f"fetching rooms of hotels : hotel_id: {hotel_id}, "
                      f"start_date: {start_date}, end_date: {end_date}")
                return ({"data": get_all_rooms(hotel_id, start_date, end_date)}, 200, headers)
            elif route == "history":
                user_id = request_args["user_id"]
                return ({"data": get_user_booking_history(user_id)}, 200, headers)
            else:
                return ({"data": []}, 404, headers)

        elif request.method == "POST":
            pprint(request_args)
            pprint(request_json)
            hotel_id = request_args["hotel_id"]
            room_id = request_args["room_id"]
            user_id = request_json["user_id"]
            start_date = request_json["start_date"]
            end_date = request_json["end_date"]

            print(f"booking room with following details : hotel_id: {hotel_id},"
                  f"room_id: {room_id}, user_id: {user_id}, start_date: {start_date}, end_date: {end_date}")

            return ({"data": book_hotel_room(hotel_id, room_id, user_id, start_date, end_date)}, 200, headers)
        else:
            return ({"data": []}, 404, headers)

    except Exception as e:
        return ({"message": "Something went wrong! Try Again"}, 500, headers)