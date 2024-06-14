import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";



const shirtSchema = mongoose.Schema({
    colors: {type: String, required: true },
    frontDesigns: {type: String, required: true },
    backDesign: {type: String, required: false }, // future implementation
    sizes: [{type: String, required: true }],
    price: {type: Number, required: true },
    isInStock: {type: Boolean, required: true },
    createdBy: {type: mongoose.Schema.ObjectId, ref: "User", required: true }
})

shirtSchema.plugin(mongooseUniqueValidator)

export default mongoose.model('Shirts', shirtSchema)
