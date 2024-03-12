import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkSpotDetails } from "../../store/spots";
import { thunkLoadReviews } from "../../store/review";
import SpotReviews from "../SpotReviews/SpotReviews";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ReviewForm from "../ReviewForm/ReviewForm";
import "./SpotDetails.css";

function SpotDetails() {
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots[spotId]);
  const reviews = useSelector((state) => state.reviews);
  const reviewsArr = Object.values(reviews);
  const dispatch = useDispatch();
  const imageArr = spot?.SpotImages;
  const sessionUser = useSelector((state) => state.session.user);
  console.log("this is your sessionUSER from SPOTDETAILS:", sessionUser);
  console.log("this is your CURRENT spot:", spot);

  useEffect(() => {
    dispatch(thunkSpotDetails(spotId));
    dispatch(thunkLoadReviews(spotId));
  }, [dispatch, spotId, reviewsArr.length]);

  const handleReserve = (e) => {
    e.preventDefault();
    alert("Feature coming soon");
  };

  if (!spot || !spot.SpotImages) return null;

  const sessionUserIsOwner = sessionUser?.id === spot.Owner.id;

  const userHasReview = Object.values(reviews).find(
    (review) =>
      review.userId === sessionUser?.id && review.spotId === parseInt(spotId)
  );
  console.log("this is the userReview in the SpotDetails", userHasReview);

  return (
    <>
      <div className="spot-details">
        <div className="above-img-container">
          <div className="spot-name">
            <h2>{spot?.name}</h2>
          </div>
          <div className="spot-location">
            <p>
              {spot?.city}, {spot?.state}, {spot?.country}
            </p>
          </div>
        </div>
        <div className="spot-detail-all-img-container">
          <div className="spot-detail-img-container">
            {imageArr[0] && (
              <img className="spot-detail-main-img" src={imageArr[0].url} />
            )}
          </div>
          <div className="small-img-container">
            {imageArr &&
              imageArr.slice(1).map((image, index) => (
                <div key={index} className="small-img-grid">
                  {image && (
                    <img className="spot-detail-small-img" src={image.url} />
                  )}
                </div>
              ))}
          </div>
        </div>
        <div className="below-img-container">
          <div className="spot-description-container">
            <div className="spot-owner-details">
              <h2>
                Hosted By {spot.Owner.firstName} {spot.Owner.lastName}
              </h2>
            </div>
            <div className="spot-description">
              <p>{spot.description}</p>
            </div>
          </div>
          <div className="reserve-container">
            <div className="reserve-info">
              <div className="cost-per-night">${spot.price} night</div>
              <div className="reserve-star-rating-num-review">
                <div className="star-rating">
                  ★{" "}
                  {spot.avgStarRating > 0
                    ? `${spot.avgStarRating.toFixed(1)}`
                    : "New"}
                </div>
                <div className="num-of-reviews">
                  {spot.numReviews > 0 && (
                    <>
                      {spot.numReviews}
                      {spot.numReviews === 1 ? " Review" : " Reviews"}
                    </>
                  )}
                </div>
              </div>
            </div>
            <button className="reserve-button" onClick={handleReserve}>
              Reserve
            </button>
          </div>
        </div>
        <br />
        <div className="star-rating-and-num-of-reviews-for-reviews">
          <h2>
            ★
            {spot.avgStarRating > 0
              ? ` ${spot.avgStarRating.toFixed(1)} · `
              : "New"}
            {spot.numReviews > 0 && (
              <>
                {spot.numReviews}
                {spot.numReviews === 1 ? " Review" : " Reviews"}
              </>
            )}
          </h2>
          <div className="post-review-button">
            {sessionUser && !sessionUserIsOwner && !userHasReview && (
              <OpenModalButton
                buttonText="Post Your Review"
                className="post-your-review-button"
                modalComponent={<ReviewForm spotId={spotId} />}
              />
            )}
          </div>
          <div className="review-details">
            <SpotReviews />
          </div>
        </div>
      </div>
    </>
  );
}

export default SpotDetails;
