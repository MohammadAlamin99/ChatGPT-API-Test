const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    email: { type: String, lowercase: true, required: true, unique: true },
    otp: { type: String, required: true },
    verified: { type: Boolean, default: false },
}, { timestamps: true, versionKey: false })

const userModel = mongoose.model('users', dataSchema);
module.exports = userModel;