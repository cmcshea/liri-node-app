require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var moment = require8

var spotify = new Spotify(keys.spotify);

var command = process.argv[2]
var searchTerm = process.argv.splice(3).join(" ")

// console.log(searchTerm)

if (command === "spotify-this-song") {
    spotifySong(searchTerm);
} else if (command === "concert-this") {
    concertThis(searchTerm);
 } else if (command === "movie-this") {
    console.log(searchTerm)
 } else {
    console.log("Invalid command");
 }

var concert = function(){

    var divider = 
    "\n_______________________________\n\n";

    this.concertThis = function (artist) {

        var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

        axios.get(URL).then(function(response) {

            var jsonData = response.data;

            var concertData = [
                "Name: " + JS[i].venue.name,
            ]
            
        })
        // console.log(concertData)
    }

}

function spotifySong(song){
    var songData;
    if (song === undefined) {
        songData = "I Want it That Way";
    } else {
        songData = song;
    }

    spotify.search({ type: 'track', query: song }, 
    
    function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            var songResults = [
                "Artist: " + data.tracks.items[0].artists[0].name,
                "Song: " + data.tracks.items[0].name,
                "Preview: " + data.tracks.items[3].preview_url.split("=")[0],
                "Album: " + data.tracks.items[0].album.name,

            ]
            console.log(songResults)
        }
    
        // console.log(data.tracks.items[0].artists[0].name);
    });
}
