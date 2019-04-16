const arg = process.argv;
require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require('moment');

//============SPOTIFY-THIS===========================

if (arg[2] === "spotify-this-song") {

      spotify.search({
        type:"track",
        query: arg[3],
      })
        .then(function (response) {
          console.log("success");
          // If the axios was successful...
          // Then log the body from the site!
          console.log(response.tracks.items[1].name);
          console.log(response.tracks.items[0].album.artists[0].name);
          console.log(response.tracks.items[1].preview_url);
          console.log(response.tracks.items[1].album.name);
        })
        .catch(function (error) {
          if (error.response) {
            //logging errors
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        })
    }

//==============CONCERT-THIS========================================

if (arg[2] === "concert-this") {

  axios
    .get("https://rest.bandsintown.com/artists/" + arg[3] + "/events?app_id=codingbootcamp")
    .then(function (response) {
      console.log(response.data[0].venue.name);
      console.log(response.data[0].venue.city + ", " + response.data[0].venue.country);
      console.log(moment(response.data[0].datetime).format("MM/DD/YYYY"));

    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}

//=============MOVIE-THIS==========================================
if (arg[2] === "movie-this") {
  // Run the axios.get function...
  // The axios.get function takes in a URL and returns a promise (just like $.ajax)
  axios

    .get("http://www.omdbapi.com/?t=" + arg[3] + "&y=&plot=short&apikey=2eafb601")
    .then(function (response) {

      // Then log the body from the OMDB
      console.log("Title: " + (response.data.Title));
      console.log("Release Date: " + (response.data.Released));
      console.log("IMDB Rating: " + (response.data.imdbRating));
      console.log("Rotten Tomatoes: " + (response.data.Ratings[1].Value));
      console.log("Country: " + (response.data.Country));
      console.log("Language: " + (response.data.Language));
      console.log("Plot: " + (response.data.Plot));
      console.log("Actors: " + (response.data.Actors));
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      if (arg[3] === undefined){
        axios

        .get("http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&apikey=2eafb601")
        .then(function (response) {
    
          // Then log the body from the OMDB
          console.log("Title: " + (response.data.Title));
          console.log("Release Date: " + (response.data.Released));
          console.log("IMDB Rating: " + (response.data.imdbRating));
          console.log("Rotten Tomatoes: " + (response.data.Ratings[1].Value));
          console.log("Country: " + (response.data.Country));
          console.log("Language: " + (response.data.Language));
          console.log("Plot: " + (response.data.Plot));
          console.log("Actors: " + (response.data.Actors));
        })
      }
      console.log(error.config);
    
    });
}
//==========DO WHAT IT SAYS=======================================

if (arg[2] === "do-what-it-says") {
  var string = "";
  var dataArr = "";
  var artist = "";
  
  //choosing a random number to determine which event will run
  var rando = (Math.floor(Math.random()*3));

  console.log(rando);

  //depending on what random number is chosen
 if (rando === 0){

  fs.readFile("random.txt", "utf8", function (error, data) {
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    dataArr = data.split(",");
    string = dataArr[5];
    randomText = string.replace(/['"]+/g,'');
    // Then split it by commas (to make it more readable)
    // We will then re-display the content as an array for later use.
    console.log(randomText);
    bands();
  });
  // Run the axios.get function...
  // The axios.get function takes in a URL and returns a promise (just like $.ajax)
  function bands(){
    axios
    .get("https://rest.bandsintown.com/artists/" + randomText + "/events?app_id=codingbootcamp")
    .then(function (response) {
      // If the axios was successful...
      // Then log the body from the site!
      console.log(response.data[0].venue.name);
      console.log(response.data[0].venue.city + ", " + response.data[0].venue.country);
      console.log(moment(response.data[0].datetime).format("MM/DD/YYYY"));
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}
};
if (rando === 1){

  fs.readFile("random.txt", "utf8", function (error, data) {
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    dataArr = data.split(",");
    string = dataArr[3];
    randomText = string.replace(/['"]+/g,'');
    // Then split it by commas (to make it more readable)
    // We will then re-display the content as an array for later use.
    console.log(artist);
    movies();
  });
  // Run the axios.get function...
  // The axios.get function takes in a URL and returns a promise (just like $.ajax)
  function movies(){

    axios

    .get("http://www.omdbapi.com/?t=" + randomText + "&y=&plot=short&apikey=2eafb601")
    .then(function (response) {

      // Then log the body from the OMDB
      console.log("Title: " + (response.data.Title));
      console.log("Release Date: " + (response.data.Released));
      console.log("IMDB Rating: " + (response.data.imdbRating));
      console.log("Rotten Tomatoes: " + (response.data.Ratings[1].Value));
      console.log("Country: " + (response.data.Country));
      console.log("Language: " + (response.data.Language));
      console.log("Plot: " + (response.data.Plot));
      console.log("Actors: " + (response.data.Actors));
    })
}
};
if (rando === 2){

  fs.readFile("random.txt", "utf8", function (error, data) {
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    dataArr = data.split(",");
    string = dataArr[1];
    //removing quotes from string
    randomText = string.replace(/['"]+/g,'');
    console.log(randomText);
    songs();
  });
  // Run the axios.get function...
  // The axios.get function takes in a URL and returns a promise (just like $.ajax)
  function songs(){
    spotify.search({
      type:"track",
      query: randomText,
    })
      .then(function (response) {

        console.log(response.tracks.items[1].name);
        console.log(response.tracks.items[0].album.artists[0].name);
        console.log(response.tracks.items[1].preview_url);
        console.log(response.tracks.items[1].album.name);
      })
      .catch(function (error) {
        if (error.response) {
          //logging errors
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      })
  }
}
};
