import uuid
import json
from firebase_admin import firestore

def order_food(request):
  request_json = request.get_json(silent=True)
  if request_json:
    if 'name' in request_json:
      food = request_json['name']

    quantity = 1
    if 'quantity' in request_json:
      quantity = int(request_json['quantity'])

    user_id = "dummy_id"

    storeOrder(user_id, quantity, food)


def storeOrder(user_id, quantity, food):
  db = firestore.client() 

  order_table = db.collection('Orders')

  order_id = str(uuid.uuid4())
  
  details = {"Customer_id":user_id, "Dish":food, "Quantity":quantity}
  order_table.document(order_id).set(details)
    