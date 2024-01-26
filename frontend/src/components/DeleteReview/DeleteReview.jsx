import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal";
import { thunkDeleteReview } from "../../store/review";

const DeleteReview = ({ reviewId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const deleteHandler = (e) => {
        e.preventDefault();
        dispatch(thunkDeleteReview(reviewId));
        closeModal();
    }

    return (
        <div className="delete-check-container">
            <h1>Confirm Delete</h1>
            <div className="delete-button-container">
                <p>Are you sure you want to remove this review?</p>
                <button id='confirm-delete'className='delete-buttons' onClick={deleteHandler}>Yes (Delete Review)</button>
                <button id='no-delete' className="delete-buttons" onClick={closeModal}>No (Keep Review)</button>
            </div>
        </div>
    )
}

export default DeleteReview;