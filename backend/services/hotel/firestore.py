import imp
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from pprint import pprint

# Use the application default credentials
# cred = credentials.ApplicationDefault()
# firebase_admin.initialize_app(cred, {
#   'projectId': "serverless-bnb",
# })

cred = credentials.Certificate('./vault/firebase-creds.json')
firebase_admin.initialize_app(cred)

db = firestore.client()