const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const destinationsSchema = new Schema({
    airport: String,
    arrival: {type: Date,
        default: function() {
            let plusYear = Date.now() + 365*24*60*60*1000;
            return plusYear.toString();
        }
    }
});

const flightSchema = new Schema({
    airline: {type: String, required: true},
    flightNo: {type: Number, required: true, min: 10, max: 9999},
    departs: {type: Date,
        default: function() {
            let plusYear = Date.now() + 365*24*60*60*1000;
            return plusYear.toString();
        }
    },
    airport: {type: String},
    destinations: [destinationsSchema]
});

module.exports = mongoose.model('Flight', flightSchema);