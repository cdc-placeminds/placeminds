const mongoose = require("mongoose");

const driveSchema = new mongoose.Schema({
    name: { type: String, required: true },
    profile: { type: String, required: true },
    location: { type: String, required: true },
    ctc: { type: String, required: true },
    branch: { type: String, required: true },
    year: { type: String, required: true }
})

const Drive = mongoose.model('drive', driveSchema);

module.exports = Drive