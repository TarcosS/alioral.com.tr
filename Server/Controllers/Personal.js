
const { Person } = require("../Models/Personal");
const express = require("express");
const personApi = express.Router();

personApi.get('/getPersonInfo', (req, res) => {
    Person.findOne({}).then((response)=>{
        res.status(200).send(response)
    }).catch(err => {console.log(err)});
})

personApi.post('/setPersonDesc', (req, res) => {
    const { body } = req
    Person.updateOne({}, {description: body.desc || "NULL"}).then(()=>{
        res.status(200).send("OK")
    }).catch(err => {console.log(err)});
})

personApi.post('/createSection', (req, res) => {
    Person.findOne({}).then(person => {
        person.sections.push(req.body);
        person.save().then(() => {
            res.status(200).json({status: 'Accepted', message: 'Kaydedildi!'});
        }).catch(err => res.status(500).json({status: 'Rejected', message: err}));
    }).catch(err => res.status(500).json({status: 'Rejected', message: err}));
})

personApi.post('/deleteSection', (req, res) => {
    Person.findOne({}).then(person => {
        person.sections.splice(req.body.index, 1);
        person.save().then(() => {
            res.status(200).json({status: 'Accepted', message: 'Kaydedildi!'});
        }).catch(err => res.status(500).json({status: 'Rejected', message: err}));
    }).catch(err => res.status(500).json({status: 'Rejected', message: err}));
})

personApi.post('/addDataFromSection', (req, res) => {
    const { body } = req;
    
    Person.findOne({}).then((response) => {
        let sections = Array.from(response.sections);
        sections[body.sectionNo].block[body.blockNo].datas.push(JSON.parse(body.data));

        Person.updateOne({}, {sections: sections}).then(()=>{
            res.status(200).send("OK");
        }).catch(err => {console.log(err)});

    }).catch(err => {console.log(err)});
})

module.exports = { personApi }  
