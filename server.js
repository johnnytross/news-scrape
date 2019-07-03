const cheerio = require("cheerio");
const axios = require("axios");
const express = require("express");
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');

var PORT = 3000;

// Initialize Express
var app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://192.168.99.100/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Require all models
var db = require("./models");



axios.get("https://www.theverge.com/").then((response) => {
    let $ = cheerio.load(response.data);
    let results = [];

    $("h2").each(function(i, element) {

        var title = $(element).children().text();
        var link = $(element).find("a").attr("href");
    
        // Save these results in an object that we'll push into the results array we defined earlier
        results.push({
          title: title,
          link: link
        });
      });
      console.log(results);
})
