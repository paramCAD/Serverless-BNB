import { Container } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import { ReviewsManagement } from "../../components/Reviews/ReviewsManagement";

export const ReviewsLayout = () => {

  const location = useLocation();
  const {id: hotelId} = useParams();

  return (
    <Container>
      <ReviewsManagement hotelId={hotelId} hotel={location.state?.hotel} />
    </Container>
  );
};


