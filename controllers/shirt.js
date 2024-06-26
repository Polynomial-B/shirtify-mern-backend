import Shirts from "../models/shirt.js";
import { Router } from "express";
import secureRoute from "../middleware/secureRoute.js";
import { NotFound, Unauthorized } from "../lib/customErrors.js";
import User from "../models/user.js";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const shirts = await Shirts.find();
    res.status(200).json(shirts);
  } catch (err) {
    next(err);
  }
});

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
      price: 15,
      createdBy: res.locals.currentUser._id,
    });

    await User.findByIdAndUpdate(
      res.locals.currentUser._id,
      { $push: { wishlist: createdShirt } },
      { new: true }
    );

    res.status(201).json(createdShirt);
    next();
  } catch (err) {
    next(err);
  }
});

router.get("/:shirtId", async (req, res, next) => {
  const { shirtId } = req.params;
  try {
    const foundShirt = await Shirts.findById(shirtId);
    if (!foundShirt) throw new NotFound();
    res.status(200).json(foundShirt);
  } catch (err) {
    next(err);
  }
});

router.delete("/:shirtId", secureRoute, async (req, res, next) => {
  const { shirtId } = req.params;
  try {
    const shirtToDelete = await Shirts.findById(shirtId);
    if (!shirtToDelete) throw new NotFound();
    if (!shirtToDelete.createdBy.equals(res.locals.currentUser._id))
      throw new Unauthorized();
    await shirtToDelete.deleteOne();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

router.put("/:shirtId", secureRoute, async (req, res, next) => {
  const { shirtId } = req.params;
  try {
    const shirtToUpdate = await Shirts.findById(shirtId);
    if (!shirtToUpdate) throw new NotFound();
    Object.assign(shirtToUpdate, req.body);
    await shirtToUpdate.save();
    res.status(202).json(shirtToUpdate);
  } catch (err) {
    next(err);
  }
});

router.post("/browse", secureRoute, async (req, res, next) => {
  const id = req.body.shirt._id;

  try {
    const browseShirt = await Shirts.findById(id);

    await User.findByIdAndUpdate(
      res.locals.currentUser._id,
      { $push: { wishlist: browseShirt } },
      { new: true }
    );

    res.status(201).json(browseShirt);
    next();
  } catch (err) {
    next(err);
  }
});

export default router;
