import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadReviews } from "../../store/review";

function SpotReviews() {
  const dispatch = useDispatch();
  const reviewObj = useSelector((state) => state.reviews);
  const reviews = Object.values(reviewObj);

  useEffect(() => {
    dispatch(thunkLoadReviews());
  }, [dispatch]);

  return (
    <>
      <div id="inside-spot-reviews">
        
      </div>
    </>
  );
}

export default SpotReviews;
