import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const volSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    address: String,
    city: String,
    state: String,
    gender: String,
    pnumber: Number,
    email: String,
    passwd: String,
    cart: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

volSchema.pre('save', async function (next) {
    if (this.isModified('passwd')) {
        this.passwd = await bcrypt.hash(this.passwd, 12);
    }
    next();
});

volSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        return token;
    } catch (err) {
        console.log(err);
    }
};

volSchema.statics.findByToken = function (token, cb) {
    var user = this;
    jwt.verify(token, process.env.SECRET_KEY, function (err, decode) {
        user.findOne({ "_id": decode, "token": token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user);
        });
    });
};

const Volunteer = new mongoose.model("Volunteer", volSchema);
export default Volunteer;
