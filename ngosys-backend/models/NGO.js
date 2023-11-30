import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const ngoSchema = new mongoose.Schema({
    name: String,
    address: String,
    city: String,
    state: String,
    NGOID: String,
    pnumber: Number,
    email: {
        type: String,
        unique: true
    },
    passwd: String,
    fund: {
        type:Number,
        default:0,
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

ngoSchema.pre('save', async function (next) {
    if (this.isModified('passwd')) {
        this.passwd = await bcrypt.hash(this.passwd, 12);
    }
    next();
});

ngoSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        return token;
    } catch (err) {
        console.log(err);
    }
};

ngoSchema.statics.findByToken = function (token, cb) {
    var user = this;
    jwt.verify(token, process.env.SECRET_KEY, function (err, decode) {
        user.findOne({ "_id": decode, "token": token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user);
        });
    });
};

const NGO = new mongoose.model("NGO", ngoSchema);

export default NGO;
