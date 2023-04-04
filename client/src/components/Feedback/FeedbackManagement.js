import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FeedbackList } from "./FeedbackList";
import { fetchUserPastHotels, getRatingByHotel, saveReviews } from "./service/feedback-rest";

export const FeedbackManagement = () => {

  
  const pastHotels = useSelector(state => state.feedback.pastHotels)

  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("CognitoIdentityServiceProvider.6nn6ndlp7399351lsc6kuj0j9.LastAuthUser");
    dispatch(fetchUserPastHotels(user || "42d123ed-a727-416f-8daa-479055235101" || "6c0de08a-4239-4a81-a53e-1e185d98df06"));
  },[dispatch])

  return (
    <>
    <h1>Feedback</h1>
    <FeedbackList hotels={pastHotels?.list?.map(a => a.hotel)}></FeedbackList>
    </>
  );
};


