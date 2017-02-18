var mongoose = require('mongoose');
var categorySchema = mongoose.Schema({
    name: {
        type: String,
        index: true
    },
    description: String,
    date: {
        type: Date,
        default: Date.now
    }
});
var Category = module.exports = mongoose.model('categories', categorySchema);
module.exports.getCategories = function(callback) {
    Category.find(callback);
}
module.exports.getCategoryById = function(id, callback) {
    Category.findById(id, callback);
}
module.exports.createCategory = function(newCategory, callback) {
    newCategory.save(callback);
}