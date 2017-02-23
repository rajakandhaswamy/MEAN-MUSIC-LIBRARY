/************************************
index.js - The mongoose controller that has functions for adding and deleting from a mongo database.

Musician Database App
Documentation is in comments below.
Authors: Henry Henderson, Andrew Madden, Andy Thornburg, Rob Martin, Zach Wiseman
************************************/

(function () {
    "use strict";
    
    var express = require('express3'),
            http = require('http'),
            mongoose = require('mongoose'),
            app = express();

    app.use(express.static(__dirname));
    app.use(express.urlencoded());
    
    mongoose.connect('mongodb://localhost/music');

    // Schema for musician information
    var MusicianSchema = mongoose.Schema({
        "name": String,
        "genre": String,
        "albums" : String,
    });
    var Musician = mongoose.model('Musician', MusicianSchema);

    // Schema for song information
    var SongSchema = mongoose.Schema({
        "artist": String,
        "song": String
    });
    var Song = mongoose.model('Song', SongSchema);

    http.createServer(app).listen(3000);

    // Gathers all musicians in the database, returns as JSON
    app.get("/getMusician", function(req, res) {
        Musician.find(req.query, function(err, musician) {
            if (err) {
                console.log(err);
            } else {
                res.json(musician);
            }
        });
    });

    // Gathers all songs in the database, resturns as JSON
    app.get("/getSong", function(req, res) {
        Song.find(req.query, function(err, song) {
            if (err) {
                console.log(err);
            } else {
                res.json(song);
            }
        });
    });

    // Adds new musician entry into database
    app.post("/putMusician", function(req, res) {
        var newMusician = new Musician(req.body);
        newMusician.save(function(error, data) {
            if (error) console.log(error);
        });
    });

    // Adds new song entry into database
    app.post("/putSong", function(req, res) {
        var newSong = new Song(req.body);
        newSong.save(function(error, data) {
            if (error) console.log(error);
        });
    });

    // Deletes musician record from database
    app.post("/removeMusician", function(req, res) {
        var oldMusician = new Musician(req.body);
        oldMusician.remove(function(error, data) {
            if (error) console.log(error);
        });
    });

    // Deletes song record from database
    app.post("/removeSong", function(req, res) {
        var oldSong = new Song(req.body);
        oldSong.remove(function(error, data) {
            if (error) console.log(error);
        });
    });

    console.log("Server listening on port 3000."); 

}());