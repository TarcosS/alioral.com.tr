const { SpecialLinks } = require("../Models/SpecialLinks");
const express = require("express");
const specialLinksApi = express.Router();

specialLinksApi.get("/getCards", (req, res) => {
    SpecialLinks.find({}).then((response)=>{
        res.status(200).send({status: 'Accepted', data: response})
    }).catch(err => {console.log(err)});
})

specialLinksApi.post("/createCard", (req, res) => {
    if (!req.body['kart-basligi'] || !req.body['links']) return res.status(400).json({status: 'Rejected', message: 'Body\'den gelen veriler eksik!!!'});

    let specialLink = new SpecialLinks({
        title: req.body['kart-basligi'],
        links: req.body['links']
    })

    specialLink.save().then(() => {
        res.status(200).json({status: 'Accepted', message: req.body['kart-basligi'] + ' isimli ders eklendi!'})
    }).catch(err => {
        console.log(err)
        res.status(400).json({status: 'Rejected', message: 'Ders kaydedilirken bir sorun oluştu!'})
    });
})

specialLinksApi.post('/deleteCard', (req, res) => {
    const {id} = req.body;
    SpecialLinks.findByIdAndDelete(id).then(() => {
        res.status(200).json({status: 'Accepted', message: 'Başarıyla Silindi!'})
    }).catch(err => {
        console.log(err);
        res.status(400).json({status: 'Rejected', message: 'Ders silinirken bir sorun oluştu!'})
    })
})
module.exports = { specialLinksApi } 