require ("dotenv").config();

var keys = (./keys.js);

var client = new Twitter(keys.twitter);
var request = require('request');
var twitter = require('twitter');
var fs = require('fs');
var argument = process.argv;
var command = process.argv[2];
var x = "";

//switch statement to evaluate each case
switch(command){
    case "my-tweets":
    showMyTweets();
    break;

    case "movie-this":
    if (x) {
        omdbData(x)
      } else {
        omdbData("Mr. Nobody")
      }
    break;

    case "do-what-it-says":
    doSomething();
    break;

    default:
    console.log("{Enter a command: my-tweets, movie-this, do-what-it-says}");
  break;
}

//show latest tweets
function showMyTweets(){
    var handle = {screen-name: 'kellieisamazing'};
    client.get('statuses/user_timeline', screenName, function(error, tweets, response){
        if(!error){
          for(var i = 0; i<tweets.length; i++){
            var date = tweets[i].created_at;
            console.log("@kellieisamazing: " + tweets[i].text + " Created At: " + date.substring(0, 19));
            console.log("------");
          }
        }else{
          console.log('error');
        }
      });
    }

//show the omdb data
function omdbData(movie){
    var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&tomatoes=true';
    
    request(omdbURL, function (error, response, body){
        if(!error && response.statusCode == 200){
        var body = JSON.parse(body);
    
        console.log("Title: " + body.Title);
        console.log("Release Year: " + body.Year);
        console.log("IMdB Rating: " + body.imdbRating);
        console.log("Country: " + body.Country);
        console.log("Language: " + body.Language);
        console.log("Plot: " + body.Plot);
        console.log("Actors: " + body.Actors);
        console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
        console.log("Rotten Tomatoes URL: " + body.tomatoURL);
        } else
        {
        console.log('error');
        }
        if(movie === "Mr. Nobody"){
        console.log("-----");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
        }
    });

}

function doSomething(){
    fs.readFile('random.txt', "utf8", function(error, data){
        var txt = data.split(',');
    });
}
          

