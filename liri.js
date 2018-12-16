require("dotenv").config();

// Global variables
var keys = require("./key");  
var moment = require("moment");
var request = require("request") 
var Spotify = require("node-spotify-api"); 
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var output = "";
var action = process.argv[2];
var term = process.argv.slice(3).join(" ");


chosenAction(action);

function chosenAction(action){
    
    switch (action) {
      case "concert-this":
          concertThis();
          break;
      case "spotify-this-song":
          spotifyThisSong();
          break;
      case "movie-this":
          movieThis();
          break;
      case "do-what-it-says":
          doWhatItSays();
          break;    
      default:
        console.log(`
      =======================================================================================
      |             HI IM LIRI, How can I help you today? Here is what I can do:             |
      =======================================================================================
        Command                  Action                             npm run _____
      -----------------------------------------------------------------------------
        spotify-this-song    ->  Add a song name after this     ->  song _______
                                 command and get its info
         movie-this          ->  Add a movie name after this    -> movie _______
                                 command and get its info
         concert-this        ->  Add a concert name after this -> concert_______
                                 command and get its info
      `);
          break;
    }
  } 


//=======concert-This=======\\
function concertThis() {

        var startDate = moment().format("YYYY-MM-DD");
        var endDate = moment().add(60, 'days').format("YYYY-MM-DD");
        var show = term;
    
     

    request("https://rest.bandsintown.com/artists/"+ show + "/events?app_id=codingbootcamp&date=" + startDate + "%2C" + endDate,
    function (error, response, body) {
        
        
          
        var noShow = "\n---------------------------------"+ 
                     "\nNo Show for " + term.toUpperCase() + " in Next 60 Days :(" +
                     "\n---------------------------------" + "\n";
        var bandInfo = JSON.parse(body);


            for (var i = 0; i < bandInfo.length; i++) { 
                // for concerts in the U.S.
                 if (bandInfo[i].venue.region) {
                    var city = bandInfo[i].venue.city;
                    var location = bandInfo[i].venue.region;
                // for concerts outside the U.S.
                } else {
                        city = bandInfo[i].venue.city;
                        location = bandInfo[i].venue.country;
                } 
                

                output = 
                "\n _______ _______ __    _ ______  " + 
                "\n|  _    |   _   |  |  | |      | " +
                "\n| |_|   |  |_|  |   |_| |  _    |" +
                "\n|       |       |       | | |   |" +
                "\n|  _   ||       |  _    | |_|   |" +
                "\n| |_|   |   _   | | |   |       |" +
                "\n|_______|__| |__|_|  |__|______| " +
                "\n---------------------------------"+ 
                "\nArtist: " + term + 
                "\nVenue: " + bandInfo[i].venue.name +
                "\nLocation:" + city + "," + location +
                "\nConcert Date: " + moment(bandInfo[i].datetime).format("MM/DD/YYYY") +
                "\n---------------------------------";
                
                console.log(output);
                fs.appendFile('log.txt', output, function(error){
                    if (error) console.log(error);
                    console.log("IT HAS BEEN WRITTEN!");
                });
            }

        if(bandInfo == "") {
            console.log(noShow);
        }
            
        })
            
}
//=======movie-This=======\\
function movieThis() {

    var movieName = term;

    if (movieName === "") {
        movieName = "Mr. Nobody"
    }

    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy",
        function (error, response, body) {

            var oP = JSON.parse(body);

            output =
                "\n _______ __   __ ______  _______  " + 
                "\n|       |  |_|  |      ||  _    |" + 
                "\n|   _   |       |  _    | |_|   |" + 
                "\n|  | |  |       | | |   |       |" + 
                "\n|  |_|  |       | |_|   |  _   | " +
                "\n|       | ||_|| |       | |_|   |" + 
                "\n|_______|_|   |_|______||_______|" +
                "\n---------------------------------"+
                "\nTitle: " + oP.Title +
                "\nRelease Year: " + oP.Year +
                "\nIMDB Rating: " + oP.imdbRating +
                "\nRotten Tomatoes Rating: " + oP.tomatoRating +
                "\nCountry of Production: " + oP.Country +
                "\nLanguage: " + oP.Language +
                "\nPlot: " + oP.Plot +
                "\nActors: " + oP.Actors +
                "\n--------------------------------" 
            
            
            console.log(output);
            fs.appendFile('log.txt', output, function(error){
                if (error) console.log(error);
                console.log("IT HAS BEEN WRITTEN!");
            });
    })
       
}

//=======spotify-This-Song=======\\
function spotifyThisSong() {
    
    var songName = term;

    if (songName === "") {
        songName = "The Sign Ace of Base";
    }

    spotify.search({ type: 'track', query: songName, limit: 1 }, function(err, response) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
            output =
                "\n _______ _______ _______ _______ ___ _______ __   __ " +
                "\n|       |       |       |       |   |       |  | |  |" +
                "\n|  _____|    _  |   _   |_     _|   |    ___|  |_|  |" +
                "\n| |_____|   |_| |  | |  | |   | |   |   |___|       |" +
                "\n|_____  |    ___|  |_|  | |   | |   |    ___|_     _|" +
                "\n _____| |   |   |       | |   | |   |   |     |   |  " + 
                "\n|_______|___|   |_______| |___| |___|___|     |___|  " +
                "\n-----------------------------------------------------"+ 
                "\nSong Title: " + response.tracks.items[0].name + 
                "\nAlbum: " + response.tracks.items[0].album.name + 
                "\nArtist/s: " + response.tracks.items[0].artists[0].name +
                "\nPreview URL: " + response.tracks.items[0].external_urls.spotify +
                "\n-----------------------------------------------------";
            
            
            console.log(output);
            fs.appendFile('log.txt', output, function(error){
                if (error) console.log(error);
                console.log("IT HAS BEEN WRITTEN!");
            });
        })
    }

function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            console.log("error: "+ error);
        };

    var actionData = JSON.parse(data);
        action = actionData.action[0];
        term = actionData.term[0];
        chosenAction(action);
    });
};


      



 




        

 





