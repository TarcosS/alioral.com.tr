const mongoose = require('mongoose');

const userSection = new mongoose.Schema({
    email: String,
    password: String
})
const User = mongoose.model('User', userSection);

module.exports = { User }
 