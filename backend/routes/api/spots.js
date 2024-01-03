const express = require('express')

const { Spot, Review, SpotImage, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// Get all Spots owned by the Current User

router.get('/current', requireAuth, async (req, res) => {
    const ownerId = req.user.id;
    const spots = await Spot.findAll({
        where: {
            ownerId: ownerId
        }
    })

    let avgRating;

    for (let i = 0; i < spots.length; i++) {
        const reviews = await Review.count({ 
            where: { 
                spotId: spots[i].id 
            } })
        const totalStars = await Review.sum('stars', {
            where: {
                spotId: spots[i].id
            }
        })

        if (totalStars === null) {
            avgRating = 0
        } else {
            avgRating = totalStars / reviews
        }

        spots[i].setDataValue('avgRating', avgRating)

        const imageLink = await SpotImage.findOne({
            where: {
                spotId: spots[i].id
            }
        })

        if (!imageLink) {
            spots[i].setDataValue('previewImage', null)
        } else {
            spots[i].setDataValue('previewImage', imageLink.url)
        }
    }
    res.json({
        Spots: spots
    })
})


// Get details from SpotId

router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    const reviews = await Review.count({
        where: {
            spotId: spotId
        }
    })

    const totalStars = await Review.sum('stars', {
        where: {
            spotId: spotId
        }
    })

    const spotImage = await SpotImage.findAll({
        where: { 
            spotId: spotId 
        },
        attributes: ['id', 'url', 'preview']
    })

    const owner = await User.findByPk(spot.ownerId,
        {
            attributes: ['id', 'firstName', 'lastName']
        })

    const spotDetails = spot.toJSON();

    let avgStarRating;
    if (totalStars === null) {
        avgStarRating = 0
    } else {
        avgStarRating = (totalStars / reviews)
    }

    spotDetails.numReviews = reviews;
    spotDetails.avgStarRating = avgStarRating;
    spotDetails.SpotImages = spotImage;
    spotDetails.Owner = owner;

    res.json(spotDetails)
})

// Get All Spots

router.get('/', async (req, res) => {
    const spots = await Spot.findAll();

    let avgRating;

    for (let i = 0; i < spots.length; i++) {
        const reviews = await Review.count({ 
            where: { 
                spotId: spots[i].id 
            } })
        const totalStars = await Review.sum('stars', {
            where: {
                spotId: spots[i].id
            }
        })

        if (totalStars === null) {
            avgRating = 0
        } else {
            avgRating = totalStars / reviews
        }

        spots[i].setDataValue('avgRating', avgRating)

        const imageLink = await SpotImage.findOne({
            where: {
                spotId: spots[i].id
            }
        })

        if (!imageLink) {
            spots[i].setDataValue('previewImage', null)
        } else {
            spots[i].setDataValue('previewImage', imageLink.url)
        }
    }
    res.json({
        Spots: spots
    })
})

module.exports = router;