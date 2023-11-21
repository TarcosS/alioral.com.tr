const { Lesson } = require("../Models/Lesson");
const express = require("express");
const lessonApi = express.Router();

lessonApi.get("/getLessons", (req, res) => {
    Lesson.find({}).then((response)=>{
        res.status(200).send({status: 'Accepted', data: response})
    }).catch(err => {console.log(err)});
})

lessonApi.post("/createLesson", (req, res) => {
    if (!req.body['ders-adi'] || !req.body['aciklama'] || !req.body['icon-dosya-adi'] || !req.body['links']) return res.status(400).json({status: 'Rejected', message: 'body\'den gelen veriler eksik!!!'});

    let lesson = new Lesson({
        title: req.body['ders-adi'],
        description: req.body['aciklama'],
        iconPath: req.body['icon-dosya-adi'],
        links: req.body['links']
    })

    lesson.save().then(() => {
        res.status(200).json({status: 'Accepted', message: req.body['ders-adi'] + ' isimli ders eklendi!'})
    }).catch(err => {
        console.log(err)
        res.status(400).json({status: 'Rejected', message: 'Ders kaydedilirken bir sorun oluştu!'})
    });
})

lessonApi.post('/deleteLesson', (req, res) => {
    const {id} = req.body;
    Lesson.findByIdAndDelete(id).then(() => {
        res.status(200).json({status: 'Accepted', message: 'Başarıyla Silindi!'})
    }).catch(err => {
        console.log(err);
        res.status(400).json({status: 'Rejected', message: 'Ders silinirken bir sorun oluştu!'})
    })
})
module.exports = { lessonApi } 