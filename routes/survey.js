// routes/survey.js

const express = require('express');
const router = express.Router();

// Placeholder for survey entries
let surveys = [];

// GET /survey - Display survey page
router.get('/', (req, res) => {
    res.render('survey', {
        title: 'Survey Page',
        message: '',
        surveys: surveys
    });
});

// POST /survey/add - Add a new survey entry
router.post('/add', (req, res) => {
    const { studentName, studentId, country, program } = req.body;

    // Simple validation
    if (!studentName || !studentId || !country || !program) {
        return res.render('survey', {
            title: 'Survey Page',
            message: 'All fields are required.',
            surveys: surveys
        });
    }

    // Add new survey entry
    surveys.push({ studentName, studentId, country, program });
    res.redirect('/survey');
});

// POST /survey/edit - Render edit form with existing data
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

// POST /survey/edit/update - Update survey entry
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

// POST /survey/delete - Delete survey entry
router.post('/delete', (req, res) => {
    const { studentName, studentId } = req.body;
    surveys = surveys.filter(s => !(s.studentName === studentName && s.studentId === studentId));
    res.redirect('/survey');
});

module.exports = router;
