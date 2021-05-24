let express = require("express");
let path = require("path");
let bodyParser = require("body-parser");
const axios = require("axios");
const session = require('express-session');

let app = express();
//session
app.use(session({
    secret: 'user',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));
//body parse
app.use(bodyParser.urlencoded({extended: true}));
//static
app.use(express.static(__dirname + "/static"));
//css
app.use(express.static(__dirname + "/css"));
//js
app.use(express.static(__dirname + "/js"));
//images
app.use(express.static(__dirname + "/images"));
//ejs
app.set('view engine', 'ejs');

let peopleurl = "https://swapi.dev/api/people/";
let planetsurl = "https://swapi.dev/api/planets/";
//routes
app.get("/", function(request, response) {
    response.render("index");
});
//people
app.get('/people', function(request, response){
    // use the axios .get() method - provide a url and chain the .then() and .catch() methods
    axios.get(peopleurl)
    .then(data => {
        // log the data before moving on! 
        console.log(data.data);
        //session
        request.session.next = data.data.next;
        request.session.previous = data.data.previous;
        console.log(request.session);
        // rather than rendering, just send back the json data!
        response.json(data.data);
    })
    .catch(error => {
        // log the error before moving on!
        console.log(error);
        response.json(error);
    });
});
//planets
app.get('/planets', function(request, response){
    // use the axios .get() method - provide a url and chain the .then() and .catch() methods
    axios.get(planetsurl)
    .then(data => {
        // log the data before moving on! 
        console.log(data.data);
        //session
        request.session.next = data.data.next;
        request.session.previous = data.data.previous;
        console.log(request.session);
        // rather than rendering, just send back the json data!
        response.json(data.data);
    })
    .catch(error => {
        // log the error before moving on!
        console.log(error);
        response.json(error);
    });
});
//next
app.get('/next', (request, response) => {
    axios.get(request.session.next)
    .then(data => {
        // log the data before moving on! 
        console.log(data.data);
        //session
        request.session.next = data.data.next;
        request.session.previous = data.data.previous;
        console.log(request.session);
        // rather than rendering, just send back the json data!
        response.json(data.data);
    })
    .catch(error => {
        // log the error before moving on!
        console.log(error);
        response.json(error);
    });
});
//prev
app.get('/prev', (request, response) => {
    axios.get(request.session.previous)
    .then(data => {
        // log the data before moving on! 
        console.log(data.data);
        //session
        request.session.next = data.data.next;
        request.session.previous = data.data.previous;
        console.log(request.session);
        // rather than rendering, just send back the json data!
        response.json(data.data);
    })
    .catch(error => {
        // log the error before moving on!
        console.log(error);
        response.json(error);
    });
});

//port
app.listen(8000, function() {
    console.log("Listening to 8000");
});