const express = require('express');

const { Booking, Spot, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const { Op } = require('sequelize');

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

        if (previewImage.Spot.lat) {
            previewImage.Spot.lat = parseFloat(previewImage.Spot.lat)
        }

        if (previewImage.Spot.lng) {
            previewImage.Spot.lng = parseFloat(previewImage.Spot.lng)
        }

        if (previewImage.Spot.price) {
            previewImage.Spot.price = parseFloat(previewImage.Spot.price)
        }
        
        bookings[i] = previewImage
    }
    res.json({
        Bookings: bookings
    })
})

// Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res) => {
    const { bookingId } = req.params;
    const { startDate, endDate } = req.body;
    const currentDate = new Date();

    const booking = await Booking.findByPk(bookingId)

    if (!booking) {
        return res.status(404).json({
            message: "Booking couldn't be found"
        })
    }

    if (new Date(startDate) < currentDate || new Date(endDate) < currentDate) {
        return res.status(403).json({
            message: "Past bookings can't be modified"
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
            id: { [Op.ne]: bookingId },
            spotId: booking.spotId,
            [Op.and]: [
                { startDate: { [Op.lte]: new Date(endDate) } },
                { endDate: { [Op.gte]: new Date(startDate) } }
            ]
        }
    })

    console.log(existBooking)

    if (existBooking) {
        return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            error: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End Date conflicts with an existing booking"
            }
        })
    }

    if (req.user.id !== booking.userId) {
        return res.status(403).json({
            message: "This is not your booking"
        })
    } else {
        if (startDate) {
            booking.startDate = startDate
        }
        if (endDate) {
            booking.endDate = endDate
        }
        
        await booking.save()

        res.json(booking)
    }
})

router.delete('/:bookingId', requireAuth, async (req, res) => {
    const { bookingId } = req.params;
    const booking = await Booking.findByPk(bookingId)

    if (!booking) {
        return res.status(404).json({
            message: "Booking couldn't be found"
        })
    }

    if (booking.userId !== req.user.id) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    if (new Date(booking.startDate) <= new Date()) {
        return res.status(403).json({
            message: "Bookings that have been started can't be deleted"
        })
    }

    await booking.destroy();
    res.json({
        message: "Successfully deleted"
    })

})

module.exports = router;