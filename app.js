var express = require("express");
var request = require("request");
var app = express(); 

app.set("view engine", "ejs"); 
app.use(express.static("public"));
 
 
 
app.get("/", function(req, res){
    res.render("search");
});


app.get("/results", function(req, res){
    var query = req.query.search;
    var url = "https://swapi.co/api/starships/?search=" + query;
    request(url, function(error, response, body){
        var data = JSON.parse(body)
        if(!data["Error"] && response.statusCode == 200) {
        //   console.log(data["results"][0]["manufacturer"])
          res.render("results",{data: data});
        }  else {
            res.redirect("back")
            
        }
        
    });
}) ;
 
 
 
 
 
app.listen(process.env.PORT,process.env.IP, function(){
console.log("Server started!");    
});