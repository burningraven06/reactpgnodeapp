var express = require ('express');
// const sampleCarArray = require('../data/cars');

var carRouter = express.Router();
var carDBQueries = require('../dbqueries/carqueries');

carRouter.get('/', carDBQueries.getAllCars);

carRouter.post('/', (req, res) => {

});

carRouter.get('/:id', (req, res) =>{

});

carRouter.patch('/:id', (req, res) =>{

});

carRouter.delete('/:id', (req, res) => {

});

module.exports = carRouter;