import uuid
import json
import firebase_admin
import time
from firebase_admin import firestore
from google.cloud import pubsub_v1

firebase_admin.initialize_app()
db = firestore.client()


def order_food(request):

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

  content_type = request.headers['content-type']
  print(request.headers['content-type'])

  if content_type == 'application/json':
    request_json = request.get_json(silent=True)
    print(request_json)
    if request_json and 'my_order' in request_json:
      details = request_json['my_order']
      print(details)
      food = []
      if 'dishes' in details:
        food = details['dishes']
      user_id = "random_id"
      if 'user_id' in details:
        user_id = details['user_id']

      cost = len(food) * 6

      storeOrder(user_id, food, cost)
      return ("",201,headers)

  elif content_type == 'application/x-www-form-urlencoded':
    details = request.form 
    if details:
      food = details.get("dishes")
      print(food)
      
      user_id = details.get("user_id")
      print(user_id)

      cost = len(food) * 6

      storeOrder(user_id, food, cost)
      return ("",201,headers)
        
  return ({"message":"No order details sent"}, 400, headers)

  


def storeOrder(user_id, food, cost):
  quantity = 1
  order_table = db.collection('Orders')

  order_id = str(uuid.uuid4())
  
  details = {"Customer_id":user_id, "Dish":food, "Quantity":quantity, "Cost": cost}
  order_table.document(order_id).set(details)

  publisher = pubsub_v1.PublisherClient()
  topic_path = "projects/serverless-bnb/topics/hotel-billing"

  items = []
  for dish in food:
    item = {
      'name': dish,
      'quantity':1,
      'price' :6
    }
    items.append(item)


  invoice = {
    'type': "food",
    'payload': {
        "user_id": user_id,
        "item": items,
        "timestamp": round(time.time() * 1000),
        "total_quantity": len(food),
        "total_cost": cost
    }
  }

  data = json.dumps(invoice)
  data = data.encode('utf-8')
  future = publisher.publish(topic_path, data)
  print(future.result())

    