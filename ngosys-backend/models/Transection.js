import mongoose from "mongoose";

const transectionSchema = new mongoose.Schema({
    ngoid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NGO',
        required: true,
    },
    donorid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donor',
        required: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
        required: true,
    },
    razorpayPaymentId: String,
    razorpayOrderId: String,
    razorpaySignature: String,
});

const Transection = new mongoose.model("Transection", transectionSchema);

export default Transection;
