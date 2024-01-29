import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadSpots } from "../../store/spots";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteSpot from "../DeleteSpot/DeleteSpot";
import "./ManageSpot.css";

const ManageSpots = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const spotObj = useSelector((state) => state.spots);
  const spots = Object.values(spotObj);
  const ownedSpots = spots.filter((spot) => spot.ownerId === sessionUser.id);

  useEffect(() => {
    dispatch(thunkLoadSpots());
  }, [dispatch]);

  return (
    <>
      <div className="create-spot-button-space">
        <h2>Manage Spots</h2>
        <button>    
          <NavLink to="/spots/new" className="nav-bar-create-a-spot">
            Create a New Spot
          </NavLink>
        </button>
      </div>
      <div className="spots-main">
        {ownedSpots.map((spot) => (
          <div key={spot.id}>
            <NavLink to={`/spots/${spot.id}`} key={spot.id}>
              <div className="new-spot" title={spot.name}>
                <img id="spot-img" src={`${spot.previewImage}`} />
                <div className="name-review">
                  {/* <div className="name"><b>{spot.name}</b></div> */}
                </div>
                <div className="review-location">
                  <div className="review">
                    <b>
                      ★ {spot.avgRating > 0 ? spot.avgRating.toFixed(1) : "New"}
                    </b>
                  </div>
                  <div className="location">
                    {spot.city}, {spot.state}
                  </div>
                  {/* <div className="country">{spot.country}</div> */}
                </div>
                <div className="price">
                  <b>${spot.price}</b> night
                </div>
              </div>
            </NavLink>
            <div className="update-and-delete-button">
              <button>
                <NavLink to={`/spots/${spot.id}/edit`}>Update</NavLink>
              </button>
              <OpenModalButton
                buttonText="Delete"
                modalComponent={<DeleteSpot spot={spot} />}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ManageSpots;
