import { Unauthorised } from "../lib/errors.js";
import jwt from "jsonwebtoken";
import { secret } from "../config/environment.js";

export default function secureRoute(req, res, next) {
  console.log("secure route");
  try {
    // ? Getting the token
    const rawToken = req.headers.authorization
    
    if(!rawToken) throw new Unauthorised()

    const token = rawToken.replace('Bearer ', '')
    console.log(token)

    // ? Verifying the token
    const payload = jwt.verify(token, secret)
    

    // ?


    
        
    next()
  } catch (err) {
    next(err);
  }
}
