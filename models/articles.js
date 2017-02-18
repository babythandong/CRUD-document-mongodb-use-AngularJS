var mongoose = require('mongoose');
var articlesSchema = mongoose.Schema({
    title: {
        type: String,
        index: true
    },
    body: String,
    category: String,
    date: {
        type: Date,
        default: Date.now
    }
});

var Article = module.exports = mongoose.model('articles', articlesSchema);

module.exports.getArticles = function(callback) {
    Article.find(callback);
}

/* Get article by id */
module.exports.getArticlesById = function(id, callback) {
    Article.findById(id, callback);
}

/*Get category articles */
module.exports.getArticlesByCategory = function(category, callback) {
    var query = { category: category };
    Article.find(query, callback);
}
module.exports.createArticle = function(newArticle, callback) {
        newArticle.save(callback);
    }
    /*Update article */
module.exports.updateArticle = function(id, data, callback) {
    var title = data.title;
    var body = data.body;
    var category = data.category;

    var query = { _id: id };
    Article.findById(id, function(err, article) {
        if (err) return err;
        if (!article) {
            return next(new Error('Cound not load article'));
        } else {
            article.title = title;
            article.body = body;
            article.category = category;
            article.save(callback);
        }
    });
}
module.exports.removeArticle = function(id, callback) {
    Article.find({ _id: id }).remove(callback);
}