const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {

    res.sendFile(__dirname + "/index.html");
})

app.post('/', function (req, res) {
    const query = req.body.cityName;
    const apiKey = "d47525187eaa7c93ec357fdc916483fd";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey;

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const cel = temp - 271.15;
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.setHeader('Content-Type', 'text/html');
            console.log(temp, weatherDescription);
            res.write('<!DOCTYPE html>');
            res.write('<html lang="en">');
            res.write('<head>');
            res.write('<meta charset="UTF-8">');
            res.write('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
            res.write('<style>')
            res.write('p { display: block; width: fit-content; height: 40px; margin-right: auto; margin-left: auto; padding: 8px; }')
            res.write('.temperature{ display: block; width : fit-content; height: 100px; margin-right: auto; margin-left: auto; }')
            res.write('.weatherImage{ display: block; width : fit-content; height: fit-content; margin-right: auto; margin-left: auto;}')
            res.write('</style>')
            res.write('</head>');
            res.write('<body>');
            res.write('<p class="weatherCondition">The weather condition is: ' + weatherDescription + '</p>');
            res.write('<h1 class="temperature">The temperature of ' + query + ' is: ' + cel.toFixed(2) + ' Celsius</h1>');
            res.write('<img class="weatherImage" src="' + imageURL + '">');
            res.write('</body>');
            res.write('</html>');
            res.end();
        })
    })
})





app.listen(3000, function () {
    console.log("server is listening on port 3000");
})