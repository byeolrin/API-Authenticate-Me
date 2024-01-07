const express = require('express')

const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const { check, query } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require('sequelize')

const router = express.Router();

const validateSpots = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .isFloat({ min: -90, max: 90 })
        .withMessage('Latitude must be within -90 and 90'),
    check('lng')
        .isFloat({ min: -180, max: 180 })
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

const validateReviews = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .isInt({ min: 1 , max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
  ]

  const validateQuery = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be greater than or equal to 1'),
    query('size')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Size must be greater than or equal to 1'),
    query('maxLat')
        .optional()
        .isFloat ({ min: -90, max: 90 })
        .withMessage('Maximum latitude is invalid'),
    query('minLat')
        .optional() 
        .isFloat ({ min: -90, max: 90 })
        .withMessage('Minimum latitude is invalid'),
    query('maxLng')
        .optional()
        .isFloat ({ min: -180, max: 180 })
        .withMessage('Maximum longitude is invalid'),
    query('minLng')
        .optional()
        .isFloat ({ min: -180, max: 180 })
        .withMessage('Minimum longitude is invalid'),
    query('maxPrice')
        .optional()
        .isFloat ({ min: 0 })
        .withMessage('Maximum price must be greater than or equal to 0'),
    query('minPrice')
        .optional()
        .isFloat ({ min: 0 })
        .withMessage('Minimum price must be greater than or equal to 0'),
    handleValidationErrors
  ]
  
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

router.get('/', validateQuery, async (req, res) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;


    if (!size) size = 20;
    if (page > 10) page = 10;
    if (size > 20) size = 20;
    page = page || 1;

    const queryObj = {
        where: {}
    }

    const pagination = {};

    pagination.limit = size;
    pagination.offset = size * (page - 1);

    if (minLat) {
        queryObj.where.lat = { [Op.gte]: minLat }
    }

    if (maxLat) {
        queryObj.where.lat = { [Op.lte]: maxLat }
    }

    if (minLat && maxLat) {
        queryObj.where.lat = { [Op.between]: [minLat, maxLat] }
    }

    if (minLng) {
        queryObj.where.lng = { [Op.gte]: minLng }
    }

    if (maxLng) {
        queryObj.where.lng = { [Op.lte]: maxLng }
    }

    if (minLng && maxLng) {
        queryObj.where.lng = { [Op.between]: [minLng, maxLng] }
    }

    if (minPrice) {
        queryObj.where.price = { [Op.gte]: minPrice }
    }

    if (maxPrice) {
        queryObj.where.price = { [Op.lte]: maxPrice }
    }

    if (minPrice && maxPrice) {
        queryObj.where.price = { [Op.between]: [minPrice, maxPrice] }
    }

    const spots = await Spot.findAll({
        ...queryObj,
        ...pagination
    });

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

        console.log(spots)

        if (spots[i].lat) {
            spots[i].setDataValue('lat', parseFloat(spots[i].lat))
        }
    }
    res.json({
        Spots: spots,
        page,
        size
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

// Update a current Spot
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

// Delete a Spot
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

// Get reviews base on a current Spot
router.get('/:spotId/reviews', async (req, res) => {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    const reviews = await Review.findAll({
        where: {
            spotId: spotId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })

    res.json({
        Reviews: reviews
    })
})

// Making a review on the current Spot
router.post('/:spotId/reviews', requireAuth, validateReviews, async (req, res) => {
    const { review, stars } = req.body;
    const { spotId } = req.params;

    const spot = await Spot.findByPk(spotId)
    const reviewExist = await Review.findOne({
        where: {
            userId: req.user.id,
            spotId: spotId
        }
    })

    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    if (reviewExist) {
        return res.status(500).json({
            message: "User already has a review for this spot"
        })
    }

    const newReview = await Review.create({
        spotId: spotId,
        userId: req.user.id,
        review,
        stars
    })

    res.status(201).json(newReview)
})

// Getting all bookings for Spot on spotId
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const { spotId } = req.params;

    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    if (req.user.id !== spot.ownerId) {
        const bookings = await Booking.findAll({
            where: {
                spotId: spotId
            },
            attributes: ['spotId', 'startDate', 'endDate']
        })
        return res.json({
            Bookings: bookings
        })
    }
    
    if (req.user.id === spot.ownerId) {
        const bookings = await Booking.findAll({
            where: {
                spotId: spotId
            },
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        })
        return res.json({
            Bookings: bookings
        })
    }
})

// Create a booking from Spot based on Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const { startDate, endDate } = req.body;
    const currentDate = new Date();

    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    if (new Date(startDate) < currentDate) {
        return res.status(400).json({
            message: "Bad Request",
            errors: {
                startDate: "startDate cannot be in the past"
            }
        })
    }

    if (new Date(endDate) <= new Date(startDate)) {
        return res.status(400).json({
            message: "Bad Request",
            errors: {
                endDate: "endDate cannot be on or before startDate"
            }
        })
    }

    const existBooking = await Booking.findOne({
        where: {
            spotId: spotId,
            [Op.and]: [
                { startDate: { [Op.lte]: new Date(endDate) } },
                { endDate: { [Op.gte]: new Date(startDate) } }
            ]
        }
    })

    if (existBooking) {
        return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            error: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End Date conflicts with an existing booking"
            }
        })
    }
    
    if (req.user.id !== spot.ownerId) {
        const newBooking = await Booking.create({
            spotId: spotId,
            userId: req.user.id,
            startDate,
            endDate
        })
        return res.json(newBooking)
    } else {
        return res.status(403).json({
            message: "Owners can't booked their own place"
        })
    }

})

module.exports = router;