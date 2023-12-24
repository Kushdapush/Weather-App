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

            console.log(temp, weatherDescription);
            res.write("<p>the weather condition is : " + weatherDescription + "</p>")
            res.write("<h1>The temperature of " + query + " is: " + cel.toFixed(2) + " celcius</h1>");
            res.write("<img src=" + imageURL + ">")
            res.send()
        })
    })
})





app.listen(3000, function () {
    console.log("server is listening on port 3000");
})