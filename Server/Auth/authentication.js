const express = require("express");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require("../Models/User");
const authApi = express.Router();


authApi.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) res.status(500).json({status: 'Rejected', message: 'Body\'den eksik veri geliyor!'});
    User.findOne({
        email: email,
        password: password
    }).then((user) => {
        if(user) {
            var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
            return res.status(200).json({status: 'Accepted', token: token})
        } else {
            return res.status(500).json({status: 'Rejected', message: 'E-Posta veya Şifre yanlış!'})
        }
        
    }).catch((err) => console.log(err))//res.status(500).json({status: 'Rejected', message: JSON.stringify(err)}))
})

module.exports = {authApi}