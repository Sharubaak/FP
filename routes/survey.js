const express = require('express');
const router = express.Router();

// used to store the surveys
let surveys = [];

//displaying all surveys
router.get('/', (req, res) => {
    res.render('survey', { title: 'Survey Page', surveys });
});

//add a new survey
router.post('/add', (req, res) => {
    const { studentName, studentId, country, program } = req.body;
    surveys.push({ id: Date.now(), studentName, studentId, country, program });
    res.redirect('/survey');
});

//displaying the edit form for a survey
router.get('/edit/:id', (req, res) => {
    const survey = surveys.find(s => s.id == req.params.id);
    res.render('editSurvey', { title: 'Edit Survey', survey});
});

//updating a survey
router.post('/edit/:id', (req, res) => {
    const { studentName, studentId, country, program} = req.body;
    surveys = surveys.map(s =>
        s.id == req.params.id ? {...s, studentName, studentId, country, program } : s
    );
    res.redirect('/survey');
});

//deleting a survey
router.get('/delete/:id', (req, res) => {
    surveys = surveys.filter(s => s.id != req.params.id);
    res.redirect('/survey');
});

module.exports = router;