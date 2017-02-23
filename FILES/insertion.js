
(function () {
	"use strict";
	
	var main = function () {
  
        $('button').click(function(e){
            e.preventDefault(); //This is to stop the page from reloading when clicking the ADD

            //clones a whole row
            var $copy = $('#artistContainer').clone(true);
            
            //copy variables from text fields
            var $artist = $('#inputArtist').val();
            var $genre = $('#inputGenre').val();
            var $songs = $('#inputSongs').val();
            var $album = $('#inputAlbums').val();

            //change variables to related elements in the cloned row
           
            //append to content
            $('#content').append($copy);  

        });
	};
	
	$(document).ready(function () {
		main();
	});
}());