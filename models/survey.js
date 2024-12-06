const mongoose = require('mongoose');

//create a model class
let surveySchema = mongoose.Schema({
    studentName: String, 
    studentId: Number, 
    countryOfOrigin: String, 
    acadmicProgram: String
}, {
    collection: 'Survey' // Use 'collection' to specify the MongoDB collection name
});

// Create and export the weight model
module.exports = mongoose.model('survey', surveySchema);
