const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const apiKey = 'c215cca16ac090ccf15e4e79e236a152';
var path = require('path');


//setting up views
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.set('view engine', 'ejs');

//setting router
var loginRouter = require('./routes/login');
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', loginRouter);
app.get('/weather', function (req, res) {
    res.render('index', {weather: null, error: null});
});

app.get('/', function (request, response) {
    response.render('login');

})


app.post('/weather', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`
    request(url, function (err, response, body) {
        if(err){
            res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
            let weather = JSON.parse(body)
            if(weather.main == undefined){
                res.render('index', {weather: null, error: 'Error, please try again'});
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null});
            }
        }
    });
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});





/*
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = 'c215cca16ac090ccf15e4e79e236a152';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render('index', {weather: null, errors: null});
})

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    request(url, function (err, response, body) {
        if(err){
            res.render('index', {weather: null, errors: 'Error, please try again'});
        } else {
            let weather = JSON.parse(body)
            if(weather.main == undefined){
                res.render('index', {weather: null, errors: 'Error, please try again'});
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', {weather: weatherText, errors: null});
            }
        }
    });
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

*/