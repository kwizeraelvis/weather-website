const request = require('request');


const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/3c7bb9986eb1f7ca5b10b742cf5cae35/' + latitude + ',' + longitude;

    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback('DarkSky is not reacheable', undefined);
        } else if(body.error) {
            callback('No palce with specified coordinates', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + 'Highest Temperature of the day will be ' + body.daily.data[0].temperatureHigh + ', and the Lowest temperature will hit ' + body.daily.data[0].temperatureLow +'.There is a ' + body.currently.precipProbability + '% chance of rain.');
        }
    })

}


module.exports = forecast;