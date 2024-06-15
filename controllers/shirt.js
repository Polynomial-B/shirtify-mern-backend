import Shirts from "../models/shirt.js";
import { Router } from "express";
import secureRoute from "../middleware/secureRoute.js";
const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const shirts = await Shirts.find();
    res.status(200).json(shirts);
  } catch (err) {
    next(err);
  }
});

// ! to add --- secureRoute

router.get("/design", async (_req, res, next) => {
  try {
    const shirts = await Shirts.find();
    res.status(200).json(shirts);
  } catch (err) {
    next(err);
  }
});

router.post("/design", secureRoute, async (req, res, next) => {
  try {
    const createdShirt = await Shirts.create({
      ...req.body,
      createdBy: res.locals.currentUser._id,
    });

    res.status(201).json(createdShirt);
    next();
  } catch (err) {
    next(err);
  }
});



// router.get("/wishlist", async (req, res, next) => {
//   const { ShirtId } = req.params;
//   try {
//     const foundShirt = await Shirts.findById(ShirtId);

//     if (!foundShirt) throw new NotFound();

//     return res.status(200).json(foundShirt);
//   } catch (err) {
//     next(err);
//   }
// });

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
