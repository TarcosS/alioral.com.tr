const mongoose = require('mongoose');

const announcemetSchema = new mongoose.Schema({
    konu: String,
    'duyuru-metni': String,
    created_at: {
        default: new Date,
        type: Date
    }
})

const Announcement = mongoose.model('Announcement', announcemetSchema);

module.exports = { Announcement }