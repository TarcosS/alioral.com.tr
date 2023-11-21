const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    title: String,
    description: String,
    iconPath: String,
    links: [{'link-adi': String, link: String}] || []
})
const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = { Lesson }  