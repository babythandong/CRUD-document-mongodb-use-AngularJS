var express = require('express');
var router = express.Router();
var Article = require('../models/articles');
router.get('/', function(req, res, next) {
    Article.getArticles(function(err, articles) {
        if (err) {
            return err;
        } else {
            res.json(articles);
        }
    });
});

router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Article.getArticlesById(id, function(err, article) {
        if (err) return err;
        res.json(article);
    });
});

router.get('/category/:category', function(req, res, next) {
    var category = req.params.category;
    Article.getArticlesByCategory(category, function(err, articles) {
        if (err) return err;
        res.json(articles);
    });
});

router.post('/', function(req, res, next) {
    var title = req.body.title;
    var category = req.body.category;
    var body = req.body.body;

    //Article Object
    var newArticle = new Article({
        title: title,
        category: category,
        body: body
    });

    //Create Article
    Article.createArticle(newArticle, function(err, newArticle) {
        if (err) return err;
        res.location('/articles');
        res.redirect('/articles')
    });
});

router.put('/', function(req, res, next) {
    var id = req.body.id;
    var data = {
        title: req.body.title,
        category: req.body.category,
        body: req.body.body
    };
    Article.updateArticle(id, data, function(err, article) {
        if (err) {
            return err;
        }
        res.location('/articles');
        res.redirect('/articles');
    });
});

router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Article.removeArticle(id, function(err, article) {
        if (err) return err;
        res.location('/articles');
        res.redirect('/articles');
    })
});
module.exports = router;