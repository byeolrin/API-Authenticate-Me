import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteReview } from "../../store/review";
import "./DeleteReview.css";

const DeleteReview = ({ reviewId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const deleteHandler = (e) => {
    e.preventDefault();
    dispatch(thunkDeleteReview(reviewId));
    closeModal();
  };

  return (
    <div className="delete-review-container">
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to remove this review?</p>
      <div className="delete-button-container">
        <button id="confirm-delete" onClick={deleteHandler}>
          Yes (Delete Review)
        </button>
        <button id="no-delete" onClick={closeModal}>
          No (Keep Review)
        </button>
      </div>
    </div>
  );
};

export default DeleteReview;
