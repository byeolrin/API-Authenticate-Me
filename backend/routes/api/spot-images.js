const express = require('express');

const { SpotImage, Spot } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res) => {
    const { imageId } = req.params;
    const spotImage = await SpotImage.findByPk(imageId)

    if (!spotImage) {
        return res.status(404).json({
            message: "Spot Image couldn't be found"
        })
    }

    const spot = await Spot.findByPk(spotImage.spotId)

    console.log(spot)

    if (!spot || req.user.id !== spot.ownerId) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    await spotImage.destroy();

    res.json({
        message: "Successfully deleted"
    })
})

module.exports = router;