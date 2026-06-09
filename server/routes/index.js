const user = require('./user.js');
const article = require('./article.js');

module.exports = (router) => {
    user(router);
    article(router);
};