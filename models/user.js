import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const userSchema = mongoose.Schema({
    username: {type: String, required: true },
    email: {type: String, required: true },
    password: {type: String, required: true },
    isAdmin: {type: Boolean, required: true, default: false },
    wishlist: [{type: mongoose.Schema.ObjectId, ref: "Shirt", required: false }]
})



userSchema.plugin(mongooseUniqueValidator)

export default mongoose.model('User', userSchema)
