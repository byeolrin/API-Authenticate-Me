import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const SPOT_DETAILS = 'spots/SPOT_DETAILS';
const CREATE_SPOT = 'spots/CREATE_SPOT';
const UPDATE_SPOT = 'spots/UPDATE_SPOT';
const CREATE_SPOT_IMAGE = 'spots/CREATE_SPOT_IMAGE';
const UPDATE_SPOT_IMAGE = 'spots/UPDATE_SPOT_IMAGE';
const DELETE_SPOT = 'spots/DELETE_SPOT';

// Action Creators
export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
})

export const spotDetails = (spot) => ({
    type: SPOT_DETAILS,
    spot
})

export const createSpot = (spot) => ({
    type: CREATE_SPOT,
    spot
})

export const updateSpot = (spot) => ({
    type: UPDATE_SPOT,
    spot
})

export const createSpotImage = (img) => ({
    type: CREATE_SPOT_IMAGE,
    img
})

export const updateSpotImage = (img) => ({
    type: UPDATE_SPOT_IMAGE,
    img
})

export const deleteSpot = (spotId) => ({
    type: DELETE_SPOT,
    spotId
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

export const thunkSpotDetails = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);

    if (response.ok) {
        const spot = await response.json();
        dispatch(spotDetails(spot));
        return spot;
    }
}

export const thunkCreateSpot = (spot) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    })

    if (response.ok) {
        const spot = await response.json();
        dispatch(createSpot(spot));
        return spot;
    } else {
        const error = await response.json();
        return error;
    }
}

export const thunkUpdateSpot = (updatedSpot, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSpot)
    })

    if (response.ok) {
        const editedSpot = await response.json();
        dispatch(updateSpot(editedSpot));
        return editedSpot;
    } else {
        const error = await response.json();
        return error;
    }
}

export const thunkCreateSpotImage = (spotId, images) => async () => {
    const imgArr = [];
    for (let image of images) {
        const response = await csrfFetch(`/api/spots/${spotId}/images`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: image, preview: true })
        })
        if (response.ok) {
            const image = await response.json();
            imgArr.push(image);
        } else {
            const error = await response.json();
            return error;
        }
    }
    return imgArr;
}

export const thunkUpdateSpotImage = (spotId, images) => async () => {
    const updateImgArr = [];
    for (let image of images) {
        const response = await csrfFetch(`/api/spots/${spotId}/images`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: image, preview: true })
        })
        if (response.ok) {
            const updateImage = await response.json();
            updateImgArr.push(updateImage);
        } else {
            const error = await response.json();
            return error;
        }
    }
}

export const thunkDeleteSpot = (spot) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(deleteSpot(spot.id));
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
        case SPOT_DETAILS: 
            return { ...state, [action.spot.id]: action.spot };
        case CREATE_SPOT: 
            return { ...state, [action.spot.id]: action.spot };
        case UPDATE_SPOT:
            return { ...state, [action.spot.id]: action.spot };
        case DELETE_SPOT: {
            const newState = { ...state };
            delete newState[action.spotId]
            return newState;
        }
        default:
            return state;
    }
}

export default spotsReducer;