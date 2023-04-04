from pprint import pprint
from aws_client import dynamodb
from boto3.dynamodb.conditions import Attr

notifications = dynamodb.Table('notifications')

"""
    @author Harsh Shah
    @function get_user_notifications
    @description Get user's notification
    @params user_id
    @returns notifications (list)
"""


def get_user_notifications(user_id):
    response = {}
    try:
        response = notifications.scan(FilterExpression=Attr("user_id").eq(user_id))
    except Exception as e:
        pprint(e)
        return {status: False, id: ""}

    status = response["ResponseMetadata"]["HTTPStatusCode"] == 200
    return response.get("Items")
