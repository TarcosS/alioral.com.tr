const mongoose = require('mongoose');

const specialLinksModel = new mongoose.Schema({
    title: String,
    links: [{link: String} || null]
})
const SpecialLinks = mongoose.model('SpecialLinks', specialLinksModel);

module.exports = { SpecialLinks }