import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const donSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    address: String,
    city: String,
    state: String,
    gender: String,
    pnumber: Number,
    email: String,
    passwd: String,
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

donSchema.pre('save', async function (next) {
    if (this.isModified('passwd')) {
        this.passwd = await bcrypt.hash(this.passwd, 12);
    }
    next();
});

donSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        return token;
    } catch (err) {
        console.log(err);
    }
};

donSchema.statics.findByToken = function (token, cb) {
    var user = this;
    jwt.verify(token, process.env.SECRET_KEY, function (err, decode) {
        user.findOne({ "_id": decode, "token": token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user);
        });
    });
};

const Donor = new mongoose.model("Donor", donSchema);
export default Donor;
