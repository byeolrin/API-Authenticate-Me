import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadSpots } from "../../store/spots";
import { NavLink } from "react-router-dom";
import './LandingPage.css';

function LandingPage() {
    const dispatch = useDispatch();
    const spotObj = useSelector(state => state.spots);
    const spots = Object.values(spotObj);

    useEffect(() => {
        dispatch(thunkLoadSpots());
    }, [dispatch])

    return (
        <>
        <div className="spots-main">
            {spots.map((spot) => (
                  <NavLink className='new-spot-container' to={`/spots/${spot.id}`}
                  key={spot.id}>
                  <div className="new-spot">
                      <img id="spot-img" src={`${spot.previewImage}`} />
                      <div className="name-review">
                          <div className="name"><b>{spot.name}</b></div>
                          <div className="review"><b>★ {spot.avgRating > 0 ? spot.avgRating.toFixed(1) : 'New'}</b></div>
                      </div>
                      <div className="city">{spot.city}, {spot.state}</div>
                      <div className="country">{spot.country}</div>
                      <div className="price"><b>${spot.price}</b> night</div>
                  </div>
              </NavLink>
            ))}
        </div>
        </>
    )
}

export default LandingPage;