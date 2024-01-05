const express = require('express');

const { Review, User, Spot, SpotImage, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateReviews = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .isInt({ min: 1 , max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
  ]

router.get('/current', requireAuth, async (req, res) => {
    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: {
                    model: SpotImage,
                    where: {
                        preview: true
                    },
                    attributes: ['url']
                }
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })

    for (let i = 0; i < reviews.length; i++) {
        let jsonReview = reviews[i].toJSON();
        // console.log(jsonReview);
        let spotURL = jsonReview.Spot.SpotImages[0]
        // console.log(spotURL)

        if (spotURL) {
            jsonReview.Spot.previewImage = spotURL.url
        } else {
            jsonReview.Spot.previewImage = null
        }

        delete jsonReview.Spot.SpotImages
        reviews[i] = jsonReview
    }

    res.json({
        Reviews: reviews
    })
})

router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { reviewId } = req.params;

    const { url } = req.body;

    const review = await Review.findByPk(reviewId)

    if (!review) {
        return res.status(404).json({
            message: "Review couldn't be found"
        })
    }

    if (req.user.id !== review.userId) {
        res.status(403).json({
            message: "Forbidden"
        })
    }

    const existingImage = await ReviewImage.findAll({
        where: {
            reviewId: reviewId
        }
    })

    console.log(existingImage)

    if (existingImage.length >= 10) {
        return res.status(403).json({
            message: "Maximum number of images for this resource was reached"
        })
    }

    const newReviewImage = await ReviewImage.create({
        reviewId: reviewId,
        url
    })

    res.json({
        id: newReviewImage.id,
        url: newReviewImage.url
    })
})

router.put('/:reviewId', requireAuth, validateReviews, async (req, res) => {
    const { reviewId } = req.params;
    const { review, stars } = req.body;

    const currentReview = await Review.findByPk(reviewId)

    if (!currentReview) {
        res.status(404).json({
            message: "Review couldn't be found"
        })
    }

    if (req.user.id !== currentReview.userId) {
        res.status(403).json({
            message: "Forbidden"
        })
    }

    if (review) {
        currentReview.review = review
    }

    if (stars) {
        currentReview.stars = stars
    }

    await currentReview.save();

    res.json(currentReview)
})

router.delete('/:reviewId', requireAuth, async (req, res) => {
    const { reviewId } = req.params;
    const review = await Review.findByPk(reviewId)

    console.log(review)

    if (!review) {
        return res.status(404).json({
            message: "Review couldn't be found"
        })
    }

    if (req.user.id !== review.userId) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    await review.destroy()

    res.json({
        message: "Successfully deleted"
    })
})

module.exports = router;