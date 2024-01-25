import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadSpots } from "../../store/spots";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteSpot from "../DeleteSpot/DeleteSpot";

const ManageSpots = () => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const spotObj = useSelector(state => state.spots);
    const spots = Object.values(spotObj);
    const ownedSpots = spots.filter(spot => spot.ownerId === sessionUser.id);

    useEffect(() => {
        dispatch(thunkLoadSpots());
    }, [dispatch])

    return (
        <>
        <div className="spots-main">
            {ownedSpots.map((spot) => (
                  <NavLink to={`/spots/${spot.id}`}
                  key={spot.id}>
                  <div className="new-spot">
                      <img id="spot-img" src={`${spot.previewImage}`} />
                      <div className="name-review">
                          <div className="name"><b>{spot.name}</b></div>
                          <div className="review"><b>★ {spot.avgRating > 0 ? spot.avgRating : 'New'}</b></div>
                      </div>
                      <div className="city">{spot.city}, {spot.state}</div>
                      <div className="country">{spot.country}</div>
                      <div className="price"><b>${spot.price}</b> night</div>
                  </div>
                  <button>
                    <NavLink to={`/spots/${spot.id}/edit`}>Update</NavLink>
                  </button>
                  <OpenModalButton
                  buttonText='Delete'
                  className='delete-button-modal'
                  modalComponent={<DeleteSpot spot={spot}/>}
                  />
              </NavLink>
            ))}
        </div>
        </>
    )
}

export default ManageSpots;