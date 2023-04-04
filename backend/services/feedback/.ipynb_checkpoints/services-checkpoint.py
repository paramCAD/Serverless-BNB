import uuid, json, time
import firebase_admin
from firebase_admin import firestore
import pprint
from hotel_score_model import HoteScoreModel

firebase_admin.initialize_app()
db = firestore.client()

def save_reviews(user_id, hotel_id, review):
    
    """
        @author Bharatwaaj Shankaranarayanan
        @function save_reviews
        @description This function saves the reviews data in the reviews data model
        @params user_id, hotel_id, review (string)
        @returns response (JSON)
    """

    # Get reviews
    reviews_table = db.collection('reviews')
    review_id = str(uuid.uuid4())    
    
    # Compute necessary Natural Language API Suggestion
    hsm = HoteScoreModel()
    annotations = hsm.analyze(review)
    score = hsm.generate_rating_score(annotations)
    polarity = hsm.generate_rating_polarity(annotations)
    
    # Form the review data
    review_data = {"user_id": user_id, "hotel_id": hotel_id, "review": review, "score": score, "polarity": polarity}
    
    # Print the intermediate results for logging
    print("review_data", review_data)
    
    # Update the reviews table
    reviews_table.document(review_id).set(review_data)
    
    return {
        "success" : True
    }


def get_rating_by_hotel(hotel_id):
    
    """
        @author Bharatwaaj Shankaranarayanan
        @function save_reviews
        @description This function saves the reviews data in the reviews data model
        @params user_id, hotel_id, review (string)
        @returns response (JSON)
    """
    
    # Get reviews
    reviews_table = db.collection('reviews').where(u'hotel_id', u"==", hotel_id)
    
    rating = []
    try:
        docs = reviews_table.stream()
        for doc in docs:
            doc = doc.to_dict()
            rating.append(doc["score"])
        
        if len(rating) > 0:
            return {
                "rating": sum(rating)/len(rating),
                "success": True
            }
        else:
            return {
                "rating": 0,
                "success": True
            }
        
    except Exception as e:
        pprint(e)

