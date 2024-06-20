import Shirts from "../models/shirt.js";
import { Router } from "express";
import secureRoute from "../middleware/secureRoute.js";
import { NotFound, Unauthorized } from "../lib/customErrors.js";
import User from "../models/user.js";

const router = Router();

router.get("/", secureRoute, async (_req, res, next) => {
  try {
    const user = await User.findById(res.locals.currentUser).populate(
      "wishlist"
    );

    res.status(200).json(user.wishlist);
  } catch (err) {
    next(err);
  }
});

router.get("/:wishId", secureRoute, async (req, res, next) => {
  const { wishId } = req.params;
  try {
    const foundShirt = await Shirts.findById(wishId);

    if (!foundShirt) throw new NotFound();

    return res.status(200).json(foundShirt);
  } catch (err) {
    next(err);
  }
});

router.put("/:wishId", secureRoute, async (req, res) => {
  const { color, frontDesign, size } = req.body;
  try {
    let shirt = await Shirts.findById(req.params.id);
    if (!shirt) return res.status(200).json({ message: "Shirt not found" });
    if (shirt.createdBy.toString() !== req.user.id)
      return res
        .status(401)
        .json({ message: "You are not authorized to access this resource" });
    const foundShirt = await User.findById(res.locals.currentUser).populate(
      ":wishId"
    );
  } catch (err) {
    next(err);
  }
});

router.delete("/:wishId", secureRoute, async (req, res) => {
  try {
    const user = await User.findById(res.locals.currentUser._id);
    // const shirt = await Shirts.findById();
    const shirtToDelete = await Shirts.findById(req.params.wishId);

    if (!user) throw new Unauthorized();
    if (!shirtToDelete) throw new NotFound();
    if (!shirtToDelete.createdBy.equals(res.locals.currentUser._id)) {
      await User.findByIdAndUpdate(user._id, {
        $pull: { wishlist: req.params.wishId },
      });
      return res.json({ message: 'Shirt removed from Wishlist!' });
    } else {
      await shirtToDelete.remove();
      return res.json({ message: 'Shirt deleted!' });
    }
  } catch (err) {
    next(err);
  }
});

export default router;
