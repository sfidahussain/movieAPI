var express = require("express");
var app = express();

var request = require("request");

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("search");
});

app.get("/results", function(req, res){
    var search = req.query.name;
    // API call will be in here. 
    request("http://www.omdbapi.com/?s=" + search + "&apikey=thewdb&", function(error, response, body){
        if(!error & response.statusCode == 200){
            var parsedData = JSON.parse(body);
            res.render("results", {parsedData: parsedData});
        }
        else{
            console.log(error);
        }
    });
    // res.send("Hi");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");
});