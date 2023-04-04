import firebase_admin
from firebase_admin import firestore

firebase_admin.initialize_app()
db = firestore.client()


def getfoodDetails(request):
    print(request)
    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return ('', 204, headers)

    headers = {
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*'
    }


    request_json = request.get_json(silent=True)
    print(request_json)

    if request_json and 'user_id' in request_json:
        user_id = request_json['user_id']
        orders = getOrdersFromDB(user_id)

        return ({'orders':orders}, 200, headers)

    return ("Invalid input", 400, headers)

def getOrdersFromDB(user_id):
    order_table = db.collection('Orders')
    all_orders = order_table.where("Customer_id", "==", user_id).get()

    user_orders = []
    for order in all_orders:
        user_orders.append(order.to_dict()['Dish'])
    return user_orders