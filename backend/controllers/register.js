const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const nodemailer = require('nodemailer')
var api_key = 'b1df829f898334ff43ff5d5812a9e15a-ffefc4e4-b1b88ab7'
const mailgun = require('mailgun-js')
const DOMAIN = 'sandbox5dca1e6a485b4b6f9a8282de540bd818.mailgun.org'
const mg = mailgun({ apiKey: api_key, domain: DOMAIN })
const { result } = require('lodash')
const User = require('../models/User')
const ShortUrl = require('../models/shortUrl')
users.use(cors())
const mongoose = require('mongoose')
process.env.SECRET_KEY = 'secret'
process.env.CLIENT_URL = 'https://shorten-url-1.herokuapp.com'


exports.register = (req, res, next) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;
   
  
    
    User.findOne({ email: email })
      .then((userDoc) => {
        if (userDoc) {        
          res.json({ message: "E-mail already in use!!", error: false });
        }
        return bcrypt
          .hash(password, 12)
          .then((hashedPassword) => {
            const user = new User({
              first_name: first_name,
              last_name:last_name,
              email: email,
              password: hashedPassword,
             
            });
            return user.save();
          })
          .then((result) => {
            res.json({ message: "Signup successfull", error: false, result });
          })
          .catch((err2) => {
            res.json({ message: err2, error: true });
          });
      })
      .catch((err) => {
        res.json({ message: err, error: true });
      });
  };
  
