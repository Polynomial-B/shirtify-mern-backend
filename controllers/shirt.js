import Shirts from "../models/shirt.js";
import { Router } from "express";
import secureRoute from "../middleware/secureRoute.js";
import { NotFound } from "../lib/customErrors.js";
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

// * GET ALL SHIRTS

router.get("/design", async (_req, res, next) => {
  try {
    const shirts = await Shirts.find();
    res.status(200).json(shirts);
  } catch (err) {
    next(err);
  }
});

// * CREATE SHIRT

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

// * FIND SHIRT BY ID

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

// * DELETE SHIRT BY ID

router.delete("/:shirtId", secureRoute, async (req, res, next) => {
  const { shirtId } = req.params;
  try {
    const shirtToDelete = await Shirts.findById(shirtId);
    if (!shirtToDelete) throw new NotFound();
    await shirtToDelete.deleteOne();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

// * UPDATE SHIRT BY ID

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

export default router;
