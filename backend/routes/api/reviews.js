const express = require('express');

const { Review, User, Spot, SpotImage, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

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

module.exports = router;