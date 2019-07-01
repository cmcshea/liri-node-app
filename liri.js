require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
// var axios = require("axios");
// var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var command = process.argv[2]
var searchTerm = process.argv.splice(3).join(" ")

console.log(searchTerm)

if (command === "spotify-this-song") {
    SpotifySong(searchTerm);
} else if (command === "concert-this") {
    concertThis(searchTerm);
 } else if (command === "movie-this") {
    console.log(searchTerm)
 } else 
    console.log("Invalid command")

function SpotifySong(song){
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
    
        console.log(data.tracks.items[0].album.artists[0].name);
    });
}
