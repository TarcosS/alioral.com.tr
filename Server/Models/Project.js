const mongoose = require('mongoose');

const projectModal = new mongoose.Schema({
    title: String,
    path: String
})
const Project = mongoose.model('Project', projectModal);

module.exports = { Project }