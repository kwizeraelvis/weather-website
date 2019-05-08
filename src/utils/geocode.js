const request = require('request');

const geocode =  (adrress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + adrress +'.json?access_token=pk.eyJ1Ijoia3dpemVyYWUiLCJhIjoiY2p1MW5scWJpMDNiaTQzcDRqZWZ4NjU3cSJ9.4W4CaF5_2MIxglzjDuRKZQ';

    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback('Mapbox api is unreacheable', undefined);
        } else if (body.features.length === 0) {
            callback('No place with given name', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;