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
router.put("/:wishId", secureRoute, async (req, res) => {
  const { color, frontDesign, size } = req.body
  try {
    let shirt = await Shirts.findById(req.params.id);
    if(!shirt) return res.status(200).json({message: 'Shirt not found'})
    if (shirt.createdBy.toString () !== req.user.id) return res.status(401).json({message: "You are not authorized to access this resource"});
    const foundShirt = await User.findById(res.locals.currentUser).populate(':wishId')

    await shirt.remove();
    await User.findByIdAndUpdate(req.user.id, {$pull: {wishlist: req.params.id}});
    res.json({ message: 'Shirt deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
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
