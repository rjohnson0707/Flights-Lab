const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    index,
    new: newFlight,
    create,
    show
}



function index (req, res) {
    Flight.find({}, function(err, flights) {
        res.render('flights/index', {flights});
    });
}

function newFlight (req, res) {
    let yearFromNow = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    let defaultDate = yearFromNow.toISOString().substr(0,16);
    res.render('flights/new', {defaultDate});
    };

function create(req, res) {
    const flight = new Flight(req.body);
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    flight.save(function(err) {
        if (err) return res.render('flights/new');
        res.redirect('/flights');
    });
}

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        Ticket.find({flight: flight._id}, function(err, tickets) {
        res.render('flights/show', {
            flight,
            tickets
        })
    }
  )}    
)};