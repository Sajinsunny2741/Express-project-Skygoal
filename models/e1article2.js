let mongoose = require('mongoose');


let articleSchema = mongoose.Schema({
    medicinename: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
      Expirydate: {
        type: String,
        required: true
    },
      price: {
        type: String,
        required: true
    },
     itemcount: {
        type: String,
        required: true
    },
    
   
});

module.exports = mongoose.model('medicines', articleSchema);