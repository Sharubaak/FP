const mongoose = require('mongoose');

// Define the schema for the weight model
let surveySchema = mongoose.Schema({
    studentName: String, 
    studentId: Number, 
    countryOfOrigin: String, 
    acadmicProgram: String
}, {
    collection: 'survey' // Use 'collection' to specify the MongoDB collection name
});

// Create and export the weight model
module.exports = mongoose.model('survey', surveySchema);