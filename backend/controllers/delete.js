const express = require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const _ = require("lodash")

const nodemailer = require('nodemailer');
var api_key = 'b1df829f898334ff43ff5d5812a9e15a-ffefc4e4-b1b88ab7'
const mailgun = require("mailgun-js")
const DOMAIN = 'sandbox5dca1e6a485b4b6f9a8282de540bd818.mailgun.org'
const mg = mailgun({apiKey: api_key, domain: DOMAIN})
const { result } = require("lodash")
const User = require("../models/User")
const ShortUrl = require('../models/shortUrl')
users.use(cors())
const mongoose = require('mongoose')
process.env.SECRET_KEY = 'secret'
process.env.CLIENT_URL = 'https://shorten-url-1.herokuapp.com'



exports.delete_profile = (req, res) => {

    if(req.headers['authorization']){
        var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
        jwt.verify(req.headers['authorization'],process.env.SECRET_KEY,function(error,decodedData)
        {
          if(error){
            return res.status(401).json({
              error : "Token expired"
            })
          }
          
          User.findOne({
            _id: decoded._id
          })
            .then(user => {
              if (user) {
                  const email = user.email
                User.findByIdAndRemove(user._id)
                .then(user => {
                  res.json({status: email + ' has been successfully deleted'})
              })
              .catch(err => {
                  res.send('error: ' + err)
              })
              } else {
                res.send('User does not exist')
              }
            })
            .catch(err => {
              res.send('error: ' + err)
            })
          })
  
      }
      else{
          return res.status(401).json({error : "Authentication Error"})
      }
    
  }