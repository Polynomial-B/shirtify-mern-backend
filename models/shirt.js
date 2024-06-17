import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";



const shirtSchema = mongoose.Schema({
    color: { type: String, enum: ["white", "black", "red", "green", "grey", "pink", "purple", "blue", "yellow"] },
    frontDesign: {type: String, required: true },
    backDesign: {type: String, required: false }, // future implementation
    size: {type: String, required: true, enum: [ "S", "M", "L" ] },
    price: {type: Number, required: true },
    createdBy: {type: mongoose.Schema.ObjectId, ref: "User", required: true }
})

shirtSchema.plugin(mongooseUniqueValidator)

export default mongoose.model('Shirt', shirtSchema)
