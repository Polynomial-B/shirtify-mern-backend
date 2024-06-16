import Shirts from "../models/shirt.js";
import { Router } from "express";
import secureRoute from "../middleware/secureRoute.js";
import { NotFound } from "../lib/customErrors.js";
import User from "../models/user.js";

const router = Router();


router.get("/wishlist", async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).populate('wishlist');
        res.status(200).json(user.wishList);
    } catch (err) {
        next(err);
    }
});



// router.delete("/wishlist", secureRoute, async (req, res, next) => {
//   const { shirtId } = req.params;
//   try {
//     const shirtToDelete = await Shirts.findById(shirtId);

//     if (!shirtToDelete) throw new NotFound();

//     await shirtToDelete.deleteOne();
//     return res.sendStatus(204);
//   } catch (err) {
//     next(err);
//   }
// });

export default router;
