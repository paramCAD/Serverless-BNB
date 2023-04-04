from pprint import pprint
from service import get_user_notifications

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
            user_id = request_args["user_id"]
            return ({"data": get_user_notifications(user_id)}, 404, headers)
        else:
            return ({"data": []}, 404, headers)

    except Exception as e:
        return ({"message": "Something went wrong! Try Again"}, 500, headers)