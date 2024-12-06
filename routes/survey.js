
const express = require('express');
const router = express.Router();
const Survey = require('../models/Survey');

// Placeholder for survey entries
let surveys = [];

// Display survey page
router.get('/', (req, res) => {
    res.render('survey', {
        title: 'Survey Page',
        message: '',
        surveys: surveys
    });
});

//Add a new survey entry
router.post('/add', async (req, res) => {
    const { studentName, studentId, country, program } = req.body;

    if (!studentName || !studentId || !country || !program) {
        return res.render('survey', {
          title: 'Survey Page',
          message: 'All fields are required.',
          surveys: await Survey.find() // Reload existing surveys
        });
      }
    
      try {
        const newSurvey = new Survey({ studentName, studentId, country, program });
        await newSurvey.save(); // Save to MongoDB
        res.redirect('/survey'); // Redirect back to the survey page
      } catch (err) {
        console.error('Error adding survey entry:', err);
        res.status(500).send('Error adding survey entry.');
      }
    });

//Render edit form with existing data
router.post('/edit', (req, res) => {
    const { studentName, studentId } = req.body;
    const survey = surveys.find(s => s.studentName === studentName && s.studentId === studentId);

    if (!survey) {
        return res.render('survey', {
            title: 'Survey Page',
            message: 'Survey entry not found.',
            surveys: surveys
        });
    }

    res.render('editSurvey', {
        title: 'Edit Survey',
        message: '',
        survey: surveys
    });
});

//Update survey entry
router.post('/edit/update', (req, res) => {
    const { originalStudentName, originalStudentId, studentName, studentId, country, program } = req.body;

    // Find and update the survey entry
    const index = surveys.findIndex(s => s.studentName === originalStudentName && s.studentId === originalStudentId);

    if (index !== -1) {
        surveys[index] = { studentName, studentId, country, program };
        res.redirect('/survey');
    } else {
        res.render('survey', {
            title: 'Survey Page',
            message: 'Failed to update survey entry.',
            surveys: surveys
        });
    }
});

//Delete survey entry
router.post('/delete', (req, res) => {
    const { studentName, studentId } = req.body;
    surveys = surveys.filter(s => !(s.studentName === studentName && s.studentId === studentId));
    res.redirect('/survey');
});

module.exports = router;
