/************************************
music.js - Angular file. Controls elements on the DOM and tells index.js (mongoose) to perform queries and executes on the database.

Musician Database App
Documentation is in comments below.
Authors: Henry Henderson, Andrew Madden, Andy Thornburg, Rob Martin, Zach Wiseman
************************************/

(function() {
    var app = angular.module('music', []);

    app.controller('MusicianController', ['$scope', function($scope) {
        // Text boxes to enter new artists and songs. Default set to blank
        $scope.name = '';
        $scope.genre = '';
        $scope.albums = '';
        $scope.song = '';
        
        
        $scope.order = 'name'; // sort table by artist's names by default
        $scope.shown = false;  // whether or not table data is shown yet
        
        $scope.addingSongFlag = false; // global variable to access outside of a loop to hide artist-add text boxes and display song-adding one.
        $scope.rememberName = ''; // global variable to remember who we're adding a song to
        
        $scope.rememberArtist; // global variable to remember an object outside of a loop

        $.getJSON('getMusician', function(result) {
            $scope.musicians = result;
        });
        
        $.getJSON('getSong', function(result) {
            $scope.songs = result;
        });
        
        // Function to control global variable to display all table data
        $scope.shownClicked = function() {
            $scope.shown = true;
        };
        
        // Add new artist, store in "musician" collection
        $scope.add = function() {
            var newMusician = {
                "name" : $scope.name,
                "genre" : $scope.genre,
                "albums" : $scope.albums,
            };
            $scope.musicians.push(newMusician);
            $.post('putMusician', newMusician);
          $scope.name = $scope.genre = $scope.albums = '';
        };

        // Remove artist from collection
        $scope.remove = function(musician) {
            $scope.musicians.splice($scope.musicians.indexOf(musician), 1);
            $.post('removeMusician', musician);
        };

        // Edit artist, passes values to populate text boxes for modifying
        $scope.edit = function(musician) {
            $scope.name = musician.name;
            $scope.genre = musician.genre;
            $scope.albums = musician.albums;
            $scope.editing = true; // make "Add" button hide and spawn "Update" button
            rememberArtist = musician;
        };
        
        // Save updates from edit to database and DOM.
        $scope.update = function(musician) {
            $scope.remove(rememberArtist);
            $scope.add();
            $scope.editing = false; // this tells the "Update" button to disappear, and the "Add" button to reappear -- we're done editing now
        };

        // Adding a song, prepares DOM for new song by hiding other elements and requesting a new song name.
        $scope.addingSong = function(musician) {
            $scope.rememberName = musician.name; // we pass name outside of loop so we must remember
            $scope.addingSongFlag = true;
        };

        // Add song, takes user input and stores into "songs" collection in the database
        $scope.addSong = function() {
            var newSong = {
                "artist" : $scope.rememberName,
                "song" : $scope.song
            };
            $scope.songs.push(newSong);
            $.post('putSong', newSong);
            $scope.song = '';
            $scope.addingSongFlag = false;
        };

        // Delete song from DOM and database
        $scope.removeSong = function(song) {
            $scope.songs.splice($scope.songs.indexOf(song), 1);
            $.post('removeSong', song);
        };
    }]);
}());
