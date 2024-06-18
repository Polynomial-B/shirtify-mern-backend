import Shirts from "../models/shirt.js";
import { Router } from "express";
import secureRoute from "../middleware/secureRoute.js";
import { NotFound } from "../lib/customErrors.js";
import User from "../models/user.js";

const router = Router();


router.get("/", secureRoute, async (_req, res, next) => {
    try {
        const user = await User.findById(res.locals.currentUser).populate('wishlist');
        console.log('user ', user);

        res.status(200).json(user.wishlist);
    } catch (err) {
        next(err);
    }
});

router.get("/:wishId", secureRoute, async (req, res, next) => {
    const { wishId } = req.params;
    try {
      const foundShirt = await User.findById(res.locals.currentUser).populate(':wishId')

      if (!foundShirt) throw new NotFound()
    
      return res.status(200).json(foundShirt);
    } catch (err) {
      next(err);
    }
  }
)




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
