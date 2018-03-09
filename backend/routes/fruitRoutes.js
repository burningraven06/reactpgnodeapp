var express = require('express');
// const sampleFruitArray = require('../data/fruits');
var fruitDBQueries = require('../dbqueries/fruitqueries');
var fruitRouter = express.Router();

fruitRouter.get('/', fruitDBQueries.getAllFruits);

fruitRouter.post('/', );

fruitRouter.get('/:id', fruitDBQueries.getSingleFruit);

fruitRouter.patch('/:id', (req, res) => {

});

fruitRouter.delete('/:id', (req, res) => {

});

module.exports = fruitRouter;
