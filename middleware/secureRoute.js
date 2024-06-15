
import { Unauthorized } from "../lib/customErrors.js";
import jwt from "jsonwebtoken";
import { secret } from '../config/environment.js';
import User from "../models/user.js";

export default async function secureRoute(req, res, next) {
  try {
    const rawToken = req.headers.authorization;
    if (!rawToken) throw new Unauthorized() ;
    const token = rawToken.replace('Bearer ', '');
    // verify token
    const payload = jwt.verify(token, secret);
    // get { user }
    const user = await User.findById(payload.userId);
    if (!user) throw new Unauthorized();

    // assigning { user } as local variable
    res.locals.currentUser = user;

    next();
  } catch (err) {
    next(err);
  }
}