//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  const  data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

const jsonData = JSON.stringify(data);

const url = "https://us8.api.mailchimp.com/3.0/lists/1908d93b7c";

const options = {
  method: "POST",
  auth: "dhanush1:ab9fc24c6b86de594e049287839aa426-us8"
}


const request = https.request(url, options, function(response){


    res.sendFile(__dirname + "/success.html");
  } else{
    res.sendFile(__dirname + "/failure.html");
  }
   response.on("data", function(data){
     console.log(JSON.parse(data));
   });
 });

//  request.write(jsonData);
  request.end();
//  console.log(firstName, lastName, email);
})
app.post("/failure", function(req, res){
  res.redirect("/");
});


app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on Port 3000");
});

// api key
//	ab9fc24c6b86de594e049287839aa426-us8

// List id
// 1908d93b7c
