import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    name: String,
    organizer: String,
    ngoid: String,
    edate: Date,
    etime: String,
    address: String,
    city: String,
    state: String,
    category: String,
    contact: Number,
    email: String,
    description: String,
    images: String,
    feedback: {
        type: Array,
        default: []
    },
    participants: {
        type: Array,
        default: []
    },
    suggestion: {
        type: Array,
        default: []
    }
});

const Events = new mongoose.model("Events", eventSchema);

export default Events;
