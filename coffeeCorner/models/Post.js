const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    price : { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref:'categories' },
    coffee_image : { type: String, required: true }
})

module.exports = mongoose.model('Post', PostSchema)