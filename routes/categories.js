var express = require('express');
var router = express.Router();
var Category = require('../models/category');
router.get('/', function(req, res, next) {
    Category.getCategories(function(err, categories) {
        res.json(categories);
    });
});
router.get('/:id', function(req, res, next) {
    Category.getCategoryById(req.params.id, function(err, category) {
        if (err) return err;
        res.json(category);
    });
});

module.exports = router;