require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");

var spotify = new Spotify(keys.spotify);

var command = process.argv[2]
var searchTerm = process.argv.splice(3).join(" ") || null

// console.log(searchTerm)



const concertThis = function (artist) {
    var divider = "\n_______________________________\n\n";

    var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(URL).then(function (response) {
        // console.log(response.data)
        var concertData = {
            event: response.data[0].venue.name,
            location: response.data[0].venue.city,
            date: moment(response.data[0].datetime).format("MM/DD/YYYY"),
        }

        console.log(divider, concertData, divider)
    })
}

// function NullCheck(value){
//     if(value === null){
//         return null
//     } else {
//         return value.split("=")[0]
//     }
// }

const NullCheck = value => value ? value.split("=")[0] : null

const spotifySong = function (song) {
    var songData;
    if (song === null) {
        songData = "Ace of Base";
    } else {
        songData = song;
    }

    spotify.search({ type: 'track', query: songData },

        function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            } else {
                var songResults = {
                    Artist: data.tracks.items[0].artists[0].name,
                    Song: data.tracks.items[0].name,
                    Preview: NullCheck(data.tracks.items[3].preview_url),
                    Album: data.tracks.items[0].album.name
                }

                console.log(songResults)
            }
        });
}

const DoWhatItSays = function () {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            throw err
        }
        ChooseFunction(data.split(",")[0], data.split(",")[1])
    });
}

const ChooseFunction = function (command, searchTerm) {
    console.log(command, searchTerm)
    if (command === "spotify-this-song") {
        spotifySong(searchTerm);
    } else if (command === "concert-this") {
        concertThis(searchTerm);
    } else if (command === "movie-this") {
        console.log(searchTerm)
    }
    else if (command = "do-what-it-says") {
        DoWhatItSays(searchTerm)
    }
    else {
        console.log("Invalid command");
    }
}
ChooseFunction(command, searchTerm)