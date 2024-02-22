const mongoose = require("mongoose")

const blackListSchema = mongoose.Schema({
    token:{type: String, required: true},
    date: {type: String, required: true}
}, {
    versionKey: false
})

const BlackListModel = mongoose.model("BlackListToken", blackListSchema)

module.exports = {BlackListModel}