import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkSpotDetails } from "../../store/spots";
import { thunkLoadReviews } from "../../store/review";
import SpotReviews from "../SpotReviews/SpotReviews";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ReviewForm from "../ReviewForm/ReviewForm";

function SpotDetails() {
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots[spotId]);
  const reviews = useSelector((state => state.reviews))
  const dispatch = useDispatch();
  const imageArr = spot?.SpotImages;
  const sessionUser = useSelector((state) => state.session.user);
  // console.log("this is your sessionUSER from SPOTDETAILS:", sessionUser);
  console.log("this is your CURRENT spot:", spot);

  useEffect(() => {
    dispatch(thunkSpotDetails(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    dispatch(thunkLoadReviews(spotId));
  }, [dispatch, spotId]);

  if (!spot || !spot.SpotImages) return null;

  const sessionUserIsOwner = sessionUser?.id === spot.Owner.id;
  
  const userHasReview = Object.values(reviews).find(review => review.userId === sessionUser?.id && review.spotId === parseInt(spotId));
  console.log('this is the userReview in the SpotDetails', userHasReview);

  return (
    <>
      <div className="spot-details">
        <div className="spot-name">
          <h2>{spot?.name}</h2>
        </div>
        <div className="spot-location">
          <p>
            {spot?.city}, {spot?.state}, {spot?.country}
          </p>
        </div>
        <div className="spot-detail-all-images-container">
          <div className="spot-detail-image-container">
            {imageArr[0] && (
              <img className="spot-detail-main-img" src={imageArr[0].url} />
            )}
          </div>
          <div className="small-images-container">
            {imageArr &&
              imageArr.slice(1).map((image, index) => (
                <div key={index} className="small-img-grid">
                  {image && (
                    <img
                      className="spot-detail-sm all-image"
                      src={image.url}
                      // alt={`Spot Image ${index + 1}`}
                    />
                  )}
                </div>
              ))}
          </div>
        </div>
        <div className="spot-description-container">
          <div className="spot-owner-details">
            Hosted By {spot.Owner.firstName} {spot.Owner.lastName}
          </div>
          <div className="spot-description">
            <p>{spot.description}</p>
          </div>
        </div>
        <div className="reserve-container">
          <div className="cost-per-night">${spot.price} night</div>
          <div className="star-rating">
            ★ {spot.avgStarRating > 0 ? spot.avgStarRating : "New"}
          </div>
          <div className="num-of-reviews">
          {spot.numReviews > 0 && (
    <>
      {spot.numReviews} {spot.numReviews === 1 ? "Review" : "Reviews"}
    </>
  )}
          </div>
        </div>
        <br />
      </div>
      <div className="star-rating-for-reviews">
        ★ {spot.avgStarRating > 0 ? spot.avgStarRating : "New"}
      </div>
      <div className="num-of-reviews-for-reviews">
      {spot.numReviews > 0 && (
    <>
      {spot.numReviews} {spot.numReviews === 1 ? "Review" : "Reviews"}
    </>
  )}
      </div>
      <div className="post-review-button">
        {(sessionUser && !sessionUserIsOwner && !userHasReview) && (
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
    </>
  );
}

export default SpotDetails;
