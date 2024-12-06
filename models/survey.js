const mongoose = require('mongoose');

//create a model class
let surveySchema = new mongoose.Schema({
    studentName: String, 
    studentId: Number, 
    country: String, 
    program: String
}, {
    collection: 'Survey' // Use 'collection' to specify the MongoDB collection name
});

// Create and export the weight model
module.exports = mongoose.model('Survey', surveySchema);
