const { Work } = require("../Models/Work");
const express = require("express");
const workApi = express.Router();


workApi.get('/getWorks', (req, res) => {
    Work.findOne({}).then((response)=>{
        
        res.status(200).json({status: 'Accepted', data: (response.sections || [])})
    }).catch(err => console.log(err));
})

workApi.post('/deleteSection', (req, res) => {
    Work.findOne({}).then(work => {
        work.sections.splice(req.body.index, 1);
        work.save().then(() => {
            res.status(200).json({status: 'Accepted', message: 'Kaydedildi!'});
        }).catch(err => res.status(500).json({status: 'Rejected', message: err}));
    }).catch(err => res.status(500).json({status: 'Rejected', message: err}));
})

workApi.post('/createSection', (req, res) => {
    Work.findOne({}).then(work => {
        console.log(work)
        work.sections.push(req.body);
        work.save().then(() => {
            res.status(200).json({status: 'Accepted', message: 'Kaydedildi!'});
        }).catch(err => res.status(500).json({status: 'Rejected', message: err}));
    }).catch(err => console.log(err));
})

module.exports = { workApi }; 