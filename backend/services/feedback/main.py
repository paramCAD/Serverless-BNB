from pprint import pprint
from services import save_reviews, get_rating_by_hotel

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
        if request.method == "POST":
            
            hotel_id = request_args["hotel_id"]
            
            if route == "save_reviews":
                user_id = request_json["user_id"]
                review = request_json["review"]
                print(f"save_reviews called : hotel_id: {hotel_id}, user_id: {user_id}, review: {review}")
                return ({"data": save_reviews(user_id, hotel_id, review)}, 200, headers)
        
            elif route == "get_rating_by_hotel":
                print(f"save_reviews called : hotel_id: {hotel_id}")
                return ({"data": get_rating_by_hotel(hotel_id)}, 200, headers)
        
        
        else:
            return ({"data": []}, 404, headers)

    except Exception as e:
        return ({"message": "Something went wrong! Try Again"}, 500, headers)   