const { Announcement } = require("../Models/Announcement");
const express = require("express");
const announcemetApi = express.Router();

announcemetApi.get("/getAnnouns", (req, res) => {
    Announcement.find({}).then((response)=>{
        res.status(200).send({status: 'Accepted', data: response})
    }).catch(err => {console.log(err)});
})

announcemetApi.post("/createAnnoun", (req, res) => {
    if (!req.body['konu'] || !req.body['duyuru-metni']) return res.status(400).json({status: 'Rejected', message: 'body\'den gelen veriler eksik!!!'});

    let announ = new Announcement({
        konu: req.body['konu'],
        'duyuru-metni': req.body['duyuru-metni']
    })

    announ.save().then(() => {
        res.status(200).json({status: 'Accepted', message: req.body['konu'] + ' isimli duyuru eklendi!'})
    }).catch(err => {
        console.log(err)
        res.status(400).json({status: 'Rejected', message: 'Ders kaydedilirken bir sorun oluştu!'})
    });
})

announcemetApi.post('/deleteAnnoun', (req, res) => {
    const {id} = req.body;
    Announcement.findByIdAndDelete(id).then(() => {
        res.status(200).json({status: 'Accepted', message: 'Başarıyla Silindi!'})
    }).catch(err => {
        console.log(err);
        res.status(400).json({status: 'Rejected', message: 'Ders silinirken bir sorun oluştu!'})
    })
})
module.exports = { announcemetApi } 