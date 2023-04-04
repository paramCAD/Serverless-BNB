import json
from concurrent import futures
from pprint import pprint
from typing import Callable
from google.cloud import pubsub_v1

project_id = "serverless-bnb"
topic_id = "notifications"

publisher = pubsub_v1.PublisherClient()
topic_path = publisher.topic_path(project_id, topic_id)
publish_futures = []


def get_callback(
    publish_future: pubsub_v1.publisher.futures.Future, data: str
) -> Callable[[pubsub_v1.publisher.futures.Future], None]:
    def callback(publish_future: pubsub_v1.publisher.futures.Future) -> None:
        try:
            print(publish_future.result(timeout=60))
        except futures.TimeoutError:
            print(f"Publishing {data} timed out.")

    return callback


def publish(messageType, payload):
    data = {"type": messageType, "payload": payload}
    pprint(f"Published messages to billing service {data}")
    publish_future = publisher.publish(topic_path, json.dumps(data).encode('utf-8'))
    pprint(publish_future.result())
