import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadReviews } from "../../store/review";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteReview from "../DeleteReview/DeleteReview";

function SpotReviews() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const reviewObj = useSelector((state) => state.reviews);
  const reviews = Object.values(reviewObj).filter(
    (review) => review.spotId === parseInt(spotId)
  ).reverse()
  
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(thunkLoadReviews(spotId));
  }, [dispatch, spotId]);

  function month(date) {
    const createdReviewDate = new Date(date);
    const month = createdReviewDate.getMonth();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[month];
  }

  function year(date) {
    const createdReviewDate = new Date(date);
    return createdReviewDate.getFullYear();
  }

  console.log(" this is the reviewOBJ:", reviewObj);
  console.log("this is the reviews:", reviews);

  return (
    <>
      <div id="inside-spot-reviews">
        {reviews.map((review) => (
          <div key={review.id}>
            <h3 className="review-first-name">{review.User?.firstName}</h3>
            <p className="review-dates">
              {month(review.createdAt)} {year(review.createdAt)}
            </p>
            <p className="review-comments">{review.review}</p>
            {sessionUser?.id === review.User?.id && (
              <OpenModalButton
                buttonText="Delete"
                className="delete-button"
                modalComponent={<DeleteReview reviewId={review.id} />}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default SpotReviews;
