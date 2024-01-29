import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteSpot } from "../../store/spots";
import "./DeleteSpot.css/";

const DeleteSpot = ({ spot }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const deleteHandler = (e) => {
        e.preventDefault();
        dispatch(thunkDeleteSpot(spot));
        closeModal();
    }

    return (
        <div className="delete-spot-container">
            <h1>Confirm Delete</h1>
                <p>Are you sure you want to remove this spot from the listings?</p>
            <div className="delete-button-container">
                <button id='confirm-delete'className='delete-buttons' onClick={deleteHandler}>Yes (Delete Spot)</button>
                <button id='no-delete' className="delete-buttons" onClick={closeModal}>No (Keep Spot)</button>
            </div>
        </div>
    )
}

export default DeleteSpot;