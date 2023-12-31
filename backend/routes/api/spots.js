const express = require('express')

const { Spot } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')

const router = express.Router();

// Get All Spots

router.get('/', async (req, res) => {
    const spots = await Spot.findAll()

    res.json(spots);
})

// Get all Spots owned by the Current User

router.get('/current', requireAuth, async (req, res) => {
    const ownerId = req.user.id;
    const spots = await Spot.findAll({
        where: {
            ownerId: ownerId
        }
    })

    res.json(spots);
})