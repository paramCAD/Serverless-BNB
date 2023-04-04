import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HotelManagement } from "./components/HotelManagement/HomeManagement";
import RoomManagement from "./components/HotelManagement/Rooms/RoomManagement";
import AuthCipher from "./components/UserAuthentication/AuthCipher";
import AuthQnA from "./components/UserAuthentication/AuthQnA";
import AuthUsernamePassword from "./components/UserAuthentication/AuthUsernamePassword";
import LayoutWithNavbar from "./layouts/LayoutWithNavbar";
import FoodLayout from "./views/food/FoodLayout";
import { FeedbackLayout } from "./views/feedback/FeedbackLayout";
import { ReviewsLayout } from "./views/feedback/ReviewsLayout";
import IntegrateLex from "./components/Lex/IntegrateLex";
import LoginReport from "./components/LoginReport/LoginReport"
import Register from "./components/Registration/Register"
import SecurityQuestion from "./components/Registration/SecurityQuestion"
import Profile from "./components/Profile/Profile";
import ReviewReport from "./components/Reports/ReviewReport"
import TourManagement from "./components/TourManagement/TourManagement";
import RecommendationLayout from "./views/recommendation/RecommendationLayout";
import Visualization from "./components/Visualization/Visualization";
import { BookingHistory } from "./components/BookingHistory/BookingHistory";

const AppRoutes = (props) => {
  const [isUserAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isUsernamePasswordVerified, setIsUsernamePasswordVerified] = React.useState(false);
  const [isQnAVerified, setIsQnAVerified] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem("isAuth") === "true") {
      setIsAuthenticated(true);
    }
  }, [])

  return (
    <Router basename={process.env.REACT_APP_BASE_HREF}>
      <Routes>

                {isUserAuthenticated && (
                    <>
                        <Route
                            path="/"
                            element={
                                <LayoutWithNavbar setIsAuthenticated={setIsAuthenticated}/>
                            }
                        >
                            <Route index element={<HotelManagement/>}/>
                            <Route path="/hotels" element={<HotelManagement/>}/>
                            <Route path="/room/:id" element={<RoomManagement/>}/>
                            <Route path="/history" element={<BookingHistory/>}/>
                            <Route path="/food" element={<FoodLayout/>}/>
                            <Route path="/feedback" element={<FeedbackLayout/>}/>
                            <Route path="/hotel/:id/reviews" element={<ReviewsLayout/>}/>
                            <Route path="/loginReport" element={<LoginReport/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/reviewReport" element={<ReviewReport/>}/>
                            <Route path="/recommendations" element={<RecommendationLayout/>}/>
                            {(localStorage.getItem("isAdmin") === "true") && <Route path="/visualization" element={<Visualization/>}/>}
                        </Route>
                    </>
                )}
                {!isUserAuthenticated && (
                    <>
                        <Route path="/" element={<AuthUsernamePassword
                            setIsUsernamePasswordVerified={setIsUsernamePasswordVerified}/>}/>
                        {isUsernamePasswordVerified &&
                            <Route path="/qna" element={<AuthQnA setIsQnAVerified={setIsQnAVerified}/>}/>}
                        {isQnAVerified && <Route
                            path="/cipher"
                            element={<AuthCipher setIsAuthenticated={setIsAuthenticated}/>}
                        />}
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/securityQuestion" element={<SecurityQuestion/>}/>
                    </>
                )}
                <Route path="/lex" element={<IntegrateLex/>}/>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
