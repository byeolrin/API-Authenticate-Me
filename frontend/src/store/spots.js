import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/LOAD_SPOT';

// Action Creators
export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
})

// Thunk Creators
export const thunkLoadSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const spots = await response.json();
        dispatch(loadSpots(spots));
        return spots;
    }
}

// Reducer
const spotsReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_SPOTS: {
            const allSpots = {};
            action.spots.Spots.forEach((spot) => {
                allSpots[spot.id] = spot;
            })
            return allSpots;
        }
        default:
            return state;
    }
}

export default spotsReducer;