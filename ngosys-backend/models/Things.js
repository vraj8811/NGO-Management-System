import mongoose from "mongoose";

const thingsSchema = new mongoose.Schema({
    images: String,
    ngoID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NGO',
        required: true,
    },
    donorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donor',
        required: true,
    },
   
    quantity: {
        type: String,
        required: true
    },
    thingName: {
        type: String,
        required: true
    },

    status:{
        type:Number,// 0 for not accept 1 for acept and 2 for reject
        default:0,
    },
    pick:{
        type:Number,
        default:0,
    }
   
    
});

const Things = mongoose.model("Things", thingsSchema);
export default Things;
