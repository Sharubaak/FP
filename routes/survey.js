let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let surveyModel = require('../models/config/survey'); 

/* Read Operation */
router.get('/', async (req, res, next) => {
    try {
        const surveyList = await surveyModel.find();  
        res.render('survey/list', {
            title: 'survey Tracker',
            survey: surveyList,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

/* Create Operation */
router.get('/add', async (req, res, next) => {
    try {
        res.render('survey/add', { title: 'Add survey' });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/add', async (req, res, next) => {
    try {
        let newsurvey = new surveyModel({
            studentName: req.body.week,
            studentId: req.body.survey,
            countryOfOrigin: req.body.GoalReached,
            academicProgram: req.body.date,
        });
        await newsurvey.save(); 
        res.redirect('/survey');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

/* Update Operation */
router.get('/edit/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const surveyToEdit = await surveyModel.findById(id);
        res.render('survey/edit', {
            title: 'Edit survey',
            survey: surveyToEdit,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/edit/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let updatedsurvey = {
            week: req.body.week,
            survey: req.body.survey,
            GoalReached: req.body.GoalReached,
            date: req.body.date,
        };
        await surveyModel.findByIdAndUpdate(id, updatedsurvey);
        res.redirect('/survey');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

/* Delete Operation */
router.get('/delete/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        await surveyModel.deleteOne({ _id: id });
        res.redirect('/survey');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;