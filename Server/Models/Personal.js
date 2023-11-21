const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: String,
    description: String,
    profilePhotoPath: String,
    sections: [Object] || []
})
const Person = mongoose.model('Person', personSchema);

module.exports = { Person }
 