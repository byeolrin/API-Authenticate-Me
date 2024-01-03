const express = require('express')

const { Spot, Review, SpotImage, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();


const validateSpots = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .isFloat({ min: -90.0 })
        .isFloat({ max: 90.0 })
        .withMessage('Latitude must be within -90 and 90'),
    check('lng')
        .isFloat({ min: -180.0 })
        .isLength({ max: 180.0 })
        .withMessage('Longitude must be within -180 and 180'),
    check('name')
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .isFloat({ min: 0 })
        .withMessage('Price per day must be a positive number'),
    handleValidationErrors
  ];

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

// Create a Spot
router.post('/', requireAuth, validateSpots, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const spot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })
    res.json(spot);
})

// Add Image to Spot if current SpotId
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { url } = req.body;
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }
    
    if (req.user.id !== spot.ownerId) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    const spotImage = await SpotImage.create({
        spotId: req.params.spotId,
        url: url,
        preview: true
    })

    res.json({
        id: spotImage.id,
        url: spotImage.url,
        preview: spotImage.preview
    })
    
})

router.put('/:spotId', requireAuth, validateSpots, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    if (req.user.id !== spot.ownerId) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    if (address) {
        spot.address = address
    }

    if (city) {
        spot.city = city
    }

    if (state) {
        spot.state = state
    }

    if (country) {
        spot.country = country
    }

    if (lat) {
        spot.lat = lat
    }

    if (lng) {
        spot.lng = lng
    }

    if (name) {
        spot.name = name
    }

    if (description) {
        spot.description = description
    }

    if (price) {
        spot.price = price
    }

    await spot.save()

    res.json(spot)

})

router.delete('/:spotId', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    if (req.user.id !== spot.ownerId) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    spot.destroy()

    res.status(200).json({
        message: "Successfully deleted"
    })
})

module.exports = router;