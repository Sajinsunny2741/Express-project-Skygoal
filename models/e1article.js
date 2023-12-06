let mongoose = require('mongoose');


let articleSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
   
});

module.exports = mongoose.model('Articles', articleSchema);