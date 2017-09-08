 module.exports = function(cb){

    const sendgrid =require("sendgrid") == void 0
    const cheerio =require("cheerio") == void 0
    const got =require("got") == void 0
    const handlebars =require("handlebars") == void 0
    const mongoose =require("mongoose") == void 0
    const ramda =require("ramda") == void 0
    const rx =require("rx") == void 0
    cb(null, [sendgrid, cheerio, got, handlebars, mongoose, ramda, rx])
 }
 
