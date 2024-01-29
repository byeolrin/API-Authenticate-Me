import { useDispatch } from "react-redux";
import { thunkCreateReview, thunkLoadReviews } from "../../store/review";
import { useState } from "react";
import { useModal } from "../../context/Modal";
import { FaStar } from "react-icons/fa";
import "./ReviewForm.css";

const ReviewForm = ({ spotId }) => {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(null);
  const [hover, setHover] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const { closeModal } = useModal();
  // console.log('this is the spotId of Review form before submitting:', spotId)

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log('this is the spotId of Review form after submitting:', spotId)
    const newReview = {
      review,
      stars,
    };

    await dispatch(thunkCreateReview(spotId, newReview))
      .then(() => {
        closeModal();
      })
      .catch(() => {
        setValidationErrors({ message: "Review already exists for this spot" });
      });

    await dispatch(thunkLoadReviews(spotId));
  };

  return (
    <div className="review-modal-container">
      <h1>How was your stay?</h1>
      <div className="validation-errors">
        {"message" in validationErrors && <p>{validationErrors.message}</p>}
      </div>
      <form className="review-form" onSubmit={onSubmit}>
        <textarea
          type="text"
          name="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Leave your review here..."
        />
        <br />
        <div className="star-rating-form">
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
              <label key={i}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => setStars(ratingValue)}
                />
                <FaStar
                  className="star"
                  color={
                    ratingValue <= (hover || stars) ? "#ff9966" : "#e4e5e9"
                  }
                  size={35}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
          Stars
        </div>
        <br />
        <button
          type="submit"
          className="submit-review-button"
          disabled={review.length < 10 || stars < 1}
        >
          Submit Your Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
