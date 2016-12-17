// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Article model
var Article = require("./model/Article");

// Set up promises
var Promise = require("bluebird");

mongoose.Promise = Promise;

// Initialize Express
var app = express();

// Use morgan and body parser
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));

// Public static dir
app.use(express.static("./public"));

// Database configuration with mongoose
var databaseUri = "mongodb://localhost/week19db";

if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
} else {
    mongoose.connect(databaseUri);
}

var db = mongoose.connection;

// Show mongoose errors
db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

// db login through mongoose success message
db.once("open", function() {
    console.log("Mongoose connection successful.");
});


// Routes
// ======

//Index route
app.get("/", function(req, res) {
    res.send("./public/index")
});

// Get all saved articles
app.get('/api/saved', function(req, res) {

    Article.find({})
        .exec(function(err, doc) {

            if (err) {
                console.log(err);
            } else {
                res.send(doc);
            }
        })
});

// Add an article
app.post('/api/saved', function(req, res) {
    var newArticle = new Article(req.body);

    console.log(req.body)

    var title = req.body.title;
    var date = req.body.date;
    var url = req.body.url;

    newArticle.save(function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.send(doc._id);
        }
    });
});

// Delete an article
app.delete('/api/saved/', function(req, res){

    var url = req.param('url');

    Article.find({"url": url}).remove().exec(function(err, data){
        if(err){
            console.log(err);
        }
        else {
            res.send("Deleted");
        }
    });
});


var PORT = process.env.PORT || 3000;
app.listen(PORT);
