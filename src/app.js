const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'elvo kwizera'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'kwizera'
    })
});
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'If you are expriencing issues please consult us',
        title: 'Help',
        name: 'elvis'
    });
});


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No location Provided'
        })
    } else {
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({
                    error: error
                });
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error: error
                    });
                }
                res.send({
                    forecast: forecastData,
                    location: location
                })
            })
        })

    }
});

app.get('/products', (req, res) => {
    res.send({
        products: []
    });
});


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Error",
        name: 'elvis',
        errorMessage: 'Help article not found'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: "Error",
        name: 'elvis',
        errorMessage: 'Page not found'
    })
});

app.listen(3000, () => {
    console.log('Server running on port 3000')
});