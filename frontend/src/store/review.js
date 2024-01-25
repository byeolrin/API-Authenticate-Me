import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const CREATE_REVIEW = 'reviews/CREATE_REVIEW';
const EDIT_REVIEW = 'reviews/EDIT_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'

// Action Creators
export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
})

export const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
})

export const editReview = (review) => ({
    type: EDIT_REVIEW,
    review
})

export const deleteReview = (review) => ({
    type: DELETE_REVIEW,
    review
})

// Thunk Creators
export const thunkLoadReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadReviews(reviews));
        return reviews;
    }
}

// export const thunkReviewDetails = (spotId, reviewId) => async (dispatch) => {
//     const response = await csrfFetch(`/api/spots/${spotId/}`)
// }

const reviewsReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_REVIEWS: {
            const allReviews = {};
            action.reviews.Reviews.forEach((review) => {
                allReviews[review.id] = review;
            })
            return allReviews;
        }

        default:
            return state;
    }
}

export default reviewsReducer;