const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
    sections: [Object] || []
})
const Work = mongoose.model('Work', workSchema);

module.exports = { Work }
 