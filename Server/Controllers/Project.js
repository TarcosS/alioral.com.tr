const { Project } = require("../Models/Project");
const express = require("express");
const projectApi = express.Router();
const multer  = require('multer');
const { unlink } = require('node:fs/promises');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../Client/public/assets/images/')      //you tell where to upload the files,
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.png')
    }
})

var upload = multer({storage: storage,
    onFileUploadStart: function (file) {
        console.log(file)
        console.log(file.originalname + ' is starting ...')
    },
});

projectApi.get('/getProjects', (req, res) => {
    Project.find({}).then((response)=>{
        res.status(200).json({status: 'Accepted', data: (response || [])})
    }).catch(err => console.log(err));
})

projectApi.post('/createProject', upload.single('fotograf-ekle[]'), (req, res) => {
    console.log(req.body['proje-adi'], req.file)
    const newProject = new Project({
        title: req.body['proje-adi'],
        path: req.file.filename
    })
    newProject.save().then(() => {
        res.status(200).json({status: 'Accepted', message: 'Kaydedildi!'});
    }).catch(err => res.status(500).json({status: 'Rejected', message: err}));
})

projectApi.post('/deleteProject', (req, res) => {
    Project.findById(req.body.id).then((project)=>{
        if(!project) res.status(500).json({status: 'Rejected', message: 'Proje Bulunamadi!'});
        unlink('../Client/public/assets/images/' + project.path).then(() => {
            project.deleteOne().then(()=>{
                return res.status(200).json({status: 'Accepted', message: 'Silindi!'});
            }).catch(err => res.status(500).json({status: 'Rejected', message: JSON.stringify(err)}))
        }).catch(err => res.status(500).json({status: 'Rejected', message: JSON.stringify(err)}))
    })
})

module.exports = { projectApi }; 