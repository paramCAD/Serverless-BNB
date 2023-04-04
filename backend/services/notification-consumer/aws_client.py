import boto3
import os

ACCESS_KEY = os.environ.get("ACCESS_KEY")
SECRET_KEY = os.environ.get("SECRET_KEY")
SESSION_TOKEN = os.environ.get("SESSION_TOKEN")

session = boto3.Session(
    aws_access_key_id=ACCESS_KEY,
    aws_secret_access_key=SECRET_KEY,
    aws_session_token=SESSION_TOKEN)

dynamodb = session.resource("dynamodb", region_name="us-east-1")
