const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema ({
    category: { type: Schema.Types.ObjectId, ref: 'Category'},
    owner: { type: Schema.Types.ObjectId, ref: 'User'},
    title: String,
    place: String,
    date: Date,
    description: String,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', EventSchema);