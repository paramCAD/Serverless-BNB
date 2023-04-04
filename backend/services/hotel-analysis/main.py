from pprint import pprint
from services import get_hotel_booking_details, get_hotel_billing_details

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
            if route == "booking":
                print("fetching hotel booking details...")
                return ({"data": get_hotel_booking_details()}, 200, headers)
            elif route == "billing":
                print("fetching hotel billing details...")
                return ({"data": get_hotel_billing_details()}, 200, headers)



        else:
            return ({"data": []}, 404, headers)

    except Exception as e:
        return ({"message": "Something went wrong! Try Again"}, 500, headers)