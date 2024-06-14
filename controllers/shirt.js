import express from 'express'
import Shirt from '../models/shirt.js'

// import secureRoute from '../middleware/secureRoute.js'

const router = express.Router()

router.get('/', async function shirtIndex(_req, res, next) {
  try {
    const shirts = await Shirt.find();
    return res.status(200).json(shirts);
  } catch (err) {
    next(err);
  }
})



export default router