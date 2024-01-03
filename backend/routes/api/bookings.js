const express = require('express');

const { Booking, Spot, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// Get all current booking by CURRENT USER
router.get('/current', requireAuth, async (req, res) => {
    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: Spot,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }
        ]
    })
    for (let i = 0; i < bookings.length; i++) {
        let previewImage = bookings[i].toJSON();

        const bookingSpotImage = await SpotImage.findOne({
            where: {
                spotId: previewImage.Spot.id,
                preview: true
            }
        })

        if (bookingSpotImage) {
            previewImage.Spot.previewImage = bookingSpotImage.url
        } else {
            previewImage.Spot.previewImage = null
        }
        bookings[i] = previewImage
    }
    res.json({
        Bookings: bookings
    })
})

module.exports = router;