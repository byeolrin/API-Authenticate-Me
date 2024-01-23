import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkSpotDetails } from "../../store/spots";

function SpotDetails() {
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots[spotId]);
  const dispatch = useDispatch();
  const imageArr = spot?.SpotImages;
  console.log(spot);

  useEffect(() => {
    dispatch(thunkSpotDetails(spotId));
  }, [dispatch, spotId]);

  if (!spot || !spot.SpotImages) return null;

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
                      alt={`Spot Image ${index + 1}`}
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
            {spot.numReviews > 0 ? spot.numReviews : 0} reviews
          </div>
        </div>
      </div>
    </>
  );
}

export default SpotDetails;
